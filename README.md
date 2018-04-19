# Hiro's simple Node.js website

## How to use

### Install Node.js if you have not

https://nodejs.org/en/

### Download ZIP

Better than `git pull` as you should have your own Git Repository for your own situation.

### Execute the followings on terminal (This step takes time)

```
sudo npm update -g
npm install
```

### Comment the following lines

in node_modules/bootstrap/scss/utilities/_text.scss if it exists:

```
.text-hide {
  @include text-hide();
}
```

### Install self-signed SSL Certificate

#### Windows

1. Open Control Panel.
2. Search "cert".
3. Select "Manage computer certificates".
4. Navigate the folder "Trusted Root Certification Authorities" > "Certificates"
    (Click the folder).
5. Right-Click the folder and select "All Tasks" > "Import...".
6. Import the file "ssl/httpd-selfsigned.crt".
7. (Important) Exit Chrome (or your web browser).

#### MacOS

Import Root Certficate with KeyChain Application.

### Finally

```
cp config.example.js config.js
gulp
```

Open https://localhost:8080/

## How to run on Production Environment

`gulp build` generates the compressed version of CSS file and JS file. I decided do this because the compression process takes too long for the development work. After that, [forever](https://www.npmjs.com/package/forever) or smilar program should keep your website running.
