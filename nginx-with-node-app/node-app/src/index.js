const http = require('http')

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'appdb',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)
const createTableCommand = 'create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));'
connection.query(createTableCommand)
connection.end()

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') {
        const randomUser = `User ${Math.floor(Math.random() * 1e6)}`
        const connection = mysql.createConnection(config)
        const insertQuery = `INSERT INTO people(name) values ("${randomUser}");` //Move to POST
        connection.query(insertQuery)

        var html = '<h1>Full Cycle Rocks!!</h1>'

        getPeople(connection).then((result) => {
            html += '<table>'

            result.forEach((row) => {
                html += '<tr>'
                html += `<td>${row.id}</td>`
                html += `<td>${row.name}</td>`
                html += '</tr>'
            })

            html += '</table>'
            console.log('Html:')
            console.log(html)

            connection.end()

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html)
        }).catch((err) => {
            res.end(err)
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Page not found')
    }
})

const port = 3000

server.listen(port, () => {
    console.log(`Running on port ${port}`)
})

function getPeople(connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM people', (err, rows) => {
            if (err) {
                reject(err)
            }

            console.log('Data received from Db:')
            console.log(rows)
            resolve(rows)
        })
    })
}