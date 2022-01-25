const express = require('express');
const md5 = require('md5');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Animal = mongoose.model('Animal');
const Crop = mongoose.model('Crop');
const Resource = mongoose.model('Resource');

exports.signup = async (req, res)=> {
    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = md5(req.body.password);

    const user = new User({
        name, 
        email,
        password
    })

        await user.save();
        console.log("Account Created");
        res.status(200).json({message: name + " account created"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "Error in signing up"})
    }
}

exports.getAll = async (req, res)=>{
    // console.log(req.body);
    try{
        console.log(req.headers.email);
    let user = await User.findOne({
        email: req.headers.email
    });
    let animals = await Animal.find({
        _user: user._id
    });
    let crops = await Crop.find({
        _user: user._id
    });
    let resources = await Resource.find({
        _user: user._id
    });

    res.status(200).json({
        animals: animals,
        crops: crops,
        resources: resources
    });
    }
    catch{
        res.status(400).json({message: "Error in gathering data"})
    }
}

exports.getAnimals = async (req, res)=>{
    // console.log(req.body);
    try{
    let user = await User.findOne({
        email: req.headers.email
    });
    let animals = await Animal.find({
        _user: user._id
    });

    res.status(200).json({
        animals: animals
    });
    }
    catch(err){
        res.status(400).json({message: "Error in gathering animal data"})
    }
}

exports.getCrops = async (req, res)=>{
    // console.log(req.body);
    try{
    let user = await User.findOne({
        email: req.headers.email
    });
    let crops = await Crop.find({
        _user: user._id
    });
    res.status(200).json({
        crops: crops,
    });
    }
    catch(err){
        res.status(400).json("Error in gathering crop data");
    }
}

exports.getResources = async (req, res)=>{
    // console.log(req.body);
    try{
    let user = await User.findOne({
        email: req.headers.email
    });
    let resources = await Resource.find({
        _user: user._id
    });
    res.status(200).json({
        resources: resources,
    });
    }
    catch(err){
        res.status(400).json("Error in gathering resource data")
    }
}

exports.getSpecificAnimal = async(req, res)=>{
    try{
        let animal = await Animal.findById(req.params.animalId);
        res.status(200).json(animal);
    }
    catch(err){
            res.status(400).json("Error in gathering specific animal object")
    }
}

exports.getSpecificCrop = async(req, res)=>{
    try{
        let crop = await Crop.findById(req.params.cropId);
        res.status(200).json(crop);
    }
    catch(err){
        res.status(400).json("Error in gathering specific crop object")
    }
}

exports.getSpecificResource = async(req, res)=>{
    try{
        let resource = await Resource.findById(req.params.resourceId);
        res.status(200).json(resource);
    }
    catch(err){
        res.status(400).json("Error in gathering specific resource object")
    }
}

exports.addAnimal = async (req, res)=>{
    try {
    let user = await User.findOne({
        email:req.headers.email
    });
    const animal = new Animal({
        name: req.body.name,
        integerOnly: parseInt(req.body.quantity),
        intervalFood: parseInt(req.body.intervalFood),
        _user: user._id
    });
        await animal.save();
        res.status(200).json(animal);
    } catch (err) {
        res.status(400).json({message: "Error in creating animal object"});
    }
}

exports.addCrop = async (req, res)=>{
    try {

    let user = await User.findOne({
        email:req.headers.email
    });
    const crop = new Crop({
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        unit: req.body.unit,
        intervalGive: parseInt(req.body.intervalGive),
        _user: user._id
    });
        await crop.save();
        res.status(200).json(crop);
    } catch (err) {
        res.status(400).json({message: "Error in creating crop object"});
    }
}

exports.addResource = async (req, res)=>{
    try {

    let user = await User.findOne({
        email:req.headers.email
    });
    const resource = new Resource({
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        unit: req.body.unit,
        _user: user._id
    });
        await resource.save();
        res.status(200).json(resource);
    } catch (err) {
        res.status(400).json({message: "Error in creating resource object"});
    }
}

exports.updateAnimal = async(req, res, next)=>{

    const animal = await Animal.findOneAndUpdate({_id: req.params.animalId}, {$set:req.body},{new: true}, function(err, foundAnimal){
        if(err){
            res.status(400).json({message: "Error in updating animal object"});

        }else{
            res.status(200).json(foundAnimal);
        }
    })        
}

exports.updateCrop = async(req, res, next)=>{
 
    const crop = await Crop.findOneAndUpdate({_id: req.params.cropId}, {$set:req.body},{new: true}, function(err, foundCrop){
        if(err){
            res.status(400).json({message: "Error in updating crop object"});

        }else{
            res.status(200).json(foundCrop);
        }
    })        
}

exports.updateResource = async(req, res, next)=>{
 
    const resource = await Resource.findOneAndUpdate({_id: req.params.resourceId}, {$set:req.body},{new: true}, function(err, foundResource){
        if(err){
            res.status(400).json({message: "Error in updating resource object"});

        }else{
            res.status(200).json(foundResource);
        }
    })        
}

exports.deleteAnimal = async(req, res, next)=>{

    const animal = await Animal.findOneAndDelete({_id: req.params.animalId}, function(err, foundAnimal){
        if(err){
            res.status(400).json({message: "Error in deleting animal object"});

        }else{
            res.status(200).json({message: "Succeed in deleting animal object"});
        }
    })        
}

exports.deleteCrop = async(req, res, next)=>{
 
    const crop = await Crop.findOneAndDelete({_id: req.params.cropId}, function(err, foundCrop){
        if(err){
            res.status(400).json({message: "Error in deleting crop object"});

        }else{
            res.status(200).json({message: "Succeed in deleting crop object"});
        }
    })        
}

exports.deleteResource = async(req, res, next)=>{
 
    const resource = await Resource.findOneAndDelete({_id: req.params.resourceId}, function(err, foundResource){
        if(err){
            res.status(400).json({message: "Error in deleting resource object"});

        }else{
            res.status(200).json({message: "Succeed in deleting resource object"});
        }
    })        
}

exports.useResource = async (req, res, next) =>{
    console.log(req.params.resourceId);
    const resource = await Resource.findById(req.params.resourceId, function(err){
        if(err){
            res.status(400).json({message: "Error in using resource object when getting resourceId"});
        }
    });

    try{
    let resourceLeft = parseInt(resource.quantity) - parseInt(req.body.quantityUsed);

    if(resourceLeft < 0) resourceLeft = 0;
    }
    catch(err){
        res.status(400).json({message: "Error in using resource object"});
    }

    const resource2 = await Resource.findOneAndUpdate({_id: req.params.resourceId}, {$set: {quantity: resourceLeft}},{new: true}, function(err, foundResource){
        if(err){
            res.status(400).json({message: "Error in using resource object"});

        }else{
            res.status(200).json(foundResource);
        }
    })       
}

// exports.deleteAllAnimals = async (req, res, next) =>{
    
// }