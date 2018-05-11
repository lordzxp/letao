$(function () {
  var currentPage = 1;
  var size = 5;
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: size
      },
      dataType: "json",
      success: function (data) {
        $(".user-content tbody").html(template("user-tmp", data));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / size),
          onPageClicked: function (event, originEvent, type, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  
  //修改用户状态
  var id;
  var delStatus;
  
  $(".user-content .table").on('click', '.btn', function () {
    $("#changeStatus").modal("show");
    id = $(this).parent().data('id');
    delStatus = $(this).parent().data("status");
    delStatus = (delStatus == 1) ? 0 : 1;
  })
  $("#btn-sure").click(function () {
    $.ajax({
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: delStatus
      },
      type: "POST",
      dataType: "json",
      success: function (data) {
        if (data.success) {
          currentPage = 1;
          render();
          $("#changeStatus").modal("hide");
        }
      }
    })
  })
})