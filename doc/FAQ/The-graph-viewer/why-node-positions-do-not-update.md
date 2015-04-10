---
title: Why node positions do not update when I move them in a viewer ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/Why-node-positions-do-not-update/
redirect_from: /doc/FAQ/The-graph-viewer/Why-node-positions-do-not-update-when-I-move-them-in-a-viewer/
---

Usually the viewer does not run in the same thread as the remaining of the application. That is why it does not use the original graph. Instead it works on a simplified copy of it stored in an object of type ``GraphicGraph``. The graphic graph receives all the events coming from the original graph and updates accordingly. To do this it uses a proxy pipe that allows to pass thread barrier.

When the user drags a node, its "xyz" attribute changes in the graphic graph. If we want to have this attribute back in the original graph, we have to use another proxy pipe from the graphic graph to the original graph.

{% highlight java %}
Viewer viewer = graph.display();
// Create a pipe coming from the viewer ...
ProxyPipe pipe = viewer.newViewerPipe();
// ... and connect it to the graph
pipe.addAttributeSink(graph);
{% endhighlight %}

This proxy pipe acts as a mailbox. It just stores the events received from the viewer. To update the original graph, we have to explicitly consume them:

{% highlight java %}
while (true) {
	// a small delay, avoids full CPU load
	Thread.sleep(100);
	// consume the events stored in the buffer, if any
	pipe.pump();

	// in the development version the previous two instructions can be replaced by
	// pipe.blockingPump();

	// now "xyz" attributes of the nodes are updated and we can use them, for example
	double[] xyz = Toolkit.nodePosition(graph, "A");
...
}
{% endhighlight %}

