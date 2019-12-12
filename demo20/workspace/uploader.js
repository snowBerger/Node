const fs = require('fs')
const mkdirp = require('mkdirp')
const webpack = require('webpack')
const mfs = new (require('memory-fs'))

module.exports = function (businessName, dataPath, templatePath) {
  mkdirp.sync(__dirname + '/../business/' + businessName)

  fs.createReadStream(templatePath)
    .pipe(fs.createWriteStream(__dirname + '/../business/' + businessName + '/template.tpl'))
  
  const compileTask = webpack({
    mode: 'development',
    devtool: false,
    target: 'node',

    entry: dataPath,

    output: {
      path: '/whatever',
      filename: 'data.js'
    },

    module: {
      rules: [
        {
          test: /.proto$/,
          use: 'text-loader',
        }
      ]
    }
  })

  compileTask.outputFileSystem = mfs;

  compileTask.run(err => {
    if (err) return
    const content = mfs.readFileSync('/whatever/data.js')
    fs.writeFileSync(__dirname + '/../business/' + businessName + '/data.js', content)
  })
}