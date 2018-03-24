const express = require('express');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/stackoverflow';
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl);
const db = mongoose.connection;

const questionSchema = mongoose.Schema({
    author: String,
    title: String,
    message: String,
    date: { type: String, default: Date.now },
    answers: [{
        author: String,
        message: String,
        date: { type: String, default: Date.now }
    }]
});

const Question = mongoose.model('Question', questionSchema);

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('css'))

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.redirect('/question'));

app.get('/question/:id', (req, res) => {
    Question.findOne({
        _id: req.params.id
    }).then(q => {
        res.render('question', { question: q });
    });
});

app.post('/question/:id', (req, res) => {
    Question.findOne({
        _id: req.params.id
    }).then(q => {
        q.answers.push({
            author: req.body.name,
            message: req.body.answer
        });
        return q.save();
    }).then(q => {
        res.render('question', { question: q });
    });
});

app.get('/question', (req, res) => {
    Question.find().sort({ date: -1 })
        .then(quests => {
            console.log(quests);
            res.render('questions', { questions: quests });
        });
});

app.post('/question', (req, res) => {
    const q = new Question({
        author: req.body.name,
        title: req.body.title,
        message: req.body.message,
        answers: []
    });
    q.save()
        .then(quest => Question.find())
        .then(quests => {
            res.render('questions', { questions: quests });
        });
});

app.get('*', (req, res) => {
    res.send('Not found');
});

app.listen(3000, () => console.log('App started on http://localhost:3000'));