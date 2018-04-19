# Hiro's simple Node.js website

## Install Node.js if you have not

https://nodejs.org/en/

## Execute the followings on terminal (This step takes time)

```
sudo npm update -g
npm install
```

## Comment the following lines

in node_modules/bootstrap/scss/utilities/_text.scss if it exists:

```
.text-hide {
  @include text-hide();
}
```

## Install self-signed SSL Certificate

### Windows

1. Open Control Panel.
2. Search "cert".
3. Select "Manage computer certificates".
4. Navigate the folder "Trusted Root Certification Authorities" > "Certificates"
    (Click the folder).
5. Right-Click the folder and select "All Tasks" > "Import...".
6. Import the file "ssl/httpd-selfsigned.crt".
7. (Important) Exit Chrome (or your web browser).

### MacOS

Import Root Certficate with KeyChain Application.

## Finally

```
cp config.example.js config.js
gulp
```

Open https://localhost:8080/

