const { MongoClient } = require('mongodb');


const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);
let db = null ;
export async function run() {
  await client.connect();
  db = client.db('study-buddy')
  return db;
}
client.close();