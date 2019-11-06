package jinjiang.dao.recommend;

import jinjiang.entity.recommend.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendDao extends JpaRepository<Recommend,String> {
}
