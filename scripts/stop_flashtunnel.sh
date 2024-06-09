#!/bin/bash

# Check the status of the Dante server
if sudo systemctl is-active --quiet danted; then
    echo "Dante SOCKS5 proxy is currently running. Stopping now..."
    sudo systemctl stop danted
    echo "Dante SOCKS5 proxy has been stopped."
else
    echo "Dante SOCKS5 proxy is not currently running. No action needed."
fi

