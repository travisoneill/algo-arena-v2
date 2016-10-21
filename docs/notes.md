Demos TODO

-let vs var
-parallel assignment vs temp vs bitwise
-enumerations/iterations vs for loops

-py & js parallel is slow, in ruby iteration is slow but parallel fine
Optimized algos:

```Python
def bubble_sort(arr):
    done = False
    n = len(arr)
    while done == False:
        done = True
        for i in range(n-1):
            if arr[i] > arr[i+1]:
                temp = arr[i]
                arr[i+1] = arr[i]
                arr[i] = temp
                done = False

def bubble_sort_bw(arr):
    done = False
    n = len(arr)
    while done == False:
        done = True
        for i in range(n-1):
            if arr[i] > arr[i+1]:
                arr[i] = arr[i]^arr[i+1]
                arr[i+1] = arr[i]^arr[i+1]
                arr[i] = arr[i]^arr[i+1]
                done = False                
```      
```Javascript
function bubbleSort(arr){
  let sorted;
  let n = arr.length;
  while(!sorted){
    sorted = true;
    for(var i = 1; i < n; i++){
      if(arr[i-1] > arr[i]){
        sorted = false;
        var temp = arr[i-1];
        arr[i-1] = arr[i]
        arr[i] = temp;
      }
    }
  }
}
```      
```Ruby
def bubble_temp(arr)
  sorted = false
  n = arr.length
  idx = 0
  until sorted
    sorted = true
    while idx < n - 1
      if arr[idx + 1] < arr[idx]
        temp = arr[idx]
        arr[idx] = arr[idx + 1]
        arr[idx + 1] = temp
        sorted = false
      end
      idx += 1
    end
    idx = 0
  end
end
```    
