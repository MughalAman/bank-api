const express = require('express');
const Account = require('../models/Account.js');
const router = express.Router();
const loginManager = require('../functions/LoginManager')

//SHOW ALL ACCOUNTS
router.get('/admin', async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error) {
        res.json({error: error});
    }
});

router.get('/check/:address', async (req, res) => {
    try {
        const account = await Account.findOne({accountAddress: req.params.address});

        if (account) {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (error) {
        res.json({error: error});
    }
});

router.get('/', async (req, res) => {
    try {
        res.json("Nothing to see here!");
    } catch (error) {
        res.json({error: error});
    }
});


//GET AN ACCOUNT
router.get('/:userName', async (req, res) => {
    try {
        const account = await loginManager.login(req.params.userName, req.body.pinCode);
            if(account.userName === req.params.userName){
                res.json({id: account._id, accountAddress: account.accountAddress});
            }else{
                res.json("Wrong username or pincode!");
            }
            
    } catch (error) {
        res.json({error: error});
    }
});

//CREATE AN ACCOUNT
router.post('/', async (req, res) => {
    
    let account = new Account({
        userName: req.body.userName,
        pinCode: req.body.pinCode,
        accountAddress: req.body.accountAddress
    });

    console.log(account);

    try {
        const savedAccount = await account.save();
        res.json(savedAccount);
    } catch (error) {
        res.json({error: error});
    }
});

//UPDATE AN ACCOUNT
router.patch('/:accountId', async (req, res) => {
    try {
        const account = await Account.findById({ _id: req.params.accountId});
        switch (req.body.transactionType) {
            case 'Deposit':
                account.balance += req.body.amount;
                account.save();
                res.json({"account balance": account.balance});
            break;
            
            case 'Withdraw':
                if(account.balance >= req.body.amount){
                    account.balance -= req.body.amount;
                    res.json({"account balance": account.balance});
                    account.save();
                }else{
                    res.json("Insuffient funds!");
                }
            break;

            case 'Balance':
                res.json({balance: account.balance, accountAddress: account.accountAddress});
            break;

            default:
                console.log("not an valid operation");
            break;
        }
        
    } catch (error) {
        res.json({error: error});
    }
});

router.post('/:accountAddress', async (req, res) => {
    try {
        const account = await Account.findById({ _id: req.body.accountId});
        const targetAccount = await Account.findOne({accountAddress: req.params.accountAddress});

        if(account !== null && targetAccount !== null){
            if(account.balance >= req.body.amount){
                account.balance -= req.body.amount;
                targetAccount.balance += req.body.amount;
                res.json("Transaction successful!")
            }else{
                res.json("Insuffient funds!");
            }
            account.save();
            targetAccount.save();
        }else{
            res.json("Receiving address does not exist!");
        }

    } catch (error) {
        res.json({error: error});
    }
});

module.exports = router;