---
title: Base for spanning tree algorithms
layout: documentation
docpath: Algorithms|/doc/Algorithms/,Spanning-tree|/doc/Algorithms/Spanning-tree/
permalink: /doc/Algorithms/Spanning-tree/Base-for-spanning-tree-algorithm/
redirect_from: /doc/Algorithms/Base-for-spanning-tree-algorithm_1.0/
---

The result is stored in an edge attribute which name is defined by
``flagAttribute`` and value is ``flagOn`` if the edge is in the
tree or `flagOff` if not.


## Creating a spanning tree algorithm

Spanning tree algorithms have to extend this class and to implements the
``makeTree()`` method. ``edgeOn(Edge)`` and ``edgeOff(Edge)``
methods have to be used to properly tag edge.

A call to compute reset the values of edges attribute. Then a call to
``makeTree()`` is done.


## Highlight the spanning tree in viewer

Using the CSS, it is possible to highlight the spanning tree result using
classes. Considering two css edge classes have been defined in the CSS, for
example:

{% highlight css %}
edge .in {
	size: 3px;
	fill-color: black;
}

edge .notin {
	size: 2px;
	fill-color: gray;
}
{% endhighlight %}

You can tell the algorithm to set up the value of the "ui.class" attribute of
edges to "in" when the edge is in the tree or "notin" when edge is not in the
tree.

This can be done by setting the ``flagAttribute`` of the algorithm using
the setter ``setFlagAttribute(String)`` and the flag values
``flagOn`` and ``flagOff`` with ``setFlagOn(Object)`` and
``setFlagOff(Object)`` setters.

{% highlight java %}
 Graph graph = ...;
 AbstractSpanningTree sp = ...;
 
 ...
 
 sp.setFlagAttribute("ui.class");
 sp.setFlagOn("in");
 sp.setFlagOff("notin");
 
 sp.init(graph);
 sp.compute();
 
 graph.display();
 
 ..
{% endhighlight %}

