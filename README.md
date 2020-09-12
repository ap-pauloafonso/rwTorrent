# rwTorrent

## About
rwTorrent is bittorrent-restful client to manage your torrent session through the browser. Also with port-forwarding it is possible to access it remotely. ![](./media/demo.gif)

## Motivation
* I needed some project to deliver for my final year at university, then i thought that this bittorrent webclient  would be a good idea.
* Improving my ability at angular
* Learn how popular libs such as libtorrent works 

## How does it work?
With libs like libtorrent and python-flask it is possible to expose bittorrent session informations through de http protocol and consume it using a single page application like angular.

## Features
* Add/Remove Torrents (file and magnet link)
* Speed Control (session and per torrent)
* Sequential Download
* Pause/Resume
* Basic Authentication
* Front end with angular/angular-flexlayout/angular-material


## Things to improve
* Persist torrent specific configurations on the disk 
* Improve performance when there is a large numbers of torrents

##  Python3 dependencies
* pip3
* flask
* aenum
* flask_restful
* flask_cors
* flask_httpauth
* geoip2
* python3-libtorrent

*python3-libtorrent is present on ubuntu repository and can be found using apt-get, the rest is possible with just pip3*

## Angular dependencies
* npm
* angular-cli

## Build
```
cd ./ng-ui
npm i
cd ../../
python3 build_and_copy_ng.py #copy ng build output to api static files
```

## Running on  linux
```
cd ./torrent-api/
chmod +x rwTorrent.py
./rwTorrent.py [...args]
```
or 
```
cd ./torrent-api/
python3 rwTorrent.py [...args]
```
## Arguments
```
-o ,--open #open the browser
-p , --port {port_number} #set port number
-k , --key {key} #set authentication key
```


