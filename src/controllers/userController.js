const userModel = require('../models/userModel');
const niv = require('node-input-validator');
const messages = require('../configs/messages.json');

exports.login = (req, res) => {
    const v = new niv.Validator(req.body, {
      userName: 'required',
      password: 'required',
    });
    v.check().then(async (matched) => {
      if (!matched) {
        res.status(400).send({
          "status": 400,
          "message": Object.values(v.errors)[0].message
        });
      } else {
        let data = req.body;
        userModel.login(data, function (error, result) {
          if (error) {
            res.status(500).send({
              "status": 500,
              "message": error
            });
          } else {
            res.status(200).send({
              "status": 200,
              "message": messages.loginSuccess,
              "result":{token:result}
            })
          }
        })
      }
    });
  
  }