import { MongoClient } from "mongodb";

let db;

async function connectToDb(cb) {
  const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@fullstackblog.ojz7jan.mongodb.net/?retryWrites=true&w=majority`);
  await client.connect();
  db = client.db("react-blog-db"); // use react-blog-db //in the shell
  cb();
}

export { db, connectToDb };
