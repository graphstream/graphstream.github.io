---
title: Why CSS property X does not work ? Why multiple edges between two nodes show as a single edge ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/Why-CSS-property-X-does-not-work/
redirect_from: /doc/FAQ/The-graph-viewer/Why-CSS-property-X-does-not-work-Why-multiple-edges-between-two-nodes-show-as-a-single-edge/
---
Some UI may not implement all the features, especially ``gs-ui-android``.
But if you are completely unable to see the graph, don't forget to add the property of your viewer:
	
{% highlight java %}
System.setProperty("org.graphstream.ui", "swing"); // For Swing

System.setProperty("org.graphstream.ui", "javafx"); // For Javafx	
{% endhighlight %}

See also [Graph visualisation](/doc/Tutorials/Graph-Visualisation/).

