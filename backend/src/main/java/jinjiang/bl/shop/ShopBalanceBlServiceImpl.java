package jinjiang.bl.shop;

import jinjiang.blservice.shop.ShopBalanceBlService;
import jinjiang.dao.shop.ShopBalanceDao;
import jinjiang.entity.account.Balance;
import jinjiang.entity.shop.ShopBalance;
import jinjiang.exception.NotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopBalanceBlServiceImpl implements ShopBalanceBlService {

    private final ShopBalanceDao shopBalanceDao;
    @Autowired
    public ShopBalanceBlServiceImpl(ShopBalanceDao shopBalanceDao) {

        this.shopBalanceDao = shopBalanceDao;
    }

    @Override
    public ShopBalance addShopBalance(ShopBalance shopBalance) {
        return shopBalanceDao.save(shopBalance);
    }

    @Override
    public void deleteShopBalance(String id) throws NotExistException {
        Optional<ShopBalance> optionalBalance = shopBalanceDao.findById(id);
        if (optionalBalance.isPresent()) {
            shopBalanceDao.deleteById(id);
        } else {
            throw new NotExistException("Address ID", id);
        }
    }

    @Override
    public void updateShopBalance(ShopBalance balance) throws NotExistException {
        Optional<ShopBalance> optionalBalance = shopBalanceDao.findById(balance.getId());
        if (optionalBalance.isPresent()){
            ShopBalance newBalance = optionalBalance.get();
            newBalance.setDetail(balance.getDetail());
            newBalance.setGoodsList(balance.getGoodsList());
            newBalance.setPrice(balance.getPrice());
            newBalance.setTime(balance.getTime());
            newBalance.setType(balance.getType());
            newBalance.setExpenseType(balance.getExpenseType());
            newBalance.setName(balance.getName());
            newBalance.setShopId(balance.getShopId());
            shopBalanceDao.save(newBalance);
        }else {
            throw new NotExistException("address ID", balance.getId());
        }

    }

    @Override
    public ShopBalance findById(String id) throws NotExistException {
        return shopBalanceDao.findById(id).get();
    }

    @Override
    public List<ShopBalance> findByTypeAndShopId(String type, String shopId){
        return shopBalanceDao.findByTypeAndShopId(type,shopId);
    }

    @Override
    public Page<ShopBalance> findAll(Pageable pageable) {
        return shopBalanceDao.findAll(pageable);
    }
}
