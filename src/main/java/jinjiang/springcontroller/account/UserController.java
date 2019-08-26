package jinjiang.springcontroller.account;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jinjiang.blservice.account.UserBlService;
import jinjiang.entity.account.Level;
import jinjiang.entity.account.User;
import jinjiang.exception.NotExistException;
import jinjiang.response.Result;
import jinjiang.response.ResultCode;
import jinjiang.response.ResultGenerator;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserBlService userBlService;

    @Autowired
    public UserController(UserBlService userBlService) {
        this.userBlService = userBlService;
    }

    @ApiOperation(value = "新增用户", notes = "新增用户")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Result> addUser(@Valid @RequestBody User user) throws NotExistException {
        userBlService.addUser(user);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }

    @ApiOperation(value = "删除用户", notes = "删除用户")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> deleteUser(@RequestParam("id") String id) throws NotExistException {
        userBlService.deleteUser(id);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }

    @ApiOperation(value = "修改用户", notes = "修改用户")
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<Result> updateUser(@Valid @RequestBody User user) throws NotExistException {
        userBlService.updateUser(user);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }

    @ApiOperation(value = "根据id查找用户", notes = "")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "id", required = true, dataType = "String")
    })
    @RequestMapping(value = "/find/id", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserById(@RequestParam("id") String id) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("user",userBlService.findById(id));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据身份查找用户", notes = "")
    @RequestMapping(value = "/find/identity", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByIdentity(@RequestParam("identity") String identity) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("user",userBlService.findByIdentity(identity));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据门店查找用户", notes = "")
    @RequestMapping(value = "/find/shopId", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByShopId(@RequestParam("shopId") String shopId) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("user",userBlService.findByShopId(shopId));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据门店和身份查找用户", notes = "")
    @RequestMapping(value = "/find/identity-shopId", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByIdentityAndShopId(@RequestParam("identity") String identity,@RequestParam("shopId") String shopId) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("user",userBlService.findIdentityAndShop(identity,shopId));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "所有用户", notes = "")
    @RequestMapping(value = "/find/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> getAllUser() {
        Map<String, Object> result = new HashMap<>();
        result.put("users",userBlService.findAll());
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }



    @ApiOperation(value = "修改默认地址", notes = "")
    @RequestMapping(value = "/setDefaultAddress", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> setDefaultAddress(@RequestParam("userId")String userId,@RequestParam("addressId")String addressId) throws NotExistException {
        userBlService.setDefaultAddress(userId,addressId);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }
}
