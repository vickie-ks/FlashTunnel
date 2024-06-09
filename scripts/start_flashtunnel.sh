#!/bin/bash

# Check the status of Dante server
status=$(sudo systemctl status danted | grep "active (running)" > /dev/null && echo "running" || echo >

if [ "$status" == "running" ]; then
    echo "Dante SOCKS5 proxy is running."
else
    echo "Dante SOCKS5 proxy is not running. Attempting to start..."
    sudo systemctl start danted
    echo "Dante SOCKS5 proxy started."
fi
