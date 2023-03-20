from numpy.random import normal
import pandas as pd
import csv
import re


# 12/03/23 need to add the rest of the columns from the original dataset with this, i also need to remove 20259 lpg rows from the original dataset and add the noise in to see what happens
# I also need to adjust the mean in the guassian distribution function to the true value, this works for now but it needs changed

# File handling
FILE_NAME = "./../front-end/public/datasets/original/half-removed.csv"
lpgcols = ['lpg']
allcols = ['carbon-monoxide','humidity','smoke','lpg','temperature']
concatCols = ['carbon-monoxide','humidity','smoke','temperature']
# use the columns with the specified file name
fulldata40lpgframe = pd.read_csv(FILE_NAME, usecols=allcols)

# Convert values in csv to Series data
lpg = pd.Series(fulldata40lpgframe['lpg']) 
co = pd.Series(fulldata40lpgframe['carbon-monoxide'], name='carbon-monoxide') 
humidity = pd.Series(fulldata40lpgframe['humidity'], name='humidity') 
smoke = pd.Series(fulldata40lpgframe['smoke'], name='smoke') 
temp = pd.Series(fulldata40lpgframe['temperature'], name='temperature') 

# Note: 13/03/23 
# mycsvfile.csv needs to be created dynamically. 
# Currently it only reads the file  and doesn't creat it if it doesn't exist. Fix This!

def guassian_y_value():
    # lpg predicted value reads here! only 2001 rows so far
    data40lpg = pd.read_csv("./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv", usecols=lpgcols, nrows=80015) # 20259 is 10%, 80015 is roughly 40%
    data40 = pd.read_csv("./../front-end/public/datasets/original/half-removed.csv", usecols=concatCols, nrows=80015) # nearly there, needs work
    data10lpg = pd.read_csv("./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv", usecols=lpgcols, nrows=20259) # 20259 is 10%, 80015 is roughly 40%
    data10 = pd.read_csv("./../front-end/public/datasets/original/half-removed.csv", usecols=concatCols, nrows=20259) # nearly there, needs work
    print(data40)
    print(data40lpg)
    # write new lpg value to csv with the columns in half-removed.csv
    data40['lpg'] = data40lpg['lpg']
    data10['lpg'] = data10lpg['lpg']
    testframe = {"carbon-monoxide": data40['carbon-monoxide'], "humidity":data40['humidity'], "lpg":data40lpg['lpg'], "smoke":data40['smoke'], "temperature":data40['temperature']}
    testframe2 = {"carbon-monoxide": data10['carbon-monoxide'], "humidity":data10['humidity'], "lpg":data10lpg['lpg'], "smoke":data10['smoke'], "temperature":data10['temperature']}
    frame = pd.DataFrame(testframe)
    frame10 = pd.DataFrame(testframe2)
    print("40 percent of values -  dataframe", frame)
    print("10 percent of values -  dataframe", frame10)    
    df = pd.read_csv('./../front-end/public/datasets/original/half-removed.csv', usecols=allcols)
    # 'carbon-monoxide','humidity','smoke','lpg','temperature'
    rows = df.loc[:, 'carbon-monoxide':'temperature'] # start-col : end-col
    csvTail40 = rows.tail(122577) 
    # load 182,333 rows from the bottom and store this in a dataframe 
    # then merge this with the remaining 10% of the guassian distrib dataset (20259 rows with 5 cols)
    csvTail10 = rows.tail(182333) 
    df2 = pd.concat([frame,csvTail40.loc[:]]).reset_index(drop=True)
    df3 = pd.concat([frame10,csvTail10.loc[:]]).reset_index(drop=True)
    print("40% of values changed with Normal Distribution\n",df2)
    print("10% of values changed with Normal Distribution\n",df3)
    df2.to_csv("./../front-end/public/datasets/normal-distribution/guassiandistrib-40.csv", index=False)
    df3.to_csv("./../front-end/public/datasets/normal-distribution/guassiandistrib-10.csv", index=False)
    

#### GUASSIAN DISTRIBUTION #####    
# 08/03/23 - 09/03/23
#  This needs work but is nearly there. 

# 10/03/23
#  This now puts noise values into an object.
#       - need to split these out into a data40lpgrame and save this with other columns to a new csv 

# 11/03/23 - 12/03/23
#   Have saved lpg into a csv of its own with predicted values - can alter the csv and add the other columns later
#       - I should perhaps predict all values and add this to a csv rather than just lpg alone
#       - Doing it this way means i can integrate it easier with my current dataset
#  12/03/23 update
#   CSV now works and I have integrated guassian distribution lpg values with the first 20259 rows of the dataset
def gaussianDistribution():
    lpgSD = lpg.std()
    lpgMean = lpg.mean()
    d = {"lpg":lpg,"co":co,"humidity": humidity,"smoke":smoke,"temperature": temp}
    lpgPredict = {'lpg':lpg}
    df = pd.DataFrame(d)
    print("Dataframe before alteration\n", df)
    # loc = mean, scale = standard deviation, size denotes rows and columns of a multi-dimensional array, k and v in the for loop denote key values in the lpg data40lpgrame
    rand_data = {k:normal(loc=lpgMean, scale=lpgSD, size=(1000,1)) for k,v in lpgPredict.items()} 
    rand_data2 = {k:normal(loc=lpgMean, scale=lpgSD, size=(1000,1)) for k,v in lpgPredict.items()} 
    rand_data3 = {k:normal(loc=lpgMean, scale=lpgSD, size=(1000,1)) for k,v in lpgPredict.items()} 
    rand_data4 = {k:normal(loc=lpgMean, scale=lpgSD, size=(1000,1)) for k,v in lpgPredict.items()} 
    rand_data5 = {k:normal(loc=lpgMean, scale=lpgSD, size=(1000,1)) for k,v in lpgPredict.items()} 
    print("rand_data type", type(rand_data))
    writeAll(rand_data, rand_data2, rand_data3, rand_data4, rand_data5)
    print("Removing punctuation from the file... Please wait...", "./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv")#
    cleanCsv() # Removes [] and '' from csv rows, and checks for any other punctuation
    guassian_y_value() # prints the distribution of the y value (lpg)


def writeAll(rand_data, rand_data2, rand_data3, rand_data4, rand_data5):
    write_lpg_values(rand_data) # function to write current lpg distirbutions to a csv
    write_append_lpg_values(rand_data2) # function to write current lpg distirbutions to a csv
    write_append_lpg_values(rand_data3) # function to write current lpg distirbutions to a csv
    write_append_lpg_values(rand_data4) # function to write current lpg distirbutions to a csv
    write_append_lpg_values(rand_data5) # function to write current lpg distirbutions to a csv

def write_lpg_values(rand_data):
    
    # Write the newly generated random data to the csvfile (this will eventually be cleaned with the cleanCsv function below)
    with open('./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv', 'w') as f:  # You will need 'wb' mode in Python 2.x, 
                                           # but we don't need to worry as this is a Conda 3.9.13 env
        w = csv.DictWriter(f, rand_data.keys())
        w.writeheader()
        w.writerow(rand_data)

    # Append more random data to the csvfile 
    # (the numpy normal random function has problems after 1000 rows, the data appears with ... in between to shorten it
    #     -> As a result, I set this to add the amount of data I want. 
    #        This saves to the csv file and I loop 20 times to get the 
    #        amount appended that i wanted. This is 10% of the data, as i want 
    #        to remove 10% of the y values and replace these with the nosified data)
    #        and compare this with the un-noisified dataset for educational purposes. 

    #     -> I have also created a dataset that generates 40% of the lpg values at random based on 
    #        a Guassian Distribution, I add these to a separate csv file to show comparison 
    #        The line is affected quite drastically when 40% of the values are noisy - this could be a 
    #        good thing to talk about in my dissertation.
    #
    #      Potential Research Questions:
    # ____________________
    #       Can people spot noisy data? 
    #       Do they know what to look for?

def write_append_lpg_values(rand_data):
    with open('./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv', 'a') as f:  # You will need 'wb' mode in Python 2.x
        w = csv.DictWriter(f, rand_data.keys())
        for i in range(20): # this allows us to generate enough random data to match 10% of our total data(202592 rows)
            w.writerow(rand_data)
#### REMOVE PUNCTUATION ####
# 11/03/23 - This removes punctuation from the newly generated lpg values created in the guassian distribution function
def remove_punc(string):
    punc = '''[]"" '''
    for ele in string:  
        if ele in punc:  
            string = string.replace(ele, "") 
    
    return string

#### REMOVE INVALID NUMBERS ####
##### 11/03/23 - need to work on this!
def remove_invalid_numbers(string):
    punc = re.findall('^0.', string) # need to look this up
    for ele in string:  
        if not punc:
            string = string.replace(ele, "") 
    
    return string

#### SERIES TO DATAFRAME #### 
# 12/03/23 - This converts series data to a dataframe - doesnt work fully yet, some values show as NaN in the dataframe, I can fix this
def seriesToFrame():
        l = lpg.to_frame()
        c = co.to_frame()
        h = humidity.to_frame()
        s = smoke.to_frame()
        t = temp.to_frame()
        frames = [l,c,h,s,t]
        result = pd.concat(frames)
        print("lpgframe\n",result)

#### CLEAN CSV ####
# 12/03/23 - this cleans the csv of any spaces or lines with emtpy information
def cleanCsv():
    dt = pd.read_csv(
    "./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv")
    if not dt.empty:

        with open("./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv",'r',encoding="utf-8") as f:
            data = f.read()
        with open("./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv","w+",encoding="utf-8") as f:
            f.write(remove_punc(data))
        
            
        result = ""
        with open("./../front-end/public/datasets/normal-distribution/lpg-gd-values.csv", "r+") as file:
            for line in file:
                if not line.isspace():
                    result += line
        
            file.seek(0)  
            file.write(result)
    
