const mongoose = require('mongoose')

let MovieSchema = new mongoose.Schema({
  title: String,
  director: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
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

MovieSchema.pre('save', function (next) {
  if (this.isNew) this.meta.createOn = this.meta.updateOn = Date.now()
  else this.meta.updateOn = Date.now()
  next()
})

// 静态方法，在模型中调用
MovieSchema.statics = {
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

module.exports = MovieSchema





