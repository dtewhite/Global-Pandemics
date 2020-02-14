import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np 

def pyscript_diseases():

    measlesdf = pd.read_csv('https://docs.google.com/spreadsheets/d/1ogMiFRnX-N4lp1cqI0N22F9K9fFVVFfCWxw4T6W2iVw/export?format=csv&id')


    measlesdf['Total Measles Cases'] = measlesdf.sum(axis=1)
    measlesdf.head()



    total_cases = measlesdf
    total_measles_cases = total_cases.drop(measlesdf.loc[:, '2018':'1980'].columns, axis = 1)



    final_total_measles = total_measles_cases.sort_values(by='Total Measles Cases', ascending=False)

    measles_json = final_total_measles.to_json(orient='records')
    
    infectious_disease_array= {
        "measles_json":measles_json
    }

    return infectious_disease_array