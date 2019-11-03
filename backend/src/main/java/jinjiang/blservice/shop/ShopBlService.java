package jinjiang.blservice.shop;

import jinjiang.entity.shop.Shop;
import jinjiang.exception.NotExistException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ShopBlService {
    void addShop(Shop shop);

    void deleteShop(String id) throws NotExistException;

    void updateShop(Shop shop) throws NotExistException;

    Shop findById(String id) throws NotExistException;

    Page<Shop> findAll(Pageable pageable);

    Page<Shop> find(String query,Pageable pageable);

}
