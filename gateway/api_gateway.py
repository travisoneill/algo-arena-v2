import requests
from flask import Flask, request, redirect, json, jsonify, send_from_directory

app = Flask(__name__, static_url_path='')

@app.route('/test')
def hello():
    print('Hello!  Api Gateway is running.')
    return('Hello!  Api Gateway is running.')

@app.route('/')
def root():
    return send_from_directory('', 'index.html')

@app.route('/api/algos', methods=['POST'])
def send():
    urls = {
        'flask': 'https://flask-algo.appspot.com',
        'node': 'https://tough-hull-141417.appspot.com'
    }
    services = {
        'javascript': 'node',
        'python': 'flask'
    }

    incoming_data = request.get_json()
    test_params = incoming_data['lengthArr']
    responses = []
    final_data = {}
    for key, request_data in incoming_data.items():
        if key[0:4] != 'data':
            continue
        language = request_data['language']
        server = services[language]
        request_url = urls[server] + request.path
        outgoing_data = {'lengthArr': test_params, 'request_data': request_data}
        headers = {'Content-Type' : 'application/json'}
        res = requests.post(request_url, data=json.dumps(outgoing_data), headers=headers)
        final_data[key] =  json.loads(res.content)
    return jsonify(final_data)

if __name__  == "__main__":
    app.run()
