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
Complying with privacy and information security laws is increasingly becoming more challenging for individuals and organizations.  Events such as the 2017 Equifax data breach of 143 million individual identities is becoming a more common occurrence.  Even more concerning, in 2017, Yahoo revised its 2013 500 million Yahoo user identity breach to 3 billion identities being stolen.  The scale of these security breaches impact on an organization's perceived business value and the direct negative financial implications from lax regulatory adherence should not be underestimated.[^fn1] Although the United States has not implemented regulation as protective of  its citizen's privacy as the European Union, the federal government's [General Services Administration](https://www.gsa.gov/reference/gsa-privacy-program/rules-and-policies-protecting-pii-privacy-act) has a Privacy Act that defines personally identifiable information as:

> “... information that can be used to distinguish or trace an individual’s identity, either alone or when combined with other personal or identifying information that is linked or linkable to a specific individual. The definition of PII is not anchored to any single category of information or technology. Rather, it requires a case-by-case assessment of the specific risk that an individual can be identified. In performing this assessment, it is important for an agency to recognize that non-PII can become PII whenever additional information is made publicly available — in any medium and from any source — that, when combined with other available information, could be used to identify an individual"[^fn1]

In Europe and those US businesses that conduct business with EU citizens are mandated to data protection laws mainly focused on General Data Protection Regulation(GDPR).   In short this regulation allows citizen's of the EU to mandate that any PII data be removed from an organizations data assets.  A so called "Right to be forgotten". Depending on jurisdiction and differing regulatory pressures, an organizations abilities to comply with protecting PII starts with managing data assets effectively and promoting a culture that values privacy and digital policies.  

One of the most challenging aspects of complying with regulatory and/or managing an organizations reputation risk can be directly tied to keeping PII information secure and maintaining information governance standards that effectively manages personal identifiable information.[^fn2] One such approach to managing PII data more effectively is for organizations to identify and link persons across all its data assets into one consolidated entity resolution index.  

Basic information governance will result from combining datasets and performing large aggregate analyses using powerful new ways to improve service across large populations. Critically important in this task is the deduplication of identities across multiple datasets that were rarely designed to work together. Inconsistent data entry, typographical errors, and real world identity changes pose significant challenges to this process.

Besides adhering to PII standards, the ability to correlate personal identities from disparate data sources allows approximate joins to occur giving increased value to the joined datasets.  One could consider the Department of Homeland Security attempt at joining passenger data with homeland security no-fly lists and other potential terrorism security measures an extreme in linking related personal identities.    

---
### **Description of Concepts Learned**

“Entity resolution is to distinguish the representations referring to the same real world object entity in one or more databases and recognize all different real-world entities in the databases.”[^fn3] According to Wang there are two main types of classifications of entity resolution based on pairwise entity resolution and group-wise entity resolution.  As an example, for entity resolution on a name set `{o1=“Wei Wang”, o2=“W Wei”, o3=“Wang Wei”, o4=“Jian Pei”}` the result of pair-wise entity resolution is `{(o1, o2), (o1, o3), (o2, o3)}` The  pairwise resolution refers to a pair of data objects referring to the same real-world entity while the group-wise resolution refers to a family clusters with each data object referring to the same real-world entity. While Wang's approach is very useful to more typical record linkage and deduplication efforts needed for cleaning more structured databases, many of today's data  projects incorporate data from more diverse sources.  For instance, many projects require linking data from sources that were not originally created with the intention of joining or sharing with other less structured datasets. During my literature search, it was revealed to me that machine learning and supervised learning is one potential solution to entity resolution.  The main concepts to be learned are based on [Bilenko's assertion](https://repositories.lib.utexas.edu/handle/2152/2681) that:

  >"algorithms for these tasks rely on pre-defined similarity measures, such as edit distance or cosine similarity for strings, or Euclidean distance for vector-space data. However, standard distance functions are frequently suboptimal as they do not capture the appropriate notion of similarity for a particular domain, dataset, or application."[^fn4]

While the main focus this paper is to explore the machine learning concepts outlined in Bilenko's paper and test implementation of entity resolution using the open source [dedupe.io python library](https://docs.dedupe.io/en/latest/) on two datasets (childhood education and salesforce.com)  the challenges of implementing entity resolution are explored as they relate to the type of source files, the size of data and how to implement a single source of truth within an organization using a PostGres database.   For the purpose of replicating the experiments in this project, a [Docker container platform](https://www.docker.com/) was implemented and GitHub repository can be cloned to follow the results of each dataset.



For the scope of this project, the data quality management aspect of resolving the same entity in different databases will be explored.  The main concept to be learned will be to find duplicate tuples as they relate to a firm’s individual contact information.  The ability to clean dirty data by detecting the objects referring to the same real world entity will result in a consolidated entity based management approach. Creating a single source for entity management will allow more effective maintenance and deletion of such entities from the systems containing personally identifiable information.

While Wang's approach to entity resolution is more a kin to using similarity computations, Mikhail Bilenko's approach describes "Learnable Similarity Functions"[^fn4] as the best means to reducing entities to there most basic form.

Three main concepts of learnable similarity functions will be explored:

 1. Blocking
 2. Predicate blocks
 3. Affine Gap

Blocking, is critical in making record linkage and clustering algorithms scalable to large datasets, as it facilitates efficient selection of approximately similar instance pairs without explicitly considering all possible pairs. learning blocking functions automatically from linkage and semi-supervised clustering supervision, which allows automatic construction of blocking methods that are efficient and accurate.
This approach yields computationally cheap learnable similarity functions that can be used for scaling up in a variety of tasks that rely on pairwise distance computations, including record linkage and clustering.

**References**


[^fn1]:Armerding, Taylor. "The 16 Biggest Data Breaches of the 21st Century." CSO Online. CSO, 11 Oct. 2017. Web. 21 Jan. 2018.
[^fn2]:"# Rules and Policies - Protecting PII - Privacy Act." https://www.gsa.gov/reference/gsa-privacy-program/rules-and-policies-protecting-pii-privacy-act. August 2018
[^fn3]:Wang, Hongzhi. "Overview of Entity Resolution." Innovative Techniques and Applications of Entity Resolution. Hershey, PA: Information Science Reference/IGI Global, 2014. N. pag. Print.
[^fn4]:Bilenko, Mikhail. “Learnable Similarity Functions and Their Applications to Clustering and Record Linkage.” Proceedings of the Ninth AAAI/SIGART Doctoral Consortium, pp. 981-982, San Jose, CA, July 2004
