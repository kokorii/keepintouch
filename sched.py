from apscheduler.schedulers.blocking import BlockingScheduler
import subprocess
import logging 

def cron():
	command = "python bot.py"
	subprocess.call(command.split())

sched = BlockingScheduler()

#매일아침 9시 30분 실행
sched.add_job(cron, 'cron',hour=9, minute=30)

logging.basicConfig()

sched.start()