
    // Пользователь успешно авторизовался
    function updateMessages()
    {
        // Узнаем, сколько сообщений есть на сайте
        fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
            .then((response) => response.json())
            .then((data) => emptyMessages(data));     
    };

    function emptyMessages(data)
    {
        last_message = data;
        // выводим количество сообщений. 
        document.getElementById("report").innerHTML = last_message;

        // создаем две кнопки для подгрузки более старых сообщений.
        var get_more; // кнопка подгрузить how-many сообщений
            get_more = document.createElement("button");
            block.appendChild(get_more);
            get_more.innerHTML = "Get " + how_many + " more messages";
            // get_more.setAttribute("onclick", "get_more()");
        var get_rest; // кнопка подгрузить все остальные сообщения
            get_rest = document.createElement("button");
            block.appendChild(get_rest);
            get_rest.innerHTML = "Get all other messages";
            get_rest.setAttribute("onclick", "get_rest()");
        var br;  // переход на новую строку 
            br = document.createElement("p");
            block.appendChild(br);
            br.innerHTML = "";         

        // Создаем пустые элементы типа текст для каждого сообщения с id = "text<номер текста>"       
        for (var i = 1; i < last_message + 1; i++) 
        {
            var element = document.createElement("Text");
            element.id = "text" + i;
            // пока эти элементы не выводим, просто пустые окна
            block.appendChild(element);
        };
        downloadMessages(last_message);    
    };

    // Загружаем сообщения, созданные до авторизации пользователя.
    function downloadMessages(last_message)
    {
        last_downloaded = last_message;

        // Если сообщений меньше, чем how_many,
        if (last_message < how_many)
        {
            first_downloaded = 0;
            // запускаем процесс загрузки сообщений
            get_msg(data);
        };
        // Если сообщений больше, чем how_many,
        if (last_message > how_many)
        {
            first_downloaded = last_message - how_many; 
            // Загружаем how_many сообщений.
            get_more_msg();
        };
        checkMessages();
    }

    // Пользователь нажал на кнопку "Загрузить остальные сообщения"
    // Здесь нужно рассчитать номер страницы, которую мы загружаем
    // Нам нужны сообщения с номерами от 1 до first_download
    function get_rest()
    {
                // считываем сообщения с сайта.
                var d = last_message - last_downloaded;
                last_downloaded = last_message; 
                var url = "https://chat.v1.prod.online-it-school.com/get_msgs_page/0/" + d;
                fetch(url)
                    .then((response) => response.json())    
                    .then((data) => build_chat(data));         
    };

    // Пользователь нажал на кнопку "Загрузить еще ... сообщений"
    // Здесь нужно рассчитать номер страницы, которую мы загружаем
    // Нам нужны сообщения с номерами 
    // от (first_download - how_many) до first_download
    // и сделать проверку, все ли id обработаны

    // При нажатии на кнопку "Загрузить еще 50" 
    // Получаем число сообщений на сервере (чтобы отсчитать страницы)
    // Загружаем с сервера сообщения с номерами 
        // от first_downloaded - 50 до first_downloaded
            // Проверяем, все ли загружены; если сообщений мало, догружаем остальные

    function get_more_msg()
    {
        var t = pages_downloaded;
        var url = "https://chat.v1.prod.online-it-school.com/get_msgs_page/" + t + "/" + how_many;
        fetch(url)
            .then((response) => response.json())    
            .then((data) => build_chat(data));
        pages_downloaded = pages_downloaded + 1;
        first_downloaded = first_downloaded - how_many;
    }

    function checkMessages()
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
            , how_long
        ); 
    };

    function get_msg(data)
    {
        last_message = data;
        // Если появились новые сообщения,
        if (last_message != last_downloaded)
            {
                // выводим новое количество сообщений. 
                document.getElementById("report").innerHTML = last_message;

                // считываем новые сообщения с сайта.
                var d = last_message - last_downloaded;
                last_downloaded = last_message; 
                var url = "https://chat.v1.prod.online-it-school.com/get_msgs_page/0/" + d;
                fetch(url)
                    .then((response) => response.json())    
                    .then((data) => build_chat(data));
            }           
    };

    // Пишем все загруженные сообщения в окно чата; кажется, это работает
    // Можно только приделать вывод "Сообщение " + i + " удалено" + "<br>"
        // для тех сообщений, которые не находятся на сервере
    function build_chat(data) 
    {
        var nmbrMessage;
        var myMessage;
        var hisMessage;
        for (var i = 0; i < data.length; i++) 
        {
            var k = data.length - i - 1;
            var msg = data[k];

            if (msg["username"] == name) 
            {
                // Выводим сообщения пользователя на зеленом фоне.                    
                nmbrMessage = msg["id"];
                myMessage = document.getElementById("text" + nmbrMessage);
                myMessage.innerHTML = "<h5>" + msg["username"] + ": " + msg["message"] + "</h5>";
                block.scrollTop = block.scrollHeight; 
            }                  
            else 
            {
                // Выводим сообщения других пользователей на сером фоне.                   
                nmbrMessage = msg["id"];
                hisMessage = document.getElementById("text" + nmbrMessage);
                hisMessage.innerHTML = "<h6>" + msg["username"] + ": " + msg["message"] + "</h6>";
                block.scrollTop = block.scrollHeight;   
            }
        }
    };