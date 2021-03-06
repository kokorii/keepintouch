const TelegramBot = require('node-telegram-bot-api');
const getJSON = require('get-json');
const fs = require('fs');
const schedule = require('node-schedule');

/* deploy token */
// // replace the value below with the Telegram token you receive from @BotFather
const getToken = (function(){
    const token = process.env.TELEGRAM_TOKEN;
    return function() {
        return token;
    };
})();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(getToken(), {polling: true});


bot.onText(/\/start/, function(msg){
    const chatId = msg.chat.id;
    const user_name = msg.from.first_name;
    console.log(chatId);
    // send a message 
    bot.sendMessage(chatId,`${user_name}님, 안녕하세요.\n 하루 한 번 저장된 메세지 중 하나를 보내드릴게요.\n 
    \"\/new 저장 할 이야기\"로 메세지를 저장하세요.`);
    
});

bot.onText(/\/t/, function(msg, match){
    const chatId = msg.chat.id;
    const user_msg = match.input.slice(5);

    if (user_msg === "" | user_msg === undefined) {
        bot.sendMessage(
            chatId,
            '저장할 메세지가 비어있어요!',
        );
      return;
    }
    
    sendMsg();

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId,` \"${user_msg}\"\n 메세지를 저장했습니다.`);
    
});

var j = schedule.scheduleJob({hour:9, minute:30}, function(){
        console.log("테스트 중, 매일 아침 9시 30분 발송");
        sendMsg();
});

function sendMsg(){
    
    const dataBuffer = fs.readFileSync('memo.json', 'utf8');
    const dataJson = dataBuffer.toString();

    const data = JSON.parse(dataJson);
    
    var max = 16;
    var min = 3;
    var today_pic = Math.floor(Math.random() * (max - min)) + min;

    var today_memo = data[today_pic];

    console.log(today_memo);
    
    bot.sendMessage('571531564',today_memo.say).then(function(data){
        console.log('success say');
    }).catch(err => {console.log(err);});

    title_author = today_memo.title + ", " + today_memo.author;
    console.log(title_author);
    
    bot.sendMessage('571531564',title_author).then(function(data){
        console.log('success title');
    }).catch(err => {console.log(err);});

}