package jinjiang.entity.account;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "level")
public class Level {//等级
    @Id
    private int id;//等级号

    @Column(name="name")
    private String name;//等级名称

    @Column(name="discount")
    private double discount;//折扣率

    @Column(name="url")
    private String url;//等级图标

    @Column(name="discountId")
    private String discountId;//该等级会员所能获得的优惠卷对应的id

    public Level() {
    }

    public Level(int id, String name, double discount, String url, String discountId) {
        this.id = id;
        this.name = name;
        this.discount = discount;
        this.url = url;
        this.discountId = discountId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDiscountId() {
        return discountId;
    }

    public void setDiscountId(String discountId) {
        this.discountId = discountId;
    }
}
