package jinjiang.bl.account;


import jinjiang.dao.account.LevelDao;
import jinjiang.dao.shop.ShopDao;
import jinjiang.entity.shop.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import jinjiang.blservice.account.UserBlService;
import jinjiang.dao.account.UserDao;
import jinjiang.entity.account.User;
import jinjiang.exception.NotExistException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserBlServiceImpl implements UserBlService {
	private final UserDao userDao;
	private final ShopDao shopDao;

	@Autowired
	public UserBlServiceImpl(UserDao userDao, ShopDao shopDao) {
		this.userDao = userDao;
		this.shopDao = shopDao;
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
			newUser.setShareholderId(user.getShareholderId());
			newUser.setInvest(user.getInvest());
			userDao.save(newUser);
		} else {
			throw new NotExistException("User ID", user.getId());
		}
	}

	@Override
	public Page<User> findAll(Pageable pageable) {
		return userDao.findAll(pageable);
	}

	@Override
	public Page<User> findByIdentity(String identity,Pageable pageable) {
		return userDao.findByIdentity(identity,pageable);
	}

	@Override
	public Page<User> find(String identity, String query, Pageable pageable) {
		List<User> userList=userDao.findByIdentity(identity);
		List<User> list=new ArrayList<>();
		for(User user:userList){
			String shopName="***";
			String shareholderName="***";
			Optional<Shop> shop=shopDao.findById(user.getShopId());
			Optional<User> shareholder=userDao.findById(user.getShareholderId());
			if(shop.isPresent()){
				shopName=shop.get().getName();
			}
			if(shareholder.isPresent()){
				shareholderName=shareholder.get().getName();
			}
			if(user.getLevel().indexOf(query)!=(-1)||user.getMobilePhone().indexOf(query)!=(-1)||user.getEmail().indexOf(query)!=(-1)||user.getOpenid().indexOf(query)!=(-1)||user.getName().indexOf(query)!=(-1)||shareholderName.indexOf(query)!=(-1)||shopName.indexOf(query)!=(-1)||user.getUsername().indexOf(query)!=(-1)||user.getId().indexOf(query)!=(-1)){
				list.add(user);
			}
		}
		return listConvertToPage(list,pageable);
	}

	public <T> Page<T> listConvertToPage(List<T> list, Pageable pageable) {
		int start = (int)pageable.getOffset();
		int end = (start + pageable.getPageSize()) > list.size() ? list.size() : ( start + pageable.getPageSize());
		return new PageImpl<T>(list.subList(start, end), pageable, list.size());
	}

	@Override
	public Page<User> findByShopId(String shopId,Pageable pageable) {
		return userDao.findByShopId(shopId,pageable);
	}

	@Override
	public Page<User> findIdentityAndShop(String identity,String shopId,Pageable pageable) {
		return userDao.findByIdentityAndShopId(identity,shopId,pageable);
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
