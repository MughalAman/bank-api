const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

var AccountSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    accountAddress: {
        type: String,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }

});

AccountSchema.pre("save", function (next) {
    const account = this;
  
    if (this.isModified("pinCode") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError);
        } else {
          bcrypt.hash(account.pinCode, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError);
            }
  
            account.pinCode = hash;
            next();
          })
        }
      })
    } else {
      return next();
    }
});

AccountSchema.methods.comparePassword = function(pinCode, callback) {
    bcrypt.compare(pinCode, this.pinCode, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    });
}
  

module.exports = mongoose.model('Account', AccountSchema);