package jinjiang.dao.account;

import jinjiang.entity.admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminDao extends JpaRepository<Admin,String> {


}
