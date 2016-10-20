import os
import benchmark
from datetime import datetime
from flask import Flask, request, json, jsonify

app = Flask(__name__)

@app.route('/test')
def hello():
    print('Hello!  Flask Server is running.')
    return('Hello!  Flask Server is running.')

@app.route('/')
def root():
    return('FLASK SERVER')

@app.route('/api/algos', methods=['POST'])
def run():
    print('FLASK')
    data = request.get_json(force=True)
    errors = data['errors']
    timestamps = data['timestamps']
    timestamps.append( {'flask_in': str(datetime.now())} )
    lengthArr = data['lengthArr']
    request_data = data['request_data']
    name = data['request_data']['name']
    result = benchmark.handle_request(lengthArr, request_data)
    timestamps.append( {'flask_out': str(datetime.now())} )
    response_data = {
        "xAxis": lengthArr,
        "name": name,
        "rawData": result,
        "errors": errors,
        "timestamps": timestamps
    }
    return jsonify(response_data)

if __name__ == "__main__":
    port = os.environ.get('PORT') or 8002
    app.run(port=int(port))
