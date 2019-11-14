package jinjiang.blservice.order;


import jinjiang.entity.account.User;
import jinjiang.entity.order.Order;
import jinjiang.exception.NotExistException;
import jinjiang.response.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderBlService {

    Order addOrder(Order order);

    void deleteOrder(String id) throws NotExistException;

    void updateOrder(Order order) throws NotExistException;

    Order findById(String id) throws NotExistException;

    Page<Order> findByStatus(String status, Pageable pageable);

    void cancel(String id) throws NotExistException;

    void send(String id) throws NotExistException;

    void take(String id) throws NotExistException;

    void integralSend(String id) throws NotExistException;

    void integralTake(String id) throws NotExistException;

    void pay(Order o) throws NotExistException;

    Page<Order> findAll(Pageable pageable);

    List<OrderResponse> findAllWX(String userId);

    List<OrderResponse> findByStatusWX(String userId, String status);

    OrderResponse findByIdWX(String orderId);
}
