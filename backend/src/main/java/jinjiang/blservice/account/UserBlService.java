package jinjiang.blservice.account;

import jinjiang.entity.account.User;
import jinjiang.exception.NotExistException;
import jinjiang.response.account.OpenIdAndSessionKeyResponse;
import jinjiang.response.account.QrCodeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserBlService {
    void addUser(User user);

    void deleteUser(String id) throws NotExistException;

    void updateUser(User user) throws NotExistException;

    User findById(String id) throws NotExistException;

    Page<User> findAll(Pageable pageable);

    Page<User> findByIdentity(String identity, Pageable pageable);

    Page<User> find(String identity, String query, Pageable pageable);

    Page<User> findByShopId(String shopId, Pageable pageable);

    Page<User> findIdentityAndShop(String identity, String shopId, Pageable pageable);

    User findByOpenid(String openid) throws NotExistException;

    void setDefaultAddress(String userId, String addressId) throws NotExistException;

    OpenIdAndSessionKeyResponse getOpenIdAndSessionKey(String jsCode);

    User loginMyUser(String openid, String username, String faceWxUrl);

    QrCodeResponse getWxQrCode(String scene, String page, int width, boolean autoColor, String lineColorR, String lineColorG, String lineColorB, boolean isHyaline);
}
