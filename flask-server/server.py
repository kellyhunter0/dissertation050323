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
from fileHandling import csvRead, csvColumnRename, reg_predict, interpolated_values
from flaskname import * # gets the flask app name function from py file
#from sklearn.neighbors import LocalOutlierFactor
from outlierRemoval import removeOutliers
from gaussianDistribution import gaussianDistribution, predictionScores_normalDistribution
from KNearestNeighbor import optimize_k, outlierRemovalPredict
FILE_NAME = "./../front-end/public/datasets/original/iot_telemetry_data.csv"
FILE_MISSING = "./../front-end/public/datasets/missing/missingvalues.csv"
FILE_HALFED = "./../front-end/public/datasets/original/half-removed.csv"
FILE_OUTLIERS = "./../front-end/public/datasets/outliers/outlierremoval.csv"
 
# identify the columns in the csv
columns = ["ts","device","co","humidity","light","lpg","motion","smoke","temp"]
columnsM = ["carbon-monoxide","humidity","lpg","smoke","temperature"]
# use the columns with the specified file name
dataframe = pd.read_csv(FILE_NAME, usecols=columns)
df = pd.read_csv(FILE_MISSING, usecols=columnsM )
dfhalf = pd.read_csv(FILE_HALFED, usecols=columnsM )
outliersDF = pd.read_csv(FILE_OUTLIERS, usecols=columnsM )

# Set flask name, this is standard
app = flaskNameValue()

# Read in data
csvRead() # this works

# Rename columns to make this more readable and remove any unnecessary ones
csvColumnRename() # this works

# Predict some values 
reg_predict() # need to work on this one

interpolated_values()
# Identify and remove any outliers
removeOutliers() # this works
missingDF = pd.read_csv("./../front-end/public/datasets/normal-distribution/missing-filled-nd.csv")
plt.hist(missingDF['lpg'])
plt.xlabel('lpg (ppm (%))') 
plt.ylabel('count') 
plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (Guassian Distribution)")
plt.show()

    # Use Guassian Distribution to generate y values - 
# this is to affect the wuality of the visualisation and the linear regression line of best fit
#gaussianDistribution() # this also works
predictionScores_normalDistribution()

k_errors = optimize_k(data=dfhalf, target='lpg')
k_errors2 =  outlierRemovalPredict(data=outliersDF, target='lpg')
missingDFKNN = pd.read_csv("./../front-end/public/datasets/knearest/missing-filled-knn.csv")
missingDFKNN_outliers = pd.read_csv("./../front-end/public/datasets/knearest/missing-filled-knn-noOutliers.csv")

plt.hist(outliersDF['lpg'])
plt.xlabel('lpg (ppm (%))') 
plt.ylabel('count') 
plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (original data - outlier removal)")
plt.show() 

plt.hist(missingDFKNN['lpg'])
plt.xlabel('lpg (ppm (%))') 
plt.ylabel('count') 
plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (KNN predictions- before outlier removal)")
plt.show() 

plt.hist(missingDFKNN_outliers['lpg'])
plt.xlabel('lpg (ppm (%))') 
plt.ylabel('count') 
plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (KNN - No outliers)")
plt.show() 

plt.hist(missingDFKNN_outliers['carbon-monoxide'])
plt.xlabel('carbon monoxide (ppm (%))') 
plt.ylabel('count') 
plt.title("Right Skewed Normal Distribution - Carbon Monoxide (no outliers)")
plt.show() 

plt.hist(missingDFKNN_outliers['smoke'])
plt.xlabel('smoke (ppm (%))') 
plt.ylabel('count') 
plt.title("Right Skewed Normal Distribution - Smoke (no outliers)")
plt.show() 

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
