package jinjiang.dao.account;

import jinjiang.entity.account.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressDao extends JpaRepository<Address, String> {
}
