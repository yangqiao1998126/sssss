//引入express框架
let express = require('express')
//引入数据库连接模块
let db = require('./db')

//引入UI路由器
let uiRouter = require('./router/uiRouter')
//引入业务路由
let businessRouter = require('./router/businessRouter')


//创建app服务对象
let app = express()
app.use(express.static('public'))
//配置模板引擎
app.set("view engine", "ejs");
//配置模板的存放目录
app.set("views", "./views")


//数据库连接成功后，注册路由
db.then(() => {
    //使用内置中间件用于获取post请求体参数
    app.use(express.urlencoded({extended: true}))

    //使用UI路由器中间件
    app.use(uiRouter)
    //使用业务路由
    app.use(businessRouter)
    app.use('/NoLoginNav', (req, res) => {
        res.render('NoLoginNav', {})
    })




}).catch((err) => {
    console.log('数据库连接失败', err)
})

//绑定端口监听
app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功了！！')
    else console.log(err)
})