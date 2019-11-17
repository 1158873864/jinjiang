package jinjiang.dao.account;

import jinjiang.entity.account.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiscountDao extends JpaRepository<Discount,String> {
    Optional<Discount> findByGoodsType(String goodsType);
}
