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
  var id;
  var delStatus;
  
  // $(".user-content .table").on('click','.btn',function () {
  //   id = $(this).parent().data('id');
  //   delStatus = $(this).parent().data("status");
  //   delStatus = delStatus == 1 ? 0 : 1;
  // })
})