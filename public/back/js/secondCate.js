/**
 * Created by zxp on 2018/5/11.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (data) {
        $(".secCate-content tbody").html(template("secondCateTmp", data));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
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
  
  $("#btn-addSecCate").click(function () {
    $("#addSecCateModal").modal("show");
  });
  
  $.ajax({
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 1000
    },
    dataType: "json",
    success: function (data) {
      $("#topItems").html(template("topItemsList", data));
    }
  })
  
  $("#topItems").on("click", 'a', function () {
    $("#toptxt").text($(this).text());
    $("input[name=categoryId]").val($(this).data('id'));
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })
  
  //选择图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      $("input[name=brandLogo]").val(data.result.picAddr);
      $(".displayImg").attr('src', data.result.picAddr);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });

//  表单验证
  $("#form").bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级类型"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择一张图片"
          }
        }
      }
      
    }
  })
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (data) {
        if (data.success) {
          currentPage = 1;
          render();
          $("#addSecCateModal").modal("hide");
          $("#form").data("bootstrapValidator").resetForm(true);
          $(".displayImg").attr("src", "./images/none.png");
          $("#toptxt").text("请选择一级分类");
        }
      }
    })
  })
})