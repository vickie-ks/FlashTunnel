document.getElementById('setupProxyButton').addEventListener('click', function() {
    // Link to the Chrome Web Store page for the extension
    window.open('https://chrome.google.com/webstore/detail/YOUR_EXTENSION_ID', '_blank');
});

document.getElementById('removeProxyButton').addEventListener('click', function() {
    const extensionId = "YOUR_EXTENSION_ID";
    chrome.runtime.sendMessage(extensionId, {action: "remove_proxy"}, function(response) {
        alert('Proxy removal requested.');
    });
});