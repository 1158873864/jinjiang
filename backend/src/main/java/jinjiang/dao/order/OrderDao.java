package jinjiang.dao.order;

import jinjiang.entity.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<Order,String> {


}
