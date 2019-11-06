package jinjiang.blservice.account;

import jinjiang.entity.account.Coupon;
import jinjiang.entity.recommend.Recommend;
import jinjiang.exception.NotExistException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CouponService {

    void addCoupon(Coupon coupon);

    void deleteCoupon(String id) throws NotExistException;

    void updateCoupon(Coupon coupon) throws NotExistException;

    Coupon findById(String id) throws NotExistException;

    Page<Coupon> findAll(Pageable pageable);

    Page<Coupon> find(String query, Pageable pageable);
}
