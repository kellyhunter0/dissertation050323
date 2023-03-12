from numpy.random import normal
import pandas as pd
import csv

# 12/03/23 need to add the rest of the columns from the original dataset with this, i also need to remove 20259 lpg rows from the original dataset and add the noise in to see what happens
# I also need to adjust the mean in the guassian distribution function to the true value, this works for now but it needs changed

# File handling
FILE_NAME = "./../front-end/public/datasets/half-removed.csv"
lpgcols = ['lpg']
allcols = ['carbon-monoxide','humidity','smoke','lpg','temperature']
concatCols = ['carbon-monoxide','humidity','smoke','temperature']
# use the columns with the specified file name
fullDataframe = pd.read_csv(FILE_NAME, usecols=allcols)
lpgDataframe = pd.read_csv(FILE_NAME, usecols=lpgcols)

# Convert values in csv to Series data
lpg = pd.Series(fullDataframe['lpg']) 
co = pd.Series(fullDataframe['carbon-monoxide'], name='carbon-monoxide') 
humidity = pd.Series(fullDataframe['humidity'], name='humidity') 
smoke = pd.Series(fullDataframe['smoke'], name='smoke') 
temp = pd.Series(fullDataframe['temperature'], name='temperature') 


def guassian_y_value():
    # lpg predicted value reads here! only 2001 rows so far
    dataf = pd.read_csv("./mycsvfile.csv", usecols=lpgcols, nrows=20259)
    data2 = pd.read_csv("./../front-end/public/datasets/half-removed.csv", usecols=allcols) # nearly there, needs work
    print(dataf)
    dataf.to_csv("./mycsvfile.csv", index=False)
    frames = [dataf, data2]
    result = pd.concat(frames)
    print("concat dfs\n",result)

#### GUASSIAN DISTRIBUTION #####    
# 08/03/23 - 09/03/23
#  This needs work but is nearly there. 

# 10/03/23
#  This now puts noise values into an object.
#       - need to split these out into a dataframe and save this with other columns to a new csv 

# 11/03/23 - 12/03/23
#   Have saved lpg into a csv of its own with predicted values - can alter the csv and add the other columns later
#       - I should perhaps predict all values and add this to a csv rather than just lpg alone
#       - Doing it this way means i can integrate it easier with my current dataset
def gaussianDistribution():
    lpgSD = lpg.std()
    d = {"lpg":lpg,"co":co,"humidity": humidity,"smoke":smoke,"temperature": temp}
    lpgPredict = {'lpg':lpg}
    df = pd.DataFrame(d)
    print("Dataframe before alteration\n", df)
    
    # loc = mean, scale = standard deviation, size denotes rows and columns of a multi-dimensional array, k and v in the for loop denote key values in the lpg dataframe
    rand_data = {k:normal(loc=v[0], scale=lpgSD, size=(1000,1)) for k,v in lpgPredict.items()} 
    print("rand_data type", type(rand_data))
    write_append_lpg_values(rand_data) # function to write current lpg distirbutions to a csv
    print("Removed punctuation from the file", "mycsvfile.csv")#
    cleanCsv() # Removes [] and '' from csv rows, and checks for any other punctuation
    guassian_y_value() # prints the distribution of the y value (lpg)


def write_append_lpg_values(rand_data):
    
    # Write the newly generated random data to the csvfile (this will eventually be cleaned with the cleanCsv function below)
    with open('mycsvfile.csv', 'w') as f:  # You will need 'wb' mode in Python 2.x
        w = csv.DictWriter(f, rand_data.keys())
        w.writeheader()
        w.writerow(rand_data)

    # Write the newly generated random data to the csvfile (this will eventually be cleaned with the cleanCsv function below)

    with open('mycsvfile.csv', 'a') as f:  # You will need 'wb' mode in Python 2.x
        w = csv.DictWriter(f, rand_data.keys())
        for i in range(20):
            w.writerow(rand_data)
   
#### REMOVE PUNCTUATION ####
# 11/03/23 - This removes punctuation from the newly generated lpg values created in the guassian distribution function
def remove_punc(string):
    punc = '''!()-[]{};:'"\,<>/?@#$%^&*_~ '''
    for ele in string:  
        if ele in punc:  
            string = string.replace(ele, "") 
    
    return string

#### REMOVE INVALID NUMBERS ####
##### 11/03/23 - need to work on this!
def remove_invalid_numbers(string):
    punc = '[0-9]' # need to look this up
    for ele in string:  
        if ele in punc:  
            string = string.replace(ele, "") 
    
    return string

#### SERIES TO DATAFRAME ####
# 12/03/23 - This converts series data to a dataframe - doesnt work fully yet, some values show as NaN in the dataframe, I can fix this
def seriesToDataframe():
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
    
    with open("mycsvfile.csv",'r',encoding="utf-8") as f:
        data = f.read()
    with open("mycsvfile.csv","w+",encoding="utf-8") as f:
        f.write(remove_punc(data))
        
    result = ""
    with open("./mycsvfile.csv", "r+") as file:
        for line in file:
            if not line.isspace():
                result += line
    
        file.seek(0)  
        file.write(result)