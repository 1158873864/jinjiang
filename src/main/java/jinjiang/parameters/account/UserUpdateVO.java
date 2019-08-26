package jinjiang.parameters.account;


public class UserUpdateVO {
    private String id;

    private String username;//用户名

    private String password; //密码

    private String mobilePhone; //手机号

    private String name; //姓名

    private String email; //邮箱

    private String defaultAddress; //默认地址

    private String faceUrl; //头像地址

    private int levelId;//level的id

    private double balance;//余额


    public UserUpdateVO() {
    }

    public UserUpdateVO(String id, String username, String password, String mobilePhone, String name, String email, String defaultAddress, String faceUrl, int levelId, double balance) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.mobilePhone = mobilePhone;
        this.name = name;
        this.email = email;
        this.defaultAddress = defaultAddress;
        this.faceUrl = faceUrl;
        this.levelId = levelId;
        this.balance = balance;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDefaultAddress() {
        return defaultAddress;
    }

    public void setDefaultAddress(String defaultAddress) {
        this.defaultAddress = defaultAddress;
    }

    public String getFaceUrl() {
        return faceUrl;
    }

    public void setFaceUrl(String faceUrl) {
        this.faceUrl = faceUrl;
    }

    public int getLevelId() {
        return levelId;
    }

    public void setLevelId(int levelId) {
        this.levelId = levelId;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
