document.getElementById('toggleProxy').addEventListener('click', function() {
  chrome.runtime.sendMessage({command: 'toggle_proxy'}, function(response) {
    alert(response.status);
  });
});
