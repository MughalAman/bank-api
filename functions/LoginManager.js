const Account = require('../models/Account');
let loggedAccount = null;

module.exports = {
  login: async function(userName, pinCode) {
    await Account.findOne({ userName: userName }, async function(err, account) {
      if (err) throw err;
       
      // test password
      if(account.userName !== null){
        if(pinCode !== null || pinCode !== ""){
          await account.comparePassword(pinCode, async function(err, isMatch) {
            if (err) throw err;
            
            if (isMatch){
              loggedAccount = account;
            }else{
              loggedAccount = null;
            }
          });
        }
      }

    });

    // console.log(loggedAccount);
    return await loggedAccount;
  }
}