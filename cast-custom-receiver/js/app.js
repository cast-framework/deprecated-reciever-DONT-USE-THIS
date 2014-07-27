$(document).ready(function() {

	var ViewModel = function(first, last) {
		var self = this;

		var Card = function(name) {
			this.name = name;
		};

		self.text = ko.observable("TALK TO ME, MOTHERFUCKER!!!!!!!!!");
		self.connections = ko.observable(0);
		self.displayText = ko.computed(function() {
			return "There " + (self.connections() == 1 ? "is" : "are") + " " + self.connections() + " connection" + (self.connections() == 1 ? "" : "s") + "!\nYou said: "+self.text();
		});

		self.deck =  ko.observableArray([]);
		self.allCardsSubmitted = ko.observable(false);

		self.getCard = function() {
			var index = Math.floor(Math.random()*cardDeck.length);
			var card = new Card(cardDeck[index]);
			if (index > -1) {
			    cardDeck.splice(index, 1);
			}
			return card;
			//self.deck.push(card);
		};

		self.clients = ko.observableArray([]);

		self.addCard = function(content) {
			self.deck.push(new Card(content));
			self.allCardsSubmitted(true);
		};

		self.ready = ko.observable(false);

		function makeid() {
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for(var j = 0; j < 3; j++) {
			    for( var i=0; i < 5; i++ ) {
			        text += possible.charAt(Math.floor(Math.random() * possible.length));
			    }
			    text += " ";
			}

		    return text;
		}
	};
	
	window.viewModel = new ViewModel("Planet", "Earth");

	initChromecast();

	ko.applyBindings(window.viewModel); // This makes Knockout get to work
});