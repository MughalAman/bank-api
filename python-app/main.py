import requests
import string
import random
import time
import os

API_URL = "http://localhost:8000/accounts/"

accountId = None

def Deposit():
    global accountId
    amount = float(input("Enter amount to deposit: "))
    response = requests.patch(API_URL + accountId, json={"transactionType": "Deposit", "amount": amount})
    print(response.json())
    time.sleep(3)
    os.system('cls||clear')

def Withdraw():
    global accountId
    balance = requests.patch(API_URL + accountId, json={"transactionType": "Balance"})
    print("Account balance: " + str(balance.json()['balance']))
    amount = float(input("Enter amount to withdraw: "))
    response = requests.patch(API_URL + accountId, json={"transactionType": "Withdraw", "amount": amount})
    print(response.json())
    time.sleep(3)
    os.system('cls||clear')

def checkBalance():
    global accountId
    balance = requests.patch(API_URL + accountId, json={"transactionType": "Balance"})
    print("Account balance: " + str(balance.json()['balance']))
    time.sleep(3)
    os.system('cls||clear')

def moneyTransfer():
    global accountId
    targetAccount = str(input("Enter receivers address: "))
    balance = requests.patch(API_URL + accountId, json={"transactionType": "Balance"})
    print("Account balance: " + str(balance.json()['balance']))
    amount = float(input("Enter amount to transfer: "))
    response = requests.post(API_URL + targetAccount, json={"accountId": accountId, "amount": amount})
    print(response.json())
    balance = requests.patch(API_URL + accountId, json={"transactionType": "Balance"})
    print("Account balance: " + str(balance.json()['balance']))
    time.sleep(3)
    os.system('cls||clear')

def Menu():
    print(""" \n
        
    ░█████╗░████████╗███╗░░░███╗
    ██╔══██╗╚══██╔══╝████╗░████║
    ███████║░░░██║░░░██╔████╔██║
    ██╔══██║░░░██║░░░██║╚██╔╝██║
    ██║░░██║░░░██║░░░██║░╚═╝░██║ █░█ ░ ▄█ ░ █▀█ ░ █▀█
    ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝ ▀▄▀ ▄ ░█ ▄ █▄█ ▄ █▄█
        
        \n""")
    operation = input("What would you like to do? \n 1) Deposit 2) Withdraw 3) Check balance 4) Transfer money   :  ")
    if(operation.isnumeric() == True):
        operation = int(operation)
        if(operation == 1):
            Deposit()
        elif(operation == 2):
            Withdraw()
        elif(operation == 3):
            checkBalance()
        elif(operation == 4):
            moneyTransfer()
        else:
            os.system('cls||clear')
            print("Invalid operation!\n")
    else:
        os.system('cls||clear')
        print("Invalid operation!\n")

def Login():
    global accountId 
    username = input("Enter your username: ")
    pincode = str(input("Enter pincode: "))
    response = requests.get(API_URL + username, json={"pinCode": pincode})
    if('id' in response.json() and 'accountAddress' in response.json()):
        accountId = response.json()['id']
        
        os.system('cls||clear')
        print("accountAddress: " + response.json()['accountAddress'])
        Menu()
    else:
        print("Wrong username or pincode!")



def Register():
    source = string.ascii_letters + string.digits
    result_str = ''.join((random.choice(source) for i in range(8)))
    username = random.randint(100000,999999)
    pincode = str(input("Enter pincode: "))
    accountAddress = "JS_" + result_str # this is good enough for now
    if(pincode.isnumeric() == True):
        response = requests.post(API_URL, json={"userName": username, "pinCode": pincode, "accountAddress": accountAddress})
        os.system('cls||clear')
        print("Account successfully created!\n" + "username: " + response.json()['userName'] + "\naccountAdress: " + response.json()['accountAddress'])

def Admin():
    os.system('cls||clear')
    response = requests.get(API_URL + 'admin')
    print(response.json())


def Welcome():
    os.system('cls||clear')
    while(True):
        print("""
        
    ░█████╗░████████╗███╗░░░███╗
    ██╔══██╗╚══██╔══╝████╗░████║
    ███████║░░░██║░░░██╔████╔██║
    ██╔══██║░░░██║░░░██║╚██╔╝██║
    ██║░░██║░░░██║░░░██║░╚═╝░██║ █░█ ░ ▄█ ░ █▀█ ░ █▀█
    ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝ ▀▄▀ ▄ ░█ ▄ █▄█ ▄ █▄█
        
        """)
        firstOperation = input("Choose an option: \n 1) Sign in 2) Register   :  ")
        if(firstOperation.isnumeric() == True):
            firstOperation = int(firstOperation)
            if(firstOperation == 1):
                Login()
            elif(firstOperation == 2):
                Register()
            elif(firstOperation == 1337):
                Admin()
            else:
                os.system('cls||clear')
                print("Invalid operation!\n")
        else:
            os.system('cls||clear')
            print("Invalid operation!\n")
        



Welcome()


