package jinjiang.entity.shop;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "goods")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Goods {//商品
    @Id
    @GeneratedValue(generator = "jpa-uuid")
    private String id;//编号

    @Column(name = "name")
    private String name; //商品名称

    @Column(name = "price")
    private double price; //零售价

    @Column(name = "memberPrice")
    private double memberPrice; //会员价格

    @Column(name = "stockPrice")
    private double stockPrice; //进货价格

    @Column(name = "number")
    private int number;//剩余数量

    @Column(name = "sales")
    private int sales;//销售量

    @Column(name = "imageUrl")
    private String imageUrl; //商品图片

    @Column
    @ElementCollection(targetClass = String.class)
    private List<String> swiperImgs; //商品轮播图图片

    @Column
    @ElementCollection(targetClass = String.class)
    private List<String> detailImgs; //商品详情图片

    @Column(name = "discountId")
    private String discountId; //可领取的优惠券id

    @Column(name = "shopId")
    private String shopId; //对应门店id

    public Goods() {
    }

    public Goods(String name, double price, double memberPrice, double stockPrice, int number, int sales, String imageUrl, List<String> swiperImgs, List<String> detailImgs, String discountId, String shopId) {
        this.name = name;
        this.price = price;
        this.memberPrice = memberPrice;
        this.stockPrice = stockPrice;
        this.number = number;
        this.sales = sales;
        this.imageUrl = imageUrl;
        this.swiperImgs = swiperImgs;
        this.detailImgs = detailImgs;
        this.discountId = discountId;
        this.shopId = shopId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getMemberPrice() {
        return memberPrice;
    }

    public void setMemberPrice(double memberPrice) {
        this.memberPrice = memberPrice;
    }

    public double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(double stockPrice) {
        this.stockPrice = stockPrice;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getSwiperImgs() {
        return swiperImgs;
    }

    public void setSwiperImgs(List<String> swiperImgs) {
        this.swiperImgs = swiperImgs;
    }

    public List<String> getDetailImgs() {
        return detailImgs;
    }

    public void setDetailImgs(List<String> detailImgs) {
        this.detailImgs = detailImgs;
    }

    public String getDiscountId() {
        return discountId;
    }

    public void setDiscountId(String discountId) {
        this.discountId = discountId;
    }

    public String getShopId() {
        return shopId;
    }

    public void setShopId(String shopId) {
        this.shopId = shopId;
    }
}