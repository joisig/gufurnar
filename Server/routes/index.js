/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: '3D Giftcard Maker' });
};

exports.gen = function(req, res){
  res.render('generate', { title: 'Dude', 
  							code: req.body.code,
  							model: req.body.model
  						});
};