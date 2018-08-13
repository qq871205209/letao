$(function(){
  //需求分析
  /**
   * 1.默认渲染一级分类和二级分类
   *  1.1先获取一级分类数据
   *  1.2渲染左侧分类
   *  1.3同时获取第一个一级分类,并根据这个分类去查询二级分类的数据
   *  1.4渲染右侧分类
   * 2.点击左侧分类  进行右侧分类数据的渲染
   *  2.1.左侧栏的切换
   *  2.2.进行右侧栏的渲染
   *  2.3.进行右侧栏渲染的时候要注意:①有没有数据②图片不正确
   */
  new App ();
});
/**构造函数
 * 页面程序App
 */
var App = function () {
  this.$top = $('.lt_cateLeft');
  this.$second = $('.lt_cateRight');
  //对象属性
  this.init();
};
/**
 * 原型方法
 */
App.prototype = {
  //初始化  入口函数
  init:function(){
    this.rander();
    this.bindEvent();
  },
  //渲染
  rander:function(data){
    var that = this;
    that.randerTop(function(data){
      that.randerSecond(data.rows[0].id);
    });
  },
  //渲染一级分类
  randerTop:function(callback){
    var that = this;
    //获取数据
    $.ajax({
      type:'get',
      url:'/category/queryTopCategory',
      data:'',
      dataType:'json',
      success:function(data){
        //模板渲染
        that.$top.html(template('top',data));
        callback && callback(data);
      }
    });
    //进行渲染
  },
  //渲染二级分类
  randerSecond:function (topId){
    var that = this;
    //获取数据
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:topId},
      dataType:'json',
      success:function(data){
        !data.rows.length && mui.toast('没有品牌数据');
        //模板渲染
        that.$second.html(template('second',data));
      }
    });
    //渲染模板
  },
  //绑定事件
  bindEvent:function () {
    //左侧点击事件    移动端的点击事件是tap
    var that = this;
    that.$top.on('tap','li a',function(){
      //点击后修改左侧的样式
      $(this).parent('li').addClass('active').siblings('li').removeClass('active');
      that.randerSecond(this.dataset.id);
    });
  }

};
