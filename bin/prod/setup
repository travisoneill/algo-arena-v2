#!/bin/bash
gcloud config set project algorithm-arena
gcloud source repos clone default ~/src/algorithm-arena/default
cd ~/src/algorithm-arena/default
git checkout master
cd gateway
sudo pip install virtualenv
virtualenv -p python3 env
source env/bin/activate
pip install -r requirements.txt
