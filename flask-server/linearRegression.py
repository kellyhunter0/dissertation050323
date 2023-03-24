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
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn import metrics
from sklearn.impute import KNNImputer
from numpy import isnan

# Specify the file name
FILE_COMPLETE = "./../front-end/public/datasets/missing/missingvalues.csv"

 #carbon-monoxide,humidity,lpg,smoke,temperature
completeColumns = ['carbon-monoxide', 'humidity', 'lpg', 'smoke', 'temperature']
# use the columns with the specified file name

dataframe = pd.read_csv(FILE_COMPLETE, usecols=completeColumns)

rmse = lambda y, yhat: np.sqrt(mean_squared_error(y, yhat))

def knearest():
    X = dataframe['lpg'].values.reshape(-1,1)
    print('Missing: %d' % sum(isnan(X)))
    imputer = KNNImputer()
    imputer.fit(X)
    Xtrans = imputer.transform(X)
    # print total missing
    print('Missing: %d' % sum(isnan(Xtrans)))
    xtransDF = pd.Series(Xtrans)
    dataframe['lpg'].fillna(xtransDF, inplace=True)
    print(dataframe['lpg'])

    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=202591, random_state=0)
    lr.fit(x, y)
    y_pred = lr.predict(X_test)
    ydf = pd.DataFrame({'lpg':y_pred.flatten()})
    ydfSeries = pd.Series(ydf['lpg'], name='lpg')
    missingvalues = pd.read_csv('./../front-end/public/datasets/missing/missingvalues.csv', nrows=202592)
    missingvalues['lpg'].fillna(ydfSeries, inplace=True)
    print("Fill with linear regression values:\n", missingvalues['lpg'])
    df = pd.DataFrame({'Actual':dataf['lpg'], 'Predicted': missingvalues['lpg']})
# https://betterdatascience.com/impute-missing-data-with-python-and-knn/
def optimize_k(data, target):
    errors = []
    # for k in range(1, 10, 2):
    imputer = KNNImputer(n_neighbors=5)
    imputed = imputer.fit_transform(data)
    df_imputed = pd.DataFrame(imputed, columns=dataframe.columns)
    
    X = df_imputed.drop(target, axis=1)
    y = df_imputed[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=202591, random_state=42)

    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    preds = model.predict(X_test)
    ydf = pd.DataFrame({'lpg':preds.flatten()})
    ydfSeries = pd.Series(ydf['lpg'], name='lpg')
    missingvalues = pd.read_csv('./../front-end/public/datasets/missing/missingvalues.csv', nrows=202591)
    missingvalues['lpg'].fillna(ydfSeries, inplace=True)
    print("Fill with k-nearest-neighbour values:\n", missingvalues['lpg'])
    df = pd.DataFrame({'Actual':data['lpg'], 'Predicted': missingvalues['lpg']})
    missingvalues.to_csv('./../front-end/public/datasets/missing/missing-filled-knn.csv')
    
    # error = rmse(y_test, preds)
    # errors.append({'K': 5, 'RMSE': error})
    # print(errors)
    # return errors
#k_errors = optimize_k(data=dataframe, target='lpg')
# print(k_errors)