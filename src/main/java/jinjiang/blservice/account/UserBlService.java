package jinjiang.blservice.account;

import jinjiang.entity.account.User;
import jinjiang.exception.NotExistException;
import jinjiang.parameters.account.UserUpdateVO;
import jinjiang.parameters.account.UserVO;

import java.util.List;

public interface UserBlService {
    void addUser(User user);

    void deleteUser(String id) throws NotExistException;

    void updateUser(User user) throws NotExistException;

    User findById(String id) throws NotExistException;

    List<User> findAll();

    void setDefaultAddress(String userId,String addressId) throws NotExistException;
}
