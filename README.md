# DS 5500: Client-Server Visualization and Modeling


This is an assignment for the DS 5500 course

## Getting Started
Download the zip file from github and unzip it to a target folder.

### Prerequisites

The server code is implemented in Python 3.

Python libraries needed to be installed on local machine for the server - flask_restful, sklearn, pandas, numpy, json, flask_cors, flask



### Implementing
Open python command prompt and navigate to the server folder and run 'python flask_roc.py'.

Next, to setup the client, navigate to the client folder and start a local server using 'python -m http.server'.
The client front end should open up in the browser at the new address of the python server. 

The client routes all server requests to http://localhost:5000/. Make sure to change the address as per your server location in the script.js file.(within the d3.json command)

Make sure that the client and server are running on two different servers.
## Running the tests

Enter required parameters in the text box and click on 'visualize' to view the ROC- curve. Click on 'clear' to reset.



## Author

* **Shishir Kurhade** - [github](https://github.com/shishir-kurhade)







