package jinjiang.dao.order;

import jinjiang.entity.order.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDao extends JpaRepository<Order,String> {
    Page<Order> findByStatus(String status, Pageable pageable);
    List<Order> findByStatus(String status);
    List<Order> findByUserId(String userId);
    List<Order> findByUserIdAndStatus(String userId,String status);
}
