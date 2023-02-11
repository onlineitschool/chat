// Пользователь успешно авторизовался
function updateMessages()
{
    // Узнаем, сколько сообщений есть на сайте
    fetch("https://chat.v1.prod.online-it-school.com/get_latest_msg_id")
        .then((response) => response.json())
        .then((data) => initMessages(data));     
};

function initMessages(data)
// Загружаем ранее созданные сообщения.
{
    last_message = data;

    // Выводим на экран количество сообщений. 
    document.getElementById("report").innerHTML = last_message; 

    // Если сообщений мало:
    if (last_message <= how_many)
    {
        // Загружаем все сообщения
        get_msg(1, last_message + 1);
    };
    // Если сообщений много: 
    if (last_message > how_many)
    {
        // Показываем две кнопки для подгрузки более старых сообщений.
        $("#get_rest").show();
        $("#get_more").show();
        
        // Загружаем с сервера часть сообщений.
        get_msg(last_message - how_many + 1, last_message + 1);
    }
};

// Загружаем сообщения с номерами х, х+1, х+2, ..., y-1
function get_msg(x, y)
{
    // Создаем для сообщений с номерами х, х+1, х+2, ..., y-1
    // элементы-заглушки для каждого сообщения с id = "text + номер текста"

    // Если это самая первая загрузка,
    if (start == false)
    {
        for (var i = x; i < y; i++) 
        {
            var element = document.createElement("Text");
            element.id = "text" + i;
            block.appendChild(element);
            // Вставляем новый элемент в конец блока чата
            element.innerHTML = "The message number " + i + " is not available" + "<br>";
        };
        start = true;             
        first_downloaded = x;
        last_downloaded = y-1;
    }
    else
    { 
        if (x == last_downloaded + 1)
        // Если догружаем новые сообщения
        {
            for (var i = x; i < y; i++) 
            {
                var element = document.createElement("Text");
                element.id = "text" + i;
                block.appendChild(element);
                // Вставляем новый элемент в конец блока чата
                element.innerHTML = "The message number " + i + " is not available" + "<br>";
            };
            last_downloaded = y-1;
        };
        if (y == first_downloaded)
        // Если догружаем старые сообщения
        {
            for (var i = x; i < y; i++) 
            {
                var element = document.createElement("Text");
                element.id = "text" + i;
                var first_id = "text" + first_downloaded;
                var first_downloaded_msg = document.getElementById(first_id);
                // Вставляем новый элемент перед первым загруженным.
                block.insertBefore(element, first_downloaded_msg);
                element.innerHTML = "The message number " + i + " is not available" + "<br>";
            };
            first_downloaded = x;
            block.scrollTop = block.scrollHeight;
        };
    };  

    // Загружаем сообщения с сайта 
    var url = "https://chat.v1.prod.online-it-school.com/get_msgs_range/asc/" + x + "/" + y+1;

    fetch(url)
        .then((response) => response.json())    
        .then((data) => build_chat(data));           
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
        };
    };
    // запускаем отслеживание новых сообщений
    сheckMessages();
};

function сheckMessages()
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
        get_msg(last_downloaded + 1, last_message + 1);
    }      
};

// При нажатии на кнопку Загрузить оставшиеся сообщения
function getRest()
{
    // Загружаем все оставшиеся сообщения
    get_msg(1, first_downloaded);
    // прячем кнопки   
    $("#get_rest").hide();
    $("#get_more").hide();
};

// При нажатии на кнопку Загрузить еще how_many сообщений
function getMore()
{
    // если оставшихся сообщений меньше how_many
    if (first_downloaded <= how_many)
    {
        // загружаем все оставшиеся сообщения.
        get_msg(1, first_downloaded);
        // убираем обе кнопки.
        $("#get_rest").hide();
        $("#get_more").hide();
    }
    else
    {
        // Если после загрузки останется мало сообщений 
        if (first_downloaded <= how_many*2)
        {
            // убираем эту кнопку, оставляем только Загрузить оставшиеся сообщения
            $("#get_more").hide();  
        };
        // Загружаем еще how_many сообщений
        get_msg(first_downloaded - how_many, first_downloaded);   
    };   
};


