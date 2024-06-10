document.addEventListener("DOMContentLoaded", () => {
  const turnOnButton = document.getElementById("turnOn");
  const turnOffButton = document.getElementById("turnOff");

  const extensionId = "laehdemjobebkmedholkodmdnjjeiagj";

  // fetch("/api/settings")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     extensionId = data.EXTENSION_ID;
  //   })
  //   .catch((error) => console.error("Error fetching settings: ", error));

  const enableExtension = () => {
    // chrome.runtime.sendMessage({command: "toggleProxy", enable: true});
    if (chrome.management) {
      chrome.management.setEnabled(extensionId, true, () => {
        console.log("Extension has been enabled.");
      });
    }
  };

  const disableExtension = () => {
    // chrome.runtime.sendMessage({command: "toggleProxy", enable: false});
    // if (chrome.management) {
    //   chrome.management.setEnabled(extensionId, false, () => {
    //     console.log("Extension has been disabled.");
    //   });
    // }
    document.getElementById('disableProxy').addEventListener('click', function() {
      chrome.runtime.sendMessage(extensionId, {pid: "toggleProxy", enable: false});
    });
  };

  turnOnButton.addEventListener("click", enableExtension);
  turnOffButton.addEventListener("click", disableExtension);
});
