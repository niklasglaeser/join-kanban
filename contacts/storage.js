const STORAGE_TOKEN = "2M8CK50K3XEI4YZ1I8QPBAQNFXIY1ZXEOAGB3EE5";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  // fetch auf die Url STORAGE_URL mit der methode POST und body im JSON mitsenden
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const URL = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  // debugger;
  //Dann response(Antowort) als Json umwandeln, dann von resp nur data.value
  return fetch(URL)
    .then((res) => res.json())
    .then((res) => res.data.value);
}
