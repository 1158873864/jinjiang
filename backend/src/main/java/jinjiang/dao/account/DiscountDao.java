package jinjiang.dao.account;

import jinjiang.entity.account.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountDao extends JpaRepository<Discount,String> {
    
}
