package jinjiang.entity.order;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "o")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Order {//订单
    @Id
    @GeneratedValue(generator = "jpa-uuid")
    private String id;//编号

    @Column(name = "userId")
    private String userId; //对应人员id

    @Column(name = "price")
    private double price; //总价

    @Column(name = "discountPrice")
    private double discountPrice; //折扣后价格

    @Column(name = "address")
    private String address; //送货地址

    @Column
    @ElementCollection(targetClass = String.class)
    private List<String> goodsList; //所购买商品id列表

    @Column(name = "BuyTime")
    private String BuyTime;//购买时间

    @Column(name = "status")
    private String status; //状态，包含:待付款、待发货、待收货、待评价

    public Order() {
    }

    public Order(String userId, double price, double discountPrice, String address, List<String> goodsList, String buyTime, String status) {
        this.userId = userId;
        this.price = price;
        this.discountPrice = discountPrice;
        this.address = address;
        this.goodsList = goodsList;
        BuyTime = buyTime;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getGoodsList() {
        return goodsList;
    }

    public void setGoodsList(List<String> goodsList) {
        this.goodsList = goodsList;
    }

    public String getBuyTime() {
        return BuyTime;
    }

    public void setBuyTime(String buyTime) {
        BuyTime = buyTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}