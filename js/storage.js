/**
 * token and url for remote storage
 */
const STORAGE_TOKEN = "2M8CK50K3XEI4YZ1I8QPBAQNFXIY1ZXEOAGB3EE5";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";


/**
 * async set the item in the remote storage.
 * @param {string} key - The key under which to store the item.
 * @param {string} value - The value to store.
 * @returns {Promise} A Promise that resolves when the item is successfully set.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


/**
 * async get the item from the remote storage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise} A Promise that resolves with the retrieved value.
 * If the item is not found, the Promise will be rejected.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}


/**
 * Loads demo contacts from a JSON file.
 */
async function loadDemoContacts() {
  const response = await fetch("js/demoContacts.json");
  demoJsonContacts = await response.json();
}
