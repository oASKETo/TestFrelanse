import {openDb} from "./configDB.js";

export async function selectPessoas(){
    return  openDb().then(db=>{
          return db.all('SELECT text, airline, airline_sentiment FROM tweets;')
          .then(res=>res)
      });
    }

    export async function selectSentiment(){
      const query = "SELECT tweets.airline, count(tweets.airline_sentiment) as 'cntNeg', airN.cntNeut, airP.cntP from tweets " +
      "INNER JOIN (SELECT tweets.airline, count(tweets.airline_sentiment) as 'cntNeut' from tweets WHERE tweets.airline_sentiment='neutral' GROUP BY tweets.airline)airN on airN.airline = tweets.airline " +
      "INNER JOIN (SELECT tweets.airline, count(tweets.airline_sentiment) as 'cntP' from tweets WHERE tweets.airline_sentiment='positive' GROUP BY tweets.airline)airP on airP.airline = tweets.airline " +
      "WHERE tweets.airline_sentiment='negative' GROUP BY tweets.airline;"
      return  openDb().then(db=>{
            return db.all(query)
            .then(res=>res)
        });
      }

export async function selectNegativeReason(reason){
    return  openDb().then(db=>{
          return db.all("select count(negativereason) AS 'negativeReason' from tweets WHERE negativereason =? GROUP BY airline;",[reason])
          .then(res=>res)
      });
    }

export async function selectReason(){
    return  openDb().then(db=>{
          return db.all("select negativereason from tweets Where negativereason != '' GROUP BY negativereason;")
          .then(res=>res)
      });
    }

export async function selectAirline(){
    return  openDb().then(db=>{
          return db.all("select airline  from tweets  GROUP BY airline;")
          .then(res=>res)
      });
    }