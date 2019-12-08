// import './style'
import * as Style from './style.scss'

export default {
  functional: true,
  render (h, context) {
    const test = () => {
      console.log('111111')
    }
    return (
      <div class={ Style.item } on-click={ test }>1231312</div>
    )
  },
  props: {
    type: {
      type: String
    }
  }
}