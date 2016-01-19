// LA VUE


var GameView = Backbone.View.extend({

	el: '#app',

	events: {

		'click .answer': "onAnswer",
	},

	initialize : function() {
		$('#app > div').empty();

		var that = this;

		this.DuoCollection = new DuoCollection();
		this.GamesCollection = new GamesCollection();
		this.GamesCollection.fetch();

		var previousGames = this.GamesCollection;
		var allPreviousGamesAreFinished = true;

		// try to find unfinished games in localstorage
		this.GamesCollection.each(function(previousGame) {
			var isFinished = previousGame.get('isFinished');
			if (!isFinished) {
				allPreviousGamesAreFinished = false;
				that.game = previousGame;
			}
		});
		// if no unfinished game was found, initiate a new game
		if (allPreviousGamesAreFinished) {
			this.game = new Game();
			this.GamesCollection.add(this.game);
		}

		this.DuoCollection.fetch({
			success: function(){that.render()},
		});
	},

	pickNewDuo: function () {

		//Génére un numero alétoire entre 0 et le nombre total de duos dans la collection (this.DuoCollection.length)
		var randomNumber = Math.floor(Math.random() * (this.DuoCollection.length - 0));

		// Stocke dans une variable le duo choisi grâce au numero alétoire
		var duo = this.DuoCollection.at(randomNumber);
		var previousDuos = this.game.get('duos');

		// if the duo is already in the array of previous duos : pick a new one
		if (previousDuos.indexOf(duo.cid) == -1) {
			return duo;
		} else {
			this.pickNewDuo();
		}
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
		var rightAnswer = duo.actor.isPresent.toString();
		var score = this.game.get('score');

		// test if right answer
		if (answer == rightAnswer) {
			this.game.set('score',this.game.get('score')+1);
			this.playerWon = true;
		} else {
			this.playerWon = false;
		}
		// get duos that were already played
		var previousDuos = this.game.get('duos');
		previousDuos.push(duoCid);
		this.game.set('duos', previousDuos);
		this.game.save();

		// tester la longueur du tableau, si elle fait 10 c'est la fin du jeu
		if (previousDuos.length >= 10) {
			this.game.set('isFinished', true);
			this.game.save();
			// var ResultView = new ResultView();
			alert('done');
		}

		// display next question
		this.render();
	},

	// tester la longueur du tableau, si elle fait 10 c'est la fin du jeu


	getQuestionBoxTemplate: function (duo) {

		var movie = duo.toJSON().movie;
		var actor = duo.toJSON().actor;
		var score = this.game.toJSON().score;

		var result = '';
		if (this.game.get('duos').length > 0) {
			var result = this.playerWon ? 'GOOD JOB !' : 'NO !';
		}

		var resultMessage = result ? '<div class="alert alert-'+(this.playerWon == true ? 'success' : 'danger')+'">'+result+'</div>' : '';
		var questionBoxTemplate = resultMessage+'\
			<div class="panel panel-default">\
				<div class="panel-body">\
					<h2>Was '+actor.name+' in '+movie.title+' ?</h2>\
					<p> Your score is '+score+'/'+this.game.get("duos").length+'</p>\
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
