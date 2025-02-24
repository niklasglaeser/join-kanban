const USERS_STORAGE_URL = "https://api.jsonbin.io/v3/b/67bca799acd3cb34a8ef23e7";
const TASKS_STORAGE_URL = "https://api.jsonbin.io/v3/b/67bca9a4ad19ca34f810abf5";
const HEADERS = {
    "Content-Type": "application/json",
    "X-Master-Key": "$2a$10$jXnKR8Kcsg7ELSzrxjiIDO5iGDYdoby7f52s/8NPc5/RVjHV5iDr."
};

/**
 * Speichert die Benutzer-Daten in JSONBin.
 */
async function setUsers(data) {
  return fetch(USERS_STORAGE_URL, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify(data) // Direkt die Daten speichern, ohne { record: data }
  }).then(res => res.json());
}

/**
 * Holt die Benutzer-Daten aus JSONBin.
 */
async function getUsers() {
  return fetch(USERS_STORAGE_URL, {
      method: "GET",
      headers: HEADERS
  })
  .then(res => res.json())
  .then(res => res.record ?? res); // Falls `record` existiert, dann nur `record` zurückgeben
}

/**
 * Speichert die Aufgaben-Daten in JSONBin.
 */
async function setTasks(data) {
  return fetch(TASKS_STORAGE_URL, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify(data) // Direkt die Daten speichern, ohne { record: data }
  }).then(res => res.json());
}

/**
 * Holt die Aufgaben-Daten aus JSONBin.
 */
async function getTasks() {
  return fetch(TASKS_STORAGE_URL, {
      method: "GET",
      headers: HEADERS
  })
  .then(res => res.json())
  .then(res => res.record ?? res); // Falls `record` existiert, dann nur `record` zurückgeben
}

/**
 * Lädt Demo-Kontakte aus einer JSON-Datei.
 */
async function loadDemoContacts() {
  const response = await fetch("js/demoContacts.json");
  demoJsonContacts = await response.json();
}






/**
 * Loads demo contacts from a JSON file.
 */
async function loadDemoContacts() {
  const response = await fetch("js/demoContacts.json");
  demoJsonContacts = await response.json();
}
