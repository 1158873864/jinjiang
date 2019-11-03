package jinjiang.bl.admin;

import jinjiang.blservice.admin.AdminService;
import jinjiang.dao.account.AdminDao;
import jinjiang.entity.admin.Admin;
import jinjiang.exception.NotExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminBlServiceImpl  implements AdminService {
    private final AdminDao admindao;

    @Autowired
    public AdminBlServiceImpl(AdminDao admindaoone){
        this.admindao=admindaoone;
    }

    @Override
    public void addAdmin(Admin admin) {
         admindao.save(admin);
    }

    @Override
    public void deleteAdmin(String id) throws NotExistException {
       Optional<Admin> admin=admindao.findById(id);
       if (admin.isPresent()){
           admindao.deleteById(id);
       }else {
           throw new NotExistException("address ID", id);
       }
    }

    @Override
    public void updateAdmin(Admin admin) throws NotExistException {
        Optional<Admin> adminone=admindao.findById(admin.getId());
        if (adminone.isPresent()){
           Admin newAdmin=adminone.get();
            newAdmin.setDate(admin.getDate());
            newAdmin.setFace(admin.getFace());
            newAdmin.setLimits(admin.getLimits());
            newAdmin.setPassword(admin.getPassword());
            newAdmin.setUsername(admin.getUsername());
            admindao.save(newAdmin);
        }else {
            throw new NotExistException("address ID", admin.getId());
        }
    }

    @Override
    public Admin findById(String id) throws NotExistException {
        Optional<Admin> admin=admindao.findById(id);
        if (admin.isPresent()){
            return admin.get();
        }else {
            throw new NotExistException("address ID", id);
        }
    }

    @Override
    public Page<Admin> findAll(Pageable pageable) {
        return admindao.findAll(pageable);
    }

}
