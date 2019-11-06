package jinjiang.entity.recommend;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "recommend")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Recommend {
	@Id
	@GeneratedValue(generator = "jpa-uuid")
	private String id;//编号

	@Column(name = "referrer")
	private String referrer;//推荐人

	@Column(name = "user")
	private String user; //被推荐人

	@Column(name = "is")
	private boolean is; //是否推荐成功

	public Recommend() {
	}

	public Recommend(String referrer, String user, boolean is) {
		this.referrer = referrer;
		this.user = user;
		this.is = is;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getReferrer() {
		return referrer;
	}

	public void setReferrer(String referrer) {
		this.referrer = referrer;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public boolean isIs() {
		return is;
	}

	public void setIs(boolean is) {
		this.is = is;
	}
}
