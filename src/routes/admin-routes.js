const express = require('express')
const router = express.Router()

const dbConnection = require('../connection')

router.get('/', async (req, res) => res.render('admin'))

// Categories
router.get('/categories', async (req, res) => {
  const db = await dbConnection
  const dbCategories = await db.all('SELECT * FROM categories')
  res.render('admin/categories', { categories: dbCategories })
})

router.get('/category', (req, res) => res.render('admin/categories/register'))

router.post('/category', async (req, res) => {
  const { title } = req.body
  const db = await dbConnection
  await db.run(`INSERT INTO categories (title) VALUES ('${title}')`)
  res.redirect('/admin/categories')
})

router.get('/category/edit/:id', async (req, res) => {
  const id = req.params.id
  const db = await dbConnection
  const dbCategory = await db.get(`SELECT * FROM categories WHERE id = ${id}`)
  res.render('admin/categories/edit', { category: dbCategory })
})

router.post('/category/edit', async (req, res) => {
  const { id, title } = req.body
  const db = await dbConnection
  await db.run(`UPDATE categories SET title = '${title}' WHERE id = ${id}`)
  res.redirect('/admin/categories')
})

router.get('/category/delete/:id', async (req, res) => {
  const id = req.params.id
  const db = await dbConnection
  await db.run(`DELETE FROM categories WHERE id = ${id}`)
  res.redirect('/admin/categories')
})

// Vacancies
router.get('/vacancies', async (req, res) => {
  const db = await dbConnection
  const dbCategories = await db.all('SELECT * FROM categories')
  const dbVacancies = await db.all('SELECT * FROM vacancies')

  const vacancies = dbVacancies.map((vacancy) => {
    return {
      ...vacancy,
      category: dbCategories.filter(
        (category) => category.id === vacancy.categories_id
      )[0],
    }
  })

  res.render('admin/vacancies', { vacancies })
})

router.get('/vacancy', async (req, res) => {
  const db = await dbConnection
  const dbCategories = await db.all('SELECT * FROM categories')
  res.render('admin/vacancies/register', { categories: dbCategories })
})

router.post('/vacancy', async (req, res) => {
  const { category, title, description } = req.body
  const db = await dbConnection
  await db.run(`INSERT INTO vacancies (categories_id, title, description)
    VALUES ('${category}', '${title}', '${description}')`)
  res.redirect('/admin/vacancies')
})

router.get('/vacancy/edit/:id', async (req, res) => {
  const id = req.params.id
  const db = await dbConnection
  const dbCategories = await db.all('SELECT * FROM categories')
  const dbVacancy = await db.get(`SELECT * FROM vacancies WHERE id = ${id}`)
  res.render('admin/vacancies/edit', {
    categories: dbCategories,
    vacancy: dbVacancy,
  })
})

router.post('/vacancy/edit', async (req, res) => {
  const { id, category, title, description } = req.body
  const db = await dbConnection
  await db.run(`UPDATE vacancies SET categories_id = '${category}', title = '${title}',
  description = '${description}' WHERE id = ${id}`)
  res.redirect('/admin/vacancies')
})

router.get('/vacancy/delete/:id', async (req, res) => {
  const id = req.params.id
  const db = await dbConnection
  await db.run(`DELETE FROM vacancies WHERE id = ${id}`)
  res.redirect('/admin/vacancies')
})

module.exports = router
