import os
import csv
import json
from collections import OrderedDict

print("Welcome to the JSON-CSV Converter.")
print("This script will convert a JSON file to CSV or a CSV file to JSON")

# SELECT AND OPEN A CSV OR JSON FILE
try:
    print("Which file do you want to convert?")
    filename = input("Filename: ")
    extension = filename.split(".")[-1].lower()
    
    f = open(filename)

    if extension == "csv":
        # load csv file
        data = list(csv.reader(f))
        print("CSV file loaded")
    elif extension == "json":
        # load json file
        data = json.load(f,object_pairs_hook=OrderedDict)
        print("JSON file loaded")
    else:
        print("unsupported file type ... exiting")
        exit()
except Exception as e:
    # error loading file
    print("Error loading file ... exiting:",e)
    exit()
else:
    # CONVERT CSV TO JSON
    if extension == "csv":
        keys = data[0]
        converted = []

        for i in range(1, len(data)):
            obj = OrderedDict()
            for j in range(0,len(keys)):
                if len(data[i][j]) > 0:
                    obj[keys[j]] = data[i][j]
                else:
                    obj[keys[j]] = None
            converted.append(obj)
        
    # CONVERT JSON TO CSV
    if extension == "json":

        # get all keys in json objects
        keys = []
        for i in range(0,len(data)):
            for j in data[i]:
                if j not in keys:
                    keys.append(j)
        
        # map data in each row to key index
        converted = []
        converted.append(keys)

        for i in range(0,len(data)):
            row = []
            for j in range(0,len(keys)):
                if keys[j] in data[i]:
                    row.append(data[i][keys[j]])
                else:
                    row.append(None)
            converted.append(row)

    # CREATE OUTPUT FILE
    converted_file_basename = os.path.basename(filename).split(".")[0]
    converted_file_extension = ".json" if extension == "csv" else ".csv"

    if(os.path.isfile(converted_file_basename + converted_file_extension)):
        counter = 1
        while os.path.isfile(converted_file_basename + " (" + str(counter) + ")" + converted_file_extension):
            counter += 1
        converted_file_basename = converted_file_basename + " (" + str(counter) + ")"
    
    try:
        if converted_file_extension == ".json":
            with open(converted_file_basename + converted_file_extension, 'w') as outfile:
                json.dump(converted, outfile)
        elif converted_file_extension == ".csv":
            with open(converted_file_basename + converted_file_extension, 'w') as outfile:
                writer = csv.writer(outfile)
                writer.writerows(converted)
    except:
        print("Error creating file ... exiting")
    else:
        print("File created:",converted_file_basename + converted_file_extension)