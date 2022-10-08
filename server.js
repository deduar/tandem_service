const express = require('express');
const app = express();
const Twit = require('twit')

const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req, res) => {

    const T = new Twit({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token: process.env.access_token,
        access_token_secret: process.env.access_token_secret,
        timeout_ms: 60 * 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    });

    T.get('search/tweets', { q:"#farina", count:10 }, function (err, data, response) {
        res.json(data.statuses.map(tweet => tweetToDTO(tweet)));
    });

});


function tweetToDTO(tweet){
    return({
        id: tweet.id,
        created_at: tweet.created_at,
        text: tweet.text
    });
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});

