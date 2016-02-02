var ResultView = Backbone.View.extend({

	el: '#app',

	events: {
	},

	initialize : function(options) {
		$('#app > div').empty();

		this.GamesCollection = new GamesCollection();
		this.GamesCollection.fetch();

		this.game = options.game;
		// console.log(this.game);

		this.score = this.game.get('score');
		// console.log('score of the game : '+this.score);

		this.render();

	},

	getStats: function () {
		var stats = {};
		stats.duosCount = 0;
		stats.rightAnswersCount = 0;
		this.GamesCollection.each(function(game) {
			var duos = game.get('duos');
			stats.duosCount = stats.duosCount + duos.length;

			var score = game.get('score');
			stats.rightAnswersCount = stats.rightAnswersCount + score;
		});
		stats.wrongAnswersCount = stats.duosCount - stats.rightAnswersCount;
		return stats;
	},

	getResultTemplate: function () {

		var gamesPlayed = this.GamesCollection.length;
		var stats = this.getStats();
		var rightAnswers = stats.rightAnswersCount;
		var wrongAnswers = stats.wrongAnswersCount;
		var average = Math.round(rightAnswers * 100 / stats.duosCount);

		var template = '\
			<h2>Your final score is '+this.score+'</h2>\
			<hr>\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<h2>You played '+gamesPlayed+' games !</h2>\
					<h2>Your average is '+average+'% of good answers !</h2>\
					<div class="movieList"></div>\
				</div>\
			</div>\
		';
		return $(template);
	},

	render : function () {
		$resultBox = this.$('#resultBox');
		$resultTemplate = this.getResultTemplate();

		$resultBox.empty();
		$resultBox.append($resultTemplate);
	},
});
