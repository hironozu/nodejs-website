#!/bin/bash

openssl \
req \
-x509 \
-nodes \
-days 365 \
-newkey rsa:2048 \
-keyout $PWD/httpd-selfsigned.key \
-out $PWD/httpd-selfsigned.crt \
-config <(cat openssl.cnf) \
-subj '/C=AU/ST=QLD/L=Brisbane/O=iFactory/OU=/CN=localhost/emailAddress=hiro@ifactory.com.au'

openssl dhparam -out $PWD/dhparam.pem 2048

openssl x509 -in httpd-selfsigned.crt -text -noout
