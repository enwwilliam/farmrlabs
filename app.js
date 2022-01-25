const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML =  require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');

require('./models/User');
require('./models/Animal');
require('./models/Resource');
require('./models/Crop');
const developerRoutes = require('./routes/developer');
const webRoutes = require("./routes/web")

app.use(bodyParser.json()); //for application/json

mongoose.connect("mongodb://new_user1:" + process.env.MONGO_SECRET + "@cluster0-shard-00-00.ioc53.mongodb.net:27017,cluster0-shard-00-01.ioc53.mongodb.net:27017,cluster0-shard-00-02.ioc53.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-10i9e6-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true});


app.use("/v1/", webRoutes);

app.use("/v1/developer", developerRoutes);

app.use("/api-specs",  swaggerUi.serve);
app.get("/api-specs", swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) =>{
    res.write("<h1>Farmr Labs</h1>")
    res.write("Farmr Labs is a REST API farm management software<br>");
    res.write("Helps farmer manage livestocks, crops, and resources.<br><br>")
    res.write("Go to this link to learn more:<br>")
    res.write("<a href=/api-specs target='_blank'>API Specifications</a>")
    res.send();
})

app.listen(process.env.PORT || 2000, ()=>{
    console.log("Server started at port 2000");
})