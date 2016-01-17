// LA VUE


var GameView = Backbone.View.extend({

	el: '#app',

	events: {

		'click .answer': "onAnswer",
	},

	initialize : function() {
		$('#homeBox').empty();

		var that = this;
		this.game = new Game();
		this.DuoCollection = new DuoCollection();
		this.DuoCollection.fetch({
	  		success: function(){that.render()}
	  	});
	},

	pickNewDuo: function () {
		// TODO : Générer un numero alétoire entre 0 et le nombre total de duos dans la collection (this.DuoCollection.length)
		var randomNumber = 1;

		// TODO : Stocker dans une variable le duo choisi grâce au numero alétoire (this.DuoCollection.toJSON()[randomNumber])
		// console.log(this.DuoCollection.at(randomNumber));

		var duo = this.DuoCollection.at(1);

		return duo;
	},

	onAnswer: function (e) {
		e.preventDefault();

		var button = $(e.currentTarget);
		// récupère la réponse cliquée
		var answer = button.attr('data-answer');
		// récupère l'id du duo concerné
		var duoCid = button.attr('data-cid');
		// récupère le duo dans la collection
		var duo = this.DuoCollection.get(duoCid).toJSON();
		// récupère la bonne réponse
		var rightAnswer = duo.actor.isPresent;

		// test if right answer
		if (answer == rightAnswer) {
			// TODO Add one point to the player's score

		} else {
			// TODO Remove one point to the player's score

		}

		// TODO Save score in model (game.score)
		// TODO Save score in localStorage

		// display next question
		this.render();
	},

	getQuestionBoxTemplate: function (duo) {

		var movie = duo.toJSON().movie;
		var actor = duo.toJSON().actor;

		var questionBoxTemplate = '\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<h2>Was '+actor.name+' in '+movie.title+' ?</h2>\
					<hr>\
					<div class="image col-md-6" style="background-image:url('+actor.image+')">\
					<h3 class="actorName">'+actor.name+'</h3>\
					</div>\
					<div class="image col-md-6" style="background-image:url('+movie.poster+')">\
						<h3 class="movieTitle">'+movie.title+'</h3>\
					</div>\
					<hr>\
					<div class="answers">\
						<a class="answer btn btn-lg btn-success" data-cid="'+duo.cid+'" data-answer="true" >YES</a>\
						<a class="answer btn btn-lg btn-danger" data-cid="'+duo.cid+'" data-answer="false" >NO</a>\
					</div>\
				</div>\
			</div>\
		';

		return $(questionBoxTemplate);
	},

	render : function () {

		var duo = this.pickNewDuo();
		$questionBoxTemplate = this.getQuestionBoxTemplate(duo);

		$questionBox = this.$('#questionBox');

		$questionBox.empty();
		$questionBox.append($questionBoxTemplate);

	}
});
