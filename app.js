var AppRouter = Backbone.Router.extend({
	routes: {
	    "": "index",
	    "home": "index",
	    "game/:mode": "game",
		"profile": "profile",
	},

	index: function () {
		var home = new HomeView();
	},
	game: function (mode) {
		var game = new GameView({'mode':mode});
	},
	profile: function () {
		var profile = new ProfileView();
	},

});
// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();
