const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

let UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  meta: {
    createOn: {
      type: Date,
      dafault: Date.now()
    },
    updateOn: {
      type: Date,
      dafault: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  let user = this
  if (this.isNew) this.meta.createOn = this.meta.updateOn = Date.now()
  else this.meta.updateOn = Date.now()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateOn')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

// 实例方法，在实例中调用
UserSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, (err, isMatch) => {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }
}

module.exports = UserSchema





