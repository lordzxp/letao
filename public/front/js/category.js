/**
 * Created by zxp on 2018/5/12.
 */
$(function () {
  $.ajax({
    url: "/category/queryTopCategory",
    dataType: "json",
    type: "get",
    success: function (data) {
      $(".cate-left ul").html(template("topCateTpl", data));
    }
  })
  renderSecCate(1);
  function renderSecCate(id) {
    $.ajax({
      url: "/category/querySecondCategory",
      data: {id: id},
      type: "get",
      success: function (data) {
        $(".cate-right ul").html(template("secCateTpl", data));
      }
    })
  }
  
  $(".cate-left ul").on('click', 'li', function () {
    var id = $(this).find('a').data('id');
    $(".cate-left .current").removeClass('current');
    $(this).find('a').addClass("current");
    renderSecCate(id);
  })
})