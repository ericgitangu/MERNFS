import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'
const express = require('express')
const app = express()
const port = 8090

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],
    },
    'learn-node': {
        upvotes: 0,
        comments: [],
    },
    'middle-ware': {
        upvotes: 0,
        comments: [],
    },
}
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;

    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`);
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, comment } = req.body;
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({ username, comment });
    res.status(200).send(articlesInfo[articleName]);
})
async function getResults(collection, res) {
    const cursor = collection.find({});
    for await (const docs of cursor) {
        console.log(docs)
    }
}

app.get('/api/articles/:name/zips', async (req, res) => {
    const uri = "mongodb+srv://egitangu:f1x1n1t!@full-stack.om4jype.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    client.connect(err => {
        if(err) res.status(500).send('Error connecting to the DB')
        const collection = client.db("sample_guides").collection("planets")
        getResults(collection, res)
    })
})