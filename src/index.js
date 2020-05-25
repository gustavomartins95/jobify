const port = process.env.PORT || 3000
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// const init = require('./database')
// init()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use('/admin', (req, res, next) => {
  if (req.hostname === 'localhost') {
    next()
  } else {
    res.render('forbidden.ejs')
  }
})

const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')

app.use('/', homeRoutes)
app.use('/admin', adminRoutes)

app.listen(port, (err) => {
  if (err) {
    console.log('error', err)
  } else {
    console.log(`Server started on port ${port}`)
  }
})
