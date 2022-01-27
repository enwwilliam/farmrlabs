const express = require('express');
const md5 = require('md5');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Animal = mongoose.model('Animal');
const Crop = mongoose.model('Crop');
const Resource = mongoose.model('Resource');

exports.signup = async (req, res, next)=> {
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

exports.resetPassword = async(req, res, next)=>{
    try{
        const email = req.headers.email;
        const newPassword = md5(req.body.newPassword);


        await User.findOneAndUpdate({email: email}, {password: newPassword});
        res.status(200).json({message: "Success in resetting password"});

    }
    catch(err){
        res.send("404");
    }
}

exports.getAll = async (req, res, next)=>{
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
    catch(err){
        let error = new Error("Error in gathering data");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.getAnimals = async (req, res, next)=>{
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
        let error = new Error("Error in gathering animal data");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.getCrops = async (req, res, next)=>{
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
        let error = new Error("Error in gathering crop data");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.getResources = async (req, res, next)=>{
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
        let error = new Error("Error in gathering resource data");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.getSpecificAnimal = async(req, res, next)=>{
    try{
        let animal = await Animal.findById(req.params.animalId);
        res.status(200).json(animal);
    }
    catch(err){
        let error = new Error("Error in gathering specific animal object");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.getSpecificCrop = async(req, res, next)=>{
    try{
        let crop = await Crop.findById(req.params.cropId);
        res.status(200).json(crop);
    }
    catch(err){
        let error = new Error("Error in gathering specific crop object");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.getSpecificResource = async(req, res, next)=>{
    try{
        let resource = await Resource.findById(req.params.resourceId);
        res.status(200).json(resource);
    }
    catch(err){
        let error = new Error("Error in gathering specific resource object");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.addAnimal = async (req, res, next)=>{
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
        let error = new Error("Error in creating animal object");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.addCrop = async (req, res, next)=>{
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
        let error = new Error("Error in creating crop object");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.addResource = async (req, res, next)=>{
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
        let error = new Error("Error in creating resource object");
        error.httpStatusCode = 400;
        next(error);
    }
}

exports.updateAnimal = async(req, res, next)=>{

    const animal = await Animal.findOneAndUpdate({_id: req.params.animalId}, {$set:req.body},{new: true}, function(err, foundAnimal){
        if(err){
            let error = new Error("Error in updating animal object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json(foundAnimal);
        }
    })        
}

exports.updateCrop = async(req, res, next)=>{
 
    const crop = await Crop.findOneAndUpdate({_id: req.params.cropId}, {$set:req.body},{new: true}, function(err, foundCrop){
        if(err){
            let error = new Error("Error in updating crop object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json(foundCrop);
        }
    })        
}

exports.updateResource = async(req, res, next)=>{
 
    const resource = await Resource.findOneAndUpdate({_id: req.params.resourceId}, {$set:req.body},{new: true}, function(err, foundResource){
        if(err){
            let error = new Error("Error in updating resource object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json(foundResource);
        }
    })        
}

exports.deleteAnimal = async(req, res, next)=>{

    const animal = await Animal.findOneAndDelete({_id: req.params.animalId}, function(err, foundAnimal){
        if(err){
            let error = new Error("Error in deleting animal object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json({message: "Succeed in deleting animal object"});
        }
    })        
}

exports.deleteCrop = async(req, res, next)=>{
 
    const crop = await Crop.findOneAndDelete({_id: req.params.cropId}, function(err, foundCrop){
        if(err){
            let error = new Error("Error in deleting crop object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json({message: "Succeed in deleting crop object"});
        }
    })        
}

exports.deleteResource = async(req, res, next)=>{
    const resource = await Resource.findOneAndDelete({_id: req.params.resourceId}, function(err, foundResource){
        if(err){
            let error = new Error("Error in updating resource object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json({message: "Succeed in deleting resource object"});
        }
    })   
}

exports.deleteAllAnimals = async (req, res, next) =>{
    try{
        let user = await Animal.findOne({
            email:req.headers.email
        });
    
        await Animal.deleteMany({_user: user._id}).then(function(){
            res.status(200).json({message: "Succeed in deleting animal objects"});
        }).catch(function(err){
            let error = new Error("Error in deleting animal objects");
            error.httpStatusCode = 400;
            next(error);
        });
    }
    catch(err){
        let error = new Error("Error in deleting animal objects");
        error.httpStatusCode = 400;
        next(error);
    }   
}

exports.deleteAllCrops = async (req, res, next) =>{
    try{
        let user = await User.findOne({
            email:req.headers.email
        });
    
        await Crop.deleteMany({_user: user._id}).then(function(){
            throw new Error();
            res.status(200).json({message: "Succeed in deleting crop objects"});
        }).catch(function(err){
            let error = new Error("Error in deleting crop objects");
            error.httpStatusCode = 400;
            next(error);
        });
    }
    catch(err){
        let error = new Error("Error in deleting crop objects");
        error.httpStatusCode = 400;
        next(error);
    }   
}

exports.deleteAllResources= async (req, res, next) =>{
    try{
        let user = await User.findOne({
            email:req.headers.email
        });
    
        await Resource.deleteMany({_user: user._id}).then(function(){
            throw new Error();
            res.status(200).json({message: "Succeed in deleting resource objects"});
        }).catch(function(err){
            let error = new Error("Error in deleting resource objects");
            error.httpStatusCode = 400;
            next(error);
        });
    }
    catch(err){
        let error = new Error("Error in deleting resource objects");
        error.httpStatusCode = 400;
        next(error);
    }   
}

exports.useResource = async (req, res, next) =>{
    console.log(req.params.resourceId);
    let error;
    const resource = await Resource.findById(req.params.resourceId, function(err){
        if(err){
            error = new Error("Error in using resource object when getting resourceId");
            error.httpStatusCode = 400;
            next(error);
        }
    });

    try{
    let resourceLeft = parseInt(resource.quantity) - parseInt(req.body.quantityUsed);

    if(resourceLeft < 0) resourceLeft = 0;
    }
    catch(err){
        error = new Error("Error in using resource object");
        error.httpStatusCode = 400;
        next(error);
    }

    const resource2 = await Resource.findOneAndUpdate({_id: req.params.resourceId}, {$set: {quantity: resourceLeft}},{new: true}, function(err, foundResource){
        if(err){
            error = new Error("Error in using resource object");
            error.httpStatusCode = 400;
            next(error);

        }else{
            res.status(200).json(foundResource);
        }
    })       
}
