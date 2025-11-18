self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('mesure-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/mesure.html',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAwzbBYmY2Wktr-7R2mPWQVNRMbFavu4U",
  authDomain: "mesure-by-yn.firebaseapp.com",
  projectId: "mesure-by-yn",
  storageBucket: "mesure-by-yn.firebasestorage.app",
  messagingSenderId: "753867197752",
  appId: "1:753867197752:web:b0adebf714ba207505c5cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
