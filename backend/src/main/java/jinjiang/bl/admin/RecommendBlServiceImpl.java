package jinjiang.bl.admin;

import jinjiang.blservice.admin.CultureService;
import jinjiang.blservice.recommend.RecommendService;
import jinjiang.dao.admin.CultureDao;
import jinjiang.dao.recommend.RecommendDao;
import jinjiang.entity.admin.Culture;
import jinjiang.entity.recommend.Recommend;
import jinjiang.exception.NotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecommendBlServiceImpl implements RecommendService {
    private final RecommendDao recommendDao;

    @Autowired
    public RecommendBlServiceImpl(RecommendDao recommendDao){

        this.recommendDao = recommendDao;
    }

    @Override
    public void addRecommend(Recommend recommend) {
         recommendDao.save(recommend);
    }

    @Override
    public void deleteRecommend(String id) throws NotExistException {
       Optional<Recommend> optionalRecommend=recommendDao.findById(id);
       if (optionalRecommend.isPresent()){
           recommendDao.deleteById(id);
       }else {
           throw new NotExistException("address ID", id);
       }
    }

    @Override
    public void updateRecommend(Recommend recommend) throws NotExistException {
        Optional<Recommend> optionalRecommend=recommendDao.findById(recommend.getId());
        if (optionalRecommend.isPresent()){
           Recommend newRecommend=optionalRecommend.get();
           newRecommend.setIs(recommend.isIs());

        }else {
            throw new NotExistException("address ID", recommend.getId());
        }
    }

    @Override
    public Recommend findById(String id) throws NotExistException {
        Optional<Recommend> optionalRecommend=recommendDao.findById(id);
        if (optionalRecommend.isPresent()){
            return optionalRecommend.get();
        }else {
            throw new NotExistException("address ID", id);
        }
    }

    @Override
    public Page<Recommend> findAll(Pageable pageable) {
        return recommendDao.findAll(pageable);
    }


    @Override
    public Page<Recommend> find(String query, Pageable pageable) {
        List<Recommend> recommends=recommendDao.findAll();
        List<Recommend> list=new ArrayList<>();
        for(Recommend recommend:recommends){
            if(recommend.getReferrer().indexOf(query)!=(-1)||recommend.getUser().indexOf(query)!=(-1)||recommend.getId().indexOf(query)!=(-1)){
                list.add(recommend);
            }
        }
        return listConvertToPage(list,pageable);
    }

    public <T> Page<T> listConvertToPage(List<T> list, Pageable pageable) {
        int start = (int)pageable.getOffset();
        int end = (start + pageable.getPageSize()) > list.size() ? list.size() : ( start + pageable.getPageSize());
        return new PageImpl<T>(list.subList(start, end), pageable, list.size());
    }

}
