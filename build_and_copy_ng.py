#!/usr/bin/env python3
import subprocess as sp
import os
import shutil
import sys
#ANGULAR PATH
angular_path = os.path.abspath('./ng-ui')

#API PATH
api_path = os.path.abspath('./torrent-api')

#ANGULAR DIST PATH
ng_dist_path = os.path.abspath(os.path.join(angular_path, 'dist'))

#API STATIC RESOURCES PATH
api_static_path = os.path.abspath(os.path.join(api_path, 'static'))
api_template_path = os.path.abspath(os.path.join(api_path, 'templates'))

result = sp.call("ng build --base-href /static/ --prod ",shell=True, cwd = angular_path )

if result> 0:
	print('Error building ng')
	raise SystemExit


try:		
	shutil.rmtree(api_template_path)
except Exception as e:
	pass

try:		
	shutil.rmtree(api_static_path)
except Exception as e:
	pass

shutil.copytree(ng_dist_path,api_static_path)
os.makedirs(api_template_path)
shutil.move(os.path.join(api_static_path,'index.html'),os.path.join(api_template_path,'index.html'))
	
print('done')