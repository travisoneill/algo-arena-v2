require 'action'
class Framework
  def self.app
    @app ||= begin
      Rack::Builder.new do
        map '/' do
          run ->(env){[404, {'Content-Type' => 'text/plain'}, ['Page Not Found!']] }
        end
      end
    end
  end
end

def route(pattern, &block)
  SimpleFramework.app.map(pattern) do
    run Action.new(&block)
  end
end
