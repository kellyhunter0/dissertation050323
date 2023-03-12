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
FILE_NAME = "./../front-end/public/datasets/iot_telemetry_data.csv"
FILE_COMPLETE = "./../front-end/public/datasets/half-removed.csv"

lr = LinearRegression()
 
# identify the columns in the csv
columns = ["ts","device","co","humidity","light","lpg","motion","smoke","temp"]
 #carbon-monoxide,humidity,lpg,smoke,temperature
completeColumns = ['date','carbon-monoxide', 'humidity', 'lpg', 'smoke', 'temperature']
# use the columns with the specified file name
dataframe = pd.read_csv(FILE_NAME, usecols=columns)
complete = pd.read_csv(FILE_COMPLETE, usecols=completeColumns)
dataframe = dataframe.drop(['device','light','motion'], axis=1)

### FUNCTIONS 
#       These focus priamrily on csv manipulation 
#
def csvToJson():
    # need to convert values from csv into a json array - this has to be one dimensional
    ts = pd.Series(dataframe['date']).to_json(orient='values') 
    humidity = pd.Series(dataframe.humidity).to_json(orient='values')
    

def csvColumnRename():
    #s.isnull().values.any()
    print("\n_________________________________________")
    print("\n___________Original Dataset______________")
    print(len(dataframe))
    print(dataframe)
    # Reduce dataset by half to improve performance when loading visualisations onto the front end - talk about this in the implementation section and document the problems encountered, then use this and user studies to evaluate your work.
    dataframe.drop(dataframe.tail(202592).index, inplace=True)
    # rename some to make it more readable
    dataframe.rename(columns={"co" : "carbon-monoxide"}, inplace=True)
    dataframe.rename(columns={"temp" : "temperature"}, inplace=True)
    dataframe.rename(columns={"ts" : "date"}, inplace=True)
    #convert timestamp to date - this doesn't convert in the json call below, but this can be tackled on the front end 
    dataframe['date'] = pd.to_datetime(dataframe['date'], unit="s")
    print("\n_________________________________________")
    print("\n__________Csv Column Rename______________")
    print(dataframe)
    dataframe.to_csv("./../front-end/public/datasets/half-removed.csv", index=False)
    missingData()
    return dataframe
    #csvToJson()
    
    

# call rename function so our dataframe changes


# Function to read the csv file. Calls
def csvRead():
    return dataframe


# Remove random data from temperature - this removes some specified columns at specified indexes, however this isn't truly random and therefore needs some further adjustment. Can be adapted to remove other column[row] values that will no doubt affect linear regression output
# 14/02/23 - THIS NOW WORKS! can adapt this to remove other values!
def missingData():
    i = 0
    with open(FILE_NAME, 'r') as file:
        csv_reader = csv.reader(file, delimiter = ',')
        for row in csv_reader:
            if i < (len(dataframe)):
                dataframe.at[(i), 'carbon-monoxide']  = np.nan
                dataframe.at[(i), 'lpg']  = np.nan
                dataframe.at[(i), 'smoke']  = np.nan
                # dataframe.at[(j), 'lpg']  = np.nan
                # dataframe.at[(k), 'smoke']  = np.nan
                #dataframe.at[(i), 'carbon-monoxide'] =np.nan
                i= i + random.randint(0,3)
    print("\n___________________________________________")
    print("\n_____________Missing Values________________")
    print("Assigned missing values and reduced the dataset by half. The date has also been converted for redability and for the purposes of aggregating the data later on. \n", dataframe)
    return dataframe

# aggregate - everything within 30 seconds and get the mean
# filtered- by date


## Now need to make function that approximates missing data, and a function to remove the blank values from rows
## Think - in the complete dataset, do we want to remove outliers? 
## Round the values for temp, humidity etc - these have several trailing digits so rounding them up or down might be easier to read and interpret

    # Idea 1: Could use a regression model to predict the missing values.
        # Steps to do this: (source: https://plainenglish.io/blog/predict-missing-dataframe-values-with-an-ml-algorithm-717cd872f1a8)
            # 1. Separate the null values from the dataframe and create a variable called test data
            # 2. Drop null values from the dataframe and represent these as 'train data'
            # 3. Create x_train and y_train from training data
            # 4. Build a linear regression model 
            # 5. Create x_test from test data
            # 6. Apply the model on x_test of test data to make predictions
            # 7. Replace missing values with predicted values
# add k-nearest neighbours to show comparison between two methods
def reg_predict():
    print("\n___________________________________________")
    print("\n_________Regression Predictions____________")


    rm = dataframe.dropna(inplace=True)
    rm
    drop = dataframe.drop(['date'], axis=1)
    print("Dropped date\n",drop)
    dataframe['carbon-monoxide'] = dataframe['carbon-monoxide'].astype(float)
    dataframe['lpg'] = dataframe['lpg'].astype(float)
    dataframe['smoke'] = dataframe['smoke'].astype(float)
    dataframe['temperature'] = dataframe['temperature'].astype(float)
    dataframe['humidity'] = dataframe['humidity'].astype(float)
    # This wont parse datetime values, so i need to find a way that only targets the numerical data in the whole dataset, otherwise this will throw some really funky errors 
    # this is kind of fixed - all i had to do is drop the date value, and now i need to convert categorical values into numerical codes
    x_train = dataframe['carbon-monoxide']
    z_train = dataframe['smoke']
    ytrain = dataframe['lpg']
    # finish predicting the values
    dataframe.to_csv('./../front-end/public/datasets/missingvalue.csv', index=False) 
    dfresult = dataframe.dropna()
    dfresult.to_csv('./../front-end/public/datasets/missingremoved.csv', index=False)  
    print("\n_________________________________________")
    print("\n_________Removed Missing Values__________")
    print("Removed missing values (reg): \n\n", dfresult)
    regr = lr.fit(drop, ytrain)
    print("Linear Regression: \n", regr)
    return dataframe


    # Idea 2: Could just remove these? However, this isn't the most ideal thing when a good portion of rows have missing values, but this could be an interesting thing to show compared to the approximation charts, we can then maybe see how these differ in output.
    # Idea 3: Could take the mean of the column in question and fill in the blank values with this, however this isn't the best way. It wouldn't be truly representative of what the value could be, and this could create some data quality issues in the dataset. it may even add bias to the dataset, so you should be careful if you do this approach. 

 
def CallLinearReg():
     numeric_columns = ['carbon-monoxide', 'temperature', 'lpg', 'smoke', 'humidity']
    

## Create API Routes for Data so we can send this to the front-end
#missing_data()

def aggregate_data():
    # need to make a function that aggregates the datetime column every 30 seconds, this will vastly reduce the number of entries and rows that will need to be processed.
    # Once we successfully aggregate the data, we return the dataframe
    # We then want to save this output to a csv to we can show this on the front end
    return dataframe


def filtered_data():

    return dataframe

