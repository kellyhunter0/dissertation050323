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
from fileHandling import *
from flaskname import * # gets the flask app name function from py file
#from sklearn.neighbors import LocalOutlierFactor
from outlierRemoval import *
from gaussianDistribution import *


# Set flask name, this is standard
app = flaskNameValue()


csvRead()
csvColumnRename()

# create some missing data
#missingData()
# predict some values
reg_predict()
removeOutliers()
gaussianDistribution()


# API routes for data. This can be used when machine learning (lin reg) has been implemented, this way we can pass the value of the model to the front end from the back end. 

#timeseries API route
@app.route('/')
def timestampAPI():

    #get the two points we want to check for outliers
    return {"co": pd.Series(dataframe['carbon-monoxide']).to_json(orient='values')}#  this returns as the timestamp rather than the converted datetime. convert this on the front end
 
#humidity API route
# @app.route('/')
# @app.route("/humidity")
# def humidityAPI():
#     csvRead()
#     #get the two points we want to check for outliers
#     return {"humidity": pd.Series(dataframe.humidity).to_json(orient='values')}

# #carbon monoxice API route
# @app.route('/')
# @app.route("/co")
# def coAPI():
#     csvRead()
#     #get the two points we want to check for outliers
#     return {"carbon-monoxide": pd.Series(dataframe['carbon-monoxide']).to_json(orient='values')}

# #temperatire API route
# @app.route('/')
# @app.route("/temperature")
# def tempAPI():
#     csvRead()
#     #get the two points we want to check for outliers
#     return {"temperature": pd.Series(dataframe.temperature).to_json(orient='values')}

# #devices API route
# @app.route('/')
# @app.route("/devices")
# def deviceAPI():
#     csvRead()
#     #get the two points we want to check for outliers
#     return {"device": pd.Series(dataframe.device).to_json(orient='values')}


if __name__ == "__main__":
    app.run(debug=True) 
