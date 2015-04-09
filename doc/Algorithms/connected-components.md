---
title: The Connected Components Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Connected-Components/
redirect_from: /doc/Algorithms/Connected-Components_1.0/
---

This algorithm computes connected components for a given graph. Connected
components are the set of its connected subgraphs. Two nodes belong to the
same connected component when there exists a path (without considering the
direction of the edges) between them. Therefore, the algorithm does not
consider the direction of edges. The number of connected components of an
undirected graph is equal to the number of connected components of the same
directed graph.
 

## Complexity

For the initial computation, let n be the number of nodes, then
the complexity is 0(n). For the re-optimization steps, let k be
the number of nodes concerned by the changes (k <= n), the
complexity is O(k).


## A Dynamic Algorithm 

This algorithm tries to handle the dynamics of the graph, trying not to
recompute all from scratch at each change (kind of re-optimization). In this
way, each instance of the algorithm is registered as a graph sink. Each
change in the graph topology may affect the algorithm.


## Usage

To start using the algorithm, you first need an instance of
``org.graphstream.graph.Graph``, then you only have to instantiate the
algorithm class. Whether you specify a reference to the graph in the
constructor or you set it with the ``init(Graph)`` method.

The computation of the algorithm starts only when the graph is specified with
the ``init(Graph)`` method or with the appropriated constructor. In case
of a static graph, you may call the ``compute()`` method. In case of a
dynamic graph, the algorithm will compute itself automatically when an event
(node or edge added or removed) occurs.

 
Finally you may ask the algorithm for the number of connected components at
any moment with a call to the ``getConnectedComponentsCount()`` method.


## Example

Here is a basic example showing the adaptive behavior of the algorithm:

{% highlight java %}
import org.graphstream.algorithm.ConnectedComponents;
import org.graphstream.graph.Graph;
import org.graphstream.graph.implementations.DefaultGraph;

public class CCTest {
	public static void main(String[] args) {

		Graph graph = new DefaultGraph("CC Test");

		graph.addNode("A");
		graph.addNode("B");
		graph.addNode("C");
		graph.addEdge("AB", "A", "B");
		graph.addEdge("AC", "A", "C");

		ConnectedComponents cc = new ConnectedComponents();
		cc.init(graph);

		System.out.printf("%d connected component(s) in this graph, so far.%n",
				cc.getConnectedComponentsCount());

		graph.removeEdge("AC");

		System.out.printf("Eventually, there are %d.%n", 
				cc.getConnectedComponentsCount());

	}
}
{% endhighlight %}
 

This example should give you the following output:

	1 connected component(s) in this graph, so far.
	Eventually, there are 2.


## Some Features 

### Threshold and Ceiling

It is possible to get rid of connected components belong a size threshold
when counting the overall number of connected components. It is also possible
to define a ceiling size for the connected component. Above that size
ceiling, connected components will not be counted. Use the
``getConnectedComponentsCount(int)`` or
``getConnectedComponentsCount(int, int)`` methods.


### Components identifiers

You can tag each node with an integer that identifies the component it
pertains to using ``setCountAttribute(String)``. The argument of this
method is an arbitrary name that will be used as attribute on each node of
the graph. The value of this attribute will be an integer (counting from
zero) that is different for each connected component.

 
### Giant component

The ``getGiantComponent()`` method gives you a list of nodes belonging
to the biggest connected component of the graph.


### Cut Attribute

The cut attribute is a feature that can optionally simulate a given edge to
be invisible (as if the edge did not exist). In other words if an edge is
given such a cut attribute, it will be ignored by the algorithm when
counting. You can enable (or disable by passing null) the cut attribute by
specifying it with the ``setCutAttribute(String)`` method, and by giving
the special edges the same attribute.

What is it useful for? Well you may want to simulate the removal of a given
edge and see if it increases the number of connected components. You may not
want to really remove and then re-add that edge in the graph, because such
removal event may have consequences on other algorithms, viewer, writers...


Note that setting the cut attribute will trigger a new computation of the
algorithm.

