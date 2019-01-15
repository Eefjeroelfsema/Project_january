"""
This programme converts csv files to json files
"""

import numpy as np
import csv
import pandas as pd
import json as js
import copy


INPUT_CSV = "spendings_distribution.csv"
OUTPUT_JSON = "data_distribution.json"

def converter(INPUT_CSV):
    json_list = {}

    with open(INPUT_CSV) as csvfile:
        data = csv.DictReader(csvfile)

        for row in data:
            if row['LOCATION'] not in json_list:
                json_list[row['LOCATION']] = {'2007': {"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2008':{"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2009':{"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2010':{"DEF":0,"HEALTH":0,
                "HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2011':{"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2012':{"DEF":0,
                "HEALTH":0,"HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2013':{"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2014':{"DEF":0,
                "HEALTH":0,"HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2015':{"DEF":0,
                "HEALTH":0,"HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2016':{"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0}}
                json_list[row['LOCATION']][row['TIME']][row['SUBJECT']] = row['Value']
            else:
                json_list[row['LOCATION']][row['TIME']][row['SUBJECT']] = row['Value']


        print(json_list)


    # write the dictionary into the json file
    with open(OUTPUT_JSON, 'w') as output:
        js.dump(json_list, output)
#
if __name__ == "__main__":
    converter(INPUT_CSV)
