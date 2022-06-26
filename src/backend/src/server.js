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

app.get('/api/articles/:name', async (req, res) => {
    
        const articleName = req.params.name
        const uri = 'mongodb://127.0.0.1:27017'
        MongoClient.connect(uri, async (err, client) => {
            if(err) res.status(500).json({message: 'Error connecting to DB', err})
            const collection = client?.db("test").collection("articles")
            const cursor = collection?.find({name: articleName})
            for await (const doc of cursor) {
                res.status(200).json(doc);
            }
            client.close()
        })

})
app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name
    const uri = 'mongodb://127.0.0.1:27017'
    MongoClient.connect(uri, async (err, client) => {
        if(err) res.status(500).json({message: 'Error connecting to DB', err})
        const collection = client?.db("test").collection("articles")
        const cursor = collection?.find({name: articleName})
        for await (const doc of cursor) {
            collection?.updateOne({name: articleName}, { $set: { "upvotes" : doc.upvotes + 1 } })
        }
        const updatedCursor = collection?.find({name: articleName})
        for await (const doc of updatedCursor) {
            res.status(200).json(doc);
        }
    })
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, comment } = req.body;
    const articleName = req.params.name;
    const uri = 'mongodb://127.0.0.1:27017'
    MongoClient.connect(uri, async (err, client) => {
        if(err) res.status(500).json({message: 'Error connecting to DB', err})
        const collection = client?.db("test").collection("articles")
        const cursor = collection?.find({name: articleName})
        for await (const doc of cursor) {
            collection?.updateOne({name: articleName}, { $set: { "comments" : doc.comments.concat({username, comment}) } })
        }
        const updatedCursor = collection?.find({name: articleName})
        for await (const doc of updatedCursor) {
            res.status(200).json(doc);
        }
    })

})
async function getResults(collection, res) {
    const cursor = collection.find({});
    let result = []
    for await (const docs of cursor) {
        console.log(docs)
        result.push(docs)
    }
    res.status(200).json(result.map((item, key) => (
        `{'_id': ${item['_id']}},{'name': ${item['name']}},{'orderFromSun': ${item['orderFromSun']}},{'hasRings': ${item['hasRings']}},{'mainAtmosphere': ${item['mainAtmosphere']}},{'surfaceTemperatureC': 'min': ${item['surfaceTemperatureC'].min} 'max':${item['surfaceTemperatureC'].max} 'mean': ${item['surfaceTemperatureC'].mean}}`
    )))
}

app.get('/api/articles/:name/zips', async (req, res) => {
    const uri = "mongodb+srv://egitangu:f1x1n1t!@full-stack.om4jype.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    client.connect(err => {
        if(err) res.status(500).json({message: 'Error connecting to DB', err})
        const collection = client.db("sample_guides").collection("planets")
        getResults(collection, res)
    })
    client.close()
})