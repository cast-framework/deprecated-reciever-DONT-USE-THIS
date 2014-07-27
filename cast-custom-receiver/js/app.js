$(document).ready(function() {

	var ViewModel = function(first, last) {
		this.text = ko.observable("TALK TO ME, MOTHERFUCKER!!!!!!!!!");
		this.connections = ko.observable(0);
	    this.firstName = ko.observable(first);
	    this.lastName = ko.observable(last);
	 
	    this.fullName = ko.computed(function() {
	        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
	        return this.firstName() + " " + this.lastName();
	    }, this);
	};
	
	window.viewModel = new ViewModel("Planet", "Earth");

	initChromecast();

	ko.applyBindings(window.viewModel); // This makes Knockout get to work
});