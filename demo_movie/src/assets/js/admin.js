$(() => {
  $('.del').click(e => {
    let target = $(e.target)
    let id = target.data('id')
    let tr = $('.item-id-' + id)

    $.ajax({
      type: 'DELETE',
      url: '/admin/list?id=' + id
    })
    .done(results => {
      if (results.success === 1) {
        if (tr.length > 0) {
          tr.remove()
        }
      }
    })
  })
})