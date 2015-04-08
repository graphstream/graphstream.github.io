---
title: Using remote source
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/Using-remote-source/
redirect_from: /doc/Tutorials/Using-remote-source_1.0/
---

This tutorial explains how to create a stream between a source of a machine A and a sink of a machine B.
This can be done easily in GraphStream, using the [Java RMI](http://en.wikipedia.org/wiki/Java_remote_method_invocation) technology.


## Structure

Package ``org.graphstream.stream.rmi`` contains all objects needed:

* ``RMISink``, on which the source of the machine A will be connected,
* ``RMISource``, on which the sink of the machine B will be connected.


<table style="font-family: monospace; text-align: center; border: solid 1px #ddd; padding: 10px;">
	<tr>
		<td>machine A</td><td>network</td><td>machine B</td>
	</tr>
	<tr>
		<td>Source&nbsp;<i class="fa fa-arrow-circle-right"></i>&nbsp;RMISink</td>
		<td><i class="fa fa-arrow-circle-right"></i></td>
		<td>RMISource&nbsp;<i class="fa fa-arrow-circle-right"></i>&nbsp;Sink</td>
	</tr>
</table>


``RMISink`` and ``RMISource`` are remote objects. Methods of ``Sink`` are described in ``RMISource`` as remote methods which are called by ``RMISink``. ``RMISink`` just contains two remote methods allowing to register or unregister a ``RMISource``. Both being a remote object, they need to be bound with a unique identifier.

The fact that ``RMISource`` contains ``Sink`` methods can be a bit disturbing. This is because even if a ``RMISource`` on a machine B is a source for sinks on the machine B, this ``RMISource`` is a sink for the ``RMISink`` on the machine A.

The registration of a ``RMISource`` on a machine B by a ``RMISink`` on a machine A can be done from machine A or machine B by calling the ``register(url)`` method of ``RMISink`` where ``url`` is the rmi url of the ``RMISource``, for example "``//machine_b/rmi_source``".


## Full example

In this example, a generator on a machine called "``machine_a``" is connected to a graph on a machine called "``machine_b``".

First, RMI registry should have been started on both machines. This can be done by the following code:

{% highlight java %}
try {
	java.rmi.registry.LocateRegistry.createRegistry(1099);
} catch (Exception e) {
	// Already started
}
{% endhighlight %}

Code executed on ``machine_b`` should look as the following:

{% highlight java %}
RMISource source = new RMISource("source_test");
DefaultGraph graph = new DefaultGraph("g");

source.addSink(graph);
graph.display();
{% endhighlight %}

By calling the constructor of ``RMISource`` with a string identifier, we automatically bind the source of the local machine to this identifier.

Code executed on ``machine_a`` should look as the following:

{% highlight java %}
RMISink sink = new RMISink("sink_test");
sink.register("//machine_b/source_test");

Generator gen = new XXXGenerator();
gen.addSink(sink);

gen.begin();

while (...) {
	gen.nextEvents();
	Thread.sleep(250);
}

gen.end();
{% endhighlight %}

