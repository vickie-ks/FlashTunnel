chrome.proxy.settings.set(
  {
    value: {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "socks5",
          host: "10.211.55.25",
          port: parseInt("1080")
        },
        bypassList: ["localhost"]
      }
    },
    scope: "regular"
  },
  function() {
    console.log("Proxy settings updated");
  }
);