const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');

const developerController = require("../controllers/developer");
const auth = require("../middleware/auth").auth;
const User = mongoose.model('User');
const Animal = mongoose.model('Animal');
const Crop = mongoose.model('Crop');
const Resource = mongoose.model('Resource');

//sign up to farmr lab
router.post('/signup', developerController.signup);

//reset password
router.post('/reset-password', auth,developerController.resetPassword);

//get all objects (animals, crops, and resources)
router.get('/', auth, developerController.getAll);


//get animal objects
router.get('/animal', auth, developerController.getAnimals);

//get crop objects
router.get('/crop', auth, developerController.getCrops);

//get specific animal
router.get('/animal/:animalId', auth, developerController.getSpecificAnimal);

//get specific crop
router.get('/crop/:cropId', auth, developerController.getSpecificCrop);

//get specific animal
router.get('/resource/:resourceId', auth, developerController.getSpecificResource);

//get resource objects
router.get('/resource', auth, developerController.getResources);


//create animal object
router.post('/animal', auth, developerController.addAnimal);

//create crop object
router.post('/crop', auth, developerController.addCrop);

//create resource object
router.post('/resource', auth, developerController.addResource);


//patch animal object
router.patch('/animal/:animalId', auth, developerController.updateAnimal);

//patch crop object
router.patch('/crop/:cropId', auth, developerController.updateCrop);

//patch resource object
router.patch('/resource/:resourceId', auth, developerController.updateResource);


// //delete all animal objects
router.delete('/animal/', auth, developerController.deleteAllAnimals);

// //delete all crop objects
router.delete('/crop/', auth, developerController.deleteAllCrops);

// //delete all resource objects
router.delete('/resource/', auth, developerController.deleteAllResources);

//delete animal object
router.delete('/animal/:animalId', auth, developerController.deleteAnimal);

//delete crop object
router.delete('/crop/:cropId', auth, developerController.deleteCrop);

//delete resource object
router.delete('/resource/:resourceId', auth, developerController.deleteResource);


//automate using resources
router.patch('/use/resource/:resourceId', auth, developerController.useResource);

router.get('/example', (req, res)=>{
    res.status(200).json(
    {
        "animals": [
            {
                "_id": "61ec9c4552839ab815e973c0",
                "name": "chicken 1",
                "integerOnly": 52,
                "intervalFood": 10,
                "_user": "61ec891bc33069c7ee49cd01",
                "schedule": "2022-01-23T00:07:33.357Z",
                "createdAt": "2022-01-23T00:07:33.361Z",
                "__v": 0
            },
            {
                "_id": "61ecdd3ee71068c4b0a85ead",
                "name": "cow 1",
                "integerOnly": 4,
                "intervalFood": 3,
                "_user": "61ec891bc33069c7ee49cd01",
                "schedule": "2022-01-23T04:44:46.935Z",
                "createdAt": "2022-01-23T04:44:46.935Z",
                "__v": 0
            }
        ],
        "crops": [
            {
                "_id": "61ec9d1d862988febd728b92",
                "name": "rice 1",
                "quantity": 40,
                "unit": "square feet",
                "intervalGive": 10,
                "_user": "61ec891bc33069c7ee49cd01",
                "schedule": "2022-01-23T00:11:09.337Z",
                "createdAt": "2022-01-23T00:11:09.337Z",
                "__v": 0
            }
        ],
        "resources": [
            {
                "_id": "61ec9fcac0577fabd4234ea7",
                "name": "water 1",
                "quantity": 475,
                "unit": "Liter",
                "_user": "61ec891bc33069c7ee49cd01",
                "createdAt": "2022-01-23T00:22:34.419Z",
                "__v": 0
            }
        ]
    }
    )
})


//put animal object
// router.patch('/animal/:')
module.exports = router;