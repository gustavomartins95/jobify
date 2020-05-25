const dbConnection = require('./connection')

module.exports = async () => {
  const db = await dbConnection

  // Tables
  await db.run(
    'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, title TEXT)'
  )

  await db.run(
    'CREATE TABLE IF NOT EXISTS vacancies (id INTEGER PRIMARY KEY, categories_id INTEGER, title TEXT, description TEXT)'
  )

  // Categories
  const categoryOne = 'Engineering team'
  await db.run(`INSERT INTO categories (title) VALUES ('${categoryOne}')`)

  const categoryTwo = 'Marketing team'
  await db.run(`INSERT INTO categories (title) VALUES ('${categoryTwo}')`)

  // Vacancies
  const titleOne = 'Fullstack Developer (Remote)'
  const descriptionOne = 'This position is either Remote or at our New York City headquarters.'
  await db.run(
    `INSERT INTO vacancies (categories_id, title, description) VALUES (1, '${titleOne}', '${descriptionOne}')`
  )

  const titleTwo = 'Digital Marketing (San Francisco)'
  const descriptionTwo = 'Here at NC we are more than a team, priding ourselves on our diverse range of nationalities and backgrounds. Family, partnership, universal principles, and a passion for technology.'
  await db.run(
    `INSERT INTO vacancies (categories_id, title, description) VALUES (2, '${titleTwo}', '${descriptionTwo}')`
  )

  const titleThree = 'Fullstack Developer'
  const descriptionThree = 'We firmly believe in creativity and innovation and that a fundamental requirement for a successful and happy company is having the right mix of individuals. With the right people in the right environment anything and everything is possible.'
  await db.run(
    `INSERT INTO vacancies (categories_id, title, description) VALUES (1, '${titleThree}', '${descriptionThree}')`
  )
}
