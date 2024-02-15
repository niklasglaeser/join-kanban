const STORAGE_TOKEN = "2M8CK50K3XEI4YZ1I8QPBAQNFXIY1ZXEOAGB3EE5";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

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

/*TESTING*/

async function pushArrayToRemoteStorage(array) {
  try {
    const response = await setItem("users", array);

    if (response.ok) {
      console.log(
        "Array erfolgreich auf Remote-Speicher übertragen:",
        response
      );
    } else {
      console.error(
        "Fehler beim Übertragen des Arrays auf den Remote-Speicher:",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Fehler beim Senden der Anforderung:", error);
  }
}

pushArrayToRemoteStorage(users);
/*TESTING*/
