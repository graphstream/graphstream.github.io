---
title: Why using CSS style sheets ? Why not other configuration methods like a XML file ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/Why-using-CSS-style-sheets/
redirect_from: /doc/FAQ/The-graph-viewer/Why-using-CSS-style-sheets-Why-not-other-configuration-methods-like-a-XML-file_1.0/
---

In specifying graphic style for elements drawn by the graph viewer we felt that a CSS-like syntax was the more appropriate since:

- a lot of people already know CSS well and have a good understanding of its concepts ;

- a rule based syntax was quite appropriate to apply style to general things like "all nodes" and particular things like "the node with identifier 'A'";

- there was already a well documented whole dictionary of styling attributes in CSS that we could re use.

- separating the graph structure from its appearance will be quite useful.

- Using style classes and dynamic size and color we can quickly change the appearance of a node or edge just by changing one attribute.

- It is often more efficient since you do not have to apply style to each element individually. Furthermore at runtime the styles are compiled in a graphically efficient way that allows to apply them and switch them quickly for elements of the graph.

