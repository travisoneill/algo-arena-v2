import requests
from flask import Flask, request, redirect, json, jsonify

ports = {
    'node': "8001",
    'flask': "8002",
    'static': "8003",
    'rack': "8004"
}

services = {
    'javascript': 'node',
    'python': 'flask',
    'ruby': 'rack'
}

app = Flask(__name__)

@app.route('/')
def reroute():
    res = requests.get('http://localhost:' + ports['static']+ '/' )
    print(res)
    return res.content

@app.route('/<path:params>')
def root(params):
    if params == '':
        res = requests.get('http://localhost:' + ports['static']+ '/' )
        return res.content
    else:
        url = 'http://localhost:' + ports['static']+ '/' + params
        return redirect(url, code=302, Response=None)

@app.route('/api/algos', methods=['POST'])
def send():
    incoming_data = request.get_json()
    # print("INCOMING")
    # print(incoming_data)
    # print("JSON")
    # print(json.dumps(incoming_data))
    test_params = incoming_data['lengthArr']
    responses = []
    final_data = {}
    print(request.is_json)
    for key, request_data in incoming_data.items():
        if key[0:4] != 'data':
            continue
        # print('______________________')
        # print(key, request_data['name'])
        # print('______________________')
        language = request_data['language']
        server = services[language]
        request_url = 'http://localhost:' + ports[server] + request.path
        outgoing_data = {'lengthArr': test_params, 'request_data': request_data}
        print('OUTGOING')
        print(outgoing_data)
        headers = {'Content-Type' : 'application/json'}
        # print('OUTGOING')
        # print(outgoing_data)
        # print('JSON')
        # print(json.dumps(outgoing_data))
        res = requests.post(request_url, data=json.dumps(outgoing_data), headers=headers)
        final_data[key] =  json.loads(res.content)
        print(final_data)
        print(jsonify(final_data))
    return jsonify(final_data)

if __name__  == "__main__":
    app.run()
