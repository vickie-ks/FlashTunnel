#!/bin/bash

# Prompt for passphrase
read -sp "Enter your passphrase: " PASSPHRASE
echo

# Generate the private key using the passphrase
openssl genpkey -algorithm RSA -out key.pem -pkeyopt rsa_keygen_bits:2048 -pass pass:$PASSPHRASE

# Convert the private key to DER format using the passphrase
openssl rsa -in key.pem -outform DER -pubout -out key.der -passin pass:$PASSPHRASE

# Base64 encode the DER file and output to a text file
openssl base64 -in key.der -out key_base64.txt

# Display the base64-encoded key
echo "Base64-encoded key:"
cat key_base64.txt