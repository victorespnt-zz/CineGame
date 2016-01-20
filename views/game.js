var GameView = Backbone.View.extend({

	el: '#app',

	events: {

		'click .answer': "onAnswer",
	},

	initialize : function(options) {
		$('#app > div').empty();

		var that = this;

		this.DuoCollection = new DuoCollection();
		this.GamesCollection = new GamesCollection();
		this.GamesCollection.fetch();
		var allPreviousGamesAreFinished = true;

		// try to find unfinished games in localstorage
		this.GamesCollection.each(function(previousGame) {
			var isFinished = previousGame.get('isFinished');
			// if an unfinished game that has the same mode is fount, continue it
			if (!isFinished && previousGame.get('mode') == options.mode) {
				allPreviousGamesAreFinished = false;
				that.game = previousGame;
				console.log('unfinished game');
			}
		});
		// if no unfinished game was found, initiate a new game
		if (allPreviousGamesAreFinished) {
			this.game = new Game({'mode': options.mode});
			this.GamesCollection.add(this.game);
		}
		// console.log(this.game);
		this.DuoCollection.fetch({
			success: function(){that.render()},
		});
	},

	pickNewDuo: function () {

		//Génére un numero alétoire entre 0 et le nombre total de duos dans la collection (this.DuoCollection.length)
		var randomNumber = Math.floor(Math.random() * this.DuoCollection.length);

		// Stocke dans une variable le duo choisi grâce au numero alétoire
		var duo = this.DuoCollection.at(randomNumber);
		var previousDuos = this.game.get('duos');

		// if the duo is already in the array of previous duos : pick a new one
		if (duo && previousDuos.indexOf(duo.cid) == -1) {
			return duo;
		} else {
			return this.pickNewDuo();
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
		var mode = this.game.get('mode');

		// get duos that were already played
		var previousDuos = this.game.get('duos');
		var answers = this.game.get('answers');
		previousDuos.push(duoCid);
		answers.push(answer);
		this.game.set('duos', previousDuos);
		this.game.set('answers', answers);
		this.game.save();

		// test if right answer
		if (answer == rightAnswer) {
			this.game.set('score',score+1);
			this.game.save();
			this.playerWon = true;
		} else {
			this.playerWon = false;
			// if mode is survival. end the game
			if (mode == 'survival') {
				this.game.set('isFinished', true);
				this.game.save();
			}
			// console.log('game should finish now');
		}

		// If table length >= 10, game is finished
		if (previousDuos.length >= 10 && mode == '10points') {
			this.game.set('isFinished', true);
			this.game.save();
		}

		if (this.game.get('isFinished')) {
			var resultView = new window.ResultView({
				'game': this.game,
			});
		} else {
			this.render();
		}
	},

	getQuestionBoxTemplate: function (duo) {
		var movie = duo.toJSON().movie;
		var actor = duo.toJSON().actor;
		var score = this.game.toJSON().score;

		if (this.game.get('duos').length > 0) {
			var message = this.playerWon ? 'GOOD JOB !' : 'NO !';
		}

		var resultMessage = message ? '<div class="alert alert-'+(this.playerWon == true ? 'success' : 'danger')+'">'+message+'</div>' : '';
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

		var $questionBoxTemplate = this.getQuestionBoxTemplate(duo);

		var $questionBox = this.$('#questionBox');

		$questionBox.empty();
		$questionBox.append($questionBoxTemplate);

	}
});
