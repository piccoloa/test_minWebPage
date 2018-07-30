---
permalink: /datalakes/
title:  "Data Lakes: Overview"
excerpt: 'This is the first blog under the topic Data Lakes and will be followed by additional topics pertaining to data lakes. Each topic will go deeper and share additional details and links to practical tools that I have discovered.'
sidebar:
  title: "Big Data"
  nav: Big-Data
layouts_gallery:
  - url: /assets/images/mm-layout-splash.png
    image_path: /assets/images/mm-layout-splash.png
    alt: "splash layout example"
  - url: /assets/images/mm-layout-single-meta.png
    image_path: /assets/images/mm-layout-single-meta.png
    alt: "single layout with comments and related posts"
  - url: /assets/images/mm-layout-archive.png
    image_path: /assets/images/mm-layout-archive.png
    alt: "archive layout example"
last_modified_at: 2018-06-04T12:04:24-04:00
toc: true
---

![png](/static/oxfordPond.jpg)
[Oxford Botanic Garden Pond](https://www.google.com/maps/place/51%C2%B045'02.9%22N+1%C2%B014'48.5%22W/@51.7508,-1.2489887,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d51.7508!4d-1.2468)

_Part 1_
### Notes From Concept to Implementation  

 This is the first blog under the topic **Data Lakes** and will be followed by additional topics pertaining to data lakes.  Each post will start with the title Data Lakes followed by a [:new topic].  Each topic will go deeper and share additional details and links to practical tools that I have discovered.  The goal is to better understand the impact of data lakes on the analytics value chain.   This post broadly covers the following questions:
 1. **Where did the data lake concept originate?**
 2. **What are the problems that data lakes are solving or not solving?**
 3. **What are the typical components of enterprise data lakes?**
 4. **How are data lakes being used to increase productivity or share data?**
 5. **What are the data governance issues that need to be addressed?**  


**1. **Where did the data lake concept originate?**

"Google, Facebook and Yahoo had discovered big data before anyone else, but it was obvious that it was coming to banks, hospitals and other traditional companies. Enterprises had already realized that cloud computing was important. They were rebuilding their data centers to be cloudy. We realized that a once‑in‑a‑generation technology change was underway, and knew that we had a chance to create a company to deliver the modern platform for big data"  [Cloudera](https://www.sec.gov/Archives/edgar/data/1535379/000162828017003221/projectthunders-1.htm#seac698b4139f443582aeb0a2fd342826).  While not inventing the term, Cloudera embraced the Apache open source projects to build a data management platform that could scale the way of Google, Facebook and Yahoo.   
Prior to data lakes, technologies were architected and created to solve specific data related problems.  These special purpose legacy architectures were expensive and inflexible.  Examples of these systems included relational databases for back-office reporting and billing, to large document management systems for storing unstructured data.  Those companies born from the web were the first to encounter the limitations of processing large volumes of data with data of different variety.  Building on the idea's of  Google, Apache Hadoop software was created by Doug Cutting and Mike Carfarella.  Hadoop was comprised of HDFS and MapReduce technologies.   

The primary use of a data lake is to store data.  The Apache Hadoop project is primarily spoken of as the source for storing data and has become the default term by most data professionals when referring to data lakes.



**2. **What are the problems that data lakes are solving or not solving?**

Data lakes are perceived very much in the same light as the original data warehouse. The promise of answering important strategic as well as predicting success or failure based on large volumes of data have been the primary reason to spend. Predicting the future is not easy. Many of the data science or predictive models have not had as high returns as originally thought.  More successful approaches to implementing data lakes have started with a small single cross departmental data problem that can show a high ROI.  A project such as reducing customer churn that reaches across two or three organizations including support, product analytics, sales and a renewals team could be one example.  Another project could be one related to a central point of governance.  This could be a data lake to create a centralized entity resolution dataset to monitor and manage sensitive data.     

The [transforming of data](https://piccoloa.github.io/2018/05/31/Data-Science1.html), or the T in ETL (extracting, transforming, and loading) is the process where Hadoop has been thought to cause the greatest improvements.  Because much of the transforming of data in the process is done on an ETL server, a Hadoop cluster architecture is much more efficient at transforming the data as it gets loaded to the data lake.  Additionally, data that is not in tabular form can be saved in its native form and avoid converting the data to a target schema.   This is especially important to vast volumes of unstructured IOT data.

Some of the other benefits include allowing for non-programmers to create data visualizations, reports, dashboard and SQL like access to provide for analysis.   

One of the pitfalls to Data lakes has been couched in the "data puddles" term.  These stranded data lakes become a problem when the proliferation of data lakes leads to data quality and cost problems of implementing duplicative systems.  Data puddles are meant to be avoided with the proper implementation by IT versus separate business initiatives.  

**3.  **What are the typical components of enterprise data lakes?**

Hadoop is a massively parallel storage and execution platform.  Hadoop includes a distributed files system (HDFS) that some vendors like MapR and IBM provide their own proprietary files systems.  
![enter image description here](https://lh3.googleusercontent.com/qZGmOopCmnwsJI5NyI1gj9EwqZ58kJepgyB9aCrHXAhG4aDlB2WUrAkmBpOp6mtysXDUaXfJ4DMDQw "Storage System")

Hadoop is a platform and an ecosystem that incorporates many of the most used open source projects including Hive and Spark.  Hive allows for SQL like interface to Hadoop and Spark turns Hadoop to an in-memory execution system.  Hadoop provides for an extremely scalable cost effective system that is modular in form.  The system has a schema-on-read architecture unlike relational databases.  The schema-on-read nature of Hadoop allows for data to be added quickly to the data lake without needing to know the structure of the data to write to disk.  This avoids the high cost of processing the data when it is being collected and written to the store.  

Many of the same issues regarding data quality continue to be components that must be addressed with data lakes.  Data completeness,  data type (string, number..) format, cardinality (unique values) and referential integrity are rules that still need to be considered when designing and implementing data lakes. One added concept to data lakes is lineage.  Lineage accounts for setting priorities based on where the data was derived.  Understanding the source of the data was from a spreadsheet or from a system of record will be key to understanding which data has priority.  Implementing lineage can be difficult as multiple tools could be used to access the same dataset without the data lake understanding the same data is being added. There are some that would argue that one ETL tool could provide a more rigorous approach to centralizing the collection process.  

Granularity and transformation of data are two concepts that a data lake needs to consider to create reliable data sets.  Within granularity, data set level refers to the  [directed graph](https://medium.freecodecamp.org/i-dont-understand-graph-theory-1c96572a1401) representation of relationship between datasets while field level lineage is also represented between fields. The transformational representation needs to be translated to a common representation where the lineage of the data needs to be interpreted in a manner that can be more easily understood despite all changes that have occurred.  Read more about the process whereby the focus on denormalization becomes critical in the context of the data lake and specifically in terms of any associated [Hadoop/HDFS data structures.](http://www.ibmbigdatahub.com/blog/charting-data-lake-model-normalization-patterns-data-lakes)

![enter image description here](https://lh3.googleusercontent.com/9QNxGMJEWXgHYbG4bKLaImavVnlgMUGvINieD--K8NG0WqE8hj_6b7X2RlyGJhEx2mo11kh1zCjS1A "Data Lake Architecture")

Above is an example of a generic data lake architecture from Alex Gorelik's book The Enterprise Big Data Lake.
The raw or landing zone within the data lake context is usually where files are loaded from external systems.  The gold area is where it is transformed data, while the work folder with data is where users projects and data is stored.  The sensitive data area is where the encrypted files are stored.

Given the size of the data lake and lack of a search function, finding relevant data is extremely cumbersome in a data lake without a catalog.  Although Hue, the Hadoop utility, allows for some limited preview of data files additional tools from vendors like [Teradata's Loom](https://www.prnewswire.com/news-releases/teradata-loom-radically-increases-data-lake-productivity-300034309.html)  and Waterline Data Inventory are used to catalog Hadoop data besides relational databases to run outside of Hadoop for the cataloging data. Additional cataloging tools are available from [Cloudera's Navigator product](https://www.cloudera.com/products/product-components/cloudera-navigator.html).  One open source project, [Apache Atlas,](https://atlas.apache.org/) has been created to help solve the meta data and governance framework for Hadoop.

**4.  **How are data lakes being used to increase productivity or share data?**

Besides the technical requirements, some organizations are struggling to implement Hadoop as there is a battle between the silos of the business user and IT for control of the Hadoop cluster.   This is where the democratization of data is one of the first steps to capitalizing on a companies digital assets. Like markets, the potential of data is curtailed when data is not transparent.  Early in my transition to using corporate data, I discovered the only way to perform any meaningful analysis was to ask questions of the available data. I quickly realized that unless I was querying the data myself, the data was either out of date or incomplete. I subsequently took my first database class at the local community college.  New self-service tools such as Tableau and Qlik are allowing power users or subject matter experts to create and transform data to allow business users to more quickly access the data to help answer business questions.

The problem with the traditional business analyst process of the past is the data needed to be found, provisioned, prepped, and then analyzed.  Part of the process included creating [critical data elements](https://en.wikipedia.org/wiki/Data_element_definition) can not rapidly change as according to new user requirements . This is a complete contrast to growing up with Google and Wikipedia.  The pure volume of data makes it impossible to document and tag everything, this is where new tools that leverage machine learning and auto-tracking of data consumption creates catalogs of tribal knowledge.  This is much a kin to the search scoring that powers search engines.   

In order to make consumption of the data easier, many tools are being used to prepare the data to be consumed applications.  This is where the data wrangling aspect of most data mining and data science projects spend the majority of the time. Like Excel, which is impractical for large data lake files, newer tools are being used to clean and shape the data to the right form.  Some of the vendors providing these tools are [Alteryx](https://www.alteryx.com/analytics/pages/trial?utm_source=google&lsm=google&utm_medium=cpc&utm_campaign=Demgen%20Mixed%20-%20Brand_New&utm_content=Trial&utm_term=alteryx&utm_adid=205401968765&gclid=Cj0KCQjw3InYBRCLARIsAG6bfMR9jexiDucFtkZaQlHRP4YskOYXkjHH-otnrB6VsirkqAaMk54KnkAaAhiIEALw_wcB), [Datameer](https://www.datameer.com/), [Paxata](https://www.paxata.com/), and [Trifacta](https://www.trifacta.com/) as well as traditional vendors such as [Informatica](https://www.informatica.com/lp/gartner-leadership.html?gclid=Cj0KCQjw3InYBRCLARIsAG6bfMQ24lWtRi7q5p1kwyp5C7_Q__XreO6DO7y9SjvM1vlb3owsUTFNSvoaAkVrEALw_wcB&formid=3599&programName=17Q2-PPC1-GBL-NA-Gartner-Leader_Promo_Analyst_Reports-PT3323&cps=ppcGS&cext=search_google_17q2_gartner-leadership-report-3323_na_us_en&kw=informatica&s_kwcid=AL!5237!3!268772362957!e!!g!!informatica&ef_id=Wv6nZQAAAJKhihMJ:20180521184449:s#fbid=P0KjhgpvA91) and [Talend](https://www.talend.com/landing-download/ppc/tos-data-integration/?utm_source=google&utm_medium=cpc&utm_campaign=NA%20Search%20-%20Branded%20-%20General&utm_term=talend&utm_content=talend%20-%20exact&utm_creative=244553309005&lang=en&src=GoogleAdwordsOD_US&kid=null&gclid=Cj0KCQjw3InYBRCLARIsAG6bfMSPEx4xvdMWapP06gIY5wY2gJa-zHGYTSdKfLI2dpiJnFc0sx1QWwkaAs28EALw_wcB) provide tools with the idea of providing self-service for the business analyst.

Combining data or joining data sets is where much of the value from data lakes becomes immediately useful.  Unfortunately, common ids are uncommon amongst separate data sets.  This is where the idea of entity resolution becomes instrumental in capturing value from the data.  Master Data Management systems with probabilistic matching engines that have rules for defining matched entities help in joining data sets.  One company providing entity resolution products is [Tamr](https://www.tamr.com/).

**5.  **What are the data governance issues that need to be addressed?**

The centralized nature of a data lake could allow for greater governance versus heterogenous systems that use different technologies.  Stewardship of data lakes is key to creating trusted users that have organizational responsibility for the data.  Some form of provisioning of the data is one of the critical problems of data lakes.  One approach that has been widely adopted is only allowing analysts access to data they need for there specific job function.  An example could be allowing access based on location or some other form of limiting data.  

Data lake users and zones are typically segmented into four zones: a landing zone where data scientists, developers, and data engineers have access; a gold zone where analysts and data scientists have access; a work zone for data scientists and data engineers; and finally a sensitive zone where data stewards and trusted analysts have access.  

One approach to governance is to implement a method for de-identifying sensitive data.  Since the data is written quickly without schema, the ability to tag data on original write is limited for efficiency reasons.  Some profiling tools have been built to scan the data lake and look for sensitive data.  These tools include [DataGuise](https://www.dataguise.com/) and [Waterline Data.](https://www.waterlinedata.com/) Another approach is transparent encryption that is offered by [Cloudera Navigator](https://www.cloudera.com/products/product-components/cloudera-navigator.html)  that encrypts data when it is written and de-crypts the data when read.   




---

## Credits

### Icons + Demo Images:

- [The Noun Project](https://thenounproject.com) -- Garrett Knoll, Arthur Shlain, and [tracy tam](https://thenounproject.com/tracytam)
- [Font Awesome](http://fontawesome.io/)
- [Unsplash](https://unsplash.com/)

### Other:

- [Jekyll](https://jekyllrb.com/)
- [jQuery](https://jquery.com/)
- [Susy](http://susy.oddbird.net/)
- [Breakpoint](http://breakpoint-sass.com/)
- [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/)
- [FitVids.JS](http://fitvidsjs.com/)
- Greedy Navigation - [lukejacksonn](https://codepen.io/lukejacksonn/pen/PwmwWV)
- [jQuery Smooth Scroll](https://github.com/kswedberg/jquery-smooth-scroll)
- [Lunr](http://lunrjs.com)

---

Minimal Mistakes is designed, developed, and maintained by Michael Rose. Just another boring, tattooed, designer from Buffalo New York.
