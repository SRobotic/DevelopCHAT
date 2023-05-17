import pandas as pd
import numpy as np
import datetime as dt
import os
import pandas_datareader.data as web

# set the start and end dates
start = dt.datetime(2000, 1, 1)
end = dt.datetime.now()

# choose a list of stocks
stock_list = ['AAPL', 'MSFT', 'AMZN', 'GOOGL']

# download the stock data
for stock in stock_list:
    if not os.path.exists('D:/HistoricalData/{}.csv'.format(stock)):
        df = web.DataReader(stock, 'iex', start, end)
        df.to_csv('D:/HistoricalData/{}.csv'.format(stock))
    else:
        print('Already have {}'.format(stock))