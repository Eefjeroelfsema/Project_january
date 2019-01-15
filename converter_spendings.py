"""
This programme converts csv files to json files
"""

import numpy as np
import csv
import pandas as pd
import json as js


INPUT_CSV = "data.csv"
OUTPUT_JSON = "data_spendings.json"

def converter(INPUT_CSV):
    json_list = []

    with open(INPUT_CSV) as csvfile:
        data = csv.DictReader(csvfile)

        for row in data:
            if '_s' in row['LOCATION']:
                country = {}
                country['country'] = row['LOCATION']
                country['1995'] = row['1995']
                country['1996'] = row['1996']
                country['1997'] = row['1997']
                country['1998'] = row['1998']
                country['1999'] = row['1999']
                country['2000'] = row['2000']
                country['2001'] = row['2001']
                country['2002'] = row['2002']
                country['2003'] = row['2003']
                country['2004'] = row['2004']
                country['2005'] = row['2005']
                country['2006'] = row['2006']
                country['2007'] = row['2007']
                country['2008'] = row['2008']
                country['2009'] = row['2009']
                country['2010'] = row['2010']
                country['2011'] = row['2011']
                country['2012'] = row['2012']
                country['2013'] = row['2013']
                country['2014'] = row['2014']
                country['2015'] = row['2015']
                country['2016'] = row['2016']
                json_list.append(country)

        print(json_list)


    # write the dictionary into the json file
    with open(OUTPUT_JSON, 'w') as output:
        js.dump(json_list, output)
#
if __name__ == "__main__":
    converter(INPUT_CSV)
