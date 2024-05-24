document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');

  function updateUI(isEnabled) {
      if (isEnabled) {
          statusDiv.textContent = 'Proxy is ON';
          toggleBtn.textContent = 'Disable Proxy';
      } else {
          statusDiv.textContent = 'Proxy is OFF';
          toggleBtn.textContent = 'Enable Proxy';
      }
  }

  toggleBtn.addEventListener('click', function() {
      chrome.runtime.sendMessage({action: "toggleProxy"}, function(response) {
          updateUI(response.status);
      });
  });

  chrome.runtime.sendMessage({action: "getProxyStatus"}, function(response) {
      updateUI(response.status);
  });
});
