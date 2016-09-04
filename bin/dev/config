#!/bin/bash
cd gateway_dev
pip install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ../flask_dev
pip install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ../node_dev
npm install
cd ../frontend
npm install
cd ..
