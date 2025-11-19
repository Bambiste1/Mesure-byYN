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
import { getAuth } from "firebase/auth";
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
const auth = getAuth(app);
function showMesures(client, index) {
  mesureDetails.innerHTML = `<h3>Mesures de ${client.nom}</h3>`;
  for (let key in client) {
    if (key !== "nom" && key !== "tel" && key !== "date") {
      mesureDetails.innerHTML += `<p><strong>${key}:</strong> ${client[key]}</p>`;
    }
  }function editClient(index) {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  let client = clients[index];
  for (let key in client) {
    if (form.elements[key]) {
      form.elements[key].value = client[key];
    }
  }

  // Supprimer l’ancien client pour le remplacer à l’enregistrement
  clients.splice(index, 1);
  localStorage.setItem("clients", JSON.stringify(clients));
  mesureDetails.style.display = "none";
  loadClients();
}


  // Boutons de modification et suppression
  mesureDetails.innerHTML += `
    <button onclick="editClient(${index})">Modifier</button>
    <button onclick="deleteClient(${index})" style="background:#8B0000;margin-top:10px;">Supprimer</button>
  `;
  mesureDetails.style.display = "block";
}
function deleteClient(index) {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  if (confirm("Supprimer ce client ?")) {
    clients.splice(index, 1);
    localStorage.setItem("clients", JSON.stringify(clients));
    mesureDetails.style.display = "none";
    loadClients();
  }
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
  loadClients(this.value.toLowerCase());
});

function loadClients(filter="") {
  clientsContainer.innerHTML = "";
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  clients.forEach((client, index) => {
    // Vérifie si le nom ou le téléphone contient le texte recherché
    if (
      client.nom.toLowerCase().includes(filter) ||
      client.tel.toLowerCase().includes(filter)
    ) {
      const div = document.createElement("div");
      div.className = "client-item";
      div.textContent = `${client.nom} – ${client.tel}`;
      div.onclick = () => showMesures(client, index);
      clientsContainer.appendChild(div);
    }
  });
}
function exportJSON() {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(clients, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "clients.json");
  dlAnchor.click();
}

function exportCSV() {
  let clients = JSON.parse(localStorage.getItem("clients")) || [];
  if (clients.length === 0) {
    alert("Aucun client à exporter");
    return;
  }

  // Récupère toutes les clés (colonnes)
  const keys = Object.keys(clients[0]);
  let csv = keys.join(",") + "\n";

  // Ajoute les données
  clients.forEach(client => {
    csv += keys.map(k => `"${client[k] || ""}"`).join(",") + "\n";
  });

  const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "clients.csv");
  dlAnchor.click();
}
import { createUserWithEmailAndPassword } from "firebase/auth";

createUserWithEmailAndPassword(auth, "arrame@gmail.com", "motdepasse123")
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Utilisateur créé :", user.email);
  })
  .catch((error) => {
    console.error("Erreur de création :", error.message);
  });
