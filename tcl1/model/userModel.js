/*
* 该模块主要负责创建学生模型
* */
let mongoose = require('mongoose')
//操作数据库
//1.引入约束Schema
let Schema = mongoose.Schema

//2. -------- 创建一个约束对象实例
let userSchema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  nick_name:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now()
  },
  jifen:{
    type:Number,
    default: Math.floor(Math.random()*(100 - 200) + 200),
  },
  enable_flag:{
    type:String,
    default:'Y'
  },
  touxiangurl:{
    type:String,
    default:'/images/init.jpg'
  },
  gouwuche:[
    {
      img:{
        type:String,
        default:'',
      },
      miaoshu:{
        type:String,
        default:'',
      },
      danjia:{
        type:Number,
      },
      shuliang:{
        type:Number,
        default:1,
      },
      xiaoji:{
        type:Number
      },
      zongshuliang:Number,
    zongjia:Number
    }
  ],
  shoucang:[{
    img:String,
    miaoshu:String,
    danjia:Number,
  }],
  dingdan:[{
      shijian:{type:String,default:'qqq'},
      shifujine:Number,
      name:String,
      tel:Number,
      add:String,
      yuanjia:Number,
      jifen:{type:Number,default:0},
      shangpin:Array,

  }]
})

/*3. ------- 创建模型对象
第一个参数与数据库中的集合相对应，第二个参数指定约束对象实例
只要生成了模型对象，就可以进行数据的：增删改查*/
module.exports = mongoose.model('users',userSchema)

