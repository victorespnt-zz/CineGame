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
					<a href="#game" class="btn btn-lg btn-success">Play the game</a>\
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
