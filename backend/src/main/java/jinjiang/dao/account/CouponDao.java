package jinjiang.dao.account;

import jinjiang.entity.account.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponDao extends JpaRepository<Coupon,String> {
}
