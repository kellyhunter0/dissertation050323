from flask import Flask
import numpy as np
import csv
import pandas as pd
from pandas import Series
import matplotlib as m
from matplotlib import pyplot as plt
import datetime 
from flaskname import * # gets the flask app name function from py file
import random
from sklearn.linear_model import LinearRegression

# Specify the file name
FILE_NAME = "./../front-end/public/datasets/complete.csv"

 
# identify the continuous columns in the csv
columns = ["carbon-monoxide","humidity","lpg","smoke","temperature"]

# use the columns with the specified file name
dataframe = pd.read_csv(FILE_NAME, usecols=columns)

### FUNCTIONS 
#       These focus priamrily on csv manipulation 
#

def removeOutliers():
    for x in ['temperature']:
        q75,q25 = np.percentile(FILE_NAME.loc[:,x],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        FILE_NAME.loc[FILE_NAME[x] < min,x] = np.nan
        FILE_NAME.loc[FILE_NAME[x] > max,x] = np.nan
    for x in ['smoke']:
        q75,q25 = np.percentile(FILE_NAME.loc[:,x],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        FILE_NAME.loc[FILE_NAME[x] < min,x] = np.nan
        FILE_NAME.loc[FILE_NAME[x] > max,x] = np.nan

    for x in ['lpg']:
        q75,q25 = np.percentile(FILE_NAME.loc[:,x],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        FILE_NAME.loc[FILE_NAME[x] < min,x] = np.nan
        FILE_NAME.loc[FILE_NAME[x] > max,x] = np.nan

    for x in ['humidity']:
        q75,q25 = np.percentile(FILE_NAME.loc[:,x],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        FILE_NAME.loc[FILE_NAME[x] < min,x] = np.nan
        FILE_NAME.loc[FILE_NAME[x] > max,x] = np.nan
    for x in ['carbon-monoxide']:
        q75,q25 = np.percentile(FILE_NAME.loc[:,x],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        FILE_NAME.loc[FILE_NAME[x] < min,x] = np.nan
        FILE_NAME.loc[FILE_NAME[x] > max,x] = np.nan
    print("Outlier removal:", dataframe)
    return dataframe

removeOutliers()
def roundValues():

    return dataframe


# this will help when it comes to 
def csvToJson():
    # need to convert values from csv into a json array - this has to be one dimensional
    ts = pd.Series(dataframe['date']).to_json(orient='values') 
    humidity = pd.Series(dataframe.humidity).to_json(orient='values')
    
