
// ГОТОВЫЙ КУСОК

// Пользователь успешно авторизовался
function updateMessages()
{
     // Узнаем, сколько сообщений есть на сайте
    fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
        .then((response) => response.json())
        .then((data) => initMessages(data));     
};

function initMessages(data)
// Загружаем ранее созданные сообщеиня.
{
    last_message = data;
    // Если сообщений мало:
    if (last_message <= how_many)
    {
        // Загружаем сообщения (от 0 до last_message)
        get_msg(last_downloaded, last_message);

        // запускаем отслеживание новых сообщений
        checkMessages();
    }
    // Если сообщений много: 
    if (last_message > how_many)
    {
        // загружаем с сервера часть сообщений,
        get_msg(last_message - how_many, last_message)

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
            // get_rest.setAttribute("onclick", "get_rest()");
        var br;  // переход на новую строку 
            br = document.createElement("p");
            block.appendChild(br);
            br.innerHTML = ""; 

        // запускаем отслеживание новых сообщений
        heckMessages()
    }
}

function checkMessages()
// Отслеживаем появление новых сообщений.
{ 
    let timerId = setInterval
    (
        function()
        // Узнаем, сколько сообщений есть на сайте. 
        { 
            fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
                .then((response) => response.json())
                .then((data) => checkIfNeed(data));
        }
        , how_long
    ); 
};

// Проверяем, надо ли что-то делать.
function checkIfNeed(data)
{
    last_message = data;
    // Если появились новые сообщения,
    if (last_message != last_downloaded)
    {
        // выводим новое количество сообщений. 
        document.getElementById("report").innerHTML = last_message;                                
        // Загружаем сообщения (от last_downloaded до last_message)
        get_msg(last_downloaded, last_message + 1);
    }      
}

    // Функция Загружаем сообщения с номерами х, х+1, х+2, ..., y-1
    function get_msg(x, y)
    {
        // Создаем элементы с текстом-заглушкой для каждого сообщения с id = "text + номер текста" 
        if (x = last_downloaded + 1)
        // Если догружаем новые сообщения
        {
            for (var i = x; i < y; i++) 
            {
                var element = document.createElement("Text");
                element.id = "text" + i;
                block.appendChild(element);
                // Вставляем новый элемент в конец блока чата
                element.innerHTML = "Сообщение номер " + i + " отсутствует" + "<br>";
            };
        };  
        if (y = first_downloaded)
        // Если догружаем старые сообщения
        {
            for (var i = x; i < y; i++) 
            {
                var element = document.createElement("Text");
                element.id = "text" + i;
                var first_id = "text" + first_downloaded;
                // Вставляем новый элемент перед первым загруженным
                element.InsertBefore(block, Document.getElementById(first_id));
                element.innerHTML = "Сообщение номер " + i + " отсутствует" + "<br>";
            };
        };
        // Считываем с сайта сообщения с номерами х, х+1, х+2, ..., y-1
        var url = "https://chat.v1.prod.online-it-school.com/get_msgs_range/asc/" + х + "/" + y;
        fetch(url)
            .then((response) => response.json())    
            .then((data) => build_chat(data));
        // Изменяем значение переменной first_downloaded и/или last_downloaded        
        if (x < first_downloaded)
        {
            first_downloaded = x;
        };
        if (y > last_downloaded)
        {
            last_downloaded = y-1;
        };            
    };

    // Выводим все загруженные сообщения в окно чата
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

// КОНЕЦ ГОТОВОГО КУСКА

// При нажатии на кнопку Загрузить оставшиеся сообщения
    // Загружаем сообщения (от 0 до first_downloaded)
    // удаляем кнопки

// При нажатии на кнопку Загрузить еще how_many сообщений
    // Загружаем сообщения (от first_message-how_many до first_message) 
    // если оставшихся сообщений меньше how_many
        // убираем эту кнопку, оставляем только Загрузить оставшиеся сообщения

