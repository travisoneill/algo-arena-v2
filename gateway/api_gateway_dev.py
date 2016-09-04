import requests
from flask import Flask, request, redirect, json, jsonify

ports = {
    'node': "8001",
    'flask': "8002",
    'static': "8003"
}

services = {
    'javascript': 'node',
    'python': 'flask'
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
    print("INCOMING")
    print(incoming_data)
    print("JSON")
    print(json.dumps(incoming_data))
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
        headers = {'Content-Type' : 'application/json'}
        # print('OUTGOING')
        # print(outgoing_data)
        # print('JSON')
        # print(json.dumps(outgoing_data))
        res = requests.post(request_url, data=json.dumps(outgoing_data), headers=headers)
        print(res)
        final_data[key] =  json.loads(res.content)
        print(jsonify(final_data))
    return jsonify(final_data)

# @app.route('/api/algos', methods=['POST'])
# def send():
#     data = request.json
#     servers = {}
#     responses = []
#     for service, server in services.items():
#         servers[server] = False
#
#     print('servers', servers)
#
#     for key, params in data.items():
#         if key[0:4] == 'data':
#             language = params['language']
#             server = services[language]
#             servers[server] = True
#
#     print('servers', servers)
#
#     for server, send_status in servers.items():
#         if send_status == True:
#             url = 'http://localhost:' + ports[server] + request.path
#             res = requests.post(url, data)
#             responses.append(res)
#             print(responses)
#
#     print(request.json['data1'])
#     return "REDIRECTED"


# def parse_dictionary(dictionary):
#     print('DICTIONARY')
#     print(dictionary)
#     print(json.dumps(dictionary))
#     return dictionary



#gunicorn
#tornado

if __name__  == "__main__":
    app.run()
