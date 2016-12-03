/* global firebase:true */

import axios from 'axios';

export default function FirebaseRegisterPush() {
  // Retrieve Firebase Messaging object.
  const messaging = firebase.messaging();

  messaging.requestPermission()
  .then(function() {
    console.log('Notification permission granted.');
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken()
    .then(function(currentToken) {
      if (currentToken) {
        console.log('CurrentToken ', JSON.stringify(currentToken));
        sendTokenToServer(currentToken);
        //updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        //updateUIForPushPermissionRequired();
        //setTokenSentToServer(false);
      }
    })
    .catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
      //setTokenSentToServer(false);
    });
  })
  .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
  });

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
      console.log('Token refreshed.');
      console.log('CurrentToken ', JSON.stringify(refreshedToken));
      // Indicate that the new Instance ID token has not yet been sent to the app server.
      //setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      //showToken('Unable to retrieve refreshed token ', err);
    });
  });

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a sevice worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    window.alert(JSON.stringify(payload));
    // ...
  });
}

function sendTokenToServer(token) {
  axios.get('https://sportlinks.herokuapp.com/shows?token=' + token)
  .catch(function(error) {
      console.log('Error: ', error)
  });
}
