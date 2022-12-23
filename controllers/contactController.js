const contactModel = require('../models/contactModel');
const niv = require('node-input-validator');
const messages = require('../configs/messages.json');

exports.createContact = (req, res) => {
  const v = new niv.Validator(req.body, {
    firstName: 'required',
    lastName: 'required',
    email: 'required|email',
    phone: 'required',
    address: 'required',
    city: 'required',
    state: 'required',
    country: 'required',
    zipCode: 'required'
  });
  v.check().then(async (matched) => {
    if (!matched) {
      res.status(400).send({
        "status": 400,
        "message": Object.values(v.errors)[0].message
      });
    } else {
      let data = req.body;
      contactModel.createContact(data, function (error, result) {
        if (error) {
          res.status(500).send({
            "status": 500,
            "message": error
          });
        } else {
          res.status(200).send({
            "status": 200,
            "message": messages.generalSuccess
          })
        }
      })
    }
  });

}

exports.updateContact = (req, res) => {

  const v = new niv.Validator(req.body, {
    id: 'required',
    firstName: 'required',
    lastName: 'required',
    email: 'required|email',
    phone: 'required',
    address: 'required',
    city: 'required',
    state: 'required',
    country: 'required',
    zipCode: 'required'
  });
  v.check().then(async (matched) => {
    if (!matched) {
      res.status(400).send({
        "status": 400,
        "message": Object.values(v.errors)[0].message
      });
    } else {
      let data = req.body;
      contactModel.updateContact(data, function (error, result) {
        if (error) {
          res.status(500).send({
            "status": 500,
            "message": error
          });
        } else {
          res.status(200).send({
            "status": 200,
            "message": messages.generalSuccess
          })
        }
      })
    }
  });

}


exports.viewContact = (req, res) => {
  let data = req.params;
      contactModel.viewContact(data, function (error, result) {
        if (error) {
          res.status(500).send({
            "status": 500,
            "message": error
          });
        } else {
          res.status(200).send({
            "status": 200,
            "message": messages.generalSuccess,
            "result":result
          })
        }
      })

}

exports.listContact = function (req, res) {
  let data = {};
  contactModel.listContact(data, function (error, results) {
    if (error) {
      res.status(500).send({
        "status": 500,
        "message": error
      });
    } else {
      res.status(200).send({
        "status": 200,
        "message": messages.generalSuccess,
        "result":results
      })
    }
  });

}


exports.deleteContact = function (req, res) {
  let data = req.params;
  contactModel.deleteContact(data, function (error, results) {
    if (error) {
      res.status(500).send({
        "status": 500,
        "message": error
      });
    } else {
      res.status(200).send({
        "status": 200,
        "message": messages.generalSuccess,
      })
    }
  });

}