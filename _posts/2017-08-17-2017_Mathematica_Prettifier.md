---
title: Mathematica highlighting...
excerpt: Testing out a new syntax highlighter..
header:
   teaser: fl360.gif
   overlay_color: "#5e616c"
   overlay_image: fl360.gif
   overlay_filter: .4
categories:
- notes
tags:
- mathematica
author: Alex_Piccolo
output:
    html_document:
            css: prettify.css
pinned: false
---

Testing out: [prettify.js](https://github.com/halirutan/Mathematica-Source-Highlighting)

<pre class="prettyprint">
Clear[getAuthorsForPaper];
stringCleanupRules = {"ü" -> "u", "Henry Tye" -> "Tye, Henry"};
getAuthorsForPaper[recid_] :=
    Module[ {header =
       "http://inspirehep.net/search?ln=en&ln=en&p=refersto%3Arecid%3A" <>
         ToString[recid] <>
        "&of=xe&action_search=Search&sf=&so=d&rm=&rg=250", firstBatch,
      cnt = 0, numRecs, data, allAuthors, countAuthors, t},
        t = AbsoluteTiming[
           data = {Import[header <> "&sc=0", "XML"]};][[1]];
        numRecs =
         StringSplit[data[[1, 1, -1, -1]], " "][[-1]] // ToExpression;
        StylePrint[
         "Looks like " <> ToString[numRecs] <> " cites. You've got a " <>
          ToString[Round[(numRecs - 250)*t/250/6]/10.] <>
          " minute wait to finish downloading."];
        While[numRecs > (cnt += 250),
         data = Append[data,
            Import[header <> "&jrec=" <> ToString[cnt + 1], "XML"]];];
        allAuthors = (StringSplit[#,
                 ","][[1]] & /@ (Reap[# /.
                   XMLElement["author", a___] :>
                    Sow[StringReplace[#, stringCleanupRules] & /@ {a}]] //
           Last // Flatten)) & /@ data // Flatten;
        countAuthors = (allAuthors // Tally);
        Map[Style[#[[1]], {FontSize ->
             14 + #[[2]] - Mean[countAuthors[[All, 2]]],
            ColorData["CMYKColors"][#[[2]]/Max[countAuthors[[All, 2]]]],
            Bold}] &, countAuthors // Sort]
    ]
</pre>

compare with Gist include and default rendering:
<script src="https://gist.github.com/drjjmc/fe09d3fd267c5d2a6112af0377da223f.js"></script>
