var HomeView = Backbone.View.extend({

	el: '#app',

	events: {

	},

	initialize : function() {


		this.render();


	},

	getHomeTemplate: function () {
		var template = '\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<a href="#game/survival" class="btn btn-lg btn-success">Play survival mode</a>\
					<a href="#game/10points" class="btn btn-lg btn-success">Play in 10 points</a>\
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
