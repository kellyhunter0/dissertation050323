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
FILE_COMPLETE = "./../front-end/public/datasets/original/half-removed.csv"
 #carbon-monoxide,humidity,lpg,smoke,temperature
completeColumns = ['carbon-monoxide', 'humidity', 'lpg', 'smoke', 'temperature']
# use the columns with the specified file name
dataframe = pd.read_csv(FILE_COMPLETE, usecols=completeColumns)


### FUNCTIONS 
#       These focus priamrily on csv manipulation 
# source: https://www.askpython.com/python/examples/detection-removal-outliers-in-python

def removeOutliers():
    print("Dataset before outlier removal:\n\n", dataframe)
    dataframe.to_csv('./../front-end/public/datasets/outliers/pre-outlier-removal.csv', index=False)  
    for x in ['temperature']:
        q75,q25 = np.percentile(dataframe.loc[:,x],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        dataframe.loc[dataframe[x] < min,x] = np.nan
        dataframe.loc[dataframe[x] > max,x] = np.nan
    for y in ['smoke']:
        q75,q25 = np.percentile(dataframe.loc[:,y],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        dataframe.loc[dataframe[y] < min,y] = np.nan
        dataframe.loc[dataframe[y] > max,y] = np.nan

    for z in ['lpg']:
        q75,q25 = np.percentile(dataframe.loc[:,z],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        dataframe.loc[dataframe[z] < min,z] = np.nan
        dataframe.loc[dataframe[z] > max,z] = np.nan

    for a in ['humidity']:
        q75,q25 = np.percentile(dataframe.loc[:,a],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        dataframe.loc[dataframe[a] < min,a] = np.nan
        dataframe.loc[dataframe[a] > max,a] = np.nan
    for b in ['carbon-monoxide']:
        q75,q25 = np.percentile(dataframe.loc[:,b],[75,25])
        intr_qr = q75-q25
    
        max = q75+(1.5*intr_qr)
        min = q25-(1.5*intr_qr)
    
        dataframe.loc[dataframe[b] < min,b] = np.nan
        dataframe.loc[dataframe[b] > max,b] = np.nan
    #dataframe.to_csv("./../front-end/public/datasets/outlierremoval.csv", index=True)

    print("Outliers")
    print(dataframe.isnull().sum())
    dfresult = dataframe.dropna()
    dfresult.to_csv('./../front-end/public/datasets/outliers/outlierremoval.csv', index=False)  
    print("Dataset after outlier removal: \n\n", dfresult)
    print(dataframe.info())
    nullValues()
    return dataframe

def nullValues():
    i = 0
    df = pd.read_csv('./../front-end/public/datasets/outliers/outlierremoval.csv')  
    with open('./../front-end/public/datasets/outliers/outlierremoval.csv', 'r') as file:
        csv_reader = csv.reader(file, delimiter = ',')
        for row in csv_reader:
            if i < (len(df)-1):
                df.at[(i), 'lpg']  = np.nan
                # dataframe.at[(j), 'lpg']  = np.nan
                # dataframe.at[(k), 'smoke']  = np.nan
                #dataframe.at[(i), 'carbon-monoxide'] =np.nan
                i= i + random.randint(0,4)
    print("Outliers removed and missing values applied\n", df)
    df.to_csv('./../front-end/public/datasets/missing/outliersRemoval-missing.csv') # removed outliers and applied missing values so we can predict with each
    return df


# this will help when it comes to aggregating the data! - remove to json to have this working
def csvToJson():
    # need to convert values from csv into a json array - this has to be one dimensional
    ts = pd.Series(dataframe['date']).to_json(orient='values') 
    humidity = pd.Series(dataframe.humidity).to_json(orient='values')
    
