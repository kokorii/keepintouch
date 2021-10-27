import telegram
import json
import random

# #read token, chat_id
# with open("./token.txt") as f:
#     lines = f.readlines()
# token = lines[0].strip()
# chat_id = lines[1].strip()

#create bot
bot = telegram.Bot(token=token)

#read note.json
notefile = open('note.json', encoding="utf-8")
note = json.load(notefile)
#print(note), 딕셔너리
f.close()

#데이터 선택 방법 print(data[1]["type"]) 
#print(len(note))
#오늘의 픽 뽑기 - random 사용 
pic = random.randrange(1, len(note))

#sending message
bot.sendMessage(chat_id=chat_id, text=note[pic]["say"])