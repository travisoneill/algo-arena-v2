module Benchmark
  def random_array(length=10000, lo=-1000000, hi=1000000, data_type='integer')
    random = []
    length.times { random.push(rand(hi - lo) + lo) }
    return random
  end

  def handle_request(int_array, data_hash)
    code = data_hash['method']
    name = data_hash['name']
    eval(code)
    results = []
    int_array.each do |length|
      res = benchmark(code, name, length)
      results << {x: length, y: res}
    end
    return results
  end

  def benchmark(code, name, length=10000, iterations=1, analytics=false)
    t = 0
    array = random_array(length=length)
    iterations.times do
      arr = array.dup
      t0 = Time.now
      method(name).call(arr)
      t += Time.now - t0
    end
    return Integer(t * 1000)
  end
end

# if __FILE__ == $0
#   puts "RUBY BENCHMARK CLI"
#   pry
# end
