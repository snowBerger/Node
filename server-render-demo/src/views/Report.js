export default {
  functional: true,
  render (h, context) {
    return context.props.template
  },
  props: {
    template: {
      type: String
    }
  }
}