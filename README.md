# Algo Arena


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

To add new services to the gateway add the language and local port to the
`PORTS` object `/gateway/services_config.js:1`
```JavaScript
PORTS = {
  'javascript': 8001,
  'python': 8002,
  'static': 8003,
  'ruby': 8004
//language: local port
}
```
Give the service a name for deployment and add it to the `SERVICES` object
at `/gateway/services_config.js:9`
```JavaScript
SERVICES = {
  'static': 'static',
  'javascript': 'express',
  'python': 'flask',
  'ruby': 'rack'
//language: service name
}
```
And make sure it matches the name under `service:` in the `app.yaml` file.
```yaml
service: flask
runtime: python
vm: true
entrypoint: gunicorn -b :$PORT flask_server:app

runtime_config:
  python_version: 3
manual_scaling:
  instances: 1
```

Now any request sent with your language specified in the JSON to `/api/algos`
will be automatically routed to your service locally and in production.  


[ss1]: ./docs/ss1.png
[ss2]: ./docs/ss1.png
[ss3]: ./docs/ss1.png
[ss4]: ./docs/ss1.png
[be1]: ./docs/aa-backend1.png
[ace]: https://ace.c9.io
