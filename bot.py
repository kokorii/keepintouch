import telegram

with open("./token.txt") as f:
    lines = f.readlines()
    token = lines[0].strip()

bot = telegram.Bot(token=token)
chat_id = 571531564

bot.sendMessage(chat_id=chat_id, text="what")