import telegram

with open("./token.txt") as f:
    lines = f.readlines()
    
    
token = lines[0].strip()
chat_id = lines[1].strip()

bot = telegram.Bot(token=token)

bot.sendMessage(chat_id=chat_id, text="did it work?")