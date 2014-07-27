$(document).ready(function() {
	initChromecast();

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
	ko.applyBindings(viewModel); // This makes Knockout get to work
});

// utility function to display the text message in the input field
function displayText(textMsg) {
    document.getElementById("message").style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(textMsg);
    //document.getElementById("message").innerHTML=text;
    viewModel.text("You said: "+textMsg);
    window.castReceiverManager.setApplicationState(textMsg);
};