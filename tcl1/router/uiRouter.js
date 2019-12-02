/*
* 该模块是UI路由器模块，用于管理UI路由，以后配置新页面，在这里定义路由即可
* */
let {Router} = require('express')
let cookieParser = require('cookie-parser')
//引入用户模型
let userModel = require('../model/userModel')
//引入 空调模型
let airConditioner = require('../model/airConditioner')
let firstGoods = require('../model/firstGoods')
let integralMall = require('../model/integralMall')
let bigNews = require('../model/bigNews')
let formidable = require('formidable')
const path = require('path')
let fs = require('fs')

let router = new Router()

let {resolve} = require('path')
router.use(cookieParser())


//UI路由--登录
router.get('/login', (request, response) => {
    //let filePath = resolve(__dirname,'../public/login.html')
    //response.sendFile(filePath)
    const {email} = request.query
    response.render('login', {errMsg: {email}})
})

//UI路由--注册
router.get('/register', (request, response) => {
    //let filePath = resolve(__dirname,'../public/register.html')
    //response.sendFile(filePath)
    response.render('register', {errMsg: {}})
})
//登录后首页
router.get('/loginidx', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        let jieguo = await userModel.findOne({_id: _id})
        firstGoods.find().limit(6).exec(function (err, data) {
            var a = data
            firstGoods.find().limit(6).skip(6).exec(function (err, data) {
                var b = data
                firstGoods.find().limit(6).skip(12).exec(function (err, data) {
                    var c = data
                    firstGoods.find().limit(6).skip(18).exec(function (err, data) {
                        var d = data
                        firstGoods.find().limit(6).skip(24).exec(function (err, data) {
                            var e = data
                            firstGoods.find().limit(6).skip(30).exec(function (err, data) {
                                var f = data
                                firstGoods.find().limit(6).skip(36).exec(function (err, data) {
                                    var g = data
                                    firstGoods.find().limit(4).skip(42).exec(function (err, data) {
                                        var h = data
                                        response.render('second', {a, b, c, d, e, f, g, h, jieguo})
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    } else {
        response.redirect('/login')
    }
})
//用户体验中心
router.get('/userexp', async (request, response) => {

    const {_id} = request.cookies
    var a = _id

    console.log(typeof a, a)
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        response.render('tcl', {jieguo, a})
        return
    } else {
        response.render('tcl', {a})
    }


})
router.get('/userexpIndex', async (request, response) => {
    const {_id} = request.cookies
    var a = _id
    console.log(typeof a, a)
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        response.render('userexpIndex', {jieguo, a})
        return
    } else {
        response.render('userexpIndex', {a})
    }
})
router.get('/d4', (req, res) => {
    res.render('d4', {
        expenditure: 4000,
        income: 5000,
        list: [{
            name: '【公告】签到规则新变化',
            desc2: "火",
            desc: '积分中心  4小时-铁粉 置顶',
            src: 'http://avatar.user.tcl.com/100710404_1500345315187?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',

        }, {
            name: '【铁粉招募】TCL大屏发布会',
            desc2: "火",
            desc1: '-[回帖奖励415]',
            desc: '铁粉活动   昨天15：53-铁粉活动',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',

        }, {
            name: '5.17#说说快递那些事#',
            desc2: "火", desc1: '-[回帖奖励45]',
            desc: '铁分活动 半小时前-铁粉杂谈',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',
        }, {
            name: '5.20#假如你会飞#',
            desc1: '-[回帖奖励45]',
            desc: '铁分活动 3天前-铁粉杂谈',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',

        }, {
            name: '6.5#高考加油#', desc1: '-[回帖奖励45]',
            desc2: "火", desc: '铁分活动 3天前-铁粉杂谈',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',
        }, {
            name: '5.20#说说独处哪些事#', desc1: '-[回帖奖励45]',
            desc: '铁分活动 3天前-铁粉杂谈',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',
        }, {
            name: '6.14#说说父亲节哪些事#', desc1: '-[回帖奖励45]',
            desc2: "火", desc: '铁分活动 3天前-铁粉杂谈',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',
        }, {
            name: '4.28#说说剧透哪些事#', desc1: '-[回帖奖励45]',
            desc2: "火", desc: '铁分活动 5天前-铁粉杂谈',
            src: 'http://avatar.user.tcl.com/100700037_1500023470555?imageView2/1/w/180/h/180/format/jpg/q/49|imageslim',

        }]
    })
})
router.get('/duihuan', async (request, response) => {
    const {_id} = request.cookies
    var a = _id
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        response.render('roll', {jieguo, a})
        return
    } else {
        response.render('roll', {a})
    }

})

//积分商城
router.get('/IntegralMall', async (request, response) => {
    const {_id} = request.cookies
    var a = _id
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        integralMall.find().limit(4).exec(function (err, data) {
            var mall1 = data
            integralMall.find().limit(4).skip(4).exec(function (err, data) {
                var mall2 = data
                integralMall.find().limit(4).skip(8).exec(function (err, data) {
                    var mall3 = data
                    integralMall.find().limit(4).skip(12).exec(function (err, data) {
                        var mall4 = data
                        response.render('integralMall', {mall1, mall2, mall3, mall4, jieguo, a})
                    })
                })
            })
        })
        return
    } else {
        integralMall.find().limit(4).exec(function (err, data) {
            var mall1 = data
            integralMall.find().limit(4).skip(4).exec(function (err, data) {
                var mall2 = data
                integralMall.find().limit(4).skip(8).exec(function (err, data) {
                    var mall3 = data
                    integralMall.find().limit(4).skip(12).exec(function (err, data) {
                        var mall4 = data
                        response.render('integralMall', {mall1, mall2, mall3, mall4, a})
                    })
                })
            })
        })
    }
})
router.get('/question', async (request, response) => {
    const {_id} = request.cookies
    var a = _id
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        response.render('question', {jieguo, a})
        return
    } else {
        response.render('question', {a})
    }
})
//新闻
router.get('/news', async (request, response) => {
    const {_id} = request.cookies
    var a = _id

    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        response.render('news', {jieguo, a})
        return
    } else {
        response.render('news', {a})
    }
})
router.get('/bigNews', async (request, response) => {
    const {_id} = request.cookies
    var a = _id
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        bigNews.find().limit(5).exec((err, data) => {
            response.render('bigNews', {data, jieguo, a})
        })
        return
    } else {
        bigNews.find().limit(5).exec((err, data) => {
            response.render('bigNews', {data, a})
        })
    }

})
router.get('/newsContent/:id', async (request, response) => {
    const {_id} = request.cookies
    var a = _id
    if (a != '0') {
        let jieguo = await userModel.findOne({_id: _id})
        let b = await bigNews.findOne({_id: request.params.id})
        response.render('newsContent', {b, jieguo, a})
        return
    } else {
        let b = await bigNews.findOne({_id: request.params.id})
        response.render('newsContent', {b, a})
    }


})
//空调列表展示
router.get('/usercenter/airRules', (request, response) => {
    if (request.query.price == 12999) {
        airConditioner.find({price: {$lte: 2999}}, function (err, data) {
            response.send(data)
        })
    }
    if (request.query.price == 34999) {
        airConditioner.find({price: {$lte: 4999, $gte: 3000}}, function (err, data) {
            response.send(data)
        })
    }
    if (request.query.price == 56999) {
        airConditioner.find({price: {$lte: 6999, $gte: 5000}}, function (err, data) {
            response.send(data)
        })
    }
    if (request.query.price == 78999) {
        airConditioner.find({price: {$lte: 8999, $gte: 7000}}, function (err, data) {
            response.send(data)
        })
    }
    if (request.query.price == 9000) {
        airConditioner.find({price: {$gte: 9000}}, function (err, data) {
            response.send(data)
        })
    }
    if (request.query.price == 'all') {
        airConditioner.find().limit(6).exec((err, data) => {
            response.send(data)
        })
    }
    if (request.query.pishu == 'yipi') {
        airConditioner.find({pishu: 1}, (err, data) => {
            response.send(data)
        })
    }
    if (request.query.pishu == 'erpi') {
        airConditioner.find({pishu: 2}, (err, data) => {
            response.send(data)
        })
    }
    if (request.query.pishu == 'sanpi') {
        airConditioner.find({pishu: 3}, (err, data) => {
            response.send(data)
        })
    }
    if (request.query.pishu == 'allpi') {
        airConditioner.find({}, (err, data) => {
            response.send(data)

        })
    }
    if (request.query.bianpin == 'bianpin') {
        airConditioner.find({bianpin: '变频'}, (err, data) => {
            response.send(data)
        })
    }
    if (request.query.bianpin == 'dingpin') {
        airConditioner.find({bianpin: '定频'}, (err, data) => {
            response.send(data)
        })
    }
    if (request.query.bianpin == 'allbian') {
        airConditioner.find().limit(6).exec((err, data) => {
            response.send(data)
        })
    }
})
router.get('/usercenter/airConditioner', async (request, response) => {
    const {_id} = request.cookies
    let jieguo = await userModel.findOne({_id: _id})
    airConditioner.find().limit(6).exec((err, data) => {
        //console.log(data)
        response.render('airConditioner', {data, jieguo})
    })
})
router.get('/usercenter/airConditioner/:page', async (request, response) => {
    const {_id} = request.cookies
    let jieguo = await userModel.findOne({_id: _id})
    if (request.params.page == 1) {
        airConditioner.find().limit(6).exec((err, data) => {
            response.render('airConditioner', {data, jieguo})
        })
    }
    if (request.params.page == 2) {
        airConditioner.find().limit(3).skip(6).exec((err, data) => {
            response.render('airConditioner2', {data, jieguo})
        })
    }
    if (request.params.page == 'rising') {
        airConditioner.find().sort("price").limit(6).exec((err, data) => {
            response.render('airConditioner', {data, jieguo})
        })
    }
    if (request.params.page == 'falling') {
        airConditioner.find().sort("-price").limit(6).exec((err, data) => {
            response.render('airConditioner', {data, jieguo})
        })
    }

    //response.send('123')
})

//搜索
router.get('/search/:id', async (request, response) => {
    const {_id} = request.cookies
    var searchName = request.params.id
    let jieguo = await userModel.findOne({_id: _id})
    let data = await firstGoods.find({})
    var arr = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].title.indexOf(searchName) != -1) {
            arr.push(data[i])
        }
    }
    response.render('search', {jieguo, arr, searchName})
})
router.get('/pricesousuo', async (request, response) => {
    const {_id} = request.cookies
    let jieguo = await userModel.findOne({_id: _id})
    var searchName = request.query.lei
    console.log(request.query)
    var arr = []
    firstGoods.find({price: {$lte: Number(request.query.zhi), $gte: Number(request.query.qi)}}, function (err, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].title.indexOf(searchName) != -1) {
                arr.push(data[i])
            }
        }
        response.render('search', {jieguo, arr, searchName})
    })
})

//UI路由--个人中心 登陆成功，点击昵称，进入个人中心界面的路由
router.get('/usercenter', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        var jieguo = await userModel.findOne({_id})

        if (jieguo) {
            response.render('usercenter', {jieguo})
        } else {
            console.log('用户非法修改了cookie')
            response.redirect('/login')
        }
    } else {
        response.redirect('/')
    }
})
//修改头像，渲个人中心页面的路由
router.post('/tijiao', (request, response) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/暂存')
    console.log(form.uploadDir, '******************************************')
    form.parse(request, (err, fields, files) => {
        if (!err) {
            //上传的文件名
            fs.rename(files.wenjian.path, path.join(__dirname, '../public/images', files.wenjian.name), async (err) => {
                if (!err) {
                    var a = request.cookies
                    console.log(a)

                    userModel.updateOne({_id: a._id}, {$set: {touxiangurl: `/images/${files.wenjian.name}`}}, function (err, data) {
                        console.log(data)
                    })
                    let jieguo = await userModel.findOne({_id: a._id})
                    response.render('usercenter', {jieguo})
                } else {
                    console.log(new Error(err))
                }
            })
        } else {
            console.log(new Error(err))
        }
    })
})
router.get('/baocuntouxiang',(request,response)=>{

    var a = request.query.touxiang
    var url = `./public${a.split('3000')[1]}`
    response.download(`${url}`)
})
//修改个人中心的昵称的路由
router.get("/changeNick_name/:newName", async (request, response) => {
    var a = request.cookies
    userModel.updateOne({_id: a._id}, {$set: {nick_name: request.params.newName}}, function (err, data) {
        console.log(data, '修改昵称的数据')
    })
    let jieguo = await userModel.findOne({_id: a._id})

    response.render('usercenter', {jieguo})
})
//跳转到商品详情页界面的路由
router.get('/xiangqing/:id', (request, response) => {

    firstGoods.find({biaoshi: request.params.id}, (err, data) => {
        var a = data
        console.log(a)
        response.render('shoppingbuy', {a})
    })

})
router.get('/xiangqing1/:id', (request, response) => {

    firstGoods.find({biaoshi: request.params.id}, async (err, data) => {
        var a = data
        const {_id} = request.cookies
        let jieguo = await userModel.findOne({_id: _id})
        response.render('shoppingbuy1', {a, jieguo})
    })

})
//点击购物车渲染到购物车页面的路由
router.get('/gouwuche', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        let jieguo = await userModel.findOne({_id: _id})
        if (jieguo.gouwuche.length == 0) {
            response.render('gouwuchenull', {jieguo})
            return
        }
        var zongshuliang = 0
        var zongjia = 0
        var xiaoji = []
        var isshoucang = []
        for (var i = 0; i < jieguo.gouwuche.length; i++) {
            zongshuliang = Number(jieguo.gouwuche[i].shuliang - 0) + Number(zongshuliang - 0)
            zongjia = Number(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia - 0) + Number(zongjia - 0)
            xiaoji.push(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia)
            var t = 0
            for (var j = 0; j < jieguo.shoucang.length; j++) {
                if (jieguo.gouwuche[i].img == jieguo.shoucang[j].img) {
                    t = 1
                }
            }
            if (t == 1) {
                isshoucang.push('red')
            } else if (t == 0) {
                isshoucang.push('#000')
            }
        }
        var aaa = [zongshuliang, zongjia]
        response.render('gouwuche', {jieguo, aaa, xiaoji, isshoucang})
    } else {
        response.redirect('/login')
    }
})
//点击购物车界面的添加或减少商品数量时同步到数据库重新刷新购物车界面的路由
router.get('/gouwuchexiugai', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        await userModel.findOne({_id: _id}, function (err, userModel) {
            for (var i = 0; i < userModel.gouwuche.length; i++) {
                userModel.gouwuche[request.query.diji].shuliang = request.query.shuliang
                userModel.save(function (err) {
                    console.log('修改成功')
                })
            }
        })
        let jieguo = await userModel.findOne({_id: _id})
        var zongshuliang = 0
        var zongjia = 0
        var xiaoji = []
        var isshoucang = []
        for (var i = 0; i < jieguo.gouwuche.length; i++) {
            zongshuliang = Number(jieguo.gouwuche[i].shuliang - 0) + Number(zongshuliang - 0)
            zongjia = Number(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia - 0) + Number(zongjia - 0)
            xiaoji.push(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia)
            var t = 0

            for (var j = 0; j < jieguo.shoucang.length; j++) {
                if (jieguo.gouwuche[i].img == jieguo.shoucang[j].img) {
                    t = 1
                }
            }
            if (t == 1) {
                isshoucang.push('red')
            } else if (t == 0) {
                isshoucang.push('#000')
            }
        }
        var aaa = [zongshuliang, zongjia]
        response.render('gouwuche', {jieguo, aaa, xiaoji, isshoucang})
    } else {
        request.redirect('/login')
    }
})
//点击详情页面的加入购物车按钮时的将商品添加到数据库的路由
router.get('/chazhao/:id', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        //通过id在表里查到对应的
        let shuju = await firstGoods.findOne({biaoshi: request.params.id})
        let jieguo = await userModel.findOne({_id: _id})
        for (var i = 0; i < jieguo.gouwuche.length; i++) {
            if (jieguo.gouwuche[i].img == shuju.src) {
                response.send('已经添加')
                return
            }
        }
        if (i == jieguo.gouwuche.length) {
            userModel.update({_id: _id}, {
                $push: {
                    gouwuche: {
                        img: shuju.src,
                        miaoshu: shuju.title,
                        danjia: shuju.price,
                        shuliang: 1,
                        xiaoji: shuju.price
                    }
                }
            }, (err, data) => {
                console.log(data)
            })
            response.send('添加购物车成功')
        }

    } else {
        response.redirect('/login')
    }
})
//逐条删除购物车的路由
router.get('/delshopping', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        await userModel.update({_id: _id}, {$pull: {gouwuche: {_id: request.query.xuhao}}}, function (err, data) {
            console.log(data, '*********从购物车删除')
        })
        let jieguo = await userModel.findOne({_id: _id})
        if (jieguo.gouwuche.length == 0) {
            response.render('gouwuchenull', {jieguo})
            return
        }
        var zongshuliang = 0
        var zongjia = 0
        var xiaoji = []
        var isshoucang = []
        for (var i = 0; i < jieguo.gouwuche.length; i++) {
            zongshuliang = Number(jieguo.gouwuche[i].shuliang - 0) + Number(zongshuliang - 0)
            zongjia = Number(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia - 0) + Number(zongjia - 0)
            xiaoji.push(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia)
            var t = 0
            for (var j = 0; j < jieguo.shoucang.length; j++) {
                if (jieguo.gouwuche[i].img == jieguo.shoucang[j].img) {
                    t = 1
                }
            }
            if (t == 1) {
                isshoucang.push('red')
            } else if (t == 0) {
                isshoucang.push('#000')
            }
        }
        var aaa = [zongshuliang, zongjia]
        response.render('gouwuche', {jieguo, aaa, xiaoji, isshoucang})
    } else {
        request.redirect('/login')
    }
})
//清空购物车的路由
router.get('/gouwuchenull', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        userModel.updateOne({_id: _id}, {$set: {gouwuche: []}}, function (err, data) {
            console.log(data, '**清空购物车')
        })
        let jieguo = await userModel.findOne({_id: _id})
        response.render('gouwuchenull', {jieguo})
    } else {
        response.redirect('/login')
    }

})
//点击收藏将商品加入到数据库中的路由
router.get('/addshoucang', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        let jieguo = await userModel.findOne({_id: _id})
        var a = jieguo.gouwuche[request.query.num]
        for (var i = 0; i < jieguo.shoucang.length; i++) {
            if (jieguo.shoucang[i].img == a.img) {
                response.send('你已经收藏了')
                return
            }
        }
        if (i == jieguo.shoucang.length) {
            userModel.update({_id: _id}, {
                $push: {
                    shoucang: {
                        img: a.img,
                        miaoshu: a.miaoshu,
                        danjia: a.danjia,
                    }
                }
            }, (err, data) => {
                console.log(data)
            })
            response.send('收藏成功')
        }
    } else {
        response.redirect('/login')
    }
})
//跳转到我的收藏界面的路由
router.get('/shoucangjiemian', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        let jieguo = await userModel.findOne({_id: _id})
        response.render('collection', {jieguo})
    } else {
        response.redirect('/login')
    }
})
//取消收藏的路由
router.get('/delshoucang/:id', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        await userModel.update({_id: _id}, {$pull: {shoucang: {_id: request.params.id}}}, function (err, data) {
            console.log(data, '*********318')
        })
        let jieguo = await userModel.findOne({_id: _id})
        response.render('collection', {jieguo})
    } else {
        response.redirect('/login')
    }

})
//点击购物车界面的提交订单跳转的订单界面的路由
router.get('/submitdingdan', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        let jieguo = await userModel.findOne({_id: _id})
        if (request.query.id != undefined) {
            var thing = request.query.id
            let shangpin = await firstGoods.findOne({biaoshi: Number(thing)})
            var tt = [{
                img: shangpin.src,
                miaoshu: shangpin.title,
                danjia: shangpin.price,
                shuliang: 1,
                xiaoji: shangpin.price
            }]
            var aaa = [1, shangpin.price]
            var xiaoji = [shangpin.price]
            response.render('dingdanmes', {jieguo, aaa, xiaoji, tt, thing})
            return
        } else {
            var zongshuliang = 0
            var zongjia = 0
            var xiaoji = []
            var isshoucang = []
            var thing = 'fixed'
            for (var i = 0; i < jieguo.gouwuche.length; i++) {
                zongshuliang = Number(jieguo.gouwuche[i].shuliang - 0) + Number(zongshuliang - 0)
                zongjia = Number(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia - 0) + Number(zongjia - 0)
                xiaoji.push(jieguo.gouwuche[i].shuliang * jieguo.gouwuche[i].danjia)
            }
            var tt = jieguo.gouwuche
            var aaa = [zongshuliang, zongjia]
            response.render('dingdanmes', {jieguo, aaa, xiaoji, tt, thing})
        }
    } else {
        response.redirect('login')
    }

})
//我的订单
router.get('/Mydingdan', async (request, response) => {
    const {_id} = request.cookies
    if (_id !== '0') {
        let aa = await userModel.findOne({_id: _id})
        if (request.query.class != 'fixed' && request.query.class != undefined) {
            let shangpin = await firstGoods.findOne({biaoshi: Number(request.query.class)})
            var p = [{
                img: shangpin.src,
                miaoshu: shangpin.title,
                danjia: shangpin.price,
                shuliang: 1,
            }]
            userModel.update({_id: _id}, {
                $push: {
                    dingdan: {
                        shijian: request.query.shijian,
                        shifujine: Number(request.query.shifujine),
                        name: request.query.xingming,
                        tel: Number(request.query.tel),
                        add: request.query.sheng + request.query.shi + request.query.qu,
                        yuanjia: Number(request.query.yuanjia),
                        jifen: Number(request.query.jifen),
                        shangpin: p,
                    }
                }
            }, function (err, data) {
                console.log(data)
            })
            let jieguo = await userModel.findOne({_id: _id})
            response.render('Mydingdan', {jieguo})
            return
        }

            userModel.update({_id: _id}, {
                $push: {
                    dingdan: {
                        shijian: request.query.shijian,
                        shifujine: Number(request.query.shifujine),
                        name: request.query.xingming,
                        tel: Number(request.query.tel),
                        add: request.query.sheng + request.query.shi + request.query.qu,
                        yuanjia: Number(request.query.yuanjia),
                        jifen: Number(request.query.jifen),
                        shangpin: aa.gouwuche,
                    }
                }
            }, function (err, data) {
                console.log(data)
            })
        if(request.query.class == 'fixed') {
            await userModel.updateOne({_id: _id}, {$set: {gouwuche: []}}, function (err, data) {
                console.log(data, '**清空购物车')
            })
        }
            let jieguo = await userModel.findOne({_id: _id})
            response.render('Mydingdan', {jieguo})


    } else {
        response.redirect('/login')
    }

})
//首页未登录状态下路由
router.get('/', (req, res) => {
    firstGoods.find().limit(6).exec(function (err, data) {
        var a = data
        firstGoods.find().limit(6).skip(6).exec(function (err, data) {
            var b = data
            firstGoods.find().limit(6).skip(12).exec(function (err, data) {
                var c = data
                firstGoods.find().limit(6).skip(18).exec(function (err, data) {
                    var d = data
                    firstGoods.find().limit(6).skip(24).exec(function (err, data) {
                        var e = data
                        firstGoods.find().limit(6).skip(30).exec(function (err, data) {
                            var f = data
                            firstGoods.find().limit(6).skip(36).exec(function (err, data) {
                                var g = data
                                firstGoods.find().limit(4).skip(42).exec(function (err, data) {
                                    var h = data
                                    res.render('first', {a, b, c, d, e, f, g, h})
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router
