const express = require('express');
const compression = require('compression')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const http = require('http');
// app.use(express.static(__dirname + '/public'));

// app.use('/hello', (req, res) => {
//     res.send('Hello Express')
// });

let todos = [];
let quote = [];
app.use(cors());
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/todo', (req, res) => {
    res.json(todos);
});

app.post('/todo', (req, res) => {
    const todo = req.body;
    console.log(todo);
    todos.push(todo);
    res.send('To do is added to the database');
});

app.post('/todo/:ID', (req, res) => {
    const ID = req.params.ID;
    const newTodo = req.body;

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        if (todo.ID === ID) {
            todos[i] = newTodo;
        }
    }

    res.send('Todo is edited');
});

app.delete('/todo/:ID', (req, res) => {
    // Reading id from the URL
    const ID = req.params.ID;

    // Remove item from the todos array
    todos = todos.filter(i => {
        if (i.ID !== ID) {
            return true;
        }
        return false;
    });

    res.send('todo is deleted');
});

// app.listen(process.env.PORT || 3000)

const httpsServer = https.createServer({
    key: fs.readFileSync('../client/key.pem'),
    cert: fs.readFileSync('../client/cert.pem'),
  }, app);

const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log('HTTP Server running on port 3000');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});