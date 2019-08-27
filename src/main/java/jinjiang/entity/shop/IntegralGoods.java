package jinjiang.entity.shop;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "integralGoods")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class IntegralGoods {//积分商品
    @Id
    @GeneratedValue(generator = "jpa-uuid")
    private String id;//编号

    @Column(name = "name")
    private String name; //积分商品名称

    @Column(name = "integral")
    private int integral; //所需积分

    @Column(name = "number")
    private int number;//剩余数量

    @Column(name = "imageUrl")
    private String imageUrl; //商品图片地址

    @Column
    @ElementCollection(targetClass = String.class)
    private List<String> swiperImgs; //商品轮播图图片地址

    @Column
    @ElementCollection(targetClass = String.class)
    private List<String> detailImgs; //商品详情图片地址

    public IntegralGoods() {
    }

    public IntegralGoods(String name, int integral, int number, String imageUrl, List<String> swiperImgs, List<String> detailImgs) {
        this.name = name;
        this.integral = integral;
        this.number = number;
        this.imageUrl = imageUrl;
        this.swiperImgs = swiperImgs;
        this.detailImgs = detailImgs;
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

    public int getIntegral() {
        return integral;
    }

    public void setIntegral(int integral) {
        this.integral = integral;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
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
}