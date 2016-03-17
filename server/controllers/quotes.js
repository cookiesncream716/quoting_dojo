var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	show: function(req, res){
		User.find({}, function(err, users){
			res.render('main', {quotes: users});
		})
	},
	create: function(req, res){
		var user = new User({name: req.body.name, quote: req.body.quote});
		user.save(function(err){
			if(err){
				console.log('did not save');
				res.render('error', {error: user.errors});
			} else{
				console.log('saved');
				res.redirect('/quotes');
			}
		})
	}
}