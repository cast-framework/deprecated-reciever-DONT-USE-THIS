$(document).ready(function() {

	var ViewModel = function(first, last) {
		var self = this;

		var Card = function(name, clientId, color, oppositeColor) {
			this.show = ko.observable(false);
			this.name = name;
			this.clientId = clientId;
			this.color = ko.observable(color);
			this.oppositeColor = ko.observable(oppositeColor);
		};

		var Player = function(clientId) {
			this.clientId = clientId;
			this.score = 0;
		};

		self.addPlayer = function(clientId) {
			self.clients.push(new Player(clientId));
		};

		self.removePlayer = function(clientId) {
			for(var i = 0; i < self.clients().length; i++) {
				if(self.clients()[i].clientId() == clientId) {
					window.viewModel.clients.splice(i, 1);
					break;
				}
			}
		};

		// self.flipBlackCard = function() {
		// 	self.deck()[0].flipped(true);
		// };

		// self.flipCards = function() {
		// 	for(var i = 0; i < self.deck().length; i++) {
		// 		self.deck()[i].flipped(true);
		// 	}
		// };

		self.chooser = ko.observable(0);
		self.text = ko.observable("TALK TO ME, MOTHERFUCKER!!!!!!!!!");
		self.connections = ko.observable(0);
		self.displayText = ko.computed(function() {
			return "There " + (self.connections() == 1 ? "is" : "are") + " " + self.connections() + " connection" + (self.connections() == 1 ? "" : "s") + "!\nYou said: "+self.text();
		});

		self.clients = ko.observableArray([]);
		self.deck =  ko.observableArray([]);
		self.allCardsSubmitted = ko.computed(function() {
			return (self.clients().length > 0) && (self.deck().length > self.clients().length);
		});

		self.getCard = function(clientId) {
			var index = Math.floor(Math.random()*cardDeck.length);
			var card = new Card(cardDeck[index], clientId, "white", "black");
			if (index > -1) {
			    cardDeck.splice(index, 1);
			}
			return card;
			//self.deck.push(card);
		};

		self.getBlackCard = function(clientId) {
			var index = Math.floor(Math.random()*blackCards.length);
			var card = new Card(blackCards[index], clientId, "black", "white");
			if (index > -1) {
			    blackCards.splice(index, 1);
			}
			return card;
			//self.deck.push(card);
		};

		self.addCard = function(content, clientId) {
			self.deck.push(new Card(content, clientId));
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