$:.unshift File.dirname(__FILE__)
require 'framework'

route('/hello') do
  "Hello #{params['name'] || 'World'}!"
end

route('/goodbye') do
  status 500
  "Goodbye Cruel World!"
end

run Framework.app
