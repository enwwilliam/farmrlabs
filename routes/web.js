const express = require('express');
const router = express.Router();

const webController = require("../controllers/web");

router.get('/', (req, res)=>{
    res.render("../views/main.html");
});
router.post('/', ()=>{});


module.exports = router;