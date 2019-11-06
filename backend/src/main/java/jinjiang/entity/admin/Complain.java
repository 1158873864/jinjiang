package jinjiang.entity.admin;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "complain")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class Complain {
	@Id
	@GeneratedValue(generator = "jpa-uuid")
	private String id;//编号

	@Column(name = "content")
	private String content;//内容

	@Column(name = "time")
	private String time; //发布时间

	@Column(name = "username")
	private String username; //投诉者用户名

	public Complain() {
	}

	public Complain(String content, String time, String username) {
		this.content = content;
		this.time = time;
		this.username = username;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
