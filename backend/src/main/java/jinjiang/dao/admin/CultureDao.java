package jinjiang.dao.admin;

import jinjiang.entity.admin.Culture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CultureDao extends JpaRepository<Culture,String> {
}
