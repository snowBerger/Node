// const user = {
//   name: 'test</script>'
// }

// const result = `<h2>${user.name}</h2>`
const vm = require('vm')

const templateMap = {
  tempA: '`<h2>${include("tempB")}</h2>`',
  tempB: '`<p>ha ha ha</p>`'
}

const context = {
  include: tempName => templateMap[tempName](),
  _: markup => {
    if (!markup) return ''
    return String(markup)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;')
  }
}

for (let key of Object.keys(templateMap)) {
  const temp = templateMap[key]

  templateMap[key] = vm.runInNewContext(`
    (function() {
      return ${temp}
    })
  `, context)
}

console.log(templateMap['tempA']())
