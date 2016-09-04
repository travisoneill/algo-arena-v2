#!/bin/bash
echo KILL WEBPACK
ps ax | grep frontend/node_modules/.bin/webpack\ --watch | awk NR==1'{print $1}' | xargs kill -2
echo KILL GATEWAY 5
lsof -ti :5000 | xargs kill -5
echo KILL STATIC 2
lsof -i :8003 | grep node | grep LISTEN | awk '{print $2}' | xargs kill -2
echo KILL FLASK 5
lsof -ti :8002 | xargs kill -5
echo KILL NODE 2
lsof -ti :8001 | xargs kill -2
