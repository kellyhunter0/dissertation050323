# Observable Plot + Create React App - Transformation and Visualisation of Data

This repository demonstrates using [Observable Plot](https://github.com/observablehq/plot) together with [Create React App](https://create-react-app.dev).

To develop locally, clone this repository: 
```bash
git clone https://github.com/spacedaisy/dissertation050323.git
```
# Step 1
Then to install the npm dependencies:
```bash
cd front-end
npm install
```
# Step 2
To run the application (front-end):
```bash
cd front-end
npm start
```

# Step 3
To set up the server (back-end):
``` The second venv refers to the folder name it will be created in, the first represents setting up a virtual environment ```
```bash
cd flask-server
python -m venv venv

```
# Step 4
Activate so we can install packages with pip:
```bash
& C:/Users/Admin/Desktop/Uni/4thYear/Honours/dissertation050323/flask-server/venv/Scripts/Activate.ps1
```

# Step 5
Install packages:
```bash
pip install flask
pip install sklearn.models
pip install numpy
pip install pandas
pip install matplotlib
```

# Step 6
To run the server (back-end):
```bash
cd flask-server
python server.py
```
# Step 7
To develop, edit App.js and save to reload.
**NOTE**: 
```You will need to download Anaconda and attach this as your Python interpretor, this can be done at the bottom right of VSCode once installed. This will need to be added to your environment variables in Windows. To run certain files, you will need to change the Remote Signed settings to allow files to execute, this allows .py files to run. ```
