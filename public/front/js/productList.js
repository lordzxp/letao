/**
 * Created by zxp on 2018/5/14.
 */
$(function () {
  $(".lt-search input").val(getSearch('key'))
  render();
  function render() {
    var param = {};
    param.proName = $(".lt-search input").val();
    param.page = 1;
    param.pageSize = 100;
    if ($(".current").length > 0) {
      var type = $(".current").data("type");
      var val = $(".current").find("i").hasClass("fa-angle-down") ? 2 : 1;
      param[type] = val;
    }
    setTimeout(function () {
      $.ajax({
        url: "/product/queryProduct",
        data: param,
        type: "get",
        dataType: "json",
        success: function (data) {
          console.log(data);
          $(".lt-pro").html(template("proListTpl", data));
        }
      })
    }, 300);
  }
  
  $(".lt-search button").click(function () {
    $(".lt-pro").html("<div class='loading'></div>")
    render();
  })
  
  $(".sort a[data-type]").click(function () {
    if ($(this).hasClass('current')) {
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      $(".current").removeClass("current");
      $(this).addClass("current");
      $(".sort a[data-type]").find("i").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
    render();
  })
})