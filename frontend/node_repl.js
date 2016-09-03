function make(n, min, max){
  let arr = [];
  for (let i = 0; i < n; i++) {
    let rand = Math.floor(Math.random() * (max - min) + min);
    arr.push(rand);
  }
  return arr;
}

function jsSort(arr){
  arr.sort((a,b) => a-b);
}

function benchmark(sortFunc, length, iterations){
  let arr = make(length, -1000000, 1000000);
  let t = 0;
  for (let i = 0; i < iterations; i++) {
    let a = arr.slice(0);
    let t0 = new Date();
    sortFunc(a);
    let t1 = new Date();
    t += (t1 - t0);
    if(t > 20000){ break }
  }
  console.log(`${t} ms @ n = ${length}`);
  return t;
}

function benchRun(sortFunc, time, runs){
  time = time || 5000;
  runs = runs || 10;
  let start = 1000;
  let t = 0;
  while(t < time) {
    start *= 2;
    if(start > 1000 * Math.pow(2, runs)){break;}
    t = benchmark(sortFunc, start, 1);
  }
}

function test(length, iterations){
  let arr = make(length, 0, 1000000);
  let t = 0;
  for (let i = 0; i < iterations; i++) {
    let a = arr.slice(0);
    let t0 = new Date();
    a.sort( (x, y) => x - y );
    let t1 = new Date();
    t += (t1 - t0);
  }
  return t;
}

function quickSort(arr){
  if (arr.length <= 1) { return arr; }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).
    concat([pivot]).
    concat(quickSort(right));
}

function mergeSortIter(array){

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
}

function radixSort(arr){
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
}

function heapSort(arr){
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

}

const array = [3,6,1,0,7,8,2,4,9,5];

function mapSort(arr){
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
}

const arr = [ 1, 3, 6, 2, 0, 4, 5, 7, 8, 9, 0 ];
const arr1 = make(10, 0, 1000);
const arr2 = make(10, -1000, 1000);
const arr3 = make(10, 0, 1000000);
const arr4 = make(10, -1000000, 1000000);

const mp = mapSort;
const js = jsSort;
const qs = quickSort;
const ms = mergeSortIter;
const rs = radixSort;
const run = benchRun;
const hs = heapSort;
