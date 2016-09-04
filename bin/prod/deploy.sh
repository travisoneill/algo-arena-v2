#!/bin/bash

valid=false

if [[ $1 == 'gateway' || $1 == 'all' ]]; then
  valid=true
  echo START DEPLOY GATEWAY
  cd gateway
  echo SETTING UP ENVIRONMENT
  sudo pip install virtualenv
  virtualenv -p python3 env
  source evn/bin/activate
  echo INSTALLING dependencies
  pip install -r requirements.txt
  echo DEPLOYING SERVICE
  gcloud app deploy
  echo FINISH DEPLOY GATEWAY
  deactivate
  cd ..
fi

if [[ $1 == 'flask' || $1 == 'all' ]]; then
  valid=true
  echo START DEPLOY FLASK
  cd flask
  echo SETTING UP ENVIRONMENT
  sudo pip install virtualenv
  virtualenv -p python3 env
  source evn/bin/activate
  echo INSTALLING dependencies
  pip install -r requirements.txt
  echo DEPLOYING SERVICE
  gcloud app deploy
  echo FINISH DEPLOY FLASK
  deactivate
  cd ..
fi

if [[ $1 == 'node' || $1 == 'all' ]]; then
  valid=true
  echo START DEPLOY NODE
  cd node
  echo SETTING UP ENVIRONMENT
  npm install
  gcloud app deploy
  echo FINISH DEPLOY NODE
  cd ..
fi

if [ $valid == false ]; then
  echo INVALID SELECTION
fi
