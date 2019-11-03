package jinjiang.blservice.order;


import jinjiang.entity.account.User;
import jinjiang.entity.order.Order;
import jinjiang.exception.NotExistException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderBlService {

    void addOrder(Order order);

    void deleteOrder(String id) throws NotExistException;

    void updateOrder(Order order) throws NotExistException;

    Order findById(String id) throws NotExistException;

    Page<Order> findAll(Pageable pageable);

}
