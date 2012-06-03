/*
 * GET home page.
 */

var repo = require('../repository');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.form = function(req, res) {
  res.render('join-form', { title: 'Express' });
};

exports.joins = function(req, res) {
  repo.hasNameAndEmail(req.body, res);
};
