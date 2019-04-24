# rwTorrent

## Sobre
rwTorrent é um cliente bittorrent-restful para controlar a sessão de downloads atráves do navegador.E com port-forward é possivel acessar remotamente. ![](./media/demo.gif)

## Motivação
* Faltando 5 meses para eu entregar o tcc, eu ainda não tinha o tema em mente, então veio essa ideia de fazer um client torrent para ser utlizado no navegador
* Devivo ao trabalho eu estava querendo aprimorar meu conhecimento no angular.
* Aprender coisas novas, no caso python e como a biblioteca de flask && libtorrent funcionam.

## Como funciona?
Por meio da biblioteca libtorrent juntamente com python-flask é possivel expor informações da sessão de torrent atráves de apis e por fim consumir pela SPA escrita em Angular.

## Funcionalidades
* Adicionar/Remover Torrents por arquivo ou magnet link
* Controle de Velocidade de torrents a nivel de sessão ou de torrent
* Download Sequencial
* Pause/Resume
* Autenticação por simples chave
* Front End responsivo com Angular Material e Flexlayout


## Coisas para Melhorar
* Persistir as configurações particulares de cada torrent no disco
* Quando desenvolvido a rwTorrent a biding do python-libtorrent que foi compilada acabou faltando algumas funções dentre elas o session::find_torrent() que resultou em ter que fazer session::get_torrents() e iterar até achar o hash nescessario, sendo N vezes para achar no pior caso,ao invez do session::find_torrent() que faria 1 lookup na estrura interna da sessão (acredito que esteja implementado como dicionario)
* Adicionar suporte https

## Dependências python3
* pip3
* flask
* aenum
* flask_restful
* flask_cors
* flask_httpauth
* geoip2
* python3-libtorrent


*python3-libtorrent está presente no repositorio do ubuntu e pode ser adiquirido também com apt-get, o resto é possivel obter com pip3*

## Dependências Angular 7
* npm
* angular-cli

## Build
```
cd ./ng-ui
npm i
cd ../../
python3 build_and_copy_ng.py #copiar output do ng build para os arquivos estaticos da api
```

## Rodando o projeto no linux
```
cd ./torrent-api/
chmod +x rwTorrent.py
./rwTorrent.py [...args]
```
ou 
```
cd ./torrent-api/
python3 rwTorrent.py [...args]
```
## Argumentos
```
-o ,--open #abrir navegador
-p , --port {port_number} #setar a porta
-k , --key {key} #chave de autenticacao
```


