"""
This programme converts csv files to json files
"""

import numpy as np
import csv
import pandas as pd
import json as js
import copy


INPUT_CSV = "sectoren_GDP.csv"
OUTPUT_JSON = "data_distribution.json"

def converter(INPUT_CSV):
    json_list = {}

    with open(INPUT_CSV) as csvfile:
        data = csv.DictReader(csvfile)

        for row in data:
            if row['LOCATION'] not in json_list:
                json_list[row['LOCATION']] = {'1995': {"TOT":0,"DEF":0,"HEALTH":0,
                "HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '1996': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '1997': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '1998': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '1999': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2000': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2001': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2002': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2003': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2004': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2005': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2006': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2007': {"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2008':{"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2009':{"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2010':{"TOT":0,"DEF":0,"HEALTH":0,
                "HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2011':{"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2012':{"TOT":0,"DEF":0,
                "HEALTH":0,"HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2013':{"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0},
                '2014':{"TOT":0,"DEF":0,
                "HEALTH":0,"HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2015':{"TOT":0,"DEF":0,
                "HEALTH":0,"HOUCOMM":0,"PUBORD":0,"ECOAFF":0, "GRALPUBSER":0,
                "RECULTREL":0, "SOCPROT":0,"ENVPROT":0, "EDU":0},
                '2016':{"TOT":0,"DEF":0,"HEALTH":0,"HOUCOMM":0,"PUBORD":0,
                "ECOAFF":0, "GRALPUBSER":0,"RECULTREL":0, "SOCPROT":0,
                "ENVPROT":0, "EDU":0}}
            if row['MEASURE'] == "PC_GDP":
                json_list[row['LOCATION']][row['TIME']][row['SUBJECT']] = row['Value']


        print(json_list)


    # write the dictionary into the json file
    with open(OUTPUT_JSON, 'w') as output:
        js.dump(json_list, output)
#
if __name__ == "__main__":
    converter(INPUT_CSV)
