//LA COLLECTION

var duoCollection = Backbone.Collection.extend({

	//On a juste à lui passer le modèle
	model: duo,
	localStorage: new Backbone.LocalStorage("DuoCollection")

});