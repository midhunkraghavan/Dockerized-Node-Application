const express = require('express');
const router = express.Router();

let contactRouter = require('./contact')
let userRouter = require('./user')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Nodejs Test Project'
    });
});

router.use('/', (req, res, next) => {
    if (req.method == "OPTIONS") {
        res.sendStatus(200)
        return
    }
    if ((req.method == 'POST') && (!req.is('application/json') && !req.is('multipart/form-data'))) {
        res.status(400).send({
            status: "failed",
            message: "The request content type should be 'application/json' or 'multipart/form-data'"
        });
    } else {
        next();
    }
});

router.use('/', contactRouter)
router.use('/', userRouter)
module.exports = router;