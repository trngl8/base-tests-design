const express = require('express');

const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'testsuser',
    host: 'localhost',
    database: 'tests',
    password: 'testpass',
    dialect: 'postgres',
    port: 5432
});
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { username, email } = request.body

    pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}


const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})


app.get('/users', getUsers)
app.post('/users', createUser)


const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
})