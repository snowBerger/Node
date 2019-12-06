require('@babel/register')({
  presets: ['@babel/preset-react']
})

const ReactDOMServer = require('react-dom/server')
const App = require('./index.jsx')

console.log(
  ReactDOMServer.renderToString(
    App()
  )
)