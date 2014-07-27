// utility function to display the text message in the input field
function displayText(textMsg) {
    document.getElementById("message").style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    window.viewModel.text(textMsg);
    console.log(textMsg);
    //document.getElementById("message").innerHTML=text;
    window.castReceiverManager.setApplicationState(textMsg);
};

function initChromecast() {

    var connections = 0;

    ////// INIT ///////

    cast.receiver.logger.setLevelValue(0);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting Receiver Manager');

    // handler for the 'ready' event
    castReceiverManager.onReady = function(event) {
      console.log('Received Ready event: ' + JSON.stringify(event.data));
      window.castReceiverManager.setApplicationState("Application status is ready...");
    };

    ////// SENDERS ///////

    // handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function(event) {
        window.viewModel.connections(window.castReceiverManager.getSenders().length);
        console.log('Received Sender Connected event: ' + event.data);
        console.dir(window.castReceiverManager.getSender(event.data));
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function(event) {
      window.viewModel.connections(window.castReceiverManager.getSenders().length);
      console.log('Received Sender Disconnected event: ' + event.data);
      if (window.castReceiverManager.getSenders().length == 0) {
      window.close();
    }
    };

    ////// VOLUME ///////

    // handler for 'systemvolumechanged' event
    // castReceiverManager.onSystemVolumeChanged = function(event) {
    //   console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
    //       event.data['muted']);
    // };

    // create a CastMessageBus to handle messages for a custom namespace
    window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.sample.helloworld');

    // handler for the CastMessageBus message event
    window.messageBus.onMessage = function(event) {
        console.log('Message [' + event.senderId + ']: ' + event.data);

        try {
            var data = JSON.parse(event.data);
            handleCmd(event.senderId, data.command);

            console.dir(event);

            sendMessage(event.senderId, "msgReceived", "FUCKING HELL");

        } catch(e) {
            console.log(e);
            sendMessage(event.senderId, "error", "It broked.");
            displayText(event.data);
        }

        // inform all senders on the CastMessageBus of the incoming message event
        // sender message listener will be invoked
        //window.messageBus.send(event.senderId, event.data);
    }

    function sendMessage(clientId, evt, msg) {
        window.messageBus.send(clientId, JSON.stringify({
            'event': evt,
            'message': msg
        }));
    }

    function handleCmd(senderId, cmd) {
        switch(cmd) {
            case "join":
                console.log("join: " + senderId);
                displayText("JOIN");
                break;
            case "quit":
                console.log("quit: " + senderId);
                displayText("QUIT");
                break;
            default:
                console.log("default: " + senderId);
                displayText(cmd);
        }
    }

    // initialize the CastReceiverManager with an application status message
    window.castReceiverManager.start({
        statusText: "Application is starting"
    });
    
    console.log('Receiver Manager started');
}