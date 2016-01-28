var GamesCollection = Backbone.Collection.extend({

	model: Game,
	localStorage: new Backbone.LocalStorage("GamesCollection"),

});
