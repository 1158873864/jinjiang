package jinjiang.bl.account;

import jinjiang.blservice.account.BalanceBlService;
import jinjiang.dao.account.AddressDao;
import jinjiang.dao.account.BalanceDao;
import jinjiang.entity.account.Address;
import jinjiang.entity.account.Balance;
import jinjiang.exception.NotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BalanceBlServiceImpl implements BalanceBlService {

    private final BalanceDao balanceDao;

    @Autowired
    public BalanceBlServiceImpl( BalanceDao balanceDao) {
        this.balanceDao = balanceDao;
    }

    @Override
    public Balance addBalance(Balance balance) {
        return balanceDao.save(balance);
    }

    @Override
    public void deleteBalance(String id) throws NotExistException {
        Optional<Balance> optionalBalance = balanceDao.findById(id);
        if (optionalBalance.isPresent()) {
            balanceDao.deleteById(id);
        } else {
            throw new NotExistException("Address ID", id);
        }
    }

    @Override
    public void updateBalance(Balance balance) throws NotExistException {
        Optional<Balance> optionalBalance = balanceDao.findById(balance.getId());
        if (optionalBalance.isPresent()){
            Balance newBalance = optionalBalance.get();
            newBalance.setDetail(balance.getDetail());
            newBalance.setGoodsList(balance.getGoodsList());
            newBalance.setPrice(balance.getPrice());
            newBalance.setTime(balance.getTime());
            newBalance.setType(balance.getType());
            newBalance.setUserId(balance.getUserId());
            newBalance.setUsername(balance.getUsername());
        }else {
            throw new NotExistException("address ID", balance.getId());
        }

    }

    @Override
    public Balance findById(String id) throws NotExistException {
        return balanceDao.findById(id).get();
    }

    @Override
    public List<Balance> findByTypeAndUserId(String type, String userId){
        return balanceDao.findByTypeAndUserId(type,userId);
    }

    @Override
    public List<Balance> findByUserId(String userId){
        return balanceDao.findByUserId(userId);
    }

    @Override
    public Page<Balance> findAll(Pageable pageable) {
        return balanceDao.findAll(pageable);
    }
}
