// LA VUE


var GameView = Backbone.View.extend({

	el: '#app',

	events: {

		'click .answer': "onAnswer",


	},

	initialize : function() {

		this.DuoCollection = new DuoCollection();
		this.DuoCollection.fetch();

		this.duo = this.pickNewDuo();


		this.render();


	},

	pickNewDuo: function () {
		// TODO : Générer un numero alétoire entre 0 et le nombre total de duos (this.DuoCollection.length)
		var randomNumber = 0;

		// TODO : Stocker dans une variable le duo choisi grâce au numero alétoire (this.DuoCollection.toJSON()[randomNumber])
		this.duo = null;

		return this.duo;
	},

	onAnswer: function (e) {
		e.preventDefault();

		var button = $(e.currentTarget());
		// récupère la réponse cliquée
		var answer = button.attr('data-answer');
		// récupère l'id du duo concerné
		var duoId = button.attr('data-id');
		// récupère le duo dans la collection
		var duo = this.DuoCollection.find(duoId);
		// récupère la bonne réponse
		var rightAnswer = duo.actor.isPresent;

		// test if right answer
		if (answer === rightAnswer) {
			// TODO Add one point to the player's score

		} else {
			// TODO Remove one point to the player's score

		}

		// TODO Save score in model (player.score)
		// TODO Save score in localStorage

		// display next question
		this.duo = this.pickNewDuo();
		this.render();
	},

	getQuestionBoxTemplate: function (duo) {

		var movie = duo.movie;
		var actor = duo.actor;

		// TODO Retrouver l'id du duo dans la collection
		var duoId = null;

		var questionBoxTemplate = '\
			<div class="panel panel-default">\
				<div class="panel-header"><h2>Was '+actor.name+' in '+movie.title+' ?</h2></div>\
				<div class="panel-body">\
					<div class="image col-md-6" style="background-image=url('+movie.poster+')">\
						<h3 class="movieTitle"></h3>\
					</div>\
					<div class="col-md-6">\
						<div class="image" style="background-image=url('+actor.image+')"></div>\
						<h3 class="actorName">'+actor.name+'</h3>\
					</div>\
					<div class="answers">\
						<a class="answer btn btn-lg btn-success" data-id="'+duoId+'" data-answer="yes" >YES</a>\
						<a class="answer btn btn-lg btn-danger" data-id="'+duoId+'" data-answer="no" >NO</a>\
					</div>\
				</div>\
			</div>\
		';

		return questionBoxTemplate;
	},

	render : function () {

		$questionBox = this.$('#questionBox');
		$questionBox.empty();

		$questionBoxTemplate = this.getQuestionBoxTemplate(this.duo);
		$questionBox.append($questionBoxTemplate);


	};





});
