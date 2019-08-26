package jinjiang.dao.account;

import org.springframework.data.jpa.repository.JpaRepository;
import jinjiang.entity.account.User;

import java.util.List;

public interface UserDao extends JpaRepository<User, String> {
}
