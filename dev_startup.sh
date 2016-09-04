#!/bin/bash
echo development server start
cd gateway_dev
source venv/bin/activate
export FLASK_DEBUG=1
python api_gateway_dev.py & bg
deactivate
cd ../frontend
DEBUG=express:* node static_server.js & bg
npm run webpack_watch & fg
cd ../node_dev
DEBUG=express:* node node_server_dev.js & bg
cd ../flask_dev
source venv/bin/activate
export FLASK_DEBUG=1
python flask_server_dev.py & bg
deactivate & bg
cd ..
