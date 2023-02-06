function updateMessages()
    // Отслеживаем появление новых сообщений.
    { 
        let timerId = setInterval
        (
            function() 
            { 
                fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
                    .then((response) => response.json())
                    .then((data) => get_msg(data));
            }
            , 500
        ); 
    };

    function get_msg(data)
    {
        last_message = data;
        if (last_message != last_downloaded)
            {
                // Выводим новое количество сообщений. 
                document.getElementById("report").innerHTML = last_message;

                // Считываем новые сообщения с сайта.
                var d = last_message - last_downloaded;
                last_downloaded = last_message; 
                var url = "https://chat.v1.prod.online-it-school.com/get_msgs_page/0/" + d;
                fetch(url)
                .then((response) => response.json())    
                .then((data) => build_chat(data));
            }           
    };

    // Пишем все новые сообщения в окно чата
    function build_chat(data) 
        {
            var myMessage;
            var hisMessage;
            for (var i = 0; i < data.length; i++) 
            {
                var k = data.length - i - 1;
                var msg = data[k];

                console.log(name);

                if (msg["username"] == name) 
                {
                    // Выводим сообщения пользователя на зеленом фоне.                    
                    myMessage = document.createElement("h5");
                    myMessage.innerHTML = msg["username"] + ": " + msg["message"];

                    document.getElementById("block").appendChild(myMessage);
                    document.getElementById("block").scrollTop = block.scrollHeight; 
                }                  
                else 
                {
                    // Выводим сообщения других пользователей на сером фоне. 
                    hisMessage = document.createElement("h6");
                    hisMessage.innerHTML = msg["username"] + ": " + msg["message"];

                    document.getElementById("block").appendChild(hisMessage);
                    document.getElementById("block").scrollTop = block.scrollHeight;   
                }
            }
        };