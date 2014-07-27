// utility function to display the text message in the input field
function displayText(text) {
    document.getElementById("message").style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    console.log(text);
    document.getElementById("message").innerHTML=text;
    window.castReceiverManager.setApplicationState(text);
};