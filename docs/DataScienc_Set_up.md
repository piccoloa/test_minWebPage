---
title:  "Data Science: Not so pretty Set Up"
excerpt: 'execpt'
permalink: /data_science1/
header:
  teaser: "assets/images/unsplash-gallery-image-3-th.jpg"
  overlay_color: "#5e616c"
  overlay_image: "assets/images/unsplash-gallery-image-3-th.jpg"
  overlay_filter: .4
categories:
- big data
- datalakes
# comments: true
author: Alex_Piccolo
output:
    html_document:
            css: prettify.css
pinned: false
---
### Notes Exploring Personalized Health

This is a blog of my notes for setting up and beginning to explore my health data.  The idea here is to have reliable way to gather the data and have it available to mine and create models to help explain and answer questions about my own personal data. If anyone is reading these blogs, I will throw a [song](https://www.youtube.com/watch?v=TTg7NcucINc) somewhere in each blog that came to mind while writing it.  

**Example of ETL using Docker, Python and MariaDB**

This is an example of using ETL with Docker containers. The data is extracted from Fitbit using the Fitbit API by way of a [python script](https://github.com/tuchandra/sleep-analysis) to access the nightly sleep logs.  Follow the instructions created by [Tushar Chandra](https://github.com/tuchandra)  to save the JSON files to your local host. Once your data is saved to a DB, the data can be used to access historical data for further analysis.  To access your personal information through your Fitbit JSON files, you will be required to go to the [Fitbit Developers website](https://dev.fitbit.com/) and register an account and create an app. Chandra's python script and instructions are well documented in his [Github repository](https://github.com/tuchandra/sleep-analysis).  The app will be for "Personal" use, which gives access to intraday sleep data and can be revised to access other Fitbit data.

I plan on making additional changes to the Fitbit api python script to incorporate the API time limitations using [this code](http://shishu.info/2016/06/how-to-download-your-fitbit-second-level-data-without-coding/)  and allow for easier access to other data besides sleep.

The goals of this project include:
* Working in a [Docker](https://www.docker.com/docker-community) and [Jupyter notebooks](https://github.com/jupyter/docker-stacks) environment for data science
 * Extracting data from Fitbit JSON log files.
 * Transforming the JSON data
 * Loading the data into a database as data store for further analysis

Note: Fitbit is a registered trademark and service mark of Fitbit, Inc. My analysis project is designed for personal use with the Fitbit platform. This product is not put out by Fitbit, and Fitbit does not service or warrant the functionality of this product.

[Link to Github repo](https://github.com/piccoloa/datamovers)

**Install required python packages**


```python
import os
import pyodbc
import numpy as np
import pandas as pd
import pandas.io.sql as psql
from sqlalchemy import create_engine
```

**Install ijson on odbcNotebook**  
This step can be avoided by adding the pip command to the Dockerbuild file and rebuilding the odbcNotebook imaage. Still good example of working in bash through notebook.


```bash
%%bash

pip install ijson
```

    Collecting ijson
      Downloading https://files.pythonhosted.org/packages/7f/e9/8508c5f4987ba238a2b169e582c1f70a47272b22a2f1fb06b9318201bb9e/ijson-2.3-py2.py3-none-any.whl
    Installing collected packages: ijson
    Successfully installed ijson-2.3


    You are using pip version 9.0.3, however version 10.0.1 is available.
    You should consider upgrading via the 'pip install --upgrade pip' command.


Create connection to MariaDB container host named mariadb as root over the Docker network.  


```python
mysql_dest_engine = create_engine('mysql+pymysql://root:admin@mariadb.my-network')
```

Run sql scripts in database container to verify connection and confirm available databases.


```python
showDatabases = mysql_dest_engine.execute('show databases;')
for i in showDatabases:
    print(i)
```

    ('Fitbit',)
    ('information_schema',)
    ('mysql',)
    ('performance_schema',)



```python
#connect to mariadb container and add database to write data, then print to view avaialble databases
createDatabase = mysql_dest_engine.execute('CREATE DATABASE IF NOT EXISTS Fitbit;')
showDatabases = mysql_dest_engine.execute('show databases;')
for i in showDatabases:
    print(i)
```

    ('Fitbit',)
    ('information_schema',)
    ('mysql',)
    ('performance_schema',)


    /opt/conda/lib/python3.6/site-packages/pymysql/cursors.py:165: Warning: (1007, "Can't create database 'Fitbit'; database exists")
      result = self._query(query)


View current working directory for notebook.


```bash
%%bash

pwd
```

    /home/jovyan/work/BlogLoadingJsonToMariaDB


Change to directory where log files were stored by fitbit.py script.


```python
os.chdir('/home/jovyan/work/PracticeWorkingwithJSON/data/logs')
```


```python
!ls
```

    2015-04-28.json  2015-04-29.json  2015-04-30.json


Take a look at raw json data file to view structure of file. This [Dataquest blog](https://www.dataquest.io/blog/python-json-tutorial/) has a good example of working with large json files.  


```bash
%%bash

head 2015-04-28.json
```

    {"sleep": [{"awakeCount": 5, "awakeDuration": 9, "awakeningsCount": 17, "dateOfSleep": "2015-04-28", "duration": 24780000, "efficiency": 94, "endTime": "2015-04-28T06:09:30.000", "isMainSleep": true, "logId": 886290350, "minuteData": [{"dateTime": "23:16:30", "value": "3"}, {"dateTime": "23:17:30", "value": "3"}, {"dateTime": "23:18:30", "value": "2"}, {"dateTime": "23:19:30", "value": "1"}, {"dateTime": "23:20:30", "value": "1"}, {"dateTime": "23:21:30", "value": "1"}, {"dateTime": "23:22:30", "value": "1"}, {"dateTime": "23:23:30", "value": "1"}, {"dateTime": "23:24:30", "value": "1"}, {"dateTime": "23:25:30", "value": "1"}, {"dateTime": "23:26:30", "value": "1"}, {"dateTime": "23:27:30", "value": "1"}, {"dateTime": "23:28:30", "value": "1"}, {"dateTime": "23:29:30", "value": "1"}, {"dateTime": "23:30:30", "value": "1"}, {"dateTime": "23:31:30", "value": "1"}, {"dateTime": "23:32:30", "value": "1"}, {"dateTime": "23:33:30", "value": "1"}, {"dateTime": "23:34:30", "value": "1"}, {"dateTime": "23:35:30", "value": "1"}, {"dateTime": "23:36:30", "value": "1"}, {"dateTime": "23:37:30", "value": "1"}, {"dateTime": "23:38:30", "value": "1"}, {"dateTime": "23:39:30", "value": "1"}, {"dateTime": "23:40:30", "value": "1"}, {"dateTime": "23:41:30", "value": "1"}, {"dateTime": "23:42:30", "value": "1"}, {"dateTime": "23:43:30", "value": "1"}, {"dateTime": "23:44:30", "value": "1"}, {"dateTime": "23:45:30", "value": "1"}, {"dateTime": "23:46:30", "value": "1"}, {"dateTime": "23:47:30", "value": "1"}, {"dateTime": "23:48:30", "value": "1"}, {"dateTime": "23:49:30", "value": "1"}, {"dateTime": "23:50:30", "value": "1"}, {"dateTime": "23:51:30", "value": "2"}, {"dateTime": "23:52:30", "value": "1"}, {"dateTime": "23:53:30", "value": "1"}, {"dateTime": "23:54:30", "value": "1"}, {"dateTime": "23:55:30", "value": "1"}, {"dateTime": "23:56:30", "value": "1"}, {"dateTime": "23:57:30", "value": "1"}, {"dateTime": "23:58:30", "value": "1"}, {"dateTime": "23:59:30", "value": "1"}, {"dateTime": "00:00:30", "value": "1"}, {"dateTime": "00:01:30", "value": "1"}, {"dateTime": "00:02:30", "value": "1"}, {"dateTime": "00:03:30", "value": "1"}, {"dateTime": "00:04:30", "value": "1"}, {"dateTime": "00:05:30", "value": "1"}, {"dateTime": "00:06:30", "value": "1"}, {"dateTime": "00:07:30", "value": "1"}, {"dateTime": "00:08:30", "value": "1"}, {"dateTime": "00:09:30", "value": "1"}, {"dateTime": "00:10:30", "value": "1"}, {"dateTime": "00:11:30", "value": "1"}, {"dateTime": "00:12:30", "value": "1"}, {"dateTime": "00:13:30", "value": "1"}, {"dateTime": "00:14:30", "value": "1"}, {"dateTime": "00:15:30", "value": "1"}, {"dateTime": "00:16:30", "value": "1"}, {"dateTime": "00:17:30", "value": "1"}, {"dateTime": "00:18:30", "value": "1"}, {"dateTime": "00:19:30", "value": "1"}, {"dateTime": "00:20:30", "value": "1"}, {"dateTime": "00:21:30", "value": "1"}, {"dateTime": "00:22:30", "value": "1"}, {"dateTime": "00:23:30", "value": "1"}, {"dateTime": "00:24:30", "value": "1"}, {"dateTime": "00:25:30", "value": "1"}, {"dateTime": "00:26:30", "value": "1"}, {"dateTime": "00:27:30", "value": "1"}, {"dateTime": "00:28:30", "value": "2"}, {"dateTime": "00:29:30", "value": "1"}, {"dateTime": "00:30:30", "value": "1"}, {"dateTime": "00:31:30", "value": "1"}, {"dateTime": "00:32:30", "value": "1"}, {"dateTime": "00:33:30", "value": "1"}, {"dateTime": "00:34:30", "value": "1"}, {"dateTime": "00:35:30", "value": "1"}, {"dateTime": "00:36:30", "value": "1"}, {"dateTime": "00:37:30", "value": "1"}, {"dateTime": "00:38:30", "value": "1"}, {"dateTime": "00:39:30", "value": "1"}, {"dateTime": "00:40:30", "value": "1"}, {"dateTime": "00:41:30", "value": "1"}, {"dateTime": "00:42:30", "value": "1"}, {"dateTime": "00:43:30", "value": "1"}, {"dateTime": "00:44:30", "value": "1"}, {"dateTime": "00:45:30", "value": "1"}, {"dateTime": "00:46:30", "value": "1"}, {"dateTime": "00:47:30", "value": "1"}, {"dateTime": "00:48:30", "value": "1"}, {"dateTime": "00:49:30", "value": "1"}, {"dateTime": "00:50:30", "value": "1"}, {"dateTime": "00:51:30", "value": "1"}, {"dateTime": "00:52:30", "value": "1"}, {"dateTime": "00:53:30", "value": "1"}, {"dateTime": "00:54:30", "value": "1"}, {"dateTime": "00:55:30", "value": "1"}, {"dateTime": "00:56:30", "value": "1"}, {"dateTime": "00:57:30", "value": "1"}, {"dateTime": "00:58:30", "value": "1"}, {"dateTime": "00:59:30", "value": "1"}, {"dateTime": "01:00:30", "value": "1"}, {"dateTime": "01:01:30", "value": "1"}, {"dateTime": "01:02:30", "value": "1"}, {"dateTime": "01:03:30", "value": "1"}, {"dateTime": "01:04:30", "value": "1"}, {"dateTime": "01:05:30", "value": "1"}, {"dateTime": "01:06:30", "value": "1"}, {"dateTime": "01:07:30", "value": "1"}, {"dateTime": "01:08:30", "value": "1"}, {"dateTime": "01:09:30", "value": "1"}, {"dateTime": "01:10:30", "value": "1"}, {"dateTime": "01:11:30", "value": "1"}, {"dateTime": "01:12:30", "value": "1"}, {"dateTime": "01:13:30", "value": "1"}, {"dateTime": "01:14:30", "value": "1"}, {"dateTime": "01:15:30", "value": "1"}, {"dateTime": "01:16:30", "value": "1"}, {"dateTime": "01:17:30", "value": "1"}, {"dateTime": "01:18:30", "value": "1"}, {"dateTime": "01:19:30", "value": "1"}, {"dateTime": "01:20:30", "value": "1"}, {"dateTime": "01:21:30", "value": "1"}, {"dateTime": "01:22:30", "value": "1"}, {"dateTime": "01:23:30", "value": "1"}, {"dateTime": "01:24:30", "value": "1"}, {"dateTime": "01:25:30", "value": "1"}, {"dateTime": "01:26:30", "value": "1"}, {"dateTime": "01:27:30", "value": "1"}, {"dateTime": "01:28:30", "value": "1"}, {"dateTime": "01:29:30", "value": "1"}, {"dateTime": "01:30:30", "value": "1"}, {"dateTime": "01:31:30", "value": "1"}, {"dateTime": "01:32:30", "value": "1"}, {"dateTime": "01:33:30", "value": "1"}, {"dateTime": "01:34:30", "value": "1"}, {"dateTime": "01:35:30", "value": "1"}, {"dateTime": "01:36:30", "value": "1"}, {"dateTime": "01:37:30", "value": "1"}, {"dateTime": "01:38:30", "value": "1"}, {"dateTime": "01:39:30", "value": "1"}, {"dateTime": "01:40:30", "value": "1"}, {"dateTime": "01:41:30", "value": "1"}, {"dateTime": "01:42:30", "value": "1"}, {"dateTime": "01:43:30", "value": "1"}, {"dateTime": "01:44:30", "value": "1"}, {"dateTime": "01:45:30", "value": "1"}, {"dateTime": "01:46:30", "value": "1"}, {"dateTime": "01:47:30", "value": "1"}, {"dateTime": "01:48:30", "value": "1"}, {"dateTime": "01:49:30", "value": "1"}, {"dateTime": "01:50:30", "value": "1"}, {"dateTime": "01:51:30", "value": "1"}, {"dateTime": "01:52:30", "value": "1"}, {"dateTime": "01:53:30", "value": "1"}, {"dateTime": "01:54:30", "value": "1"}, {"dateTime": "01:55:30", "value": "1"}, {"dateTime": "01:56:30", "value": "1"}, {"dateTime": "01:57:30", "value": "1"}, {"dateTime": "01:58:30", "value": "1"}, {"dateTime": "01:59:30", "value": "1"}, {"dateTime": "02:00:30", "value": "1"}, {"dateTime": "02:01:30", "value": "1"}, {"dateTime": "02:02:30", "value": "1"}, {"dateTime": "02:03:30", "value": "1"}, {"dateTime": "02:04:30", "value": "1"}, {"dateTime": "02:05:30", "value": "1"}, {"dateTime": "02:06:30", "value": "1"}, {"dateTime": "02:07:30", "value": "1"}, {"dateTime": "02:08:30", "value": "1"}, {"dateTime": "02:09:30", "value": "1"}, {"dateTime": "02:10:30", "value": "1"}, {"dateTime": "02:11:30", "value": "1"}, {"dateTime": "02:12:30", "value": "1"}, {"dateTime": "02:13:30", "value": "1"}, {"dateTime": "02:14:30", "value": "1"}, {"dateTime": "02:15:30", "value": "1"}, {"dateTime": "02:16:30", "value": "1"}, {"dateTime": "02:17:30", "value": "1"}, {"dateTime": "02:18:30", "value": "1"}, {"dateTime": "02:19:30", "value": "1"}, {"dateTime": "02:20:30", "value": "1"}, {"dateTime": "02:21:30", "value": "1"}, {"dateTime": "02:22:30", "value": "1"}, {"dateTime": "02:23:30", "value": "1"}, {"dateTime": "02:24:30", "value": "1"}, {"dateTime": "02:25:30", "value": "1"}, {"dateTime": "02:26:30", "value": "1"}, {"dateTime": "02:27:30", "value": "1"}, {"dateTime": "02:28:30", "value": "1"}, {"dateTime": "02:29:30", "value": "1"}, {"dateTime": "02:30:30", "value": "1"}, {"dateTime": "02:31:30", "value": "1"}, {"dateTime": "02:32:30", "value": "1"}, {"dateTime": "02:33:30", "value": "1"}, {"dateTime": "02:34:30", "value": "1"}, {"dateTime": "02:35:30", "value": "1"}, {"dateTime": "02:36:30", "value": "1"}, {"dateTime": "02:37:30", "value": "1"}, {"dateTime": "02:38:30", "value": "1"}, {"dateTime": "02:39:30", "value": "1"}, {"dateTime": "02:40:30", "value": "1"}, {"dateTime": "02:41:30", "value": "1"}, {"dateTime": "02:42:30", "value": "1"}, {"dateTime": "02:43:30", "value": "1"}, {"dateTime": "02:44:30", "value": "1"}, {"dateTime": "02:45:30", "value": "1"}, {"dateTime": "02:46:30", "value": "1"}, {"dateTime": "02:47:30", "value": "1"}, {"dateTime": "02:48:30", "value": "1"}, {"dateTime": "02:49:30", "value": "1"}, {"dateTime": "02:50:30", "value": "1"}, {"dateTime": "02:51:30", "value": "1"}, {"dateTime": "02:52:30", "value": "1"}, {"dateTime": "02:53:30", "value": "1"}, {"dateTime": "02:54:30", "value": "1"}, {"dateTime": "02:55:30", "value": "1"}, {"dateTime": "02:56:30", "value": "1"}, {"dateTime": "02:57:30", "value": "1"}, {"dateTime": "02:58:30", "value": "1"}, {"dateTime": "02:59:30", "value": "1"}, {"dateTime": "03:00:30", "value": "1"}, {"dateTime": "03:01:30", "value": "1"}, {"dateTime": "03:02:30", "value": "1"}, {"dateTime": "03:03:30", "value": "1"}, {"dateTime": "03:04:30", "value": "1"}, {"dateTime": "03:05:30", "value": "1"}, {"dateTime": "03:06:30", "value": "1"}, {"dateTime": "03:07:30", "value": "1"}, {"dateTime": "03:08:30", "value": "1"}, {"dateTime": "03:09:30", "value": "1"}, {"dateTime": "03:10:30", "value": "1"}, {"dateTime": "03:11:30", "value": "1"}, {"dateTime": "03:12:30", "value": "1"}, {"dateTime": "03:13:30", "value": "1"}, {"dateTime": "03:14:30", "value": "1"}, {"dateTime": "03:15:30", "value": "1"}, {"dateTime": "03:16:30", "value": "1"}, {"dateTime": "03:17:30", "value": "1"}, {"dateTime": "03:18:30", "value": "1"}, {"dateTime": "03:19:30", "value": "1"}, {"dateTime": "03:20:30", "value": "1"}, {"dateTime": "03:21:30", "value": "1"}, {"dateTime": "03:22:30", "value": "1"}, {"dateTime": "03:23:30", "value": "1"}, {"dateTime": "03:24:30", "value": "1"}, {"dateTime": "03:25:30", "value": "1"}, {"dateTime": "03:26:30", "value": "1"}, {"dateTime": "03:27:30", "value": "1"}, {"dateTime": "03:28:30", "value": "1"}, {"dateTime": "03:29:30", "value": "1"}, {"dateTime": "03:30:30", "value": "1"}, {"dateTime": "03:31:30", "value": "1"}, {"dateTime": "03:32:30", "value": "1"}, {"dateTime": "03:33:30", "value": "1"}, {"dateTime": "03:34:30", "value": "1"}, {"dateTime": "03:35:30", "value": "1"}, {"dateTime": "03:36:30", "value": "1"}, {"dateTime": "03:37:30", "value": "1"}, {"dateTime": "03:38:30", "value": "1"}, {"dateTime": "03:39:30", "value": "1"}, {"dateTime": "03:40:30", "value": "1"}, {"dateTime": "03:41:30", "value": "1"}, {"dateTime": "03:42:30", "value": "1"}, {"dateTime": "03:43:30", "value": "1"}, {"dateTime": "03:44:30", "value": "1"}, {"dateTime": "03:45:30", "value": "1"}, {"dateTime": "03:46:30", "value": "1"}, {"dateTime": "03:47:30", "value": "1"}, {"dateTime": "03:48:30", "value": "1"}, {"dateTime": "03:49:30", "value": "1"}, {"dateTime": "03:50:30", "value": "1"}, {"dateTime": "03:51:30", "value": "1"}, {"dateTime": "03:52:30", "value": "1"}, {"dateTime": "03:53:30", "value": "1"}, {"dateTime": "03:54:30", "value": "1"}, {"dateTime": "03:55:30", "value": "1"}, {"dateTime": "03:56:30", "value": "1"}, {"dateTime": "03:57:30", "value": "1"}, {"dateTime": "03:58:30", "value": "1"}, {"dateTime": "03:59:30", "value": "1"}, {"dateTime": "04:00:30", "value": "1"}, {"dateTime": "04:01:30", "value": "1"}, {"dateTime": "04:02:30", "value": "1"}, {"dateTime": "04:03:30", "value": "1"}, {"dateTime": "04:04:30", "value": "1"}, {"dateTime": "04:05:30", "value": "1"}, {"dateTime": "04:06:30", "value": "1"}, {"dateTime": "04:07:30", "value": "1"}, {"dateTime": "04:08:30", "value": "1"}, {"dateTime": "04:09:30", "value": "1"}, {"dateTime": "04:10:30", "value": "1"}, {"dateTime": "04:11:30", "value": "1"}, {"dateTime": "04:12:30", "value": "1"}, {"dateTime": "04:13:30", "value": "1"}, {"dateTime": "04:14:30", "value": "1"}, {"dateTime": "04:15:30", "value": "1"}, {"dateTime": "04:16:30", "value": "1"}, {"dateTime": "04:17:30", "value": "1"}, {"dateTime": "04:18:30", "value": "2"}, {"dateTime": "04:19:30", "value": "2"}, {"dateTime": "04:20:30", "value": "1"}, {"dateTime": "04:21:30", "value": "1"}, {"dateTime": "04:22:30", "value": "2"}, {"dateTime": "04:23:30", "value": "1"}, {"dateTime": "04:24:30", "value": "1"}, {"dateTime": "04:25:30", "value": "1"}, {"dateTime": "04:26:30", "value": "1"}, {"dateTime": "04:27:30", "value": "1"}, {"dateTime": "04:28:30", "value": "1"}, {"dateTime": "04:29:30", "value": "1"}, {"dateTime": "04:30:30", "value": "1"}, {"dateTime": "04:31:30", "value": "1"}, {"dateTime": "04:32:30", "value": "1"}, {"dateTime": "04:33:30", "value": "1"}, {"dateTime": "04:34:30", "value": "1"}, {"dateTime": "04:35:30", "value": "1"}, {"dateTime": "04:36:30", "value": "1"}, {"dateTime": "04:37:30", "value": "1"}, {"dateTime": "04:38:30", "value": "1"}, {"dateTime": "04:39:30", "value": "1"}, {"dateTime": "04:40:30", "value": "1"}, {"dateTime": "04:41:30", "value": "1"}, {"dateTime": "04:42:30", "value": "1"}, {"dateTime": "04:43:30", "value": "1"}, {"dateTime": "04:44:30", "value": "1"}, {"dateTime": "04:45:30", "value": "1"}, {"dateTime": "04:46:30", "value": "1"}, {"dateTime": "04:47:30", "value": "2"}, {"dateTime": "04:48:30", "value": "2"}, {"dateTime": "04:49:30", "value": "2"}, {"dateTime": "04:50:30", "value": "2"}, {"dateTime": "04:51:30", "value": "2"}, {"dateTime": "04:52:30", "value": "2"}, {"dateTime": "04:53:30", "value": "3"}, {"dateTime": "04:54:30", "value": "2"}, {"dateTime": "04:55:30", "value": "2"}, {"dateTime": "04:56:30", "value": "3"}, {"dateTime": "04:57:30", "value": "3"}, {"dateTime": "04:58:30", "value": "2"}, {"dateTime": "04:59:30", "value": "3"}, {"dateTime": "05:00:30", "value": "2"}, {"dateTime": "05:01:30", "value": "3"}, {"dateTime": "05:02:30", "value": "3"}, {"dateTime": "05:03:30", "value": "3"}, {"dateTime": "05:04:30", "value": "2"}, {"dateTime": "05:05:30", "value": "2"}, {"dateTime": "05:06:30", "value": "1"}, {"dateTime": "05:07:30", "value": "1"}, {"dateTime": "05:08:30", "value": "1"}, {"dateTime": "05:09:30", "value": "1"}, {"dateTime": "05:10:30", "value": "1"}, {"dateTime": "05:11:30", "value": "1"}, {"dateTime": "05:12:30", "value": "1"}, {"dateTime": "05:13:30", "value": "1"}, {"dateTime": "05:14:30", "value": "1"}, {"dateTime": "05:15:30", "value": "1"}, {"dateTime": "05:16:30", "value": "1"}, {"dateTime": "05:17:30", "value": "1"}, {"dateTime": "05:18:30", "value": "1"}, {"dateTime": "05:19:30", "value": "1"}, {"dateTime": "05:20:30", "value": "1"}, {"dateTime": "05:21:30", "value": "1"}, {"dateTime": "05:22:30", "value": "1"}, {"dateTime": "05:23:30", "value": "2"}, {"dateTime": "05:24:30", "value": "1"}, {"dateTime": "05:25:30", "value": "1"}, {"dateTime": "05:26:30", "value": "1"}, {"dateTime": "05:27:30", "value": "1"}, {"dateTime": "05:28:30", "value": "1"}, {"dateTime": "05:29:30", "value": "1"}, {"dateTime": "05:30:30", "value": "1"}, {"dateTime": "05:31:30", "value": "1"}, {"dateTime": "05:32:30", "value": "1"}, {"dateTime": "05:33:30", "value": "1"}, {"dateTime": "05:34:30", "value": "1"}, {"dateTime": "05:35:30", "value": "1"}, {"dateTime": "05:36:30", "value": "1"}, {"dateTime": "05:37:30", "value": "2"}, {"dateTime": "05:38:30", "value": "1"}, {"dateTime": "05:39:30", "value": "1"}, {"dateTime": "05:40:30", "value": "1"}, {"dateTime": "05:41:30", "value": "1"}, {"dateTime": "05:42:30", "value": "1"}, {"dateTime": "05:43:30", "value": "1"}, {"dateTime": "05:44:30", "value": "1"}, {"dateTime": "05:45:30", "value": "1"}, {"dateTime": "05:46:30", "value": "1"}, {"dateTime": "05:47:30", "value": "1"}, {"dateTime": "05:48:30", "value": "1"}, {"dateTime": "05:49:30", "value": "1"}, {"dateTime": "05:50:30", "value": "1"}, {"dateTime": "05:51:30", "value": "1"}, {"dateTime": "05:52:30", "value": "1"}, {"dateTime": "05:53:30", "value": "1"}, {"dateTime": "05:54:30", "value": "1"}, {"dateTime": "05:55:30", "value": "1"}, {"dateTime": "05:56:30", "value": "1"}, {"dateTime": "05:57:30", "value": "1"}, {"dateTime": "05:58:30", "value": "1"}, {"dateTime": "05:59:30", "value": "1"}, {"dateTime": "06:00:30", "value": "1"}, {"dateTime": "06:01:30", "value": "1"}, {"dateTime": "06:02:30", "value": "1"}, {"dateTime": "06:03:30", "value": "1"}, {"dateTime": "06:04:30", "value": "1"}, {"dateTime": "06:05:30", "value": "1"}, {"dateTime": "06:06:30", "value": "1"}, {"dateTime": "06:07:30", "value": "1"}, {"dateTime": "06:08:30", "value": "1"}], "minutesAfterWakeup": 0, "minutesAsleep": 384, "minutesAwake": 26, "minutesToFallAsleep": 0, "restlessCount": 12, "restlessDuration": 20, "startTime": "2015-04-27T23:16:30.000", "timeInBed": 413}], "summary": {"totalMinutesAsleep": 384, "totalSleepRecords": 1, "totalTimeInBed": 413}}

Looking at the raw text there are three sets of data in json file.  Python reads the json files as dictionaries with sets of nested dictionaries.  The trick is to find and extract the dictionary that has the key:value pairs that are of interest. In this case we will explore _sleep_ and _summary_.


```python
import ijson

filename = "2015-04-28.json"
with open(filename, 'r') as f:
    objects = ijson.items(f, 'sleep')
    columns = list(objects)
```


```python
print(columns[0])
```

    [{'awakeCount': 5, 'awakeDuration': 9, 'awakeningsCount': 17, 'dateOfSleep': '2015-04-28', 'duration': 24780000, 'efficiency': 94, 'endTime': '2015-04-28T06:09:30.000', 'isMainSleep': True, 'logId': 886290350, 'minuteData': [{'dateTime': '23:16:30', 'value': '3'}, {'dateTime': '23:17:30', 'value': '3'}, {'dateTime': '23:18:30', 'value': '2'}, {'dateTime': '23:19:30', 'value': '1'}, {'dateTime': '23:20:30', 'value': '1'}, {'dateTime': '23:21:30', 'value': '1'}, {'dateTime': '23:22:30', 'value': '1'}, {'dateTime': '23:23:30', 'value': '1'}, {'dateTime': '23:24:30', 'value': '1'}, {'dateTime': '23:25:30', 'value': '1'}, {'dateTime': '23:26:30', 'value': '1'}, {'dateTime': '23:27:30', 'value': '1'}, {'dateTime': '23:28:30', 'value': '1'}, {'dateTime': '23:29:30', 'value': '1'}, {'dateTime': '23:30:30', 'value': '1'}, {'dateTime': '23:31:30', 'value': '1'}, {'dateTime': '23:32:30', 'value': '1'}, {'dateTime': '23:33:30', 'value': '1'}, {'dateTime': '23:34:30', 'value': '1'}, {'dateTime': '23:35:30', 'value': '1'}, {'dateTime': '23:36:30', 'value': '1'}, {'dateTime': '23:37:30', 'value': '1'}, {'dateTime': '23:38:30', 'value': '1'}, {'dateTime': '23:39:30', 'value': '1'}, {'dateTime': '23:40:30', 'value': '1'}, {'dateTime': '23:41:30', 'value': '1'}, {'dateTime': '23:42:30', 'value': '1'}, {'dateTime': '23:43:30', 'value': '1'}, {'dateTime': '23:44:30', 'value': '1'}, {'dateTime': '23:45:30', 'value': '1'}, {'dateTime': '23:46:30', 'value': '1'}, {'dateTime': '23:47:30', 'value': '1'}, {'dateTime': '23:48:30', 'value': '1'}, {'dateTime': '23:49:30', 'value': '1'}, {'dateTime': '23:50:30', 'value': '1'}, {'dateTime': '23:51:30', 'value': '2'}, {'dateTime': '23:52:30', 'value': '1'}, {'dateTime': '23:53:30', 'value': '1'}, {'dateTime': '23:54:30', 'value': '1'}, {'dateTime': '23:55:30', 'value': '1'}, {'dateTime': '23:56:30', 'value': '1'}, {'dateTime': '23:57:30', 'value': '1'}, {'dateTime': '23:58:30', 'value': '1'}, {'dateTime': '23:59:30', 'value': '1'}, {'dateTime': '00:00:30', 'value': '1'}, {'dateTime': '00:01:30', 'value': '1'}, {'dateTime': '00:02:30', 'value': '1'}, {'dateTime': '00:03:30', 'value': '1'}, {'dateTime': '00:04:30', 'value': '1'}, {'dateTime': '00:05:30', 'value': '1'}, {'dateTime': '00:06:30', 'value': '1'}, {'dateTime': '00:07:30', 'value': '1'}, {'dateTime': '00:08:30', 'value': '1'}, {'dateTime': '00:09:30', 'value': '1'}, {'dateTime': '00:10:30', 'value': '1'}, {'dateTime': '00:11:30', 'value': '1'}, {'dateTime': '00:12:30', 'value': '1'}, {'dateTime': '00:13:30', 'value': '1'}, {'dateTime': '00:14:30', 'value': '1'}, {'dateTime': '00:15:30', 'value': '1'}, {'dateTime': '00:16:30', 'value': '1'}, {'dateTime': '00:17:30', 'value': '1'}, {'dateTime': '00:18:30', 'value': '1'}, {'dateTime': '00:19:30', 'value': '1'}, {'dateTime': '00:20:30', 'value': '1'}, {'dateTime': '00:21:30', 'value': '1'}, {'dateTime': '00:22:30', 'value': '1'}, {'dateTime': '00:23:30', 'value': '1'}, {'dateTime': '00:24:30', 'value': '1'}, {'dateTime': '00:25:30', 'value': '1'}, {'dateTime': '00:26:30', 'value': '1'}, {'dateTime': '00:27:30', 'value': '1'}, {'dateTime': '00:28:30', 'value': '2'}, {'dateTime': '00:29:30', 'value': '1'}, {'dateTime': '00:30:30', 'value': '1'}, {'dateTime': '00:31:30', 'value': '1'}, {'dateTime': '00:32:30', 'value': '1'}, {'dateTime': '00:33:30', 'value': '1'}, {'dateTime': '00:34:30', 'value': '1'}, {'dateTime': '00:35:30', 'value': '1'}, {'dateTime': '00:36:30', 'value': '1'}, {'dateTime': '00:37:30', 'value': '1'}, {'dateTime': '00:38:30', 'value': '1'}, {'dateTime': '00:39:30', 'value': '1'}, {'dateTime': '00:40:30', 'value': '1'}, {'dateTime': '00:41:30', 'value': '1'}, {'dateTime': '00:42:30', 'value': '1'}, {'dateTime': '00:43:30', 'value': '1'}, {'dateTime': '00:44:30', 'value': '1'}, {'dateTime': '00:45:30', 'value': '1'}, {'dateTime': '00:46:30', 'value': '1'}, {'dateTime': '00:47:30', 'value': '1'}, {'dateTime': '00:48:30', 'value': '1'}, {'dateTime': '00:49:30', 'value': '1'}, {'dateTime': '00:50:30', 'value': '1'}, {'dateTime': '00:51:30', 'value': '1'}, {'dateTime': '00:52:30', 'value': '1'}, {'dateTime': '00:53:30', 'value': '1'}, {'dateTime': '00:54:30', 'value': '1'}, {'dateTime': '00:55:30', 'value': '1'}, {'dateTime': '00:56:30', 'value': '1'}, {'dateTime': '00:57:30', 'value': '1'}, {'dateTime': '00:58:30', 'value': '1'}, {'dateTime': '00:59:30', 'value': '1'}, {'dateTime': '01:00:30', 'value': '1'}, {'dateTime': '01:01:30', 'value': '1'}, {'dateTime': '01:02:30', 'value': '1'}, {'dateTime': '01:03:30', 'value': '1'}, {'dateTime': '01:04:30', 'value': '1'}, {'dateTime': '01:05:30', 'value': '1'}, {'dateTime': '01:06:30', 'value': '1'}, {'dateTime': '01:07:30', 'value': '1'}, {'dateTime': '01:08:30', 'value': '1'}, {'dateTime': '01:09:30', 'value': '1'}, {'dateTime': '01:10:30', 'value': '1'}, {'dateTime': '01:11:30', 'value': '1'}, {'dateTime': '01:12:30', 'value': '1'}, {'dateTime': '01:13:30', 'value': '1'}, {'dateTime': '01:14:30', 'value': '1'}, {'dateTime': '01:15:30', 'value': '1'}, {'dateTime': '01:16:30', 'value': '1'}, {'dateTime': '01:17:30', 'value': '1'}, {'dateTime': '01:18:30', 'value': '1'}, {'dateTime': '01:19:30', 'value': '1'}, {'dateTime': '01:20:30', 'value': '1'}, {'dateTime': '01:21:30', 'value': '1'}, {'dateTime': '01:22:30', 'value': '1'}, {'dateTime': '01:23:30', 'value': '1'}, {'dateTime': '01:24:30', 'value': '1'}, {'dateTime': '01:25:30', 'value': '1'}, {'dateTime': '01:26:30', 'value': '1'}, {'dateTime': '01:27:30', 'value': '1'}, {'dateTime': '01:28:30', 'value': '1'}, {'dateTime': '01:29:30', 'value': '1'}, {'dateTime': '01:30:30', 'value': '1'}, {'dateTime': '01:31:30', 'value': '1'}, {'dateTime': '01:32:30', 'value': '1'}, {'dateTime': '01:33:30', 'value': '1'}, {'dateTime': '01:34:30', 'value': '1'}, {'dateTime': '01:35:30', 'value': '1'}, {'dateTime': '01:36:30', 'value': '1'}, {'dateTime': '01:37:30', 'value': '1'}, {'dateTime': '01:38:30', 'value': '1'}, {'dateTime': '01:39:30', 'value': '1'}, {'dateTime': '01:40:30', 'value': '1'}, {'dateTime': '01:41:30', 'value': '1'}, {'dateTime': '01:42:30', 'value': '1'}, {'dateTime': '01:43:30', 'value': '1'}, {'dateTime': '01:44:30', 'value': '1'}, {'dateTime': '01:45:30', 'value': '1'}, {'dateTime': '01:46:30', 'value': '1'}, {'dateTime': '01:47:30', 'value': '1'}, {'dateTime': '01:48:30', 'value': '1'}, {'dateTime': '01:49:30', 'value': '1'}, {'dateTime': '01:50:30', 'value': '1'}, {'dateTime': '01:51:30', 'value': '1'}, {'dateTime': '01:52:30', 'value': '1'}, {'dateTime': '01:53:30', 'value': '1'}, {'dateTime': '01:54:30', 'value': '1'}, {'dateTime': '01:55:30', 'value': '1'}, {'dateTime': '01:56:30', 'value': '1'}, {'dateTime': '01:57:30', 'value': '1'}, {'dateTime': '01:58:30', 'value': '1'}, {'dateTime': '01:59:30', 'value': '1'}, {'dateTime': '02:00:30', 'value': '1'}, {'dateTime': '02:01:30', 'value': '1'}, {'dateTime': '02:02:30', 'value': '1'}, {'dateTime': '02:03:30', 'value': '1'}, {'dateTime': '02:04:30', 'value': '1'}, {'dateTime': '02:05:30', 'value': '1'}, {'dateTime': '02:06:30', 'value': '1'}, {'dateTime': '02:07:30', 'value': '1'}, {'dateTime': '02:08:30', 'value': '1'}, {'dateTime': '02:09:30', 'value': '1'}, {'dateTime': '02:10:30', 'value': '1'}, {'dateTime': '02:11:30', 'value': '1'}, {'dateTime': '02:12:30', 'value': '1'}, {'dateTime': '02:13:30', 'value': '1'}, {'dateTime': '02:14:30', 'value': '1'}, {'dateTime': '02:15:30', 'value': '1'}, {'dateTime': '02:16:30', 'value': '1'}, {'dateTime': '02:17:30', 'value': '1'}, {'dateTime': '02:18:30', 'value': '1'}, {'dateTime': '02:19:30', 'value': '1'}, {'dateTime': '02:20:30', 'value': '1'}, {'dateTime': '02:21:30', 'value': '1'}, {'dateTime': '02:22:30', 'value': '1'}, {'dateTime': '02:23:30', 'value': '1'}, {'dateTime': '02:24:30', 'value': '1'}, {'dateTime': '02:25:30', 'value': '1'}, {'dateTime': '02:26:30', 'value': '1'}, {'dateTime': '02:27:30', 'value': '1'}, {'dateTime': '02:28:30', 'value': '1'}, {'dateTime': '02:29:30', 'value': '1'}, {'dateTime': '02:30:30', 'value': '1'}, {'dateTime': '02:31:30', 'value': '1'}, {'dateTime': '02:32:30', 'value': '1'}, {'dateTime': '02:33:30', 'value': '1'}, {'dateTime': '02:34:30', 'value': '1'}, {'dateTime': '02:35:30', 'value': '1'}, {'dateTime': '02:36:30', 'value': '1'}, {'dateTime': '02:37:30', 'value': '1'}, {'dateTime': '02:38:30', 'value': '1'}, {'dateTime': '02:39:30', 'value': '1'}, {'dateTime': '02:40:30', 'value': '1'}, {'dateTime': '02:41:30', 'value': '1'}, {'dateTime': '02:42:30', 'value': '1'}, {'dateTime': '02:43:30', 'value': '1'}, {'dateTime': '02:44:30', 'value': '1'}, {'dateTime': '02:45:30', 'value': '1'}, {'dateTime': '02:46:30', 'value': '1'}, {'dateTime': '02:47:30', 'value': '1'}, {'dateTime': '02:48:30', 'value': '1'}, {'dateTime': '02:49:30', 'value': '1'}, {'dateTime': '02:50:30', 'value': '1'}, {'dateTime': '02:51:30', 'value': '1'}, {'dateTime': '02:52:30', 'value': '1'}, {'dateTime': '02:53:30', 'value': '1'}, {'dateTime': '02:54:30', 'value': '1'}, {'dateTime': '02:55:30', 'value': '1'}, {'dateTime': '02:56:30', 'value': '1'}, {'dateTime': '02:57:30', 'value': '1'}, {'dateTime': '02:58:30', 'value': '1'}, {'dateTime': '02:59:30', 'value': '1'}, {'dateTime': '03:00:30', 'value': '1'}, {'dateTime': '03:01:30', 'value': '1'}, {'dateTime': '03:02:30', 'value': '1'}, {'dateTime': '03:03:30', 'value': '1'}, {'dateTime': '03:04:30', 'value': '1'}, {'dateTime': '03:05:30', 'value': '1'}, {'dateTime': '03:06:30', 'value': '1'}, {'dateTime': '03:07:30', 'value': '1'}, {'dateTime': '03:08:30', 'value': '1'}, {'dateTime': '03:09:30', 'value': '1'}, {'dateTime': '03:10:30', 'value': '1'}, {'dateTime': '03:11:30', 'value': '1'}, {'dateTime': '03:12:30', 'value': '1'}, {'dateTime': '03:13:30', 'value': '1'}, {'dateTime': '03:14:30', 'value': '1'}, {'dateTime': '03:15:30', 'value': '1'}, {'dateTime': '03:16:30', 'value': '1'}, {'dateTime': '03:17:30', 'value': '1'}, {'dateTime': '03:18:30', 'value': '1'}, {'dateTime': '03:19:30', 'value': '1'}, {'dateTime': '03:20:30', 'value': '1'}, {'dateTime': '03:21:30', 'value': '1'}, {'dateTime': '03:22:30', 'value': '1'}, {'dateTime': '03:23:30', 'value': '1'}, {'dateTime': '03:24:30', 'value': '1'}, {'dateTime': '03:25:30', 'value': '1'}, {'dateTime': '03:26:30', 'value': '1'}, {'dateTime': '03:27:30', 'value': '1'}, {'dateTime': '03:28:30', 'value': '1'}, {'dateTime': '03:29:30', 'value': '1'}, {'dateTime': '03:30:30', 'value': '1'}, {'dateTime': '03:31:30', 'value': '1'}, {'dateTime': '03:32:30', 'value': '1'}, {'dateTime': '03:33:30', 'value': '1'}, {'dateTime': '03:34:30', 'value': '1'}, {'dateTime': '03:35:30', 'value': '1'}, {'dateTime': '03:36:30', 'value': '1'}, {'dateTime': '03:37:30', 'value': '1'}, {'dateTime': '03:38:30', 'value': '1'}, {'dateTime': '03:39:30', 'value': '1'}, {'dateTime': '03:40:30', 'value': '1'}, {'dateTime': '03:41:30', 'value': '1'}, {'dateTime': '03:42:30', 'value': '1'}, {'dateTime': '03:43:30', 'value': '1'}, {'dateTime': '03:44:30', 'value': '1'}, {'dateTime': '03:45:30', 'value': '1'}, {'dateTime': '03:46:30', 'value': '1'}, {'dateTime': '03:47:30', 'value': '1'}, {'dateTime': '03:48:30', 'value': '1'}, {'dateTime': '03:49:30', 'value': '1'}, {'dateTime': '03:50:30', 'value': '1'}, {'dateTime': '03:51:30', 'value': '1'}, {'dateTime': '03:52:30', 'value': '1'}, {'dateTime': '03:53:30', 'value': '1'}, {'dateTime': '03:54:30', 'value': '1'}, {'dateTime': '03:55:30', 'value': '1'}, {'dateTime': '03:56:30', 'value': '1'}, {'dateTime': '03:57:30', 'value': '1'}, {'dateTime': '03:58:30', 'value': '1'}, {'dateTime': '03:59:30', 'value': '1'}, {'dateTime': '04:00:30', 'value': '1'}, {'dateTime': '04:01:30', 'value': '1'}, {'dateTime': '04:02:30', 'value': '1'}, {'dateTime': '04:03:30', 'value': '1'}, {'dateTime': '04:04:30', 'value': '1'}, {'dateTime': '04:05:30', 'value': '1'}, {'dateTime': '04:06:30', 'value': '1'}, {'dateTime': '04:07:30', 'value': '1'}, {'dateTime': '04:08:30', 'value': '1'}, {'dateTime': '04:09:30', 'value': '1'}, {'dateTime': '04:10:30', 'value': '1'}, {'dateTime': '04:11:30', 'value': '1'}, {'dateTime': '04:12:30', 'value': '1'}, {'dateTime': '04:13:30', 'value': '1'}, {'dateTime': '04:14:30', 'value': '1'}, {'dateTime': '04:15:30', 'value': '1'}, {'dateTime': '04:16:30', 'value': '1'}, {'dateTime': '04:17:30', 'value': '1'}, {'dateTime': '04:18:30', 'value': '2'}, {'dateTime': '04:19:30', 'value': '2'}, {'dateTime': '04:20:30', 'value': '1'}, {'dateTime': '04:21:30', 'value': '1'}, {'dateTime': '04:22:30', 'value': '2'}, {'dateTime': '04:23:30', 'value': '1'}, {'dateTime': '04:24:30', 'value': '1'}, {'dateTime': '04:25:30', 'value': '1'}, {'dateTime': '04:26:30', 'value': '1'}, {'dateTime': '04:27:30', 'value': '1'}, {'dateTime': '04:28:30', 'value': '1'}, {'dateTime': '04:29:30', 'value': '1'}, {'dateTime': '04:30:30', 'value': '1'}, {'dateTime': '04:31:30', 'value': '1'}, {'dateTime': '04:32:30', 'value': '1'}, {'dateTime': '04:33:30', 'value': '1'}, {'dateTime': '04:34:30', 'value': '1'}, {'dateTime': '04:35:30', 'value': '1'}, {'dateTime': '04:36:30', 'value': '1'}, {'dateTime': '04:37:30', 'value': '1'}, {'dateTime': '04:38:30', 'value': '1'}, {'dateTime': '04:39:30', 'value': '1'}, {'dateTime': '04:40:30', 'value': '1'}, {'dateTime': '04:41:30', 'value': '1'}, {'dateTime': '04:42:30', 'value': '1'}, {'dateTime': '04:43:30', 'value': '1'}, {'dateTime': '04:44:30', 'value': '1'}, {'dateTime': '04:45:30', 'value': '1'}, {'dateTime': '04:46:30', 'value': '1'}, {'dateTime': '04:47:30', 'value': '2'}, {'dateTime': '04:48:30', 'value': '2'}, {'dateTime': '04:49:30', 'value': '2'}, {'dateTime': '04:50:30', 'value': '2'}, {'dateTime': '04:51:30', 'value': '2'}, {'dateTime': '04:52:30', 'value': '2'}, {'dateTime': '04:53:30', 'value': '3'}, {'dateTime': '04:54:30', 'value': '2'}, {'dateTime': '04:55:30', 'value': '2'}, {'dateTime': '04:56:30', 'value': '3'}, {'dateTime': '04:57:30', 'value': '3'}, {'dateTime': '04:58:30', 'value': '2'}, {'dateTime': '04:59:30', 'value': '3'}, {'dateTime': '05:00:30', 'value': '2'}, {'dateTime': '05:01:30', 'value': '3'}, {'dateTime': '05:02:30', 'value': '3'}, {'dateTime': '05:03:30', 'value': '3'}, {'dateTime': '05:04:30', 'value': '2'}, {'dateTime': '05:05:30', 'value': '2'}, {'dateTime': '05:06:30', 'value': '1'}, {'dateTime': '05:07:30', 'value': '1'}, {'dateTime': '05:08:30', 'value': '1'}, {'dateTime': '05:09:30', 'value': '1'}, {'dateTime': '05:10:30', 'value': '1'}, {'dateTime': '05:11:30', 'value': '1'}, {'dateTime': '05:12:30', 'value': '1'}, {'dateTime': '05:13:30', 'value': '1'}, {'dateTime': '05:14:30', 'value': '1'}, {'dateTime': '05:15:30', 'value': '1'}, {'dateTime': '05:16:30', 'value': '1'}, {'dateTime': '05:17:30', 'value': '1'}, {'dateTime': '05:18:30', 'value': '1'}, {'dateTime': '05:19:30', 'value': '1'}, {'dateTime': '05:20:30', 'value': '1'}, {'dateTime': '05:21:30', 'value': '1'}, {'dateTime': '05:22:30', 'value': '1'}, {'dateTime': '05:23:30', 'value': '2'}, {'dateTime': '05:24:30', 'value': '1'}, {'dateTime': '05:25:30', 'value': '1'}, {'dateTime': '05:26:30', 'value': '1'}, {'dateTime': '05:27:30', 'value': '1'}, {'dateTime': '05:28:30', 'value': '1'}, {'dateTime': '05:29:30', 'value': '1'}, {'dateTime': '05:30:30', 'value': '1'}, {'dateTime': '05:31:30', 'value': '1'}, {'dateTime': '05:32:30', 'value': '1'}, {'dateTime': '05:33:30', 'value': '1'}, {'dateTime': '05:34:30', 'value': '1'}, {'dateTime': '05:35:30', 'value': '1'}, {'dateTime': '05:36:30', 'value': '1'}, {'dateTime': '05:37:30', 'value': '2'}, {'dateTime': '05:38:30', 'value': '1'}, {'dateTime': '05:39:30', 'value': '1'}, {'dateTime': '05:40:30', 'value': '1'}, {'dateTime': '05:41:30', 'value': '1'}, {'dateTime': '05:42:30', 'value': '1'}, {'dateTime': '05:43:30', 'value': '1'}, {'dateTime': '05:44:30', 'value': '1'}, {'dateTime': '05:45:30', 'value': '1'}, {'dateTime': '05:46:30', 'value': '1'}, {'dateTime': '05:47:30', 'value': '1'}, {'dateTime': '05:48:30', 'value': '1'}, {'dateTime': '05:49:30', 'value': '1'}, {'dateTime': '05:50:30', 'value': '1'}, {'dateTime': '05:51:30', 'value': '1'}, {'dateTime': '05:52:30', 'value': '1'}, {'dateTime': '05:53:30', 'value': '1'}, {'dateTime': '05:54:30', 'value': '1'}, {'dateTime': '05:55:30', 'value': '1'}, {'dateTime': '05:56:30', 'value': '1'}, {'dateTime': '05:57:30', 'value': '1'}, {'dateTime': '05:58:30', 'value': '1'}, {'dateTime': '05:59:30', 'value': '1'}, {'dateTime': '06:00:30', 'value': '1'}, {'dateTime': '06:01:30', 'value': '1'}, {'dateTime': '06:02:30', 'value': '1'}, {'dateTime': '06:03:30', 'value': '1'}, {'dateTime': '06:04:30', 'value': '1'}, {'dateTime': '06:05:30', 'value': '1'}, {'dateTime': '06:06:30', 'value': '1'}, {'dateTime': '06:07:30', 'value': '1'}, {'dateTime': '06:08:30', 'value': '1'}], 'minutesAfterWakeup': 0, 'minutesAsleep': 384, 'minutesAwake': 26, 'minutesToFallAsleep': 0, 'restlessCount': 12, 'restlessDuration': 20, 'startTime': '2015-04-27T23:16:30.000', 'timeInBed': 413}]



```python
import ijson

filename = "2015-04-28.json"
with open(filename, 'r') as f:
    objects = ijson.items(f, 'summary')
    columns = list(objects)
```


```python
print(columns[0])
```

    {'totalMinutesAsleep': 384, 'totalSleepRecords': 1, 'totalTimeInBed': 413}


Another approach to viewing and working with the json file is to use the json package.  I've seen this package more often used for smaller datasets.  In this case we will take a look at the file again with this method.  There is a lot of data collected for one night's sleep.  You can get real sense of how the internet of things is a big data volume problem.  


```python
import json
with open('2015-04-28.json') as f:
    sample_data = json.loads(f.read())

for k, v in sample_data['sleep'][0].items():
    print(k, v)
```

    awakeCount 5
    awakeDuration 9
    awakeningsCount 17
    dateOfSleep 2015-04-28
    duration 24780000
    efficiency 94
    endTime 2015-04-28T06:09:30.000
    isMainSleep True
    logId 886290350
    minuteData [{'dateTime': '23:16:30', 'value': '3'}, {'dateTime': '23:17:30', 'value': '3'}, {'dateTime': '23:18:30', 'value': '2'}, {'dateTime': '23:19:30', 'value': '1'}, {'dateTime': '23:20:30', 'value': '1'}, {'dateTime': '23:21:30', 'value': '1'}, {'dateTime': '23:22:30', 'value': '1'}, {'dateTime': '23:23:30', 'value': '1'}, {'dateTime': '23:24:30', 'value': '1'}, {'dateTime': '23:25:30', 'value': '1'}, {'dateTime': '23:26:30', 'value': '1'}, {'dateTime': '23:27:30', 'value': '1'}, {'dateTime': '23:28:30', 'value': '1'}, {'dateTime': '23:29:30', 'value': '1'}, {'dateTime': '23:30:30', 'value': '1'}, {'dateTime': '23:31:30', 'value': '1'}, {'dateTime': '23:32:30', 'value': '1'}, {'dateTime': '23:33:30', 'value': '1'}, {'dateTime': '23:34:30', 'value': '1'}, {'dateTime': '23:35:30', 'value': '1'}, {'dateTime': '23:36:30', 'value': '1'}, {'dateTime': '23:37:30', 'value': '1'}, {'dateTime': '23:38:30', 'value': '1'}, {'dateTime': '23:39:30', 'value': '1'}, {'dateTime': '23:40:30', 'value': '1'}, {'dateTime': '23:41:30', 'value': '1'}, {'dateTime': '23:42:30', 'value': '1'}, {'dateTime': '23:43:30', 'value': '1'}, {'dateTime': '23:44:30', 'value': '1'}, {'dateTime': '23:45:30', 'value': '1'}, {'dateTime': '23:46:30', 'value': '1'}, {'dateTime': '23:47:30', 'value': '1'}, {'dateTime': '23:48:30', 'value': '1'}, {'dateTime': '23:49:30', 'value': '1'}, {'dateTime': '23:50:30', 'value': '1'}, {'dateTime': '23:51:30', 'value': '2'}, {'dateTime': '23:52:30', 'value': '1'}, {'dateTime': '23:53:30', 'value': '1'}, {'dateTime': '23:54:30', 'value': '1'}, {'dateTime': '23:55:30', 'value': '1'}, {'dateTime': '23:56:30', 'value': '1'}, {'dateTime': '23:57:30', 'value': '1'}, {'dateTime': '23:58:30', 'value': '1'}, {'dateTime': '23:59:30', 'value': '1'}, {'dateTime': '00:00:30', 'value': '1'}, {'dateTime': '00:01:30', 'value': '1'}, {'dateTime': '00:02:30', 'value': '1'}, {'dateTime': '00:03:30', 'value': '1'}, {'dateTime': '00:04:30', 'value': '1'}, {'dateTime': '00:05:30', 'value': '1'}, {'dateTime': '00:06:30', 'value': '1'}, {'dateTime': '00:07:30', 'value': '1'}, {'dateTime': '00:08:30', 'value': '1'}, {'dateTime': '00:09:30', 'value': '1'}, {'dateTime': '00:10:30', 'value': '1'}, {'dateTime': '00:11:30', 'value': '1'}, {'dateTime': '00:12:30', 'value': '1'}, {'dateTime': '00:13:30', 'value': '1'}, {'dateTime': '00:14:30', 'value': '1'}, {'dateTime': '00:15:30', 'value': '1'}, {'dateTime': '00:16:30', 'value': '1'}, {'dateTime': '00:17:30', 'value': '1'}, {'dateTime': '00:18:30', 'value': '1'}, {'dateTime': '00:19:30', 'value': '1'}, {'dateTime': '00:20:30', 'value': '1'}, {'dateTime': '00:21:30', 'value': '1'}, {'dateTime': '00:22:30', 'value': '1'}, {'dateTime': '00:23:30', 'value': '1'}, {'dateTime': '00:24:30', 'value': '1'}, {'dateTime': '00:25:30', 'value': '1'}, {'dateTime': '00:26:30', 'value': '1'}, {'dateTime': '00:27:30', 'value': '1'}, {'dateTime': '00:28:30', 'value': '2'}, {'dateTime': '00:29:30', 'value': '1'}, {'dateTime': '00:30:30', 'value': '1'}, {'dateTime': '00:31:30', 'value': '1'}, {'dateTime': '00:32:30', 'value': '1'}, {'dateTime': '00:33:30', 'value': '1'}, {'dateTime': '00:34:30', 'value': '1'}, {'dateTime': '00:35:30', 'value': '1'}, {'dateTime': '00:36:30', 'value': '1'}, {'dateTime': '00:37:30', 'value': '1'}, {'dateTime': '00:38:30', 'value': '1'}, {'dateTime': '00:39:30', 'value': '1'}, {'dateTime': '00:40:30', 'value': '1'}, {'dateTime': '00:41:30', 'value': '1'}, {'dateTime': '00:42:30', 'value': '1'}, {'dateTime': '00:43:30', 'value': '1'}, {'dateTime': '00:44:30', 'value': '1'}, {'dateTime': '00:45:30', 'value': '1'}, {'dateTime': '00:46:30', 'value': '1'}, {'dateTime': '00:47:30', 'value': '1'}, {'dateTime': '00:48:30', 'value': '1'}, {'dateTime': '00:49:30', 'value': '1'}, {'dateTime': '00:50:30', 'value': '1'}, {'dateTime': '00:51:30', 'value': '1'}, {'dateTime': '00:52:30', 'value': '1'}, {'dateTime': '00:53:30', 'value': '1'}, {'dateTime': '00:54:30', 'value': '1'}, {'dateTime': '00:55:30', 'value': '1'}, {'dateTime': '00:56:30', 'value': '1'}, {'dateTime': '00:57:30', 'value': '1'}, {'dateTime': '00:58:30', 'value': '1'}, {'dateTime': '00:59:30', 'value': '1'}, {'dateTime': '01:00:30', 'value': '1'}, {'dateTime': '01:01:30', 'value': '1'}, {'dateTime': '01:02:30', 'value': '1'}, {'dateTime': '01:03:30', 'value': '1'}, {'dateTime': '01:04:30', 'value': '1'}, {'dateTime': '01:05:30', 'value': '1'}, {'dateTime': '01:06:30', 'value': '1'}, {'dateTime': '01:07:30', 'value': '1'}, {'dateTime': '01:08:30', 'value': '1'}, {'dateTime': '01:09:30', 'value': '1'}, {'dateTime': '01:10:30', 'value': '1'}, {'dateTime': '01:11:30', 'value': '1'}, {'dateTime': '01:12:30', 'value': '1'}, {'dateTime': '01:13:30', 'value': '1'}, {'dateTime': '01:14:30', 'value': '1'}, {'dateTime': '01:15:30', 'value': '1'}, {'dateTime': '01:16:30', 'value': '1'}, {'dateTime': '01:17:30', 'value': '1'}, {'dateTime': '01:18:30', 'value': '1'}, {'dateTime': '01:19:30', 'value': '1'}, {'dateTime': '01:20:30', 'value': '1'}, {'dateTime': '01:21:30', 'value': '1'}, {'dateTime': '01:22:30', 'value': '1'}, {'dateTime': '01:23:30', 'value': '1'}, {'dateTime': '01:24:30', 'value': '1'}, {'dateTime': '01:25:30', 'value': '1'}, {'dateTime': '01:26:30', 'value': '1'}, {'dateTime': '01:27:30', 'value': '1'}, {'dateTime': '01:28:30', 'value': '1'}, {'dateTime': '01:29:30', 'value': '1'}, {'dateTime': '01:30:30', 'value': '1'}, {'dateTime': '01:31:30', 'value': '1'}, {'dateTime': '01:32:30', 'value': '1'}, {'dateTime': '01:33:30', 'value': '1'}, {'dateTime': '01:34:30', 'value': '1'}, {'dateTime': '01:35:30', 'value': '1'}, {'dateTime': '01:36:30', 'value': '1'}, {'dateTime': '01:37:30', 'value': '1'}, {'dateTime': '01:38:30', 'value': '1'}, {'dateTime': '01:39:30', 'value': '1'}, {'dateTime': '01:40:30', 'value': '1'}, {'dateTime': '01:41:30', 'value': '1'}, {'dateTime': '01:42:30', 'value': '1'}, {'dateTime': '01:43:30', 'value': '1'}, {'dateTime': '01:44:30', 'value': '1'}, {'dateTime': '01:45:30', 'value': '1'}, {'dateTime': '01:46:30', 'value': '1'}, {'dateTime': '01:47:30', 'value': '1'}, {'dateTime': '01:48:30', 'value': '1'}, {'dateTime': '01:49:30', 'value': '1'}, {'dateTime': '01:50:30', 'value': '1'}, {'dateTime': '01:51:30', 'value': '1'}, {'dateTime': '01:52:30', 'value': '1'}, {'dateTime': '01:53:30', 'value': '1'}, {'dateTime': '01:54:30', 'value': '1'}, {'dateTime': '01:55:30', 'value': '1'}, {'dateTime': '01:56:30', 'value': '1'}, {'dateTime': '01:57:30', 'value': '1'}, {'dateTime': '01:58:30', 'value': '1'}, {'dateTime': '01:59:30', 'value': '1'}, {'dateTime': '02:00:30', 'value': '1'}, {'dateTime': '02:01:30', 'value': '1'}, {'dateTime': '02:02:30', 'value': '1'}, {'dateTime': '02:03:30', 'value': '1'}, {'dateTime': '02:04:30', 'value': '1'}, {'dateTime': '02:05:30', 'value': '1'}, {'dateTime': '02:06:30', 'value': '1'}, {'dateTime': '02:07:30', 'value': '1'}, {'dateTime': '02:08:30', 'value': '1'}, {'dateTime': '02:09:30', 'value': '1'}, {'dateTime': '02:10:30', 'value': '1'}, {'dateTime': '02:11:30', 'value': '1'}, {'dateTime': '02:12:30', 'value': '1'}, {'dateTime': '02:13:30', 'value': '1'}, {'dateTime': '02:14:30', 'value': '1'}, {'dateTime': '02:15:30', 'value': '1'}, {'dateTime': '02:16:30', 'value': '1'}, {'dateTime': '02:17:30', 'value': '1'}, {'dateTime': '02:18:30', 'value': '1'}, {'dateTime': '02:19:30', 'value': '1'}, {'dateTime': '02:20:30', 'value': '1'}, {'dateTime': '02:21:30', 'value': '1'}, {'dateTime': '02:22:30', 'value': '1'}, {'dateTime': '02:23:30', 'value': '1'}, {'dateTime': '02:24:30', 'value': '1'}, {'dateTime': '02:25:30', 'value': '1'}, {'dateTime': '02:26:30', 'value': '1'}, {'dateTime': '02:27:30', 'value': '1'}, {'dateTime': '02:28:30', 'value': '1'}, {'dateTime': '02:29:30', 'value': '1'}, {'dateTime': '02:30:30', 'value': '1'}, {'dateTime': '02:31:30', 'value': '1'}, {'dateTime': '02:32:30', 'value': '1'}, {'dateTime': '02:33:30', 'value': '1'}, {'dateTime': '02:34:30', 'value': '1'}, {'dateTime': '02:35:30', 'value': '1'}, {'dateTime': '02:36:30', 'value': '1'}, {'dateTime': '02:37:30', 'value': '1'}, {'dateTime': '02:38:30', 'value': '1'}, {'dateTime': '02:39:30', 'value': '1'}, {'dateTime': '02:40:30', 'value': '1'}, {'dateTime': '02:41:30', 'value': '1'}, {'dateTime': '02:42:30', 'value': '1'}, {'dateTime': '02:43:30', 'value': '1'}, {'dateTime': '02:44:30', 'value': '1'}, {'dateTime': '02:45:30', 'value': '1'}, {'dateTime': '02:46:30', 'value': '1'}, {'dateTime': '02:47:30', 'value': '1'}, {'dateTime': '02:48:30', 'value': '1'}, {'dateTime': '02:49:30', 'value': '1'}, {'dateTime': '02:50:30', 'value': '1'}, {'dateTime': '02:51:30', 'value': '1'}, {'dateTime': '02:52:30', 'value': '1'}, {'dateTime': '02:53:30', 'value': '1'}, {'dateTime': '02:54:30', 'value': '1'}, {'dateTime': '02:55:30', 'value': '1'}, {'dateTime': '02:56:30', 'value': '1'}, {'dateTime': '02:57:30', 'value': '1'}, {'dateTime': '02:58:30', 'value': '1'}, {'dateTime': '02:59:30', 'value': '1'}, {'dateTime': '03:00:30', 'value': '1'}, {'dateTime': '03:01:30', 'value': '1'}, {'dateTime': '03:02:30', 'value': '1'}, {'dateTime': '03:03:30', 'value': '1'}, {'dateTime': '03:04:30', 'value': '1'}, {'dateTime': '03:05:30', 'value': '1'}, {'dateTime': '03:06:30', 'value': '1'}, {'dateTime': '03:07:30', 'value': '1'}, {'dateTime': '03:08:30', 'value': '1'}, {'dateTime': '03:09:30', 'value': '1'}, {'dateTime': '03:10:30', 'value': '1'}, {'dateTime': '03:11:30', 'value': '1'}, {'dateTime': '03:12:30', 'value': '1'}, {'dateTime': '03:13:30', 'value': '1'}, {'dateTime': '03:14:30', 'value': '1'}, {'dateTime': '03:15:30', 'value': '1'}, {'dateTime': '03:16:30', 'value': '1'}, {'dateTime': '03:17:30', 'value': '1'}, {'dateTime': '03:18:30', 'value': '1'}, {'dateTime': '03:19:30', 'value': '1'}, {'dateTime': '03:20:30', 'value': '1'}, {'dateTime': '03:21:30', 'value': '1'}, {'dateTime': '03:22:30', 'value': '1'}, {'dateTime': '03:23:30', 'value': '1'}, {'dateTime': '03:24:30', 'value': '1'}, {'dateTime': '03:25:30', 'value': '1'}, {'dateTime': '03:26:30', 'value': '1'}, {'dateTime': '03:27:30', 'value': '1'}, {'dateTime': '03:28:30', 'value': '1'}, {'dateTime': '03:29:30', 'value': '1'}, {'dateTime': '03:30:30', 'value': '1'}, {'dateTime': '03:31:30', 'value': '1'}, {'dateTime': '03:32:30', 'value': '1'}, {'dateTime': '03:33:30', 'value': '1'}, {'dateTime': '03:34:30', 'value': '1'}, {'dateTime': '03:35:30', 'value': '1'}, {'dateTime': '03:36:30', 'value': '1'}, {'dateTime': '03:37:30', 'value': '1'}, {'dateTime': '03:38:30', 'value': '1'}, {'dateTime': '03:39:30', 'value': '1'}, {'dateTime': '03:40:30', 'value': '1'}, {'dateTime': '03:41:30', 'value': '1'}, {'dateTime': '03:42:30', 'value': '1'}, {'dateTime': '03:43:30', 'value': '1'}, {'dateTime': '03:44:30', 'value': '1'}, {'dateTime': '03:45:30', 'value': '1'}, {'dateTime': '03:46:30', 'value': '1'}, {'dateTime': '03:47:30', 'value': '1'}, {'dateTime': '03:48:30', 'value': '1'}, {'dateTime': '03:49:30', 'value': '1'}, {'dateTime': '03:50:30', 'value': '1'}, {'dateTime': '03:51:30', 'value': '1'}, {'dateTime': '03:52:30', 'value': '1'}, {'dateTime': '03:53:30', 'value': '1'}, {'dateTime': '03:54:30', 'value': '1'}, {'dateTime': '03:55:30', 'value': '1'}, {'dateTime': '03:56:30', 'value': '1'}, {'dateTime': '03:57:30', 'value': '1'}, {'dateTime': '03:58:30', 'value': '1'}, {'dateTime': '03:59:30', 'value': '1'}, {'dateTime': '04:00:30', 'value': '1'}, {'dateTime': '04:01:30', 'value': '1'}, {'dateTime': '04:02:30', 'value': '1'}, {'dateTime': '04:03:30', 'value': '1'}, {'dateTime': '04:04:30', 'value': '1'}, {'dateTime': '04:05:30', 'value': '1'}, {'dateTime': '04:06:30', 'value': '1'}, {'dateTime': '04:07:30', 'value': '1'}, {'dateTime': '04:08:30', 'value': '1'}, {'dateTime': '04:09:30', 'value': '1'}, {'dateTime': '04:10:30', 'value': '1'}, {'dateTime': '04:11:30', 'value': '1'}, {'dateTime': '04:12:30', 'value': '1'}, {'dateTime': '04:13:30', 'value': '1'}, {'dateTime': '04:14:30', 'value': '1'}, {'dateTime': '04:15:30', 'value': '1'}, {'dateTime': '04:16:30', 'value': '1'}, {'dateTime': '04:17:30', 'value': '1'}, {'dateTime': '04:18:30', 'value': '2'}, {'dateTime': '04:19:30', 'value': '2'}, {'dateTime': '04:20:30', 'value': '1'}, {'dateTime': '04:21:30', 'value': '1'}, {'dateTime': '04:22:30', 'value': '2'}, {'dateTime': '04:23:30', 'value': '1'}, {'dateTime': '04:24:30', 'value': '1'}, {'dateTime': '04:25:30', 'value': '1'}, {'dateTime': '04:26:30', 'value': '1'}, {'dateTime': '04:27:30', 'value': '1'}, {'dateTime': '04:28:30', 'value': '1'}, {'dateTime': '04:29:30', 'value': '1'}, {'dateTime': '04:30:30', 'value': '1'}, {'dateTime': '04:31:30', 'value': '1'}, {'dateTime': '04:32:30', 'value': '1'}, {'dateTime': '04:33:30', 'value': '1'}, {'dateTime': '04:34:30', 'value': '1'}, {'dateTime': '04:35:30', 'value': '1'}, {'dateTime': '04:36:30', 'value': '1'}, {'dateTime': '04:37:30', 'value': '1'}, {'dateTime': '04:38:30', 'value': '1'}, {'dateTime': '04:39:30', 'value': '1'}, {'dateTime': '04:40:30', 'value': '1'}, {'dateTime': '04:41:30', 'value': '1'}, {'dateTime': '04:42:30', 'value': '1'}, {'dateTime': '04:43:30', 'value': '1'}, {'dateTime': '04:44:30', 'value': '1'}, {'dateTime': '04:45:30', 'value': '1'}, {'dateTime': '04:46:30', 'value': '1'}, {'dateTime': '04:47:30', 'value': '2'}, {'dateTime': '04:48:30', 'value': '2'}, {'dateTime': '04:49:30', 'value': '2'}, {'dateTime': '04:50:30', 'value': '2'}, {'dateTime': '04:51:30', 'value': '2'}, {'dateTime': '04:52:30', 'value': '2'}, {'dateTime': '04:53:30', 'value': '3'}, {'dateTime': '04:54:30', 'value': '2'}, {'dateTime': '04:55:30', 'value': '2'}, {'dateTime': '04:56:30', 'value': '3'}, {'dateTime': '04:57:30', 'value': '3'}, {'dateTime': '04:58:30', 'value': '2'}, {'dateTime': '04:59:30', 'value': '3'}, {'dateTime': '05:00:30', 'value': '2'}, {'dateTime': '05:01:30', 'value': '3'}, {'dateTime': '05:02:30', 'value': '3'}, {'dateTime': '05:03:30', 'value': '3'}, {'dateTime': '05:04:30', 'value': '2'}, {'dateTime': '05:05:30', 'value': '2'}, {'dateTime': '05:06:30', 'value': '1'}, {'dateTime': '05:07:30', 'value': '1'}, {'dateTime': '05:08:30', 'value': '1'}, {'dateTime': '05:09:30', 'value': '1'}, {'dateTime': '05:10:30', 'value': '1'}, {'dateTime': '05:11:30', 'value': '1'}, {'dateTime': '05:12:30', 'value': '1'}, {'dateTime': '05:13:30', 'value': '1'}, {'dateTime': '05:14:30', 'value': '1'}, {'dateTime': '05:15:30', 'value': '1'}, {'dateTime': '05:16:30', 'value': '1'}, {'dateTime': '05:17:30', 'value': '1'}, {'dateTime': '05:18:30', 'value': '1'}, {'dateTime': '05:19:30', 'value': '1'}, {'dateTime': '05:20:30', 'value': '1'}, {'dateTime': '05:21:30', 'value': '1'}, {'dateTime': '05:22:30', 'value': '1'}, {'dateTime': '05:23:30', 'value': '2'}, {'dateTime': '05:24:30', 'value': '1'}, {'dateTime': '05:25:30', 'value': '1'}, {'dateTime': '05:26:30', 'value': '1'}, {'dateTime': '05:27:30', 'value': '1'}, {'dateTime': '05:28:30', 'value': '1'}, {'dateTime': '05:29:30', 'value': '1'}, {'dateTime': '05:30:30', 'value': '1'}, {'dateTime': '05:31:30', 'value': '1'}, {'dateTime': '05:32:30', 'value': '1'}, {'dateTime': '05:33:30', 'value': '1'}, {'dateTime': '05:34:30', 'value': '1'}, {'dateTime': '05:35:30', 'value': '1'}, {'dateTime': '05:36:30', 'value': '1'}, {'dateTime': '05:37:30', 'value': '2'}, {'dateTime': '05:38:30', 'value': '1'}, {'dateTime': '05:39:30', 'value': '1'}, {'dateTime': '05:40:30', 'value': '1'}, {'dateTime': '05:41:30', 'value': '1'}, {'dateTime': '05:42:30', 'value': '1'}, {'dateTime': '05:43:30', 'value': '1'}, {'dateTime': '05:44:30', 'value': '1'}, {'dateTime': '05:45:30', 'value': '1'}, {'dateTime': '05:46:30', 'value': '1'}, {'dateTime': '05:47:30', 'value': '1'}, {'dateTime': '05:48:30', 'value': '1'}, {'dateTime': '05:49:30', 'value': '1'}, {'dateTime': '05:50:30', 'value': '1'}, {'dateTime': '05:51:30', 'value': '1'}, {'dateTime': '05:52:30', 'value': '1'}, {'dateTime': '05:53:30', 'value': '1'}, {'dateTime': '05:54:30', 'value': '1'}, {'dateTime': '05:55:30', 'value': '1'}, {'dateTime': '05:56:30', 'value': '1'}, {'dateTime': '05:57:30', 'value': '1'}, {'dateTime': '05:58:30', 'value': '1'}, {'dateTime': '05:59:30', 'value': '1'}, {'dateTime': '06:00:30', 'value': '1'}, {'dateTime': '06:01:30', 'value': '1'}, {'dateTime': '06:02:30', 'value': '1'}, {'dateTime': '06:03:30', 'value': '1'}, {'dateTime': '06:04:30', 'value': '1'}, {'dateTime': '06:05:30', 'value': '1'}, {'dateTime': '06:06:30', 'value': '1'}, {'dateTime': '06:07:30', 'value': '1'}, {'dateTime': '06:08:30', 'value': '1'}]
    minutesAfterWakeup 0
    minutesAsleep 384
    minutesAwake 26
    minutesToFallAsleep 0
    restlessCount 12
    restlessDuration 20
    startTime 2015-04-27T23:16:30.000
    timeInBed 413



```python
sample_data.keys()
```




    dict_keys(['sleep', 'summary'])




```python
list(sample_data['sleep'][0].keys())
```




    ['awakeCount',
     'awakeDuration',
     'awakeningsCount',
     'dateOfSleep',
     'duration',
     'efficiency',
     'endTime',
     'isMainSleep',
     'logId',
     'minuteData',
     'minutesAfterWakeup',
     'minutesAsleep',
     'minutesAwake',
     'minutesToFallAsleep',
     'restlessCount',
     'restlessDuration',
     'startTime',
     'timeInBed']




```python
list(sample_data['summary'].keys())
```




    ['totalMinutesAsleep', 'totalSleepRecords', 'totalTimeInBed']



Now it is time to extract the data needed from each json file and load into python lists to create the data for our table.  


```python
import numpy as np
# Dates of interest, and NamedTuple to hold data
dates = pd.date_range("2015-04-28", "2015-04-30")
data_timeInBed = []
data_minutesToFallAsleep = []
data_minutesAsleep = []
data_minutesAwake = []
data_startTime = []

# Obtain time spent in bed for each main sleep event
for date in dates:
    fname = date.strftime('%Y-%m-%d') + '.json'
    with open(fname, "r") as f:
        date_data = json.loads(f.read())


        for k, v in date_data['summary'].items():
            #check file contents to see if there is data for the date if no, add nan
            if k == 'totalMinutesAsleep':
                if v == 0:
                    data.append(np.nan)
                    #print('found')
        for sleep_event in date_data["sleep"]:
            #fitbit records each sleep cylce within the day.  It has a key 'isMainSleep' to flag main sleep.
            if sleep_event["isMainSleep"]:
                data_timeInBed.append(sleep_event["timeInBed"])
                data_minutesToFallAsleep.append(sleep_event["minutesToFallAsleep"])
                data_minutesAsleep.append(sleep_event["minutesAsleep"])
                data_minutesAwake.append(sleep_event["minutesAwake"])
                data_startTime.append(sleep_event["startTime"])
            #print(k, v)
```

Take a quick look at the data created from the files.


```python
print(data_timeInBed)
print(data_minutesToFallAsleep)
print(data_startTime)
```

    [413, 478, 454]
    [0, 0, 0]
    ['2015-04-27T23:16:30.000', '2015-04-28T22:02:00.000', '2015-04-29T22:12:30.000']


Create the Pandas dataframe that will be stored to the MariaDB and view the table.   


```python
df = pd.DataFrame(
    {'startTime': data_startTime,
     'timeInBed': data_timeInBed,
     'minutesToFallAsleep': data_minutesToFallAsleep,
     'minutesAsleep' : data_minutesAsleep,
     'minutesAwake' : data_minutesAwake    
    }, index = dates)

df["date_delta"] = (df.index - dates.min())  / np.timedelta64(1,'D')
df["timeInBed"] /= 60
df["minutesAsleep"] /= 60

df.head()
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>minutesAsleep</th>
      <th>minutesAwake</th>
      <th>minutesToFallAsleep</th>
      <th>startTime</th>
      <th>timeInBed</th>
      <th>date_delta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2015-04-28</th>
      <td>6.400000</td>
      <td>26</td>
      <td>0</td>
      <td>2015-04-27T23:16:30.000</td>
      <td>6.883333</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2015-04-29</th>
      <td>7.433333</td>
      <td>26</td>
      <td>0</td>
      <td>2015-04-28T22:02:00.000</td>
      <td>7.966667</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>2015-04-30</th>
      <td>7.366667</td>
      <td>9</td>
      <td>0</td>
      <td>2015-04-29T22:12:30.000</td>
      <td>7.566667</td>
      <td>2.0</td>
    </tr>
  </tbody>
</table>
</div>



Restablish connection to the database.


```python
mysql_dest_engine = create_engine('mysql+pymysql://root:admin@mariadb.my-network/Fitbit?charset=utf8mb4')
```

Write pandas table to the database.


```python
df.to_sql(con=mysql_dest_engine, name='sleepFitbit', schema=None, if_exists='replace', chunksize=1000)
```

Confirm data was written to database.


```python
showTable = mysql_dest_engine.execute('select * from test;')
for i in showTable:
    print(i)
```

    (datetime.datetime(2015, 4, 28, 0, 0), 6.4, 26, 0, '2015-04-27T23:16:30.000', 6.88333333333333, 0.0)
    (datetime.datetime(2015, 4, 29, 0, 0), 7.43333333333333, 26, 0, '2015-04-28T22:02:00.000', 7.96666666666667, 1.0)
    (datetime.datetime(2015, 4, 30, 0, 0), 7.36666666666667, 9, 0, '2015-04-29T22:12:30.000', 7.56666666666667, 2.0)
