package jinjiang.dao.account;

import jinjiang.entity.admin.Ad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdDao extends JpaRepository<Ad,String> {
}
