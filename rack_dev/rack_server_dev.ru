require 'json'
require_relative './benchmark.rb'

class App
  include Benchmark
  def call(env)
    req = Rack::Request.new(env)
    case req.path_info
    when /hello/
      [200, {'Content-Type' => 'text/html'}, ['200 Hello World']]
    when /api\/algos/
      if req.post?
        # headers = Hash[*env.select {|k,v| k.start_with? 'HTTP_'}
        #   .collect {|k,v| [k.sub(/^HTTP_/, ''), v]}
        #   .collect {|k,v| [k.split('_').collect(&:capitalize).join('-'), v]}
        #   .sort
        #   .flatten]
        # p headers
        req_data = JSON.parse(req.body.read)
        lengthArr = req_data['lengthArr']
        request_data = req_data['request_data']
        name = req_data['request_data']['name']
        val = handle_request(lengthArr, request_data)
        response_data = {'xAxis': lengthArr, 'name': name, 'rawData': val}
        p response_data
        p response_data.to_json
        [200, {'Content-Type' => 'text/html'}, [response_data.to_json]]
      else
        [500, {'Content-Type' => 'text/html'}, ["POST only at #{req.path_info}"]]
      end
    else
      [404, {"Content-Type" => "text/html"}, ["404 I'm Lost!"]]
    end
  end
end

run App.new
