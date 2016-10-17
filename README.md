# Algo Arena

[Algo Arena live][live_url]

[live_url]: http://algorithm-arena.appspot.com/

To set up development environment run:

$ ./dev_config.sh

$ ./dev_startup.sh

To shut down or reset

$ ./dev_shutdown

$ ./dev_reset

![GitHub Logo][ss1]

[ss1]: ./docs/ss1.png
[ss2]: ./docs/ss1.png
[ss3]: ./docs/ss1.png
[ss1]: ./docs/ss1.png



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

### Control panel

The top row of the control panel allows the user to clear the code inputs, specify the test parameters and run the tests.
Test parameters are specified by inputing the upper and lower bound of the array lengths desired for testing and the number
of tests desired.  For example the following inputs: {min: 1000, max: 5000, n: 5} would result in testing arrays of length
1000, 2000, 3000, 4000, and 5000.  All arrays are generated randomly at the start of the test and a duplicate is taken
for each iteration.  All elements are integers in the range (-1000000..1000000).

The bottom row of the control panel allows the user to run functions from our library of sort functions written by
the development team.  Hovering over the buttons will display a text panel with information about the selected sort
algorithm.   

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
