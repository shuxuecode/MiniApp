import os

# os.chdir('E:/git_repo/springBoot') 

os.system("git status")

os.system("git pull")

os.system("git add .")

os.system("git commit -m commitBy%date:~0,4%-%date:~5,2%-%date:~8,2%-%time:~0,2%-%time:~3,2%-%time:~6,2%")

os.system("git push")

# os.system("pause")

print("---------------------------------------------------------------")
print("commit success !!! ok !")
print("---------------------------------------------------------------")

os.system('ping -n 5 127.1>nul')
