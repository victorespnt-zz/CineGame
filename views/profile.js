var ProfileView = Backbone.View.extend({

	el: '#app',

	events: {

	},

	initialize : function() {

		$('#app > div').empty();

		this.DuoCollection = new DuoCollection();
		this.GamesCollection = new GamesCollection();
		this.GamesCollection.fetch();


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

	getHomeTemplate: function () {
		var gamesPlayed = this.GamesCollection.length;
		var stats = this.getStats();
		var rightAnswers = stats.rightAnswersCount;
		var wrongAnswers = stats.wrongAnswersCount;
		var average = Math.round(rightAnswers * 100 / stats.duosCount);

		this.GamesCollection.each(function(game) {

		});

		var statsBox = '\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<h2>You played '+gamesPlayed+' games !</h2>\
					<h2>Your average is '+average+'% of good answers !</h2>\
					<div class="movieList"></div>\
				</div>\
		';
		var movieListBox = '\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<div class="movieList"></div>\
				</div>\
			</div>\
		';
		var template = statsBox + movieListBox;
		return $(template);
	},

	render : function () {

		var $homeBox = this.$('#homeBox');
		var $homeTemplate = this.getHomeTemplate();

		$homeBox.empty();
		$homeBox.append($homeTemplate);

	},
});
