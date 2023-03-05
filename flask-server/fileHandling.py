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

lr = LinearRegression()

# identify the columns in the csv
columns = ["ts","device","co","humidity","light","lpg","motion","smoke","temp"]

# use the columns with the specified file name
dataframe = pd.read_csv(FILE_NAME, usecols=columns)

### FUNCTIONS 
#       These focus priamrily on csv manipulation 
#
def csvToJson():
    # need to convert values from csv into a json array - this has to be one dimensional
    ts = pd.Series(dataframe['date']).to_json(orient='values') 
    humidity = pd.Series(dataframe.humidity).to_json(orient='values')
    

def csvColumnRename():
    #s.isnull().values.any()
    print(len(dataframe))
    #rename some to make it more readable
    dataframe.rename(columns={"ts" : "date"}, inplace=True)
    dataframe.rename(columns={"co" : "carbon-monoxide"}, inplace=True)
    dataframe.rename(columns={"temp" : "temperature"}, inplace=True)
    dataframe.replace(['b8:27:eb:bf:9d:51', '00:0f:00:70:91:0a', '1c:bf:ce:15:ec:4d'], ['1','2','3'], inplace=True)
    #convert timestamp to date - this doesn't convert in the json call below, but this can be tackled on the front end 
    dataframe['date'] = pd.to_datetime(dataframe['date'], unit="s")
    dataframe.to_csv("./../front-end/public/datasets/complete.csv", index=False)
    csvToJson()
    
    

# call rename function so our dataframe changes
csvColumnRename()

# Function to read the csv file. Calls
def csvRead():
    return dataframe


# Remove random data from temperature - this removes some specified columns at specified indexes, however this isn't truly random and therefore needs some further adjustment. Can be adapted to remove other column[row] values that will no doubt affect linear regression output
# 14/02/23 - THIS NOW WORKS! can adapt this to remove other values!
def missingData():
    minTemp = dataframe['temperature'].min() # identifies the columns
    maxTemp = dataframe['temperature'].max() # identifies the columns
    #print("Min: ", minTemp, " Max: ", maxTemp)
    #randomNum = randint(minTemp, 0)
    i = 0
    j = 0
    k = 0
    with open(FILE_NAME, 'r') as file:
        csv_reader = csv.reader(file, delimiter = ',')
        for row in csv_reader:
            if i < (len(dataframe)) & j < (len(dataframe)) & k < (len(dataframe)):
                dataframe.at[(i), 'carbon-monoxide']  = np.nan
                dataframe.at[(j), 'lpg']  = np.nan
                dataframe.at[(k), 'smoke']  = np.nan
                #dataframe.at[(i), 'carbon-monoxide'] =np.nan
                i= i + random.randint(0,3)
                j= j + random.randint(0,3)
                k= k + random.randint(0,3)
   
    print("Dataframe\n", dataframe)
    dataframe['carbon-monoxide'] = dataframe['carbon-monoxide'].astype(float)
    dataframe['lpg'] = dataframe['lpg'].astype(float)
    dataframe['smoke'] = dataframe['smoke'].astype(float)
    #dataframe['carbon-monoxide'] = dataframe['carbon-monoxide'].astype(float)
    if (dataframe['carbon-monoxide'] == 0).any():
        print(dataframe.dtypes)
        #12/02/23 not working for some reason, doesn't pick up the newly created blank values
        # 14/04/23 isnull() now works! It doesn't work if the values are empty strings and the data type hasnt been parsed, before calling check that the types are floats and then run the check to see if there are any null values in columns
        print("nullvalues", dataframe.isnull().sum())      
        #  reg_predict()
         # regression prediction model
    elif (dataframe['lpg'] == 0).any(): 
        print(dataframe.dtypes)
        #12/02/23 not working for some reason, doesn't pick up the newly created blank values
        # 14/04/23 isnull() now works! It doesn't work if the values are empty strings and the data type hasnt been parsed, before calling check that the types are floats and then run the check to see if there are any null values in columns
        print("nullvalues", dataframe.isnull().sum())                                                                                    
    dataframe.to_csv('./../front-end/public/datasets/missingvalues.csv', index=False)   
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
    # This wont parse datetime values, so i need to find a way that only targets the numerical data in the whole dataset, otherwise this will throw some really funky errors 
    # this is kind of fixed - all i had to do is drop the date value, and now i need to convert categorical values into numerical codes
    test_data = dataframe[dataframe['lpg'].isnull()]
    print("test data", test_data)
    rm = dataframe.dropna(inplace=True)    
    print("removed values",rm)
    x_train = dataframe.drop('temperature', axis=1)
    drop = dataframe.drop('date', axis=1)
    print("df after date removal", drop)
    ytrain = dataframe['temperature']
    print("----X train\n", drop)
    print("----Y train\n", ytrain)
    print(lr.fit(drop, ytrain))
    # finish predicting the temperature values
    remove_missing_values()


    # Idea 2: Could just remove these? However, this isn't the most ideal thing when a good portion of rows have missing values, but this could be an interesting thing to show compared to the approximation charts, we can then maybe see how these differ in output.
    # Idea 3: Could take the mean of the column in question and fill in the blank values with this, however this isn't the best way. It wouldn't be truly representative of what the value could be, and this could create some data quality issues in the dataset. it may even add bias to the dataset, so you should be careful if you do this approach. 

def remove_missing_values():
    dfresult = dataframe.dropna()
    print("Removed missing values: \n\n", dfresult)

    return dataframe
## Create API Routes for Data so we can send this to the front-end
#missing_data()

def aggregate_data():
    # need to make a function that aggregates the datetime column every 30 seconds, this will vastly reduce the number of entries and rows that will need to be processed.
    # Once we successfully aggregate the data, we return the dataframe
    # We then want to save this output to a csv to we can show this on the front end
    return dataframe




