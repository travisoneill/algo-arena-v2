require 'json'
require_relative './benchmark.rb'

class Hello
  def call(env)
    req = Rack::Request.new(env)
    case req.path_info
    when /hello/
      [200, {'Content-Type' => 'text/html'}, ['200 Hello World']]
    when /api\/algos/
      if req.post?
        b = Benchmark.new(req.params)
        val = b.run
        [200, {'Content-Type' => 'text/html'}, [val]]
      else
        [500, {'Content-Type' => 'text/html'}, ["POST only at #{req.path_info}"]]
      end
    else
      [404, {"Content-Type" => "text/html"}, ["404 I'm Lost!"]]
    end
  end
end

run Hello.new
