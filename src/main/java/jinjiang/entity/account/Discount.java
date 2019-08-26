package jinjiang.entity.account;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "level")
public class Discount {
    @Id
    @GeneratedValue(generator = "jpa-uuid")
    private String id;//编号

    @Column(name="satisfy")
    private double satisfy;//满多少

    @Column(name="off")
    private double off;//减多少

    @Column(name="startDate")
    private Date startDate;//开始日期

    @Column(name="endDate")
    private Date endDate;//结束日期

    public Discount() {
    }

    public Discount(double satisfy, double off, Date startDate, Date endDate) {
        this.satisfy = satisfy;
        this.off = off;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getSatisfy() {
        return satisfy;
    }

    public void setSatisfy(double satisfy) {
        this.satisfy = satisfy;
    }

    public double getOff() {
        return off;
    }

    public void setOff(double off) {
        this.off = off;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
