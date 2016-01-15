// LA VUE


var DuoGameView = Backbone.View.extend({
	
	el: '#app',

	events: {

	},

	getPost: function(){
    var that = this;
    this.collection.fetch(
    {
        success: function () {
             console.log(that.collection.toJSON());
        },
        error: function() {
             console.log('Failed to fetch!');
        }
   });
},

	initialize : function() {
		
		

	},

	render : function () {

	}
});

