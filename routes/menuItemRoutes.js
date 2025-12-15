const express = require('express');
const router = express();
const MenuItem = require('../models/MenuItem');

router.post('/', async(req, res)=>{
   try{
        const data = req.body //Assuming the request body constains the person data 

        //Create a new person to the database
        const newMenuItem = new MenuItem(data);

        //Save the new pweson to the database
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);
   }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
   }
})


router.get('/', async (req, res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:taste', async (req, res) => {
  try {
    const tasteType = req.params.taste;

    // Allowed tastes
    if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
      const data = await MenuItem.find({ taste: tasteType });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'Invalid taste type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;