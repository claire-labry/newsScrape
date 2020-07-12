$('#saveArticle').click(function () {
  let id = $(this).attr('data-id')

  let state = $(this).attr('data-state')
  if (state === 'false') {
    $(this).attr('data-state', 'true')
    state = 'true'

    $.ajax({
      method: 'PUT',
      url: '/articles/' + id,
      data: {
        saved: true
      }
    }).then(function () {
      location.reload()
    })
  } else {
    $(this).attr('data-state', 'false')
    state = 'false'

    $.ajax({
      method: 'PUT',
      url: '/articles/' + id,
      data: {
        saved: false
      }
    }).then(function () {
      location.reload()
    })
  }
});


