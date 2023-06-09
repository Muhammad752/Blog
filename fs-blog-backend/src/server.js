import fs from 'fs'
import admin from 'firebase-admin'
import express from "express";
import { db, connectToDb } from "./db.js";
import cors from 'cors'
// let articlesInfo = [
//   { name: "learn-react", upvotes: 0, comments: [] },
//   { name: "learn-node", upvotes: 0, comments: [] },
//   { name: "mongodb", upvotes: 0, comments: [] },
// ];

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const app = express();

app.use(express.json());
app.use(cors())
app.use(async (req,res,next)=>{
  const {authtoken} = req.headers;

  if(authtoken){
    try{
      req.user=await admin.auth().verifyIdToken(authtoken);
    }
    catch(e){
      return res.sendStatus(400);
    }
  }
  req.user= req.user || {};
  next();
})



app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const {uid}=req.user;

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

// app.get('/hello/:name/goodbye/:otherName',(req,res)=>{
//     // console.log(req.params);
//     // const name=req.params.name;
//     const {name}=req.params;
//     res.send(`Hello ${name}!!`)
// });

// app.post('/hello',(req,res)=>{
//     console.log(req.params);
//     res.send('Hello '+req.body.name);
// });

// prevents the following endpoints from being accessed
app.use((req,res,next)=>{
  if(req.user){
    next()
  }
  else{
    res.sendStatus(401)
  }
})

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const {uid}=req.user;

  const article = await db.collection("articles").findOne({ name });
  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);
    if(canUpvote){
      await db.collection("articles").updateOne({ name }, 
          { 
            $inc: { upvotes: 1 }, 
            $push: {upvoteIds: uid}
          });
        article.upvotes++;
    }
      const updatedArticle = await db.collection("articles").findOne({ name });
      res.json(updatedArticle);
    } else {
      res.send(`Article ${name} doesn't exist`);
    }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const { email } = req.user;
  await db
    .collection("articles")
    .updateOne({ name }, { $push: { comments: { postedBy:email, text } } });
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send(`Article ${name} doesn't exist`);
  }
});

app.post("/api/articles/post/:name", async (req, res) => {
  const { name } = req.params;
  const {comments}= req.body;
  const doc = {
    name: name,
    upvotes: 0,
    comments: [...comments],
  };

  await db.collection("articles").insertOne(doc);
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.send(article);
  } else {
    res.send(`Article ${name} is not created`);
  }
});

app.post("/api/daily_notes/post",async (req,res)=>{
  const myNote=req.body;
  console.log(myNote);
  const title =myNote.title
  await db.collection("daily_notes").insertOne(myNote)
  const note = await db.collection("daily_notes").findOne({title})

  if(note){
    console.log(note);
    res.send(`Daily note ${title} is added`)
  }
  else{
    res.send(`Error,Daily note ${title} is not added`)
  }
})

app.post("/api/articles/post",async (req,res)=>{
  const newArticle=req.body;
  console.log(newArticle);
  const title =newArticle.title
  await db.collection("articles").insertOne(newArticle)
  const note = await db.collection("articles").findOne({title})

  if(note){
    console.log(note);
    res.send(`Daily note ${title} is added`)
  }
  else{
    res.send(`Error,Daily note ${title} is not added`)
  }
})



app.get("/api/daily_notes/getAll",async (req,res)=>{
  const note = await db.collection("daily_notes").find({}).toArray();
  if (note) {
    res.json(note);
  } else {
    res.sendStatus(404);
  }
})

app.get("/api/articles", async (req,res)=>{
  const articles = await db.collection("articles").find({}).toArray();
  if(articles){
    res.json(articles);
  }else{
    res.sendStatus(404)
  }
})

app.delete("/api/articles/delete/:name", async (req, res) => {
  const { name } = req.params;
  await db.collection("articles").deleteOne({ name });
  const article = await db.collection("articles").findOne({ name });

  if (!article) {
    res.send(`Article ${name} is deleted`);
  }
});

connectToDb(()=>{
    console.log("Successfully connected to the database");
    app.listen(8000, () => {
        console.log("Server is listening on port 8000");
    });
});


