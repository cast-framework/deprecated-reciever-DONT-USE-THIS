$(document).ready(function() {

	var ViewModel = function(first, last) {
		var self = this;

		self.text = ko.observable("TALK TO ME, MOTHERFUCKER!!!!!!!!!");
		self.connections = ko.observable(0);
		self.displayText = ko.computed(function() {
			return "There " + (self.connections() == 1 ? "is" : "are") + " " + self.connections() + " connection" + (self.connections() == 1 ? "" : "s") + "!\nYou said: "+self.text();
		});
	    self.firstName = ko.observable(first);
	    self.lastName = ko.observable(last);
	 
	    self.fullName = ko.computed(function() {
	        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
	        return self.firstName() + " " + self.lastName();
	    }, this);
	};
	
	window.viewModel = new ViewModel("Planet", "Earth");

	initChromecast();

	ko.applyBindings(window.viewModel); // This makes Knockout get to work
});