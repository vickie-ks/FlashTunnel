let proxyEnabled = false;

function setProxy() {
  chrome.proxy.settings.set({
    value: {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "socks5",
          host: "10.211.55.6",
          port: parseInt("1080")
        },
        bypassList: ["localhost"]
      }
    },
    scope: 'regular'
  });
}

function clearProxy() {
  chrome.proxy.settings.clear({scope: 'regular'});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "toggleProxy") {
      proxyEnabled = !proxyEnabled;
      if (proxyEnabled) {
        setProxy();
      } else {
        clearProxy();
      }
      sendResponse({status: proxyEnabled});
    }
  }
);
