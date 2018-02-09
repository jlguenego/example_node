#!/usr/bin/env bash
mkdir -p ./out

# 1) Root CA certificate
# generate a RSA private key
openssl genrsa -out out/rootCA.key 2048
# generate a root CA certificate with the previous private key
openssl req -x509 -new -nodes -key out/rootCA.key -sha256 -days 1024 -out out/rootCA.pem -config rootCA.cfg


# 2) generate a certificate for the express server (https://localhost)
# This website certificate is registered by the Root CA.
# The https will be declared secure by the navigator if the Root CA is added to its "trusted root certificate"
openssl req -new -sha256 -nodes -out out/server.csr -newkey rsa:2048 -keyout out/server.key -config interCA.cfg
openssl x509 -req -in out/server.csr -CA out/rootCA.pem -CAkey out/rootCA.key -CAcreateserial -out out/server.crt \
    -days 500 -sha256 -extfile v3.ext
