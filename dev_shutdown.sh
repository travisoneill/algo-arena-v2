#!/bin/bash
echo KILL WEBPACK
ps ax | grep frontend/node_modules/.bin/webpack\ --watch | awk '{print $1}' | xargs kill -2
echo KILL GATEWAY
lsof -ti :5000 | xargs kill
echo KILL STATIC
lsof -ti :8003 | xargs kill
echo KILL FLASK
lsof -ti :8002 | xargs kill
echo KILL NODE
lsof -ti :8001 | xargs kill
