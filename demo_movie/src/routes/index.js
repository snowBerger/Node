const _ = require('underscore')
const Movie = require('../models/movie')
const User = require('../models/user')

function Routes (app) {
  // pre handle user
  app.use((req, res, next) => {
    const _user = req.session.user
    if (_user) app.locals.user = _user
    next()
  })

  // index page
  app.get('/', (req, res) => {
    Movie.fetch((err, movies) => {
      if (err) {
        console.log(err)
      } else {
        res.render('index', {
          title: '我的影院',
          movies: movies
        })
      }
    })
  })

  // detail page
  app.get('/movie/:id', (req, res) => {
    let id = req.params.id
    Movie.findById(id, (err, movie) => {
      if (err) {
        console.log(err)
      } else {
        res.render('detail', {
          title: '影片详情',
          movie: movie
        })
      }
    })
  })

  // admin page
  app.get('/admin', (req, res) => {
    res.render('admin', {
      title: '后台录入',
      movie: {
        title: '',
        director: '',
        country: '',
        year: '',
        poster: '',
        flash: '',
        summary: '',
        language: ''
      }
    })
  })

  // admin list page
  app.get('/admin/list', (req, res) => {
    Movie.fetch((err, movies) => {
      if (err) {
        console.log(err)
      } else {
        res.render('admin/list', {
          title: '电影列表',
          movies: movies
        })
      }
    })
  })

  // admin add
  app.post('/admin/add', (req, res) => {
    let id = req.body.movie._id
    let movieObj = req.body.movie
    let _movie
    if (id !== 'undefined') {
      Movie.findById(id, (err, movie) => {
        if (err) {
          console.log(err)
        } else {
          _movie = _.extend(movie, movieObj)
          _movie.save((err, movie) => {
            if (err) {
              console.log(err)
            } else {
              res.redirect('/movie/' + movie._id)
            }
          })
        }
      })
    } else {
      _movie = new Movie({
        title: movieObj.title,
        director: movieObj.director,
        language: movieObj.language,
        country: movieObj.country,
        summary: movieObj.summary,
        flash: movieObj.flash,
        poster: movieObj.poster,
        year: movieObj.year
      })
      _movie.save((err, movie) => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/movie/' + movie._id)
        }
      })
    }
  })

  // admin update
  app.get('/admin/update/:id', (req, res) => {
    let id = req.params.id
    if (id) {
      Movie.findById(id, (err, movie) => {
        if (err) {
          console.log(err)
        } else {
          res.render('admin', {
            title: movie.title + '修改',
            movie: movie
          })
        }
      })
    }
  })

  // admin delete
  app.delete('/admin/list', (req, res) => {
    let id = req.query.id
    if (id) {
      Movie.remove({_id: id}, (err, movie) => {
        if (err) {
          console.log(err)
        } else {
          res.json({success: 1})
        }
      })
    }
  })

  // signup
  app.post('/user/signup', (req, res) => {
    const _user = req.body.user
    User.findOne({name: _user.name}, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (user) {
          return res.redirect('/admin/user/list')
        } else {
          let user = new User(_user)
          user.save((err, user) => {
            if (err) {
              console.log(err)
            } else {
              res.redirect('/admin/user/list')
            }
          })
        }
      }
    })
  })

  // signin
  app.post('/user/signin', (req, res) => {
    const _user = req.body.user
    const name = _user.name
    const password = _user.password

    User.findOne({name: name}, (err, user) => {
      if (err) {
        console.log(err)
      } else {
        if (!user) return res.redirect('/')
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            console.log(err)
          } else {
            if (isMatch) {
              req.session.user = user
              return res.redirect('/')
            } else {
              console.log('Password is not matched.')
            }
          }
        })
      }
    })
  })

  // logout
  app.get('/logout', (req, res) => {
    delete req.session.user
    delete app.locals.user
    res.redirect('/')
  })

  // user list page
  app.get('/admin/user/list', (req, res) => {
    User.fetch((err, users) => {
      if (err) {
        console.log(err)
      } else {
        res.render('admin/user/list', {
          title: '用户列表',
          users: users
        })
      }
    })
  })

  // 404
  app.get('*', (req, res) => {
    res.write('<div>404 Not Found!</div>')
    res.end()
  })
}

module.exports = Routes