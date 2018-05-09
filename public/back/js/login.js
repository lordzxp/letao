/**
 * Created by zxp on 2018/5/9.
 */
$(function () {
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback: {
            message: "用户名错误"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须为6~12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  })
  //表单验证完毕,通过ajax提交到后台验证
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: '/employee/employeeLogin',
      data: $("#form").serialize(),
      dataType: 'json',
      type: "post",
      success: function (data) {
        console.log(data);
        if(data.success){
          location.href = "index.html";
        }else if(data.error === 1000) {
          $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }else if(data.error === 1001) {
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  })

//  重置功能
  $("[type=reset]").click(function () {
    $("#form").data("bootstrapValidator").resetForm(true);
  })
  
})