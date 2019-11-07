package jinjiang.springcontroller.account;

import io.swagger.annotations.*;
import jinjiang.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
        result.put("items",userBlService.findById(id));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据id查找用户", notes = "")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "openid", value = "openid", required = true, dataType = "String")
    })
    @RequestMapping(value = "/find/openid", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByOpenid(@RequestParam("openid") String openid) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.findByOpenid(openid));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据身份查找用户", notes = "")
    @RequestMapping(value = "/find/identity", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByIdentity(@RequestParam("identity") String identity, Pageable pageable) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.findByIdentity(identity,pageable));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "查找用户", notes = "")
    @RequestMapping(value = "/find/identity/query", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByIdentity(@RequestParam("identity") String identity, @RequestParam("query") String query, Pageable pageable) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.find(identity,query,pageable));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据门店查找用户", notes = "")
    @RequestMapping(value = "/find/shopId", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByShopId(@RequestParam("shopId") String shopId,Pageable pageable) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.findByShopId(shopId,pageable));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "根据门店和身份查找用户", notes = "")
    @RequestMapping(value = "/find/identity-shopId", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserByIdentityAndShopId(@RequestParam("identity") String identity,@RequestParam("shopId") String shopId,Pageable pageable) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.findIdentityAndShop(identity,shopId,pageable));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }

    @ApiOperation(value = "所有用户", notes = "")
    @RequestMapping(value = "/find/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> getAllUser(Pageable pageable) {
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.findAll(pageable));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }


    @ApiOperation(value = "修改默认地址", notes = "")
    @RequestMapping(value = "/setDefaultAddress", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> setDefaultAddress(@RequestParam("userId")String userId,@RequestParam("addressId")String addressId) throws NotExistException {
        userBlService.setDefaultAddress(userId,addressId);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }

    @ApiOperation(value = "小程序前端获取openid和session", notes = "小程序前端获取openid和session")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "jsCode", value = "微信小程序的jsCode", required = true, dataType = "String")
    })
    @RequestMapping(value = "/getOpenIdAndSessionKey", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Response> getOpenIdAndSessionKey(@RequestParam(name = "jsCode") String jsCode) {
        return new ResponseEntity<>(userBlService.getOpenIdAndSessionKey(jsCode), HttpStatus.OK);
    }

    @ApiOperation(value = "用户登录小程序", notes = "用户登录小程序")
    @RequestMapping(value = "/loginMyUser", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> loginMyUser(@RequestParam(name = "openid") String openid, @RequestParam(name = "username") String username, @RequestParam(name = "faceWxUrl") String faceWxUrl){
        Map<String, Object> result = new HashMap<>();
        result.put("items",userBlService.loginMyUser(openid,username,faceWxUrl));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }
}
