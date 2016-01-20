var AppRouter = Backbone.Router.extend({
	routes: {
	    "": "index",
	    "game": "game",
	},

	index: function () {
		var home = new HomeView();
	},
	game: function () {
		var game = new GameView();
	},
	game: function (mode) {
		var game = new GameView({'mode':mode});
	},

});
// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
