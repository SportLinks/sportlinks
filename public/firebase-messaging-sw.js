// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '631365010339'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.text,
    icon: '/images/icons/icon-512x512.png',
    click_action: 'https://sportlinks-997d1.firebaseapp.com/',
    notificationTag: payload.data.tag
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]


self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  console.log('clients ', JSON.stringify(clients));
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      console.log('client: ', JSON.stringify(client));
      var client = clientList[i];
      if (client.url == 'https://sportlinks-997d1.firebaseapp.com' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('https://sportlinks-997d1.firebaseapp.com');
  }));
});
