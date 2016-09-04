def python_sort():
    return '''def python_sort(arr):
    arr.sort()'''


def bubble_sort():
    return '''def bubble_sort(arr, done=False):
    while done == False:
        done = True
        for idx, num in enumerate(arr[0:-1]):
            if num > arr[idx+1]:
                arr[idx], arr[idx+1] = arr[idx+1], arr[idx]
                done = False
    return arr'''

def merge_sort():
    return '''def merge_sort(arr):
    def merge(arr1, arr2):
        arr1, arr2 = deque(arr1), deque(arr2)
        merged = []
        while len(arr1) > 0 and len(arr2) > 0:
            if(arr1[0] < arr2[0]):
                merged.append(arr1.popleft())
            else:
                merged.append(arr2.popleft())
        return merged + list(arr1) + list(arr2)
    if len(arr) < 2:
        return arr
    mid = len(arr) // 2
    left = arr[0:mid]
    right = arr[mid:]
    return merge(merge_sort(left), merge_sort(right))'''

def counting_sort(arr):
    return '''def counting_sort(arr):
        min, max = arr[0], arr[0]
        map = defaultdict(lambda: 0)
        sorted = []
        for n in arr:
            map[n] += 1
            if n > max: max = n
            if n < min: min = n
        for n in range(min, max + 1):
            for _ in range(map[n]):
                sorted.append(n)'''

def radix_sort(arr):
    return '''def radix_sort(arr):
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
            iter += 1'''

def quick_sort(arr):
    return '''def quick_sort(arr):
        if len(arr) < 2: return arr
        pivot = choice(arr)
        left, right, piv = [], [], []
        for n in arr:
            if n < pivot: left.append(n)
            if n > pivot: right.append(n)
            if n == pivot: piv.append(n)
        return quick_sort(left) + piv + quick_sort(right)'''

def heap_sort(arr, last=None):
    return '''def heap_sort(arr, last=None):
        last = last or len(arr)-1
        def value(idx):
            if idx <= last: return arr[idx]
            else: return -float('inf')
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
            step(1)'''
