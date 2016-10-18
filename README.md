# Algo Arena

[ss1]: ./docs/ss1.png
[ss2]: ./docs/ss1.png
[ss3]: ./docs/ss1.png
[ss4]: ./docs/ss1.png
[be1]: ./docs/aa-backend1.png
[ace]: https://ace.c9.io

## Usage and Implementation Details
![Screen Shot][ss1]

### Code Input

The text areas on either side of the page are fully functional code editors
built with [Ace Editor][ace].  Write your own code or choose from the demo
library on the ontrol panel.  Language for text highlighting and formatting
can be changed with the selector buttons at the top.  This will also specify
the language for demos from the control panel and processing on the back end.

### Control panel

The top row of the control panel allows the user to clear the code inputs,
specify the test parameters and run the tests.  Test parameters are specified
by inputing the upper and lower bound of the array lengths desired for testing
and the number of tests desired.  For example the following inputs:
{min: 1000, max: 5000, n: 5} would result in testing arrays of length
1000, 2000, 3000, 4000, and 5000.  All arrays are generated randomly at
the start of the test and a duplicate is taken for each iteration to ensure
that the array for each test is not already sorted.  All elements are integers
in the range (-1000000..1000000).

The bottom row of the control panel allows the user to run functions from
the library of sort functions written by the development team.  Hovering
over the buttons will display a text panel with information about the selected
sort algorithm.   

### Data Display

The center element is an SVG created with D3 that displays data from the benchmark tests.  
The chart listens to a redux store and on change displays the data as a scatter
plot wit array length on the x axis and time (ms) on the y axis.  Hovering
over a point on the chart allows the user to see the raw data from the test.

### Back End
![Backend Architecture][be1]
The backend uses an API gateway architecture.  When a request is received
from the front end, the gateway sends requests based on the language specified
by the JSON in the AJAX request.  

JSON Format:

Code Data:
```JSON
{
  "language": "javascript",
  "method": "function quickSort(arr)\n...\n}",
  "name": "quickSort"
}
```
Request to Gateway:
```JSON  
{
  "data1": "{Code Data}",
  "data2": "{Code Data}",
  "lengthArr":[1000, 2000, 3000]
}
```

Benchmark results are returned to the front end as an array of xy pairs to
be plotted on the central chart.  The responses from the benchmarking scripts
are complied by the gateway into a single response to each request received from
the front end.

Benchmark Data:
```JSON  
{
  "rawData":[{"x": "1000", "y": "31"}, {"x": "2000", "y": "63"}],
  "name": "quickSort",
  "xAxis":[1000, 2000, 3000]
}
```
Gateway Response:
```JSON  
{
  "data1": "{Benchmark Data}",
  "data2": "{Benchmark Data}",
}
```


## Development

To install dependencies clone the repo and run:

```Bash
$ ./bin/dev/config
```
All servers can be started simultaneously with:
```Bash
$ ./dev/start
```

To shut down or reset:
```Bash
$ ./dev/shutdown
```
```Bash
$ ./dev/reset
```



## ***DEPECATED***





Algo Arena is a full stack web application that allows users to input their own sort algorithms and benchmark them.  
It utilizes Node.js & Express server on the backend and React.js and D3 with flux architecture on the front end.    

## Features & Implementation

### User Code Input

The text areas on both sides of the page allow users to input code in JavaScript to be run in VMs on the backend.
Code is converted sent to the back end as a string and converted into a function object there.  The name of the declared
function is parsed out with regexp and sent as well to provide a reference that allows the user to use recursive calls.
Data is sent to the API as JSON in the format:

```JavaScript
{
  method1: [string, code from code input 1]
  method2: [string, code from code input 2]
  name1: [sting, name from method1]
  name2: [sting, name from method2]
  lengthArr: [int arr, lengths of arrays to test specified by user input in the control panel]
}

```

### Data Display

The center element is a D3 chart that displays data from the benchmark tests.  The chart listens to a flux store and on change
displays the data as a scatter plot wit array length on the x axis and time (ms) on the y axis.  Hovering over a point on the
chart allows the user to see the raw data from the test.



## Coming Soon:

### Additional Library Sorts

More sort functions and different implementations of the same sort functions for more visualization possibilities

### Support for additional languages

Ruby is first on the list.  

### Better Charts

Ability to specify logarithmic scale and more interactive elements.

### Additional Data Types

Allow the user to specify arrays of integers and strings.
