/**
 * Created by zxp on 2018/5/11.
 */
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  render();
  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      type: "get",
      success: function (data) {
        $(".product-content tbody").html(template("productTmp", data));
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
  
  $("#btn-addProduct").click(function () {
    $("#productModal").modal("show");
  })
  
  $.ajax({
    url: "/category/querySecondCategoryPaging",
    data: {
      page: 1,
      pageSize: 1000
    },
    dataType: "json",
    success: function (data) {
      $("#proItems").html(template("secItemList", data));
    }
  })
  
  $("#proItems").on('click', 'li', function () {
    $("input[name='brandId']").val($(this).find('a').data('id'));
    $("#secxt").text($(this).find('a').text());
    $("#form").data("bootstrapValidator").updateStatus('brandId', 'VALID');
  })

//  多文件上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var imgObj = {
        picAddr: data.result.picAddr,
        picName: data.result.picName
      }
      picArr.unshift(imgObj);
      $(".pro-imgs").prepend('<img src="' + data.result.picAddr + '" height=100>');
      if (picArr.length > 3) {
        picArr.pop();
        $(".pro-imgs img:last-child").remove();
      }
      if (picArr.length == 3) {
        $("input[name=picStatus]").val('1');
      }
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
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择一个二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请选择三张图片"
          }
        }
      }
    }
  })

//  新增商品  ajax提交
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    var dataStr = $("#form").serialize();
    dataStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr + "";
    dataStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr + "";
    dataStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr + "";
    
    $.ajax({
      url: '/product/addProduct',
      data: dataStr,
      type: "post",
      dataType: "json",
      success: function (data) {
        if (data.success) {
          $("#productModal").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $(".pro-imgs img").remove();
          picArr = [];
          
        }
      }
    })
  })
})
