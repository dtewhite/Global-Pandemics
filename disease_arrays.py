import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np 

def pyscript_diseases():

    # measels 
    measlesdf = pd.read_csv('https://docs.google.com/spreadsheets/d/1ogMiFRnX-N4lp1cqI0N22F9K9fFVVFfCWxw4T6W2iVw/export?format=csv&id')
    measlesdf['Total Measles Cases'] = measlesdf.sum(axis=1)
    total_cases = measlesdf
    total_measles_cases = total_cases.drop(measlesdf.loc[:, '2018':'1980'].columns, axis = 1)
    final_total_measles = total_measles_cases.sort_values(by='Total Measles Cases', ascending=False)
    final_total_measles = final_total_measles.rename(columns = {final_total_measles.columns[0]: "country",
    final_total_measles.columns[1]: "confirmed_cases" })
    measles_json = final_total_measles.to_json(orient='records')
    
    # COVID-19
    url = "https://docs.google.com/spreadsheets/d/18X1VM1671d99V_yd-cnUI1j8oSG2ZgfU_q1HfOizErA/export?format=csv&id"
    corona_data = pd.read_csv(url)
    corona_data = corona_data.fillna(0)
    corona_data_country = corona_data.groupby(by="country").sum().reset_index()
    corona = corona_data_country.iloc[:,[0,-2]]
    corona = corona.rename(columns = {corona.columns[1]: "confirmed_cases" }).sort_values(by='confirmed_cases', ascending=False)
    corona_json = corona.to_json(orient='records')

    # influenza
    url = "https://docs.google.com/spreadsheets/d/1l2YtEEMkziLTuo3G0C5eJcXPGYXfA95W3KOw52cslfo/export?format=csv&id"
    influenza_df = pd.read_csv(url)
    influenza_df2 = influenza_df[["Country","Year","SDATE","EDATE","SPEC_PROCESSED_NB"]].copy()
    influenza_df2.rename(columns = {"SPEC_PROCESSED_NB":"Number of Cases", "SDATE":"Start Date", "EDATE":"End Date"}, inplace=True)
    influenza_df2["Country"] = influenza_df2["Country"].astype(str)
    influenza_df2_byCountry = influenza_df2.groupby(by="Country").sum().drop(columns=["Year"]).reset_index()
    influenza_df2_byCountry = influenza_df2_byCountry.rename(columns = {influenza_df2_byCountry.columns[0]: "country",
    influenza_df2_byCountry.columns[1]: "confirmed_cases" }).sort_values(by='confirmed_cases', ascending=False)
    influenza_json = influenza_df2_byCountry.to_json(orient='records')

    # zika
    url ="https://docs.google.com/spreadsheets/d/1wzbUySCMjjRdDqBNsoE0byhYplVk8rLbK3Vq0nU0dFQ/export?format=csv&id"
    data = pd.read_csv(url, error_bad_lines=False)
    data_field_filtered= data[data['data_field'].str.contains("confirmed",na=False)]
    data_field_filtered["country"]=data["location"]
    data_field_filtered["country"]= data["location"].str.split("-", n= 1, expand=True)
    data_field_filtered1= data_field_filtered[pd.notnull(data_field_filtered["value"])]
    data_field_filtered1["value1"]= data_field_filtered1["value"].astype("int64")
    country_df = data_field_filtered1.groupby('country')["value1"].sum().to_frame().reset_index()
    country_df = country_df.rename(columns = {country_df.columns[1]: "confirmed_cases" }).sort_values(by='confirmed_cases', ascending=False)
    zika_json = country_df.to_json(orient='records')

    infectious_disease_array= {
        "measles_json":measles_json,
        "corona_json":corona_json,
        "influenza_json":influenza_json,
        "zika_json":zika_json
    }

    return infectious_disease_array