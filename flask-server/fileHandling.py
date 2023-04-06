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
from sklearn.model_selection import train_test_split 
from sklearn import metrics

# Specify the file name
FILE_NAME = "./../front-end/public/datasets/original/iot_telemetry_data.csv"
FILE_COMPLETE = "./../front-end/public/datasets/original/half-removed.csv"

lr = LinearRegression()
 
# identify the columns in the csv
columns = ["ts","device","co","humidity","light","lpg","motion","smoke","temp"]
 #carbon-monoxide,humidity,lpg,smoke,temperature
completeColumns = ['date','carbon-monoxide', 'humidity', 'lpg', 'smoke', 'temperature']
# use the columns with the specified file name
dataframe = pd.read_csv(FILE_NAME, usecols=columns)
complete = pd.read_csv(FILE_COMPLETE, usecols=completeColumns)
dataframe = dataframe.drop(['device','light','motion'], axis=1)
nan_values = dataframe[dataframe['lpg'].isna()]
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
    dataframe.to_csv("./../front-end/public/datasets/original/half-removed.csv", index=False)
    print(dataframe.info())
    print(dataframe.describe())
    plt.hist(dataframe['lpg'])
    plt.xlabel('lpg (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (original data)")
    plt.show()
    
    plt.hist(dataframe['carbon-monoxide'])
    plt.xlabel('carbon monoxide (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Carbon Monoxide (original data)")
    plt.show()
    
    plt.hist(dataframe['smoke'])
    plt.xlabel('smoke (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Smoke (original data)")
    plt.show()
    
    
   
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
            if i < (len(dataframe)-1):
                dataframe.at[(i), 'lpg']  = np.nan
                # dataframe.at[(j), 'lpg']  = np.nan
                # dataframe.at[(k), 'smoke']  = np.nan
                #dataframe.at[(i), 'carbon-monoxide'] =np.nan
                i= i + random.randint(0,4)
     
    print("\n___________________________________________")
    print("\n_____________Missing Values________________")
    print("Assigned missing values and reduced the dataset by half. The date has also been converted for redability and for the purposes of aggregating the data later on. \n", dataframe)
    dataframe.to_csv("./../front-end/public/datasets/missing/missingvalues.csv")
    print("Missing Values:\n", dataframe)
    dfresult = dataframe.dropna()
    print("\n_________________________________________")
    print("\n_________Removed Missing Values__________")
    print("Missing Values Removed:\n", dfresult)
    plt.hist(dfresult['lpg'])
    plt.xlabel('lpg (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (missing data)")
    plt.show()
    
    dfresult.to_csv('./../front-end/public/datasets/missing/missingremoved.csv', index=False)  
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
def mean_square_error(x, y):
    print('Mean Absolute Error:', metrics.mean_absolute_error(x, y))  
    print('Mean Squared Error:', metrics.mean_squared_error(x, y))  
    print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(x, y)))

def interpolated_values():
    print("\n_________Interpolated Predictions____________")
    temp = pd.read_csv('./../front-end/public/datasets/original/half-removed.csv', usecols=completeColumns)
    index_nan = dataframe[dataframe['lpg'].isna()].index
    missingValues = dataframe[dataframe['lpg'].isna()]
    temp2 = temp['lpg']
    nan_values = dataframe[dataframe['lpg'].isna()]
    print("index_nan\n", index_nan)
    print("temp2\n", temp2.iloc[index_nan])
    print("null values interpolation\n", nan_values)   
    dataframe['lpg'].interpolate( method='piecewise_polynomial', inplace=True, limit_direction="both") 
    dataframe['lpg'].interpolate( method='linear', inplace=True, limit_direction="both") 
    print(dataframe['lpg'])
    dataframe.drop(['date'], axis=1)
    dataframe.to_csv('./../front-end/public/datasets/interpolation/missing-filled-interpolate.csv')
    drop = dataframe.drop(['date'], axis=1)
    print("Predicted values (interpolate, method='linear'): \n", drop)
    mean_square_error(temp2.iloc[index_nan], drop['lpg'].iloc[index_nan]) # actual vs predicted
    x = dataframe['carbon-monoxide'].values.reshape(-1,1)
    y = drop['lpg'].values.reshape(-1,1)
    # This wont parse datetime values, so i need to find a way that only targets the numerical data in the whole dataset, otherwise this will throw some really funky errors 
    # this is kind of fixed - all i had to do is drop the date value, and now i need to convert categorical values into numerical codes 
    # finish predicting the values 
    print("\n_____________________________________________")
    print("\n___LinReg Calculations: Interpolated Values__")
    CallLinearReg(x,y) # this calls the function to get the intercept and coefficient after the data has been altered
    nd_charts()
    
def nd_charts():
    plt.hist(dataframe['lpg'])
    plt.xlabel('lpg (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas")
    plt.show()
    

def lr_values(): 
    print("\n_________Linear Regression Predictions____________")
    dataf = pd.read_csv('./../front-end/public/datasets/original/half-removed.csv', nrows=202592)  
    outliersFull = pd.read_csv('./../front-end/public/datasets/outliers/outlierremoval.csv')  
    date = dataframe.drop("date", axis=1) # drop date as it will flag an error, lr only accepts float values
    x = date.drop("lpg", axis=1) # drop this as this is the thing we will use to predict lpg
    x = x.values # assign the values of all the data except lpg
    y = date['lpg'].values # grab the thing we want to predict and its assigned values
    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=202591, random_state=0) # train the model
    lr.fit(x, y) # fit the model
    y_pred = lr.predict(X_test) # predict the model
    ydf = pd.DataFrame({'lpg':y_pred.flatten()})
    ydfSeries = pd.Series(ydf['lpg'], name='lpg')
    
    # fill in missing values
    missingvalues = pd.read_csv('./../front-end/public/datasets/missing/missingvalues.csv', nrows=202592)
    index_nan = missingvalues[missingvalues['lpg'].isna()].index
    missingValues_df = missingvalues[missingvalues['lpg'].isna()]
    temp2 = dataf['lpg']
    nan_values = missingvalues[missingvalues['lpg'].isna()]
    print("index_nan lr\n", index_nan)
    print("temp2 lr\n", temp2.iloc[index_nan])
    print("null values linear regression\n", nan_values)   
    
    missingvalues['lpg'].fillna(ydfSeries, inplace=True)
    print("Fill with linear regression values (pre-outlier removal):\n", missingvalues['lpg'])
    df3 = pd.DataFrame({'Actual':dataf['lpg'].iloc[index_nan], 'Predicted': missingvalues['lpg'].iloc[index_nan]})
    mean_square_error(temp2.iloc[index_nan], missingvalues['lpg'].iloc[index_nan]) # actual vs predicted
    #mean_square_error(dataf['lpg'], missingvalues[['lpg']])
    predictAllLpg = pd.DataFrame({'lpg':missingvalues['lpg'], 'carbon-monoxide':dataf['carbon-monoxide'], 'smoke':dataf['smoke'], 'humidity':dataf['humidity'], 'temperature':dataf['temperature'] })
    predictAllLpg.to_csv('./../front-end/public/datasets/linear-regression/all-predicted-lr-outliers.csv', index=False)
    print(df3)
    
        # fill in missing values - outliers removed
    outliers = pd.read_csv('./../front-end/public/datasets/missing/outliersRemoval-missing.csv', nrows=202592)
    index_nan = outliers[outliers['lpg'].isna()].index
    missingValues_df = outliers[outliers['lpg'].isna()]
    temp2 = dataf['lpg']
    nan_values = outliers[outliers['lpg'].isna()]
    print("index_nan lr\n", index_nan)
    print("temp2 lr\n", temp2.iloc[index_nan])
    print("null values linear regression\n", nan_values)   
    
    outliers['lpg'].fillna(ydfSeries, inplace=True)
    print("Fill with linear regression values (after outlier removal):\n", outliers['lpg'])
    df2 = pd.DataFrame({'Actual':outliersFull['lpg'].iloc[index_nan], 'Predicted': outliers['lpg'].iloc[index_nan]})
    mean_square_error(temp2.iloc[index_nan], outliers['lpg'].iloc[index_nan]) # actual vs predicted
    #mean_square_error(dataf['lpg'], missingvalues[['lpg']])
    predictAllLpg = pd.DataFrame({'lpg':outliers['lpg'], 'carbon-monoxide':dataf['carbon-monoxide'], 'smoke':dataf['smoke'], 'humidity':dataf['humidity'], 'temperature':dataf['temperature'] })
    predictAllLpg.to_csv('./../front-end/public/datasets/linear-regression/all-predicted-lr-outliers-removed.csv', index=False)
    print(df2)
    
    #mean_square_error(dataf['lpg'], missingvalues['lpg'])
    print("\n_____________________________________________")
    print("\n________LinReg Calculations: Coefficient Values_______")
    print("\nPre outlier removal")
    x2 = dataf['carbon-monoxide'].values.reshape(-1,1)
    y2 = missingvalues['lpg'].values.reshape(-1,1)
    CallLinearReg(x2, y2) # this calls the function to get the intercept and coefficient AFTER the data has been altered
    x11 = outliersFull['carbon-monoxide'].values.reshape(-1,1)
    y11 = outliers['lpg'].values.reshape(-1,1)
    CallLinearReg(x11, y11) # this calls the function to get the intercept and coefficient AFTER the data has been altered
    plt.hist(missingvalues['lpg'])
    plt.xlabel('lpg (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (pre outlier removal) Linear Regression")
    plt.show()

    plt.hist(outliers['lpg'])
    plt.xlabel('lpg (ppm (%))') 
    plt.ylabel('count') 
    plt.title("Right Skewed Normal Distribution - Liquified Petrolium Gas (after outlier removal) Linear Regression")
    plt.show()
def reg_predict():
    print("\n___________________________________________________________")
    print("\n_________Regression & Interpolation Predictions____________")
    x1 = complete['carbon-monoxide'].values.reshape(-1,1)
    y1 = complete['lpg'].values.reshape(-1,1)
    print("\n      This is before any alterations      ")
    CallLinearReg(x1, y1) # this calls the function to get the intercept and coefficient before the data has been altered
    interpolated_values()
    lr_values()
 
    #df.to_csv('./../front-end/public/datasets/all-predicted-lr.csv', index=False)
    return dataframe

 
    # Idea 2: Could just remove these? However, this isn't the most ideal thing when a good portion of rows have missing values, but this could be an interesting thing to show compared to the approximation charts, we can then maybe see how these differ in output.
    # Idea 3: Could take the mean of the column in question and fill in the blank values with this, however this isn't the best way. It wouldn't be truly representative of what the value could be, and this could create some data quality issues in the dataset. it may even add bias to the dataset, so you should be careful if you do this approach. 

 
def CallLinearReg(x, y):
    # x = complete['carbon-monoxide'].values.reshape(-1,1)
    # y = complete['lpg'].values.reshape(-1,1)
    lr.fit(x, y)
    print("Linear Regression intercept: \n", lr.intercept_ )
    print("Linear Regression coef: \n", lr.coef_ )
    

## Create API Routes for Data so we can send this to the front-end
#missing_data()

def aggregate_data():
    # need to make a function that aggregates the datetime column every 30 seconds, this will vastly reduce the number of entries and rows that will need to be processed.
    # Once we successfully aggregate the data, we return the dataframe
    # We then want to save this output to a csv to we can show this on the front end
    return dataframe


def filtered_data():

    return dataframe

