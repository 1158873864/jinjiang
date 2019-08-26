package jinjiang.bl.account;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jinjiang.blservice.account.UserBlService;
import jinjiang.dao.account.UserDao;
import jinjiang.entity.account.Level;
import jinjiang.entity.account.User;
import jinjiang.exception.NotExistException;

import java.util.List;
import java.util.Optional;


@Service
public class UserBlServiceImpl implements UserBlService {
	private final UserDao userDao;

	@Autowired
	public UserBlServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}

	@Override
	public void addUser(User user) {
		userDao.save(user);
	}

	@Override
	public void deleteUser(String id) throws NotExistException {
		Optional<User> optionalUser = userDao.findById(id);
		if (optionalUser.isPresent()) {
			userDao.deleteById(id);
		} else {
			throw new NotExistException("User ID", id);
		}
	}

	@Override
	public void updateUser(User user) throws NotExistException {
		Optional<User> optionalUser = userDao.findById(user.getId());
		if(optionalUser.isPresent()) {
			User newUser = optionalUser.get();
			newUser.setBalance(user.getBalance());
			newUser.setBirthday(user.getBirthday());
			newUser.setDefaultAddress(user.getDefaultAddress());
			newUser.setEmail(user.getEmail());
			newUser.setFaceUrl(user.getFaceUrl());
			newUser.setIdentity(user.getIdentity());
			newUser.setIntegral(user.getIntegral());
			newUser.setLevel(user.getLevel());
			newUser.setMobilePhone(user.getMobilePhone());
			newUser.setName(user.getName());
			newUser.setOpenid(user.getOpenid());
			newUser.setRegtime(user.getRegtime());
			newUser.setRemark(user.getRemark());
			newUser.setTakeBalance(user.getTakeBalance());
			newUser.setUsername(user.getUsername());
			newUser.setShopId(user.getShopId());
			userDao.save(newUser);
		} else {
			throw new NotExistException("User ID", user.getId());
		}
	}

	@Override
	public List<User> findAll() {
		return userDao.findAll();
	}

	@Override
	public List<User> findByIdentity(String identity) {
		return userDao.findByIdentity(identity);
	}

	@Override
	public List<User> findByShopId(String shopId) {
		return userDao.findByShopId(shopId);
	}

	@Override
	public List<User> findIdentityAndShop(String identity,String shopId) {
		return userDao.findByIdentityAndShopId(identity,shopId);
	}


	@Override
	public User findById(String id) throws NotExistException {
		Optional<User> optionalUser = userDao.findById(id);
		if(optionalUser.isPresent()) {
			return optionalUser.get();
		}else {
			throw new NotExistException("User ID", id);
		}
	}





	@Override
	public void setDefaultAddress(String userId, String addressId) throws NotExistException {
		Optional<User> optionalUser=userDao.findById(userId);
		if(optionalUser.isPresent()){
            User lastUser=optionalUser.get();
            lastUser.setDefaultAddress(addressId);
            userDao.save(lastUser);
		}
		else {
			throw new NotExistException("User ID", userId);
		}
	}


}
