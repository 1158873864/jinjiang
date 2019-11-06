package jinjiang.blservice.recommend;

import jinjiang.entity.admin.Culture;
import jinjiang.entity.recommend.Recommend;
import jinjiang.exception.NotExistException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecommendService {

    void addRecommend(Recommend recommend);

    void deleteRecommend(String id) throws NotExistException;

    void updateRecommend(Recommend recommend) throws NotExistException;

    Recommend findById(String id) throws NotExistException;

    Page<Recommend> findAll(Pageable pageable);

    Page<Recommend> find(String query, Pageable pageable);
}
