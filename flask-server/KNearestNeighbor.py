import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from flaskname import * # gets the flask app name function from py file
from sklearn.model_selection import train_test_split 
from sklearn.metrics import mean_squared_error
from sklearn.neighbors import KNeighborsRegressor
from numpy import isnan
from math import sqrt
from sklearn import metrics

# Specify the file name
FILE_COMPLETE = "./../front-end/public/datasets/missing/missingvalues.csv"

 #carbon-monoxide,humidity,lpg,smoke,temperature
completeColumns = ['carbon-monoxide', 'humidity', 'lpg', 'smoke', 'temperature']
# use the columns with the specified file name

dataframe = pd.read_csv(FILE_COMPLETE, usecols=completeColumns)

rmse = lambda y, yhat: np.sqrt(mean_squared_error(y, yhat))
def mean_square_error(x, y):
    print('Mean Absolute Error:', metrics.mean_absolute_error(x, y))  
    print('Mean Squared Error:', metrics.mean_squared_error(x, y))  
    print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(x, y)))
    
# https://betterdatascience.com/impute-missing-data-with-python-and-knn/
def optimize_k(data, target):
    errors = []
    errors2 = []
    ytest = []
    Xtest = []
    preds3 = []
    for k in range(0,18):
        #imputer = KNNImputer(n_neighbors=5)
    # imputed = imputer.fit_transform(data)
    # df_impted = pd.DataFrame(imputed, columns=dataframe.columns)
    #data.drop("date", axis=1)
        k=k+1
        X = data.drop(target, axis=1)
        y = data[target]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.03, random_state=150)
        X_train2, X_test2, y_train2, y_test2 = train_test_split(X, y, test_size=0.03, random_state=42)
        ytest.append({'xtrain':X_train})
        Xtest.append({'ytrain':y_train})
        model = KNeighborsRegressor(n_neighbors=k, weights='distance',algorithm='kd_tree', metric='euclidean')
        model2 = KNeighborsRegressor(n_neighbors=k, weights='distance',algorithm='kd_tree', metric='euclidean')
        model.fit(X_train, y_train) 
        model2.fit(X_train2, y_train2)  
        preds = model.predict(X_test)
        preds2 = model2.predict(X_test2)  
        preds3.append(preds)
        preds3.append(preds2)
        error = sqrt(mean_squared_error(y_test, preds))
        error2 = sqrt(mean_squared_error(y_test2, preds2))
        errors.append(error)
        errors2.append(error2)
    
    ydf = pd.DataFrame({'lpg':np.array(preds3).flatten()})
    ydf.to_csv('./../front-end/public/datasets/knearest/knn-predictions.csv', index=False)
    print(ydf) 
    print("RMSE for first model: \n", errors) 
    print("RMSE for second model: \n", errors2) 

    ydfSeries = pd.Series(ydf['lpg'], name='lpg')
    missingvalues = pd.read_csv('./../front-end/public/datasets/missing/missingvalues.csv', nrows=202592)
    originald = pd.read_csv('./../front-end/public/datasets/original/half-removed.csv', nrows=202592)

    index_nan = missingvalues[missingvalues['lpg'].isna()].index
    temp2 = originald['lpg']
    nan_values = missingvalues[missingvalues['lpg'].isna()]
    print("index_nan knn\n", index_nan)
    print("temp2 knn\n", temp2.iloc[index_nan])
    print("null values knn\n", nan_values)   

    
    missingv = missingvalues['lpg'].fillna(ydfSeries, inplace=True)
    df = pd.DataFrame({'Actual':originald['lpg'].iloc[index_nan], 'Predicted': missingvalues['lpg'].iloc[index_nan]})
    print(df)
    mean_square_error(temp2.iloc[index_nan], missingvalues['lpg'].iloc[index_nan]) # actual vs predicted
    compare(ydf, originald)
    missingvalues.to_csv('./../front-end/public/datasets/knearest/missing-filled-knn.csv', index=False)

    # this could be prone to overfitting due to the test size outlined in the train test split above, this was the size of the halved dataset, but this could produce results less accurate

    # print(Xtest)
    # print(ytest)
    
    # return errors
#k_errors = optimize_k(data=dataframe, target='lpg')
# print(k_errors)
def outlierRemovalPredict(data, target):
    errors = []
    errors2 = []
    ytest = []
    Xtest = []
    preds3 = []
    for k in range(0,18):
        #imputer = KNNImputer(n_neighbors=5)
    # imputed = imputer.fit_transform(data)
    # df_impted = pd.DataFrame(imputed, columns=dataframe.columns)
    #data.drop("date", axis=1)
        k=k+1
        X = data.drop(target, axis=1)
        y = data[target]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.03, random_state=150)
        X_train2, X_test2, y_train2, y_test2 = train_test_split(X, y, test_size=0.03, random_state=42)
        ytest.append({'xtrain':X_train})
        Xtest.append({'ytrain':y_train})
        model = KNeighborsRegressor(n_neighbors=k, weights='distance',algorithm='kd_tree', metric='euclidean')
        model2 = KNeighborsRegressor(n_neighbors=k, weights='distance',algorithm='kd_tree', metric='euclidean')
        model.fit(X_train, y_train) 
        model2.fit(X_train2, y_train2)  
        preds = model.predict(X_test)
        preds2 = model2.predict(X_test2)  
        preds3.append(preds)
        preds3.append(preds2)
        error = sqrt(mean_squared_error(y_test, preds))
        error2 = sqrt(mean_squared_error(y_test2, preds2))
        errors.append(error)
        errors2.append(error2)
    
    ydf = pd.DataFrame({'lpg':np.array(preds3).flatten()})
    ydf.to_csv('./../front-end/public/datasets/knearest/knn-predictions.csv', index=False)
    print(ydf) 

    ydfSeries = pd.Series(ydf['lpg'], name='lpg')
    originald = pd.read_csv('./../front-end/public/datasets/original/half-removed.csv', nrows=202592)
    
    print("____________________________________")
    print("Outliers removed, missing values applied, KNN predictions filled in")
    print("____________________________________")
    # outliers removed and other missing values
    missingvaluesOutliers = pd.read_csv('./../front-end/public/datasets/missing/outliersRemoval-missing.csv', nrows=202592) # this is outlier removal, then apply random missing values to LPG
    index_nan_missing = missingvaluesOutliers[missingvaluesOutliers['lpg'].isna()].index
    temp2Missing = originald['lpg']
    nan_values_missing = missingvaluesOutliers[missingvaluesOutliers['lpg'].isna()]

    
    missingvoutliers = missingvaluesOutliers['lpg'].fillna(ydfSeries, inplace=True)
    dfMissing = pd.DataFrame({'Actual':originald['lpg'].iloc[index_nan_missing], 'Predicted': missingvaluesOutliers['lpg'].iloc[index_nan_missing]})
    print("Missing Filled - KNN (no outliers)\n",dfMissing)
    mean_square_error(temp2Missing.iloc[index_nan_missing], missingvaluesOutliers['lpg'].iloc[index_nan_missing]) # actual vs predicted
    missingvaluesOutliers.to_csv('./../front-end/public/datasets/knearest/missing-filled-knn-noOutliers.csv', index=False)
    
# function to compare the entirely predicted values with the original dataset, in case of overfitting this is a good way of validating the model, then we can plot a chart that shows a comparison between the two charts and explanations about their differences.
def compare(predicted, actual):
    predicted = pd.read_csv('./../front-end/public/datasets/knearest/knn-predictions.csv', nrows=202592)
    df = pd.DataFrame({'Actual':actual['lpg'], 'Predicted': predicted['lpg']})
    df2 = pd.DataFrame({'lpg':predicted['lpg'], 'carbon-monoxide': actual['carbon-monoxide'], 'smoke':actual['smoke']})
    df2.to_csv('./../front-end/public/datasets/knearest/knn-predict-colpg.csv', index=False)
    print("Completely predicted values compared to original\n",df)
    error2 = sqrt(mean_squared_error(actual['lpg'], predicted['lpg']))
    print(error2)
    
