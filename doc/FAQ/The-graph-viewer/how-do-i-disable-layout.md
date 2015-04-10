---
title: How do I disable the automatic node placement in the graph viewer ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/How-do-I-disable-the-automatic-node-placement/
redirect_from: /doc/FAQ/The-graph-viewer/How-do-I-disable-the-automatic-node-placement-in-the-graph-viewer_1.0/
---

Use Graph.display() with argument false.

{% highlight java %}
Graph graph = new DefaultGraph("MyGraph");
graph.display( false ); 
{% endhighlight %}

In this case you must give the position of nodes by yourself using ``x``, ``y`` and ``z`` attributes (or the ``xy`` or ``xyz`` attributes). If a node or sprite has no position, it **will not be displayed** !

