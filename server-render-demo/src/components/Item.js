
export default {
  functional: true,
  render (h, context) {
    return (
      <div class={ 'item' }>{ context.props.type }</div>
    )
  },
  props: {
    type: {
      type: String
    }
  }
}