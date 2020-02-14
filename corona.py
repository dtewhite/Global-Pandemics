import pandas as pd

url = "https://docs.google.com/spreadsheets/d/18X1VM1671d99V_yd-cnUI1j8oSG2ZgfU_q1HfOizErA/export?format=csv&id"
corona_data = pd.read_csv(url)
corona_data = corona_data.fillna(0)

corona_lat_lon = corona_data[["country","latitude","longitude"]]

corona_data_country = corona_data.groupby(by="country").sum().drop(columns=['location_id','latitude','longitude'])

corona = pd.merge(corona_lat_lon, corona_data_country,  on="country").drop_duplicates("country")

corona = corona.iloc[:,[0,-2]]
corona = corona.rename(columns = {corona.columns[1]: "comfirmed_cases" })
corona.to_csv(r'Data/corona.csv',index=False)