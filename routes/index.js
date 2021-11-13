


const express = require('express');
const router = express.Router();
const Meal=require("../models/Meal"); 
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);
//list of navbar
//MealList
router.get('/mealslist',  (req, res) =>
  res.render('mealslist',{
    message:""
  })); 
router.post("/mealslist",  (req, res) => {    
   var myData = new Meal(req.body);
    myData.userId = req._id;
    myData.save()
    .then(()=> {
        res.render("mealslist",{
          message:"succesfully added the Meal"
        })
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
}); 
//UpdateMeal
router.get('/updatemeal',  (req, res) =>
  res.render('updatemeal',{
    message:"Please fill all fields"
  })); 
router.get('/test',  (req, res) =>
  res.render('test',{
    message:"Please fill all fields"
  }));
//Meal Table
  router.get('/mealtable',async (req, res) =>{
  try {
    let mealModel;
    mealModel = await Meal.find({userId:req._id});
    
    //res.send(mealModel)
   res.render("mealtable", {
     mealjson: mealModel
    })
   
  } catch (e) {
    res.status(404).send({
      error: true,
      message: 'Something went wrong!!',
      errObj: e,
    });
  }
})
  
module.exports = router;
