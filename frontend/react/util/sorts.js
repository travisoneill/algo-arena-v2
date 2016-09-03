module.exports = {

  bubbleSort(language){
    if(language === 'javascript'){
      return `function bubbleSort(arr) {
        var len = arr.length;
        for (var i = len-1; i>=0; i--){
          for(var j = 1; j<=i; j++){
            if(arr[j-1]>arr[j]){
              var temp = arr[j-1];
              arr[j-1] = arr[j];
              arr[j] = temp;
            }
          }
        }
        return arr;
      }`;
    }
    if(language === 'python'){
      return `def bubble_sort(arr, done=False):
    while done == False:
        done = True
        for idx, num in enumerate(arr[0:-1]):
            if num > arr[idx+1]:
                arr[idx], arr[idx+1] = arr[idx+1], arr[idx]
                done = False
    return arr`
    }
  },

  quickSortRec(language){
    if(language === 'javascript'){
      return `function quickSort(arr) {
        if (arr.length <= 1) {
          return arr;
        }

        var pivot = arr[0];
        var left = [];
        var right = [];

        for (var i = 1; i < arr.length; i++) {
          if (arr[i] < pivot) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }

        return this.quickSort(left).concat([pivot]).concat(this.quickSort(right));
      }`;
    }
    if(language === 'python'){
      return `def quick_sort(arr):
    if len(arr) < 2: return arr
    pivot = choice(arr)
    left, right, piv = [], [], []
    for n in arr:
        if n < pivot: left.append(n)
        if n > pivot: right.append(n)
        if n == pivot: piv.append(n)
    return quick_sort(left) + piv + quick_sort(right)`
    }
  },

  heapSort(language){
    if(language === 'javascript'){
      return `function heapSort(arr){
        let last = arr.length - 1;
        function parent(idx){
          if(idx > 0 && idx <= last){return ~~((idx -1) / 2);}
        }
        function children(idx){
          let children = {l: undefined, r: undefined}
          if(2 * idx + 1 <= last){children.l = 2 * idx + 1;}
          if(2 * idx + 2 <= last){children.r = 2 * idx + 2;}
          return children
        }
        function swap(idx1, idx2){
          let temp = arr[idx1];
          arr[idx1] = arr[idx2];
          arr[idx2] = temp;
        }
        function pair(idx){
          if(idx < 1){return undefined}
          return children(parent(idx));
        }

        function heapStep(idx){
          let l = pair(idx).l;
          let r = pair(idx).r;
          let par = parent(idx);
          let max = arr[l];
          let maxi = l;
          if(r && l && arr[r] > arr[l]){
            max = arr[r];
            maxi = r;
          }
          if(max > arr[par]){swap(maxi, par);}
          if(children(maxi).l){heapStep(children(maxi).l);}
        }

        function makeHeap(n){
          for (let i = n; i > 0; i-=2) {
            last = n;
            heapStep(i);
          }
        }

        makeHeap(last)

        for (let i = last; i > 0; i--) {
          swap(0, i);
          last--;
          heapStep(1);
        }
      }`;
    }
    if(language === 'python'){
      return `def heap_sort(arr, last=None):
    last = last or len(arr)-1
    def value(idx):
        if idx <= last: return arr[idx]
        else: return -inf
    def left(idx):
        return 2 * idx + 1
    def right(idx):
        return 2 * idx + 2
    def children(idx):
        return [left(idx), right(idx)]
    def parent(idx):
        return (idx -1) // 2
    def swap(idx1, idx2):
        arr[idx1], arr[idx2] = arr[idx2], arr[idx1]
    def step(idx):
        par = parent(idx)
        siblings = children(par)
        if value(siblings[0]) > value(siblings[1]):
            max = siblings[0]
            dir = 'left'
        else:
            max = siblings[1]
            dir = 'right'
        if value(max) > value(par):
            swap(max, par)
            step(left(max))
    for i in range(last, 0, -2):
        step(i)
    for n in range(len(arr)):
        swap(last, 0)
        last -= 1
        step(1)`;
    }
  },

  radixSort(language){
    if(language === 'javascript'){
      return `function radixSort(arr){
        let iter = 0;
        function step(a, n){
          let max = a[0];
          let indexArr = [-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          for (let i = 0; i < a.length; i++) {
            if(n === 0 && Math.abs(a[i]) > max){max = Math.abs(a[i]);}
            let dig = ~~( (a[i] / Math.pow(10, n)) % 10);
            indexArr[dig + 9] += 1;
          }

          if(n === 0){ iter = ~~(Math.log10(max));}

          for (let i = 1; i < indexArr.length; i++) {
            indexArr[i] += indexArr[i-1];
          }

          let sorted = [];
          for (let i = a.length - 1; i >= 0; i--) {
            let dig = ~~( (a[i] / Math.pow(10, n)) % 10);
            let idx = indexArr[dig + 9];
            sorted[idx] = a[i];
            indexArr[dig + 9] -= 1;
          }
          return sorted;
        }

        for (let i = 0; i <= iter; i++) {
          arr = step(arr, i);
        }
        return arr;
      }`;
    }
    if(language === 'python'){
      return `def radix_sort(arr):
    def dig(n, num):
        digit = (abs(num) // 10**n) % 10
        digit = digit * -1 if num < 0 else digit
        return digit
    iterations = 1
    iter = 0
    while iter < iterations:
        idx = [-1] + [0] * 18
        max = abs(arr[0])
        for n in arr:
            if abs(n) > max: max = abs(n)
            d = dig(iter, n)
            idx[d + 9] += 1
        iterations = int(log10(max)) + 1
        for i in range(18):
            idx[i + 1] += idx[i]
        for n in reversed(arr[:]):
            i = dig(iter, n) + 9
            j = idx[i]
            arr[j] = n
            idx[i] -= 1
        iter += 1`;
    }
  },

  countingSort(language){
    if(language === 'javascript'){
      return `function countingSort(arr){
        let map = {};
        let max = arr[0];
        let min = arr[0]
        for (var i = 0; i < arr.length; i++) {
          if(arr[i] > max){max = arr[i];}
          if(arr[i] < min){min = arr[i];}
          if(map[arr[i]] > 0){map[arr[i]]++;} else {map[arr[i]] = 1;}
        }
        let idx = 0;
        for (let i = min; i <= max; i++) {
          if(map[i]){
            for (let j = 0; j < map[i]; j++) {
              arr[idx] = i;
              idx++;
            }
          }
        }
      }`;
    }
    if(language === 'python'){
      return `def counting_sort(arr):
    min, max = arr[0], arr[0]
    map = defaultdict(lambda: 0)
    sorted = []
    for n in arr:
        map[n] += 1
        if n > max: max = n
        if n < min: min = n
    for n in range(min, max + 1):
        for _ in range(map[n]):
            sorted.append(n)`;
    }
  },

  mergeSortIter(language){
    if(language === 'javascript'){
      return `function mergeSortIter(array){
    for (let i = 0; i < array.length; i++) {
      array[i] = [array[i]];
    }

    let merge = function(arr1, arr2){
      arr1 = arr1 || [];
      arr2 = arr2 || [];
      let merged = [];
      while(arr1.length > 0 && arr2.length > 0){
        if(arr1[0] < arr2[0]){merged.push(arr1.shift());}
        else {merged.push(arr2.shift());}
      }
      return merged.concat(arr1, arr2)
    }

    let merging = [];
    while(array.length > 1){
      merging = [];
      for (let i = 0; i < array.length; i+=2) {
        let j = i + 1
        merging.push(merge(array[i], array[j]));
      }
      array = merging;
    }
    return array;
  }`;
    }
    if(language === 'python'){
      return `def merge_sort_iter(arr):
    def merge(arr1, arr2):
        arr1, arr2 = deque(arr1), deque(arr2)
        merged = []
        while len(arr1) > 0 and len(arr2) > 0:
            if(arr1[0] < arr2[0]):
                merged.append(arr1.popleft())
            else:
                merged.append(arr2.popleft())
        return merged + list(arr1) + list(arr2)
    for i in range(len(arr)):
        arr[i] = [arr[i]]
    while len(arr) > 1:
        merged = []
        for i in range(0, len(arr) - 1, 2):
            merged.append(merge(arr[i], arr[i+1]))
        arr = merged`;
    }
  },

  jsSort(language){
    if(language === 'javascript'){
      return `function jsSort(arr){
        arr.sort((a,b) => a-b);
      }`;
    }
    if(language === 'python'){
      return `def python_sort(arr):
    arr.sort()`;
    }
  }

};
