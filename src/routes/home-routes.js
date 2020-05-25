const express = require('express')
const router = express.Router()

const dbConnection = require('../connection')

router.get('/', async (req, res) => {
  const db = await dbConnection
  const categories = await db.all('SELECT * FROM categories')
  const vacancies = await db.all('SELECT * FROM vacancies')

  const result = categories.map((category) => {
    return {
      ...category,
      vacancies: vacancies.filter(
        (vacancy) => vacancy.categories_id === category.id
      ),
    }
  })

  res.render('index.ejs', { result })
})

router.get('/vacancy/:id', async (req, res) => {
  const id = req.params.id
  const db = await dbConnection
  const vacancy = await db.get(`SELECT * FROM vacancies WHERE id = ${id}`)
  const category = await db.get(
    `SELECT * FROM categories WHERE id = ${vacancy.categories_id}`
  )

  res.render('vacancy.ejs', { category, vacancy })
})

module.exports = router
