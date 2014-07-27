$(document).ready(function() {

	var ViewModel = function(first, last) {
		this.text = "TALK TO ME, MOTHERFUCKER!!!!!!!!!";
	    this.firstName = ko.observable(first);
	    this.lastName = ko.observable(last);
	 
	    this.fullName = ko.computed(function() {
	        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
	        return this.firstName() + " " + this.lastName();
	    }, this);
	};
	
	var viewModel = new ViewModel("Planet", "Earth");

	initChromecast(viewModel);

	ko.applyBindings(viewModel); // This makes Knockout get to work
});