var Game = Backbone.Model.extend({

	defaults: {
		mode: 'survival',
		score: 0,
		duos: [],
		answers: [],
		isFinished: false,
	},
});
