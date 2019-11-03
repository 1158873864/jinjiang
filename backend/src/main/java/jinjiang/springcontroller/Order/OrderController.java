package jinjiang.springcontroller.Order;


import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import jinjiang.blservice.account.UserBlService;
import jinjiang.blservice.order.OrderBlService;
import jinjiang.entity.account.User;
import jinjiang.entity.order.Order;
import jinjiang.exception.NotExistException;
import jinjiang.response.Result;
import jinjiang.response.ResultGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderBlService orderBlService;

    @Autowired
    public OrderController(OrderBlService orderBlService) {
        this.orderBlService = orderBlService;
    }

    @ApiOperation(value = "新增订单", notes = "新增订单")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Result> addUser(@Valid @RequestBody Order order) throws NotExistException {
        orderBlService.addOrder(order);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "删除订单", notes = "删除订单")
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> deleteUser(@RequestParam("id") String id) throws NotExistException {
        orderBlService.deleteOrder(id);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }

    @ApiOperation(value = "修改订单", notes = "修改订单")
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<Result> updateUser(@Valid @RequestBody Order order) throws NotExistException {
        orderBlService.updateOrder(order);
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(),HttpStatus.OK);
    }

    @ApiOperation(value = "根据id查找订单", notes = "")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "id", required = true, dataType = "String")
    })
    @RequestMapping(value = "/find/id", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> findUserById(@RequestParam("id") String id) throws NotExistException {
        Map<String, Object> result = new HashMap<>();
        result.put("items",orderBlService.findById(id));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }


    @ApiOperation(value = "所有订单", notes = "")
    @RequestMapping(value = "/find/all", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Result> getAllUser(Pageable pageable) {
        Map<String, Object> result = new HashMap<>();
        result.put("items",orderBlService.findAll(pageable));
        return new ResponseEntity<>(ResultGenerator.genSuccessResult(result),HttpStatus.OK);
    }
}
