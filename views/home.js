var HomeView = Backbone.View.extend({

	el: '#app',

	events: {

	},

	initialize : function() {
		$('#app > div').empty();

		this.render();
	},

	getHomeTemplate: function () {
		var template = '\
			<div class="panel panel-default col-md-8 col-md-offset-2">\
				<div class="panel-body">\
					<h2 class="text-center">Welcome to CineGame<br><small>How much do you know about movies ?</small></h2>\
					<hr>\
					<a href="#game/survival" class="btn btn-lg btn-success col-md-5">Play survival mode</a>\
					<a href="#game/10points" class="btn btn-lg btn-success col-md-5 col-md-offset-2">Play in 10 points</a>\
				</div>\
			</div>\
		';
		return $(template);
	},

	render : function () {

		var $homeBox = this.$('#homeBox');
		var $homeTemplate = this.getHomeTemplate();

		$homeBox.empty();
		$homeBox.append($homeTemplate);

	},
});
