#!/usr/bin/env ruby
require 'pry'

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

def bs
%{def bubble_sort(arr)
  sorted = false
  until sorted
    sorted = true
    arr.each_with_index do |n, idx|
      next if idx == 0
      if arr[idx] < arr[idx - 1]
        arr[idx], arr[idx -1] = arr[idx -1], arr[idx]
        sorted = false
      end
    end
  end
end}
end

def ms
%{def merge_sort(arr)
  arr.map! { |n| [n] }
  while arr.length > 1
    sorted = []
    arr.each_with_index do |a1, idx|
      next if idx % 2 == 1
      a2 = arr[idx + 1] || []
      temp = []
      until a2.length == 0 || a1.length == 0
        array = a1[0] < a2[0] ? a1 : a2
        temp << array.shift
      end
      sorted << temp + a1 + a2
    end
    arr = sorted
  end
end}
end

def rs
%{def radix_sort(arr)
  iter = 0
  max = 1
  while iter <= max
    index = [-1] + [0] * 18
    arr.each do |n|
      if iter == 0 && n != 0
        m = Integer(Math.log10(n.abs))
        max = m if m > max
      end
      radix = n >= 0 ? (n / (10 ** iter)) % 10 : -((-n / (10 ** iter)) % 10)
      index[radix + 9] += 1
    end

    (1..18).each { |i| index[i] += index[i - 1] }

    sorted = Array.new(arr.length, nil)
    (arr.length - 1).downto(0) do |num|
      n = arr[num]
      radix = n >= 0 ? (n / (10 ** iter)) % 10 : -((-n / (10 ** iter)) % 10)
      idx = index[radix + 9]
      index[radix + 9] -= 1
      sorted[idx] = n
    end
    iter += 1
    arr = sorted
  end
end}
end

def bubble_sort(arr)
  sorted = false
  until sorted
    sorted = true
    arr.each_with_index do |n, idx|
      next if idx == 0
      if arr[idx] < arr[idx - 1]
        arr[idx], arr[idx -1] = arr[idx -1], arr[idx]
        sorted = false
      end
    end
  end
  p arr
end

def merge_sort(arr)
  arr.map! { |n| [n] }
  while arr.length > 1
    sorted = []
    arr.each_with_index do |a1, idx|
      next if idx % 2 == 1
      a2 = arr[idx + 1] || []
      temp = []
      until a2.length == 0 || a1.length == 0
        array = a1[0] < a2[0] ? a1 : a2
        temp << array.shift
      end
      sorted << temp + a1 + a2
    end
    arr = sorted
  end
  p sorted[0]
end

def radix_sort(arr)
  iter = 0
  max = 1
  while iter <= max
    index = [-1] + [0] * 18
    arr.each do |n|
      if iter == 0 && n != 0
        m = Integer(Math.log10(n.abs))
        max = m if m > max
      end
      radix = n >= 0 ? (n / (10 ** iter)) % 10 : -((-n / (10 ** iter)) % 10)
      index[radix + 9] += 1
    end

    (1..18).each { |i| index[i] += index[i - 1] }

    sorted = Array.new(arr.length, nil)
    (arr.length - 1).downto(0) do |num|
      n = arr[num]
      radix = n >= 0 ? (n / (10 ** iter)) % 10 : -((-n / (10 ** iter)) % 10)
      idx = index[radix + 9]
      index[radix + 9] -= 1
      sorted[idx] = n
    end
    iter += 1
    arr = sorted
  end
end

if __FILE__ == $0
  puts "RUBY BENCHMARK CLI"
  pry
end
