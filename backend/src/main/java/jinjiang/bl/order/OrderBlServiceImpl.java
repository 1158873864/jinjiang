package jinjiang.bl.order;

import jinjiang.blservice.order.OrderBlService;
import jinjiang.dao.account.BalanceDao;
import jinjiang.dao.account.UserDao;
import jinjiang.dao.admin.DeductDao;
import jinjiang.dao.order.OrderDao;
import jinjiang.dao.shop.*;
import jinjiang.entity.account.Balance;
import jinjiang.entity.account.User;
import jinjiang.entity.admin.Deduct;
import jinjiang.entity.order.Order;
import jinjiang.entity.shop.*;
import jinjiang.exception.NotExistException;
import jinjiang.response.OrderResponse;
import jinjiang.response.GoodsItem;
import jinjiang.util.FormatDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderBlServiceImpl implements OrderBlService {
    private final OrderDao orderdoa;
    private final UserDao userDao;
    private final GoodsDao goodsDao;
    private final Goods2Dao goods2Dao;
    private final IntegraGoodsDao integraGoodsDao;
    private final DeductDao deductDao;
    private final ShopDao shopDao;
    private final BalanceDao balanceDao;
    private final ShopBalanceDao shopBalanceDao;
    @Autowired
    public OrderBlServiceImpl(OrderDao orderdoa, UserDao userDao, GoodsDao goodsDao, Goods2Dao goods2Dao, IntegraGoodsDao integraGoodsDao, DeductDao deductDao, ShopDao shopDao, BalanceDao balanceDao, ShopBalanceDao shopBalanceDao){
        this.orderdoa=orderdoa;
        this.userDao = userDao;
        this.goodsDao = goodsDao;
        this.goods2Dao = goods2Dao;
        this.integraGoodsDao = integraGoodsDao;
        this.deductDao = deductDao;
        this.shopDao = shopDao;
        this.balanceDao = balanceDao;
        this.shopBalanceDao = shopBalanceDao;
    }

    @Override
    public Order addOrder(Order order) {
        Date date=new Date();
        String time= FormatDateTime.toShortDateString(date);
        order.setBuyTime(time);
        return orderdoa.save(order);
    }

    @Override
    public void deleteOrder(String id) throws NotExistException {
     Optional<Order> order=orderdoa.findById(id);
     if (order.isPresent()){
         orderdoa.deleteById(id);
     }else {
         throw new NotExistException("order ID", id);
     }
    }

    @Override
    public void updateOrder(Order order) throws NotExistException {
        Optional<Order> orderone=orderdoa.findById(order.getId());
        if (orderone.isPresent()){
            Order neworder=orderone.get();
            neworder.setAddress(order.getAddress());
            neworder.setBuyTime(order.getBuyTime());
            neworder.setDiscountPrice(order.getDiscountPrice());
            neworder.setGoodsList(order.getGoodsList());
            neworder.setPrice(order.getPrice());
            neworder.setStatus(order.getStatus());
            neworder.setUserId(order.getUserId());
            neworder.setType(order.getType());
            neworder.setRemark(order.getRemark());
            neworder.setMobilePone(order.getMobilePone());
            neworder.setFreight(order.getFreight());
            neworder.setPerson(order.getPerson());
            orderdoa.save(neworder);
        } else {
            throw new NotExistException("order ID", order.getId());
        }
    }

    @Override
    public Order findById(String id) throws NotExistException {
        Optional<Order> order=orderdoa.findById(id);
        if (order.isPresent()){
            return order.get();
        }else {
            throw new NotExistException("order ID", id);
        }
    }

    @Override
    public Page<Order> findByStatus(String status,Pageable pageable) {
        return orderdoa.findByStatus(status,pageable);
    }

    @Override
    public void cancel(String id) throws NotExistException {
        Optional<Order> optionalOrder=orderdoa.findById(id);
        if (optionalOrder.isPresent()){
            Order order=optionalOrder.get();
            order.setStatus("已取消");
            orderdoa.save(order);
        }else {
            throw new NotExistException("order ID", id);
        }
    }

    @Override
    public void send(String id) throws NotExistException {
        Optional<Order> optionalOrder=orderdoa.findById(id);
        if (optionalOrder.isPresent()){
            Order order=optionalOrder.get();
            order.setStatus("待收货");
            orderdoa.save(order);
        }else {
            throw new NotExistException("order ID", id);
        }
    }

    @Override
    public void take(String id) throws NotExistException {
        Optional<Order> optionalOrder=orderdoa.findById(id);
        if (optionalOrder.isPresent()){
            Order order=optionalOrder.get();
            order.setStatus("已完成");
            orderdoa.save(order);
        }else {
            throw new NotExistException("order ID", id);
        }
    }

    @Override
    public void integralSend(String id) throws NotExistException {
        Optional<Order> optionalOrder=orderdoa.findById(id);
        if (optionalOrder.isPresent()){
            Order order=optionalOrder.get();
            order.setStatus("积分待收货");
            orderdoa.save(order);
        }else {
            throw new NotExistException("order ID", id);
        }
    }

    @Override
    public void integralTake(String id) throws NotExistException {
        Optional<Order> optionalOrder=orderdoa.findById(id);
        if (optionalOrder.isPresent()){
            Order order=optionalOrder.get();
            order.setStatus("积分已完成");
            orderdoa.save(order);
        }else {
            throw new NotExistException("order ID", id);
        }
    }

    @Override
    public void pay(Order o) throws NotExistException {
        String id=o.getId();
        double actualPrice=o.getPrice();
        List<String> goodsName=new ArrayList<>();
        Optional<Order> optionalOrder=orderdoa.findById(id);
        if (optionalOrder.isPresent()){
            String shopId="";
            o.setStatus("待发货");
            orderdoa.save(o);
            User user=userDao.getOne(o.getUserId());
            user.setBalance(user.getBalance()-actualPrice);
            Deduct deduct=new Deduct();
            Optional<Deduct> optionalDeduct=deductDao.findByShopId(shopId);
            if(optionalDeduct.isPresent()){
                deduct=optionalDeduct.get();
            }
            if(user.getIdentity().equals("member")){
                user.setIntegral(user.getIntegral()+(int)actualPrice);
                userDao.save(user);
                double stock=0;
                double profit=0;
                List<String> goodsList=o.getGoodsList();
                for(int i=0;i<goodsList.size();i++){
                    Optional<Goods> optionalGoods=goodsDao.findById(goodsList.get(i));
                    if(optionalGoods.isPresent()){
                        Goods goods=optionalGoods.get();
                        goodsName.add(goods.getName());
                        shopId=goods.getShopId();
                        stock+=goods.getStockPrice();
                    }
                    else{
                        Optional<Goods2> optionalGoods2=goods2Dao.findById(goodsList.get(i));
                        if(optionalGoods2.isPresent()){
                            Goods2 goods2=optionalGoods2.get();
                            goodsName.add(goods2.getName());
                            shopId=goods2.getShopId();
                            stock+=goods2.getStockPrice();
                        }
                    }
                }
                profit=actualPrice-stock;
                Balance balance=new Balance(user.getId(),user.getUsername(),"支出",actualPrice,"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                balanceDao.save(balance);
                if(user.getShareholderId().equals("")){
                    Optional<User> optionalStaff=userDao.findById(user.getRemark());
                    if(optionalStaff.isPresent()){
                        User staff=optionalStaff.get();
                        staff.setBalance(staff.getBalance()+profit*deduct.getStaffRatio());
                        Balance balance1=new Balance(staff.getId(),staff.getUsername(),"收入",profit*deduct.getStaffRatio(),"会员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                        balanceDao.save(balance1);
                        userDao.save(staff);
                        Optional<Shop> optionalShop=shopDao.findById(shopId);
                        if(optionalShop.isPresent()){
                            Shop shop=optionalShop.get();
                            shop.setBalance(shop.getBalance()+profit*(1-deduct.getStaffRatio()));
                            shopDao.save(shop);
                            ShopBalance shopBalance=new ShopBalance(shop.getId(),shop.getName(),"收入","",profit*(1-deduct.getStaffRatio()),"会员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                            shopBalanceDao.save(shopBalance);
                        }
                    }
                    else{
                        Optional<Shop> optionalShop=shopDao.findById(shopId);
                        if(optionalShop.isPresent()){
                            Shop shop=optionalShop.get();
                            shop.setBalance(shop.getBalance()+profit);
                            shopDao.save(shop);
                            ShopBalance shopBalance=new ShopBalance(shop.getId(),shop.getName(),"收入","",profit,"会员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                            shopBalanceDao.save(shopBalance);
                        }
                    }

                }
                else{
                    Optional<User> optionalShareholder=userDao.findById(user.getShareholderId());
                    if(optionalShareholder.isPresent()){
                        User shareholder=optionalShareholder.get();
                        shareholder.setBalance(shareholder.getBalance()+profit*deduct.getPersonal());
                        shareholder.setTakeBalance(shareholder.getTakeBalance()+profit*deduct.getTakeBalance());
                        userDao.save(shareholder);
                        Balance balance2=new Balance(shareholder.getId(),shareholder.getUsername(),"收入",profit*deduct.getPersonal()+profit*deduct.getTakeBalance(),"会员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                        balanceDao.save(balance2);
                        Optional<Shop> optionalShop=shopDao.findById(shopId);
                        if(optionalShop.isPresent()){
                            Shop shop=optionalShop.get();
                            shop.setBalance(shop.getBalance()+profit*(1-deduct.getTakeBalance()-deduct.getPersonal()));
                            shopDao.save(shop);
                            ShopBalance shopBalance=new ShopBalance(shop.getId(),shop.getName(),"收入","",profit*(1-deduct.getTakeBalance()-deduct.getPersonal()),"会员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                            shopBalanceDao.save(shopBalance);
                        }
                    }
                    else{
                        Optional<Shop> optionalShop=shopDao.findById(shopId);
                        if(optionalShop.isPresent()){
                            Shop shop=optionalShop.get();
                            shop.setBalance(shop.getBalance()+profit);
                            shopDao.save(shop);
                            ShopBalance shopBalance=new ShopBalance(shop.getId(),shop.getName(),"收入","",profit,"会员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                            shopBalanceDao.save(shopBalance);
                        }
                    }

                }

            }
            else{
                userDao.save(user);
                double stock=0;
                double profit=0;
                List<String> goodsList=o.getGoodsList();
                for(int i=0;i<goodsList.size();i++){
                    Optional<Goods> optionalGoods=goodsDao.findById(goodsList.get(i));
                    if(optionalGoods.isPresent()){
                        Goods goods=optionalGoods.get();
                        goodsName.add(goods.getName());
                        shopId=goods.getShopId();
                        stock+=goods.getStockPrice();
                    }
                    else{
                        Optional<Goods2> optionalGoods2=goods2Dao.findById(goodsList.get(i));
                        if(optionalGoods2.isPresent()){
                            Goods2 goods2=optionalGoods2.get();
                            goodsName.add(goods2.getName());
                            shopId=goods2.getShopId();
                            stock+=goods2.getStockPrice();
                        }
                    }
                }
                profit=actualPrice-stock;
                Balance balance=new Balance(user.getId(),user.getUsername(),"支出",actualPrice,"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                balanceDao.save(balance);
                Optional<Shop> optionalShop=shopDao.findById(shopId);
                if(optionalShop.isPresent()){
                    Shop shop=optionalShop.get();
                    shop.setBalance(shop.getBalance()+profit);
                    shopDao.save(shop);
                    ShopBalance shopBalance=new ShopBalance(shop.getId(),shop.getName(),"收入","",profit,"人员"+user.getUsername()+"购买商品",FormatDateTime.toLongDateString(new Date()),goodsName);
                    shopBalanceDao.save(shopBalance);
                }
            }
        }else {
            throw new NotExistException("order ID", id);
        }
    }


    @Override
    public Page<Order> findAll(Pageable pageable) {

        return orderdoa.findAll(pageable);
    }

    @Override
    public List<OrderResponse> findAllWX(String userId) {
        List<Order> orders=orderdoa.findByUserId(userId);
        List<OrderResponse> orderResponses=new ArrayList<>();
        for(int i=orders.size()-1;i>=0;i--){
            List<GoodsItem> goodsItems=new ArrayList<>();
            for(int j=0;j<orders.get(i).getGoodsList().size();j++){
                String id=orders.get(i).getGoodsList().get(j);
                GoodsItem goodsItem=new GoodsItem();
                Optional<Goods> optionalGoods=goodsDao.findById(id);
                if(optionalGoods.isPresent()){
                    Goods goods=optionalGoods.get();
                    goodsItem=new GoodsItem(goods.getId(),goods.getName(),goods.getImageUrl(),goods.getStandard(),goods.getPrice());
                    goodsItems.add(goodsItem);
                }
                else{
                    Optional<Goods2> optionalGoods2=goods2Dao.findById(id);
                    if(optionalGoods2.isPresent()){
                        Goods2 goods2=optionalGoods2.get();
                        goodsItem=new GoodsItem(goods2.getId(),goods2.getName(),goods2.getImageUrl(),goods2.getStandard(),goods2.getPrice());
                        goodsItems.add(goodsItem);
                    }
                    else{
                        Optional<IntegralGoods> optionalIntegralGoods=integraGoodsDao.findById(id);
                        if(optionalIntegralGoods.isPresent()){
                            IntegralGoods integralGoods=optionalIntegralGoods.get();
                            goodsItem=new GoodsItem(integralGoods.getId(),integralGoods.getName(),integralGoods.getImageUrl(),integralGoods.getStandard(),integralGoods.getIntegral());
                            goodsItems.add(goodsItem);
                        }
                    }
                }
            }
            Order order=orders.get(i);
            OrderResponse orderResponse=new OrderResponse(order.getId(),order.getUserId(),order.getAddress(),order.getMobilePone(),order.getPerson(),order.getType(),order.getRemark(),order.getFreight(),order.getPrice(),order.getDiscountPrice(),goodsItems,order.getBuyTime(),order.getStatus());
            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }

    @Override
    public List<OrderResponse> findByStatusWX(String userId,String status) {
        List<Order> orders=orderdoa.findByUserIdAndStatus(userId,status);
        List<OrderResponse> orderResponses=new ArrayList<>();
        for(int i=orders.size()-1;i>=0;i--){
            List<GoodsItem> goodsItems=new ArrayList<>();
            for(int j=0;j<orders.get(i).getGoodsList().size();j++){
                String id=orders.get(i).getGoodsList().get(j);
                GoodsItem goodsItem=new GoodsItem();
                Optional<Goods> optionalGoods=goodsDao.findById(id);
                if(optionalGoods.isPresent()){
                    Goods goods=optionalGoods.get();
                    goodsItem=new GoodsItem(goods.getId(),goods.getName(),goods.getImageUrl(),goods.getStandard(),goods.getPrice());
                    goodsItems.add(goodsItem);
                }
                else{
                    Optional<Goods2> optionalGoods2=goods2Dao.findById(id);
                    if(optionalGoods2.isPresent()){
                        Goods2 goods2=optionalGoods2.get();
                        goodsItem=new GoodsItem(goods2.getId(),goods2.getName(),goods2.getImageUrl(),goods2.getStandard(),goods2.getPrice());
                        goodsItems.add(goodsItem);
                    }
                    else{
                        Optional<IntegralGoods> optionalIntegralGoods=integraGoodsDao.findById(id);
                        if(optionalIntegralGoods.isPresent()){
                            IntegralGoods integralGoods=optionalIntegralGoods.get();
                            goodsItem=new GoodsItem(integralGoods.getId(),integralGoods.getName(),integralGoods.getImageUrl(),integralGoods.getStandard(),integralGoods.getIntegral());
                            goodsItems.add(goodsItem);
                        }
                    }
                }
            }
            Order order=orders.get(i);
            OrderResponse orderResponse=new OrderResponse(order.getId(),order.getUserId(),order.getAddress(),order.getMobilePone(),order.getPerson(),order.getType(),order.getRemark(),order.getFreight(),order.getPrice(),order.getDiscountPrice(),goodsItems,order.getBuyTime(),order.getStatus());
            orderResponses.add(orderResponse);
        }
        return orderResponses;
    }


    @Override
    public OrderResponse findByIdWX(String orderId) {
        Optional<Order> optionalOrder=orderdoa.findById(orderId);
        OrderResponse orderResponse=new OrderResponse();
        if(optionalOrder.isPresent()) {
            Order order=optionalOrder.get();
            List<GoodsItem> goodsItems = new ArrayList<>();
            for (int j = 0; j < order.getGoodsList().size(); j++) {
                String id = order.getGoodsList().get(j);
                GoodsItem goodsItem = new GoodsItem();
                Optional<Goods> optionalGoods = goodsDao.findById(id);
                if (optionalGoods.isPresent()) {
                    Goods goods = optionalGoods.get();
                    goodsItem = new GoodsItem(goods.getId(), goods.getName(), goods.getImageUrl(), goods.getStandard(),goods.getPrice());
                    goodsItems.add(goodsItem);
                } else {
                    Optional<Goods2> optionalGoods2 = goods2Dao.findById(id);
                    if (optionalGoods2.isPresent()) {
                        Goods2 goods2 = optionalGoods2.get();
                        goodsItem = new GoodsItem(goods2.getId(), goods2.getName(), goods2.getImageUrl(), goods2.getStandard(),goods2.getPrice());
                        goodsItems.add(goodsItem);
                    } else {
                        Optional<IntegralGoods> optionalIntegralGoods = integraGoodsDao.findById(id);
                        if (optionalIntegralGoods.isPresent()) {
                            IntegralGoods integralGoods = optionalIntegralGoods.get();
                            goodsItem = new GoodsItem(integralGoods.getId(), integralGoods.getName(), integralGoods.getImageUrl(), integralGoods.getStandard(),integralGoods.getIntegral());
                            goodsItems.add(goodsItem);
                        }
                    }
                }
            }
            orderResponse = new OrderResponse(order.getId(), order.getUserId(), order.getAddress(), order.getMobilePone(), order.getPerson(), order.getType(), order.getRemark(), order.getFreight(), order.getPrice(), order.getDiscountPrice(), goodsItems, order.getBuyTime(), order.getStatus());
        }
        return orderResponse;
    }

}
