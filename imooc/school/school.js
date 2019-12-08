var klass = require('./klass')

klass.add = function (klasses) {
  klasses.forEach(item => {
    var _klass = item
    klass.add(_klass.teacherName, _klass.students)
  })
}