#!/usr/bin/env ruby
require 'pry'
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

def r
%{def ruby_sort(arr)
  arr.sort
end}
end

def cs
%{def counting_sort(arr)
  map = Hash.new(0)
  min, max = arr[0], arr[0]
  arr.each do |n|
    map[n] += 1;
    min = n if n < min
    max = n if n > max
  end
  idx = 0
  (min..max).each do |n|
    map[n].times do
      arr[idx] = n
      idx += 1
    end
  end
  p arr
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

def ruby_sort(arr)
  arr.sort
end

def counting_sort(arr)
  map = Hash.new(0)
  min, max = arr[0], arr[0]
  arr.each do |n|
    map[n] += 1;
    min = n if n < min
    max = n if n > max
  end
  idx = 0
  (min..max).each do |n|
    map[n].times do
      arr[idx] = n
      idx += 1
    end
  end
  p arr
end

def heap_sort(arr)
	1.upto(arr.length - 1) do |i|
		child = i
		while child > 0
			parent = (child - 1) / 2
			if arr[parent] < arr[child]
				arr[parent], arr[child] = arr[child], arr[parent]
				child = parent
			else
				break
			end
		end
	end

	i = arr.length - 1
	while i > 0
		arr[0], arr[i] = arr[i], arr[0]
		i -= 1
		parent = 0
		while parent * 2 + 1 <= i
			child = parent * 2 + 1
			if child < i && arr[child] < arr[child + 1]
				child += 1
			end
			if arr[parent] < arr[child]
				arr[parent], arr[child] = arr[child], arr[parent]
				parent = child
			else
				break
			end
		end
	end
end

def quick_sort(arr, from=0, to=nil)
  if to == nil
    to = arr.count - 1
  end
  if from >= to
    return
  end
  pivot = arr[from]
  min = from
  max = to
  free = min

  while min < max
    if free == min
      if arr[max] <= pivot
        arr[free] = arr[max]
        min += 1
        free = max
      else
        max -= 1
      end
    elsif free == max
      if arr[min] >= pivot
        arr[free] = arr[min]
        max -= 1
        free = min
      else
        min += 1
      end
    end
  end
  arr[free] = pivot
  quick_sort(arr, from, free - 1)
  quick_sort(arr, free + 1, to)
end


if __FILE__ == $0
  puts "RUBY BENCHMARK CLI"
  pry
end
