const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Op } = require('sequelize');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.get('/jokes', async (req, res, next) => {
//   try {
//     // TODO - filter the jokes by tags and content
//     const jokes = await Joke.findAll();
//     res.send(jokes);
//   } catch (error) {
//     console.error(error);
//     next(error)
//   }
// });
// use where, op.like array
app.get('/jokes', async (req, res, next) => {
  try {
    if(Object.keys(req.query).length===0){
            const jokes = await Joke.findAll({});
            res.send(jokes);
          }
    else {
    const where = {};
    // TODO - filter the jokes by tags and content
    for (const key of  ['joke', 'tags']) {
      if (req.query[key]) {
        where[key] = {
          [Op.like]: `%${req.query[key]}%`
        }
      }
    }
    const jokes = await Joke.findAll(
      {where}
      // {where: {
      //   tags: {[Op.like]: `%${req.query.tags}%`}
      // }}
    );
    res.send(jokes);
  }
    // app.get('/jokes', async (req, res, next) => {
    //   try {
    //     if(Object.keys(req.query).length===0){
    //       const jokes = await Joke.findAll({});
    //       res.send(jokes);
    //     }
    //     else {
    //       const where = {};
    //       const jokes = await Joke.findAll(
    //         {where:{tags:'dad'}
    //         }
    //       )
    //     }
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;