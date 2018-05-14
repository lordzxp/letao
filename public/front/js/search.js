/**
 * Created by zxp on 2018/5/14.
 */
$(function () {
  render();
  //搜索按钮事件
  $(".lt-search .btn-search").click(function () {
    var info = $(".lt-search input").val();
    if (info.trim()) {
      var arr = localStorage.getItem("lt-history") || '[]';
      arr = JSON.parse(arr);
      var index = arr.indexOf(info);
      if (index > -1) {
        arr.splice(index, 1);
      }
      if (arr.length > 10) {
        arr.pop();
      }
      arr.unshift(info);
      localStorage.setItem("lt-history", JSON.stringify(arr));
      render();
      $(".lt-search input").val('');
      location.href = "productList.html?key=" + info + "";
    } else {
      mui.toast("请输入查询条件");
    }
  })
  
  //渲染
  function render() {
    var arr = localStorage.getItem("lt-history") || '[]';
    arr = JSON.parse(arr);
    $(".lt-history").html(template("historyTpl", {arr: arr}));
  }

//  清空
  $(".lt-history").on('click', "#clearHistory", function () {
    mui.confirm("确定删除记录吗", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        localStorage.removeItem("lt-history");
        render();
      }
    })
  })
  $(".lt-history").on('click', '.remove-one', function () {
    var that = this;
    mui.confirm("确定删除记录么", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        var arr = localStorage.getItem("lt-history") || "[]";
        arr = JSON.parse(arr);
        arr.splice($(that).data('index'), 1);
        localStorage.setItem("lt-history", JSON.stringify(arr));
        render();
      }
    });
  })
  
  $(".lt-history").on("click", "li", function () {
    location.href = "productList.html?key=" + $(this).find("span").text() + "";
  })
})
