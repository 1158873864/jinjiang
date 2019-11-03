import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.perms判断是否与当前用户权限匹配
 * @param perms
 * @param route
 */
function hasPermission(perms, route) {
  console.log(perms,route,'--------------------------------------');
  console.log(route.meta,'--------------------ooooooooooooooo-------------');
  if (route.meta && route.meta.perms) {
    console.log("111111111111111111111111111111111111",route.meta.perms)
    return perms.some(perm => route.meta.perms.includes(perm))
  } else {
    console.log("2222222222222222",route)
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param perms
 */
function filterAsyncRouter(routes, perms) {
  const res = []

  routes.forEach(route => {

    const tmp = { ...route }
  /*  if (hasPermission(perms, tmp)) {
      res.push(tmp)
    }*/
    console.log("---------------------temp是啥----------------------,",tmp)
    
    if (tmp.children) {
      tmp.children = filterAsyncRouter(tmp.children, perms)
      
     if (tmp.children && tmp.children.length > 0&&hasPermission(perms, tmp.children)) {
        console.log('push的有父子节点的数据')
        res.push(tmp)
      }
    } else {
      if (hasPermission(perms, tmp)) {
      //  console.log("---------------------temp----------------------,",hasPermission(perms, tmp))
        console.log('push所有二级菜单',tmp)
        res.push(tmp)
      }
    }
  })
  console.log('最后的res',res)
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
 
     //  const { perms,level } = data
       const perms = data.data.perms
       let level  = data.data.level
       console.log(level,'data66',data)
        console.log(asyncRouterMap,data,'data77',perms.includes('shop*'),perms)
        let accessedRouters
        //管理员 权限
        if (perms.includes('*')) {
          //管理员 去除缴纳保证金页面和vr
          accessedRouters = asyncRouterMap.filter(item => {
            return item.path!='/money'&&item.path!='/vr'&&item.path!='/chat'
          })
          console.log(accessedRouters,'管理员')
        }else if(perms.includes('shop')){//所有商家的菜单权限
          //-1为普通会员 只展示缴费页面
            if(level==-1){
              accessedRouters= asyncRouterMap.filter(item => {
                return item.path=='/money'
                
              })
            }else if(level==2){
       //金牌 开放VR直播功能
              accessedRouters= asyncRouterMap.filter(item => {
                return item.path == '/goods'|| item.path =="*"|| item.path =="/shopinfo" || item.path =="/shopmanage"
                ||item.path=='/promotion'||item.path=='/goodsEdit'||item.path=='/myorder'||item.path=='/shopnews'||item.path=='/money'
                ||item.path=='/vr'||item.path=='/shopapply'||item.path=='/order'||item.path=='/chat'
              })
            }else{
              accessedRouters= asyncRouterMap.filter(item => {
                return item.path == '/goods'|| item.path =="*"|| item.path =="/shopinfo" || item.path =="/shopmanage"
                ||item.path=='/promotion'||item.path=='/goodsEdit'||item.path=='/myorder'||item.path=='/shopnews'||item.path=='/money'
                ||item.path=='/shopapply'||item.path=='/order'||item.path=='/chat'
              })
            }     
           

        
          console.log(accessedRouters,'78998744')
         
          accessedRouters = filterAsyncRouter(accessedRouters, perms)
        } else if(perms.includes('dist')){//所有门店

          accessedRouters= asyncRouterMap.filter(item => {
            return item.path =="*"|| item.path =="/distShop"
         
           
          })
          accessedRouters.forEach(item=>{
           // item.
            if(item.children!=undefined&&item.children.length>0){
              item.children.forEach(items=>{
                //隐藏直播间页面
                if(items.name=='shopLive'||items.name=='goodsComment'){
                  items.hidden = true
                }
              })
            }
          })
          console.log('dist',accessedRouters)
        }else {
          console.log(asyncRouterMap,asyncRouterMap.length,'递归开始前',perms,this.store)
          accessedRouters = filterAsyncRouter(asyncRouterMap, perms)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
