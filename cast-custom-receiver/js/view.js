// utility function to display the text message in the input field
function displayText(textMsg) {
    document.getElementById("message").style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(textMsg);
    //document.getElementById("message").innerHTML=text;
    viewModel.text("You said: "+textMsg);
    window.castReceiverManager.setApplicationState(textMsg);
};