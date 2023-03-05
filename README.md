# Observable Plot + Create React App - Transformation and Visualisation of Data

This repository demonstrates using [Observable Plot](https://github.com/observablehq/plot) together with [Create React App](https://create-react-app.dev).

To develop locally, clone this repository, then to install the dependencies:

```bash
cd front-end
npm install
```

To run the application (front-end):

```bash
cd front-end
npm start
```

To set up the server (back-end):
  The second venv refers to the folder name it will be created in, the first represents setting up a virtual environment
```bash
cd flask-server
python -m venv venv
```
Activate environment:
```bash
& c:/Users/Admin/dissertation-050323/flask-server/venv/Scripts/Activate.ps1
```
To run the server (back-end):

```bash
cd flask-server
python server.py
```

To develop, edit App.js and save to reload.

Access data from https://livenapierac-my.sharepoint.com/:x:/r/personal/40283127_live_napier_ac_uk/Documents/Software%20Year%204/Honours%20Project/iot_telemetry_data.csv?d=wd1efb96d91db4fd096cda1d1683673e4&csf=1&web=1&e=TM4A74

Then make a new folder in called datasets in ./front-end/public/ and copy the iot_telemetry_data.csv there.



