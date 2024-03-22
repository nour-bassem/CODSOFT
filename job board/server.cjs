const express = require('express');
const { MongoClient } = require('Jobs');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/Jobs';

app.use(express.static('public'));

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db('Jobs');
        const collection = db.collection('Job_Collections');

        app.get('/search', (req, res) => {
            const query = req.query.searchTerm;
            collection.find({ /* Your search criteria here */ }).toArray((err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal Server Error' });
                } else {
                    res.json(results);
                }
            });
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
