package jinjiang.bl.order;

import jinjiang.blservice.order.OrderBlService;
import jinjiang.dao.order.OrderDao;
import jinjiang.entity.order.Order;
import jinjiang.exception.NotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class OrderBlServiceImpl implements OrderBlService {
    private final OrderDao orderdoa;

    @Autowired
    public OrderBlServiceImpl(OrderDao orderdoa){
        this.orderdoa=orderdoa;
    }

    @Override
    public void addOrder(Order order) {
       orderdoa.save(order);
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
    public Page<Order> findAll(Pageable pageable) {

        return orderdoa.findAll(pageable);
    }
}
