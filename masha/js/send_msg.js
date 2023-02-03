    // Пользователь отправляет свое сообщение.
    function send_msg()
        {
            // Отправляем сообщение на сервер.
            var my_message = document.getElementById("my_message").value;
            var token = user.token
        
            var data = 
            {
                "token" : token,
                "msg" : my_message
            }
        
                $.ajax({
                    type: "POST",
                    url: "https://chat.v1.prod.online-it-school.com/add2",
                    data: data,
                    success: function(a){
                        console.log(a)
                    },
                    error: function(a, b) {
                        console.log("error")
                    }
                });
            // Обнуляем окно ввода сообщения.
            document.getElementById("my_message").value = null;
        }