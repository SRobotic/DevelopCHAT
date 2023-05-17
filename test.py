# # Define the ticker list
# import pandas as pd
# tickers_list = ['AAPL', 'WMT', 'IBM', 'MU', 'BA', 'AXP']
#
# # Fetch the data
# import yfinance as yf
# data = yf.download(tickers_list,'2015-1-1')['Adj Close']
#
# # Print first 5 rows of the data
# print(data.head())

import pickle
# Import package
import yfinance as yf
import darts

# Get the data
tickers_list = ['SPY','AAPL','MSFT','AMZN','TSLA','GOOGL','META','UNH']
dict1 = {}
for ticker in tickers_list:

    data = yf.download(tickers=ticker, period="60D", interval="15m")
    dict1[ticker] = data



# Print the data
print(type(data.shape))
with open('D:/HistoricalData/testing.pkl', 'wb') as f:
    pickle.dump(dict1, f)

with open('D:/HistoricalData/testing.pkl', 'rb') as f:
    loaded_dict = pickle.load(f)

for k,v in loaded_dict.items():
    print(k,v)
loaded_dict