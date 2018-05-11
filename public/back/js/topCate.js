/**
 * Created by zxp on 2018/5/11.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  //渲染表格
  function render() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (data) {
        $(".topCate-content tbody").html(template('topCateTmp', data));
        //  分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(data.total / data.size),
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "末页";
              case "page":
                return page;
            }
          },
          onPageClicked: function (event, originEvent, type, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

//  模态框弹出
  $("#btn-addTopCate").click(function () {
    $("#addTopCateModal").modal("show");
  })
  
  //表单验证
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名"
          }
        }
      }
    }
  })

// 添加操作
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "post",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (data) {
        if (data.success) {
          $("#form").data("bootstrapValidator").resetForm(true);
          $("#addTopCateModal").modal("hide");
          currentPage = 1;
          render();
        }
      }
    })
  });
  
})