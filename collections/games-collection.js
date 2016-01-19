//LA COLLECTION
window.GamesCollection = Backbone.Collection.extend({

  localStorage: new Backbone.LocalStorage("GamesCollection"),
  model: Game,
 

});