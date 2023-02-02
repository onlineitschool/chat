function login(){
    console.log("login")
    document.getElementById("btn_login").onclick = function(){
       var login_username = document.getElementById("login_username").value;
       var login_password = document.getElementById("login_password").value;

       var login_data = {
           "email" : login_username,
           "password" : login_password
       }

        $.ajax({
            type: "POST",
            url: "https://chat.v1.prod.online-it-school.com/get_session_token",
            data: login_data,
            success: on_login_response
        });
    }
}

function on_login_response(data){
    document.user = JSON.parse(data);
    check_user();
}

function check_user(){
    var f_name = document.user.obj_user['f_name'];
    if(f_name){
        $(".span_wellcome").html("Wellcome: " + document.user.obj_user['f_name'])
        $(".div-new-msg").show()
        $(".div-login").hide()
    }else{
        $(".div_new_msg").hide()
        $(".div_login").show()
    }
}