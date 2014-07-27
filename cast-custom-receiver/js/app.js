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
		var card1 = new Card("penis card");
		self.deck.push(card1);
	};
	
	window.viewModel = new ViewModel("Planet", "Earth");

	var chromecast = initChromecast();
	chromecast.onMessage = function() {
		console.log("MESSAGE");
	};

	ko.applyBindings(window.viewModel); // This makes Knockout get to work
});