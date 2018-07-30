---
permalink: /entityresolution/
title: Identity Resolution
excerpt: 'Exploring different models to eliminate redundant and erroneous text records from different sources to manage personally identifiable information(PII)'
category: Exploring Big Data
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
#### __Exploring different models to eliminate redundant and erroneous text records from different sources to manage personally identifiable information(PII)__
---
### **Overview Identify and link the Same Person**
Complying with privacy and information security laws is increasingly becoming more challenging for individuals and organizations.  Events such as the 2017 Equifax data breach of 143 million individual identities is becoming a more common occurrence.  Even more concerning, in 2017, Yahoo revised its 2013 500 million Yahoo user identity breach to 3 billion identities being stolen.  The scale of these security breaches impact on an organization's perceived business value and the direct negative financial implications from lax regulatory adherence should not be underestimated.[^fn1] According to [wikipedia](https://en.wikipedia.org/wiki/Personally_identifiable_information), “personally identifiable information(PII) or sensitive personal information as used in information security and privacy laws...has four common variants based on personal | personally, and identifiable | identifying”  information.  Protecting personal information is governed according to privacy principles in most OECD countries.  In Europe, data protection laws are mainly focused on General Data Protection Regulation(GDPR).
Depending on jurisdiction and differing regulatory pressures, an organizations abilities to comply with protecting PII starts with managing data assets effectively and promoting a culture that values privacy and digital policies.  One of the most challenging aspects of complying with regulatory or managing reputational risks associated with keeping PII information secure is an organization's ability to maintain information governance standards that effectively manages personal identifiable information.[^fn2] One such approach to managing PII data more effectively is for organizations to identify and link persons across all its data assets into one consolidated entity resolution index.  Basic information governance will result from combining datasets and performing large aggregate analyses using powerful new ways to improve service across large populations. Critically important in this task is the deduplication of identities across multiple data sets that were rarely designed to work together. Inconsistent data entry, typographical errors, and real world identity changes pose significant challenges to this process.

Besides adhering to PII standards, the ability to correlate personal identities from disparate data sources allows approximate joins to occur giving increased value to the joined datasets.  One could consider the Department of Homeland Security attempt at joining passenger data with homeland security no-fly lists and the and other potential terrorism security measures an extreme in linking related personal identities.    

---
### **Description of Concepts Learned**

“Entity resolution is to distinguish the representations referring to the same real world object entity in one or more databases and recognize all different real-world entities in the databases.”[^fn3] According to Wang there are two main types of classifications of entity resolution based on pairwise entity resolution and group-wise entity resolution.  As an example, for entity resolution on name set `{o1=“Wei Wang”, o2=“W Wei”, o3=“Wang Wei”, o4=“Jian Pei”}` the result of pair-wise entity resolution is `{(o1, o2), (o1, o3), (o2, o3)}` The  pairwise resolution refers to a pair of data objects referring to the same real-world entity while the group-wire resolution refers to a family clusters with each data object referring to the same real-world entity.   The challenges of entity resolution relate to the size of data, the frequency of data updates, the structure of the data, and the accuracy of entity resolution.  For the scope of this project, the data quality management aspect of resolving the same entity in different databases will be explored.  The main concept to be learned will be to find duplicate tuples as they relate to a firm’s individual contact information.  The ability to clean dirty data by detecting the objects referring to the same real world entity will result in a consolidated entity based management approach. Creating a single source for entity management will allow more effective maintenance and deletion of such entities from the systems containing personally identifiable information.

While Wang's approach to entity resolution is more a kin to using similarity computations, Mikhail Bilenko's approach describes "Learnable Similarity Functions"[^fn4] as the best means to reducing entities to there most basic form.

Entity resolution on names and context-based entity resolution will be explored. Time permitting, further research in regard to the ER problem as widely used in many domains such as natural language processing (NLP), machine learning and databases will be explored. In short, the models explored will explore the most accurate methods for merging customer lists using personal identity variables to avoid redundancy and allow for a master list for more efficient management of personal identities.

---
**References**


[^fn1]:Armerding, Taylor. "The 16 Biggest Data Breaches of the 21st Century." CSO Online. CSO, 11 Oct. 2017. Web. 21 Jan. 2018.
[^fn2]:"Personally Identifiable Information." Wikipedia. Wikimedia Foundation, 19 Jan. 2018. Web. 21 Jan. 2018.
[^fn3]:Wang, Hongzhi. "Overview of Entity Resolution." Innovative Techniques and Applications of Entity Resolution. Hershey, PA: Information Science Reference/IGI Global, 2014. N. pag. Print.
[^fn4]:Bilenko, Mikhail. “Learnable Similarity Functions and Their Applications to Clustering and Record Linkage.” Proceedings of the Ninth AAAI/SIGART Doctoral Consortium, pp. 981-982, San Jose, CA, July 2004
