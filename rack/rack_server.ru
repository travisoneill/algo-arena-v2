require 'json'
require_relative './benchmark.rb'

class App
  include Benchmark
  def call(env)
    req = Rack::Request.new(env)
    case req.path_info
    when /env/
      p ENV
      [200, {'Content-Type' => 'text/html'}, [ENV['RACK_ENV']] ]
    when /hello/
      [200, {'Content-Type' => 'text/html'}, ['200 Hello World']]
    when /api\/algos/
      if req.post?
        incoming_data = JSON.parse(req.body.read)
        lengthArr = incoming_data['lengthArr']
        request_data = incoming_data['request_data']
        name = incoming_data['request_data']['name']
        val = handle_request(lengthArr, request_data)
        response_data = {'xAxis': lengthArr, 'name': name, 'rawData': val}
        [200, {'Content-Type' => 'application/json'}, [response_data.to_json]]
        # [200, {'Content-Type' => 'application/json'}, ['POST /api/algos']]
      else
        [500, {'Content-Type' => 'text/html'}, ["POST only at #{req.path_info}"]]
      end
    else
      [404, {"Content-Type" => "text/html"}, ["404 I'm Lost!"]]
    end
  end
end

app = App.new
run app



# port = ENV['PORT'].to_i || 8080
# app = App.new
