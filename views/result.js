var ResultView = Backbone.View.extend({

	el: '#app',

	events: {

	},

	initialize : function(options) {
		$('#app > div').empty();

		this.game = options.game;
		// console.log(this.game);

		this.score = this.game.get('score');
		// console.log('score of the game : '+this.score);

		this.render();

	},

	getResultTemplate: function () {
		template = '\
			<h2>score = '+this.score+'</h2>\
		';
	},

	render : function () {
		$resultBox = this.$('#resultBox');
		$resultTemplate = this.getResultTemplate();

		$resultBox.empty();
		$resultBox.append($resultTemplate);
	},
});
