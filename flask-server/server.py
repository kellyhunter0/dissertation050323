# want to return the outliers from the local outllier function
# bind these to a route - lof or outliers maybe
# save these in an array
# send to react front end to see if the points exist as outliers, and if they do try to highlight them
# then show the removal of these and compare the two visualisations side by side

from flask import Flask
import numpy as np
import pandas as pd
from pandas import Series
import matplotlib as m
from matplotlib import pyplot as plt
from fileHandling import csvRead, csvColumnRename, reg_predict
from flaskname import * # gets the flask app name function from py file
#from sklearn.neighbors import LocalOutlierFactor
from outlierRemoval import removeOutliers
from gaussianDistribution import gaussianDistribution

FILE_NAME = "./../front-end/public/datasets/original/iot_telemetry_data.csv"
 
# identify the columns in the csv
columns = ["ts","device","co","humidity","light","lpg","motion","smoke","temp"]
# use the columns with the specified file name
dataframe = pd.read_csv(FILE_NAME, usecols=columns)

# Set flask name, this is standard
app = flaskNameValue()

# Read in data
csvRead() # this works

# Rename columns to make this more readable and remove any unnecessary ones
csvColumnRename() # this works

# Predict some values 
reg_predict() # need to work on this one

# Identify and remove any outliers
removeOutliers() # this works

    # Use Guassian Distribution to generate y values - 
# this is to affect the wuality of the visualisation and the linear regression line of best fit
gaussianDistribution() # this also works




# API routes for data. 
# This can be used when machine learning (lin reg) has been implemented.
# Doing it this way means we can pass the value of the model to the front end from the back end. 

#timeseries API route
@app.route('/timestamp')
def timestampAPI():
    #get the two points we want to check for outliers
    return {"timestamp": pd.Series(dataframe.timestamp).to_json(orient='values')}#  this returns as the timestamp rather than the converted datetime. convert this on the front end
 
#humidity API route
@app.route("/humidity")
def humidityAPI():
    csvRead()
    #get the two points we want to check for outliers
    return {"humidity": pd.Series(dataframe.humidity).to_json(orient='values')}

#carbon monoxice API route
@app.route("/co")
def coAPI():
    csvRead()
    #get the two points we want to check for outliers
    return {"carbon-monoxide": pd.Series(dataframe['carbon-monoxide']).to_json(orient='values')}

#temperatire API route
@app.route("/temperature")
def tempAPI():
    csvRead()
    #get the two points we want to check for outliers
    return {"temperature": pd.Series(dataframe.temperature).to_json(orient='values')}

#devices API route
@app.route("/devices")
def deviceAPI():
    csvRead()
    #get the two points we want to check for outliers
    return {"device": pd.Series(dataframe.device).to_json(orient='values')}


if __name__ == "__main__":
    app.run(debug=True) 
