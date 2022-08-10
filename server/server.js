const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
// app.use(express.static(__dirname + '/public'));

// app.use('/hello', (req, res) => {
//     res.send('Hello Express')
// });

let todos = [];
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/todo', (req, res) => {
    res.send('Hello Express')
});

app.post('/todo', (req, res) => {
    const todo = req.body;
    console.log(todo);
    todos.push(todo);
    res.send('To do is added to the database');
});

app.listen(port,() =>{
    console.log('running on port:',port)
})

// app.listen(process.env.PORT || 3000)