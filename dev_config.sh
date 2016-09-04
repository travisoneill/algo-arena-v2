#!/bin/bash
cd gateway
pip install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ../flask
pip install virtualenv
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ../node
npm install
cd ../frontend
npm install
cd ..
