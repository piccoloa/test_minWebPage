var store = [{
        "title": "Exploring Big Data",
        "excerpt":"The topics traversed here are a combination of academic areas explored while studying at Rutgers as well as areas I found of interest since drinking the big data kool-aid. If you find areas for improving this content or are looking for more detailed understanding of the subject areas send me...","categories": [],
        "tags": [],
        "url": "http://0.0.0.0:4000/BigData/",
        "teaser":"http://0.0.0.0:4000/assets/images/500x300.ppg"},{
        "title": "Data Lakes: Overview",
        "excerpt":"Oxford Botanic Garden Pond Part 1 Notes From Concept to Implementation This is the first blog under the topic Data Lakes and will be followed by additional topics pertaining to data lakes. Each post will start with the title Data Lakes followed by a [:new topic]. Each topic will go...","categories": [],
        "tags": [],
        "url": "http://0.0.0.0:4000/datalakes/",
        "teaser":"http://0.0.0.0:4000/assets/images/500x300.ppg"},{
        "title": "Entity Resolution: Overview",
        "excerpt":"What is Entity Resolution? Entity Resolution is the task of disambiguating manifestations of real world entities in various records or mentions by linking and grouping.1 Effectively reducing something to its most basic conical form. Linking entities to form relationships and draw conclusions from data is becoming increasingly relevant as data...","categories": ["Exploring Big Data"],
        "tags": [],
        "url": "http://0.0.0.0:4000/entityresolution_over/",
        "teaser":"http://0.0.0.0:4000/assets/images/500x300.ppg"},{
        "title": "Identity Resolution",
        "excerpt":"Exploring different models to eliminate redundant and erroneous text records from different sources to manage personally identifiable information(PII) Overview Identify and link the Same Person Complying with privacy and information security laws is increasingly becoming more challenging for individuals and organizations. Events such as the 2017 Equifax data breach of...","categories": ["Exploring Big Data"],
        "tags": [],
        "url": "http://0.0.0.0:4000/entityresolution/",
        "teaser":"http://0.0.0.0:4000/assets/images/500x300.ppg"},{
        "title": "Mathematica highlighting...",
        "excerpt":"Testing out: prettify.js Clear[getAuthorsForPaper];stringCleanupRules = {\"ü\" -&gt; \"u\", \"Henry Tye\" -&gt; \"Tye, Henry\"};getAuthorsForPaper[recid_] := Module[ {header = \"http://inspirehep.net/search?ln=en&amp;ln=en&amp;p=refersto%3Arecid%3A\" &lt;&gt; ToString[recid] &lt;&gt; \"&amp;of=xe&amp;action_search=Search&amp;sf=&amp;so=d&amp;rm=&amp;rg=250\", firstBatch, cnt = 0, numRecs, data, allAuthors, countAuthors, t}, t = AbsoluteTiming[ data = {Import[header &lt;&gt; \"&amp;sc=0\", \"XML\"]};][[1]]; numRecs = StringSplit[data[[1, 1, -1, -1]], \" \"][[-1]] // ToExpression;...","categories": ["notes"],
        "tags": ["mathematica"],
        "url": "http://0.0.0.0:4000/notes/2017_Mathematica_Prettifier/",
        "teaser":"http://0.0.0.0:4000/fl360.gif"},{
        "title": "1st post...",
        "excerpt":"This is my first post which is being hosted on GitHub Pages using Jekyll. I hope that these posts continue to improve and offer an opportunity to share what I have learned and communicate more effectively. This post is just me practicing how to use Jekyll and some links for...","categories": ["notes"],
        "tags": ["jekyll"],
        "url": "http://0.0.0.0:4000/notes/welcome-to-jekyll/",
        "teaser":"http://0.0.0.0:4000/assets/images/unsplash-gallery-image-3-th.jpg"},{
        "title": "The Death of Expertise",
        "excerpt":"Originally on LinkedIn The Death of Expertise.The pendulum has swung too far away from experts… “University of Google doesn’t count. Remember: having a strong opinion about something isn’t the same as knowing something…” “otherwise intelligent people have been second-guessing their doctors and refusing to vaccinate their kids after reading stuff...","categories": ["notes"],
        "tags": ["thefederalist"],
        "url": "http://0.0.0.0:4000/notes/LinkedIn-Story/",
        "teaser":"http://0.0.0.0:4000/assets/images/unsplash-gallery-image-3-th.jpg"},{
        "title": "Data Lakes: Overview",
        "excerpt":"","categories": ["big data","datalakes"],
        "tags": [],
        "url": "http://0.0.0.0:4000/datalakes/",
        "teaser":"http://0.0.0.0:4000/assets/images/unsplash-gallery-image-3-th.jpg"},{
        "title": "Shared Article: \"Special operations surgical team\"",
        "excerpt":"Meet the Air Force’s “life-saving” special operations surgical team. **“There’s something to be said about being somewhere horrible and smoking a cigar with a good friend and then possibly being that familiar face that they look up to you in the scariest moment of their life. And that – that’s...","categories": [],
        "tags": [],
        "url": "http://0.0.0.0:4000/Airforce_cbs/",
        "teaser":"http://0.0.0.0:4000/assets/images/500x300.ppg"},{
        "title": "Shared Article: \"We don’t use a corporate jet anymore\"",
        "excerpt":"For sale! Cree’s corporate jet — under CEO’s order ","categories": [],
        "tags": [],
        "url": "http://0.0.0.0:4000/Cree1/",
        "teaser":"http://0.0.0.0:4000/assets/images/500x300.ppg"},{
        "title": "Shared Article: What Google and Facebook Know About You",
        "excerpt":"How to do a data detox, in a zillion easy steps ","categories": ["notes"],
        "tags": ["jekyll"],
        "url": "http://0.0.0.0:4000/notes/PersonalData1/",
        "teaser":"http://0.0.0.0:4000/assets/images/unsplash-gallery-image-3-th.jpg"},]
