/**
 * Created by zxp on 2018/5/9.
 */
//登录信息验证
$(function () {
  if (location.href.indexOf("login.html") != -1) {
    return;
  }
  $.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      if (data.error === 400) {
        location.href = "login.html";
      }
    }
  })
})

$(function () {
  NProgress.configure({showSpinner: false});
  $(document).ajaxStart(function () {
    NProgress.start();
  })
  $(document).ajaxStop(function () {
    NProgress.done();
  })
})


//侧边栏功能显示隐藏
$(function () {
  $("#category").click(function () {
    $(".second-list").stop().slideToggle();
  })
  
  $(".top-navbar .icon-menu").click(function () {
    $(".aside").toggleClass("menuhide");
    $(".main").toggleClass("grow");
    $('.main .top-navbar').toggleClass("grow");
  })
})

//登出功能
$(function () {
  $(".top-navbar .icon-logout").click(function () {
    console.log(1);
    $.ajax({
      url: "/employee/employeeLogout",
      type: 'get',
      dataType: 'json',
      success: function (data) {
        if (data.success) {
          location.href = "login.html";
        }
      }
    })
  })
})