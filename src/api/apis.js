import axios from 'axios'//引入axios
axios.defaults.baseURL = 'http://127.0.0.1:5000'//
export const api_logon = (account, password) => axios.post('/users/checkLogin', { account, password })//登录接口
export const api_regist = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })//注册接口
export const api_acclist = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })//账户列表
export const api_deletOne = (id) => axios.get('/users/del', { params: { id } })//单个删除账户信息
export const api_deletSel = (ids) => axios.get('/users/batchdel', { params: { ids } })//批量删除
export const api_setAcc = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })//修改账号
export const api_testPwd = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })//密码验证
export const api_updataPwd = (newPwd, id) => axios.post("/users/editpwd", { newPwd, id })//更新当前账号的密码
export const api_token = (token) => axios.get("/users/checktoken", { params: { token } })//发送token接口
export const api_mySelf = (id) => axios.get("/users/accountinfo", { params: { id } })//获取管理员信息
export const api_upImg = (id) => axios.post("/users/avatar_upload", { id })//上传头像
export const api_getSort = (currentPage, pageSize) => axios.get("/goods/catelist", { params: { currentPage, pageSize } })//获取分类
export const api_shopSort = (cateName, state) => axios.post("/goods/addcate", { cateName, state })//添加分类
export const api_deletSort = (id) => axios.get("/goods/delcate", { params: { id } })//删除分类
//cateName是分类名字
export const api_setSort = (id, cateName, state) => axios.post("/goods/editcate", { id, cateName, state })//修改分类
export const api_querySort = () => axios.get("/goods/categories", { params: {} })//查询分类

//name商品名称
//category商品分类
//price商品价格
//imgUrl商品图片地址
//goodsDesc 商品描述
export const api_addShop = (name, category, price, imgUrl, goodsDesc) => axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc })//添加商品

// 获取商品列表
// currentPage 当前页码
// pageSize 每页条数
export const api_getGoodsList = (currentPage, pageSize) => axios.get("/goods/list", { params: { currentPage, pageSize } })//获取商品列表

//删除商品
export const api_delet_goods = (id) => axios.get("/goods/del", { params: { id } })//删除商品

//修改商品
//name:商品名称
//category:商品分类
//price : 商品价格
//imgUrl ：商品图片地址
//goodsDesc：商品描述
export const api_set_goods = (name, category, price, imgUrl, goodsDesc, id) => axios.post("/goods/edit", { name, category, price, imgUrl, goodsDesc, id })

//首页报表
export const api_home_echar = () => axios.get('/order/totaldata')


//获取订单列表  顺带查询
//currentPage:当前页码
//pageSize：每页条数
//orderNo：订单号
//consignee：收货人
//phone：手机号O
//orderState：订单状态
//date：时间字符串格式
export const api_getOrder = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/list', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })


//获取订单详情
export const api_watchData = (id) => axios.get("/order/detail", { params: { id } })//查看订单

//修改订单
// id,
// orderNo, 订单号
// orderTime, 下单时间
// phone,电话
// consignee,收货人
// deliverAddress，送货地址
// ,deliveryTime，送达时间
// remarks,备注
// orderAmount,订单金额
// orderState 订单状态
export const api_set_order = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post("/order/edit", { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

//店铺管理

export const api_runshop = () => axios.get("/shop/info");//获取店铺详情


// 店铺内容修改
export const api_shop_set = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) => axios.post("/shop/edit", { id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics })

//报表查询
export const api_query_data = (date) => axios.get('/order/ordertotal', { params: { date } })