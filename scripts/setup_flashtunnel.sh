#!/bin/bash

# Install Dante server
sudo apt-get update
sudo apt-get install -y dante-server

# Create the configuration file
cat << EOF | sudo tee /etc/danted.conf
logoutput: /var/log/danted.log
internal: 0.0.0.0 port = 1080
external: eth0
method: username none
user.privileged: proxy
user.unprivileged: nobody
clientmethod: none
user.libwrap: nobody

client pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
    log: connect disconnect error
}

socks pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
    command: bind connect udpassociate
    log: connect disconnect error
}
EOF

# Restart and enable Dante server
sudo systemctl restart danted
sudo systemctl enable danted

echo "Dante SOCKS5 server installed and configured."