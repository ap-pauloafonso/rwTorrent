#!/usr/bin/env python3
import sys
import getopt
import RestClient

open_browser_flag = False
port = ''

try:
    opts, remainder = getopt.getopt(sys.argv[1:], 'ok:p:', ['port=', 'key=','open'])
except Exception as e:
    opts = []

for opt, arg in opts:
    if opt in ['-o', '--open' ]:
        open_browser_flag = True
    elif opt in ['-p','--port']:
        port= arg
    elif opt in ['-k', '--key']:
        RestClient.key_auth = arg


if(port is ''):
    print('No port was passed as argument, it will be used the 5000 then')
    port = 5000
if(RestClient.key_auth is ''):
    print('No Authentication key was passed,then rwTorrent can be acessed without key')

RestClient.restClient(port,open_browser_flag)