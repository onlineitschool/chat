// Пользователь отправляет логин-пароль.
function login()
{
    // Прячем кнопку.
        $("#mail").hide();
        $("#password").hide();
        $("#login").hide();
        $("#e-mail").hide();
        $("#phone").hide();

        // Считываем почту и телефон
        var login_email = document.getElementById("mail").value;
        var login_password = document.getElementById("password").value;

        // Убираем сообщение о неуспехе аутентификации.
        $("#output").hide();

        var ajax_data = 
        {
            "email" : login_email,
            "password" : login_password
        }

        // Отправляем почту и телефон на api  
        var temp_url = "https://chat.v1.prod.online-it-school.com/get_session_token";
    
        $.ajax
        ({
            type: "POST",
            url: temp_url,
            // Отправляем логин-пароль.
            data: ajax_data,   

            // Получаем имя и токен.         
            success: function(on_login_response)
            {
                user = JSON.parse(on_login_response);
                if (on_login_response.length < 30)  // При неуспехе (не пришел токен)
                {
                    // выводим "Authentification FAILED".
                    $("#output").show();
                    document.getElementById("output").innerHTML = "<b>Authentification FAILED. Please try again!</b>";

                    // Достаем окно ввода имени и кнопку.
                    $("#mail").show();
                    $("#password").show();
                    $("#login").show();
                    $("#e-mail").show();
                    $("#phone").show();
                }
                else // При успешной аутентификации
                {
                    // сохраняем имя пользователя в переменную name
                    name = user.obj_user['f_name'];

                    // и выводим имя пользователя.
                    document.getElementById("name").innerHTML = name + ":";

                    // Открываем окно чата. 
                    $("#block").show();
                    $("#all_msg").show();
                    $("#number_msg").show();

                    // Открываем отправку сообщений.          
                    $("#end_message").show();
                    $("#my_message").show();       
                    $("#b_send_get_msg").show();

                    // Переходим к загрузке сообщений.
                    updateMessages();
                }                   
            },
            error: function() 
            {
                document.getElementById("output").innerHTML = "error";
            }
        });        
}; 
