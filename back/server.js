import {selectPessoas,selectSentiment,selectNegativeReason,selectReason,selectAirline} from "./tweet.js";

import express from 'express';
import cors from 'cors';

const app = express()
const PORT = 3000

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log("server has started on port ", PORT);
    });
  }
  catch (e){

  }
}

start ();
//middleware
app.use(cors());
app.use(express.json()); //req.body

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get("/tweet", async (req, res) => {
  let tweet = await selectPessoas();
  res.json(tweet);
});

app.get("/tweetSentiment", async (req, res) => {
  let tweet = await selectSentiment();
  res.json(tweet);
});

app.get("/tweetNegativeReason/:reason", async (req, res) => {
  const { reason } = req.params;
  let tweet = await selectNegativeReason(reason);
  res.json(tweet);
});

app.get("/tweetReason", async (req, res) => {
  let tweet = await selectReason();
  res.json(tweet);
});

app.get("/tweetAirline", async (req, res) => {
  let tweet = await selectAirline();
  res.json(tweet);
});



