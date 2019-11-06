package jinjiang.bl.shop;

import jinjiang.blservice.shop.ShopBlService;
import jinjiang.dao.admin.DeductDao;
import jinjiang.dao.shop.ShopDao;
import jinjiang.entity.admin.Deduct;
import jinjiang.entity.shop.Shop;
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
public class ShopBlServiceImpl implements ShopBlService {
    private final ShopDao shopdao;
    private final DeductDao deductDao;

    @Autowired
    public ShopBlServiceImpl(ShopDao shopdao, DeductDao deductDao){
        this.shopdao=shopdao;
        this.deductDao = deductDao;
    }

    @Override
    public void addShop(Shop shop) {
        String id=shopdao.save(shop).getId();
        Deduct deduct=new Deduct(0.3,0.3,0.3,0.1,id);
        deductDao.save(deduct);
    }

    @Override
    public void deleteShop(String id) throws NotExistException {
        Optional<Shop> shop=shopdao.findById(id);
        if (shop.isPresent()){
           shopdao.deleteById(id);
        }else {
            throw new NotExistException("shop ID", id);
        }
    }

    @Override
    public void updateShop(Shop shop) throws NotExistException {
        Optional<Shop> shopone=shopdao.findById(shop.getId());
        if (shopone.isPresent()){
           Shop shopinfo=shopone.get();
            shopinfo.setBalance(shop.getBalance());
            shopinfo.setCity(shop.getCity());
            shopinfo.setDetail(shop.getDetail());
            shopinfo.setDistrict(shop.getDistrict());
            shopinfo.setFaceUrl(shop.getFaceUrl());
            shopinfo.setMobilePhone(shop.getMobilePhone());
            shopinfo.setName(shop.getName());
            shopinfo.setProvince(shop.getProvince());
            shopinfo.setShowUrl(shop.getShowUrl());
            shopinfo.setWorkTime(shop.getWorkTime());
            shopdao.save(shopinfo);
        }else {
            throw new NotExistException("shop ID", shop.getId());
        }


    }

    @Override
    public Shop findById(String id) throws NotExistException {
       Optional<Shop> shop=shopdao.findById(id);
       if (shop.isPresent()){
           return shop.get();
       }else {
           throw new NotExistException("shop ID", id);
       }

    }

    @Override
    public Page<Shop> findAll(Pageable pageable) {
        Page<Shop> shops=shopdao.findAll(pageable);
        System.out.println("shops===="+shops.getSize());
        return shops ;
    }

    @Override
    public Page<Shop> find(String query, Pageable pageable) {
        List<Shop> shops=shopdao.findAll();
        List<Shop> list=new ArrayList<>();
        for(Shop shop:shops){
            if(shop.getCity().indexOf(query)!=(-1)||shop.getDetail().indexOf(query)!=(-1)||shop.getDetail().indexOf(query)!=(-1)||shop.getName().indexOf(query)!=(-1)||shop.getMobilePhone().indexOf(query)!=(-1)||shop.getId().indexOf(query)!=(-1)){
                list.add(shop);
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
