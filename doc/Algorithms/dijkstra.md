---
title: Dijkstra's Shortest Path Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Dijkstra/
redirect_from: /doc/Algorithms/Dijkstra_1.1/
---

Dijkstra's algorithm computes the shortest paths from a given node called
source to all the other nodes in a graph. It produces a shortest path tree
rooted in the source. *This algorithm works only for nonnegative
lengths.*
Check [Dijkstra's algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) article on the Wikipedia for more details.


## Complexity

O(n log(n) + m) with n the number of nodes and m the number of edges.


## Reference

- E W Dijkstra. A note on two problems in connexion with graphs. Numerische Mathematik, 1:269–271, 1959.


## Length of a path

Traditionally the length of a path is defined as the sum of the lengths of
its edges. This implementation allows to take into account also the "lengths"
of the nodes. This is done by a parameter of type ``Element`` passed in
the constructors.

The lengths of individual elements (edges or/and nodes) are defined using
another constructor parameter called ``lengthAttribute``. If this
parameter is ``null``, the elements are considered to have unit lengths.
In other words, the length of a path is the number of its edges or/and nodes.
If the parameter is not null, the elements are supposed to have a numeric
attribute named ``lengthAttribute`` used to store their lengths.


## Solutions

Internal solution data is stored in attributes of the nodes of the underlying
graph. The name of this attribute is another constructor parameter called
``resultAttribute``. This name must be specified in order to avoid
conflicts with existing attributes, but also to distinguish between solutions
produced by different instances of this class working on the same graph (for
example when computing shortest paths from two different sources. If not
specified, a unique name is chosen automatically based on the hash code of
the Dijkstra instance. The attributes store opaque internal objects and must
not be accessed, modified or deleted. The only way to retrieve the solution
is to use the following solution access methods:

- ``getPathLength(Node)`` returns the length of the shortest path from the source to a given node
- ``getParent(Node)`` and ``getEdgeFromParent(Node)`` are used to get the previous node or edge in the shortest path from the source to a given node
- ``getPathEdges(Node)``, ``getPathEdgesIterator(Node)``, ``getPathNodes(Node)`` and ``getPathNodesIterator(Node)`` are used to iterate over the shortest paths computed by the algorithm
- ``getTreeEdges()``, ``getTreeEdgesIterator()`` and ``getTreeLength()`` are used to access the shortest path tree computed by the algorithm
- ``getAllPathsIterator(Node)`` enumerates all the shortest paths from the source to a given node


## Usage

A typical usage of this class involves the following steps:

- Instantiation using one of the constructors with appropriate parameters
- Initialization of the algorithm using ``init(Graph)``
- Setting the source node using ``setSource(Node)``
- Computation of the shortest paths using ``compute()``
- Retrieving the solution using different solution access methods
- Cleaning up using ``clear()``

Note that if the graph changes after the call of ``compute()`` the
computed solution is no longer valid. In this case the behavior of the
different solution access methods is undefined.


## Complete Example

{% highlight java %}
 import java.util.ArrayList;
 import java.util.Iterator;
 import java.util.List;
 
 import org.graphstream.algorithm.Dijkstra;
 import org.graphstream.graph.Edge;
 import org.graphstream.graph.Graph;
 import org.graphstream.graph.Node;
 import org.graphstream.graph.Path;
 import org.graphstream.graph.implementations.SingleGraph;
 
 public class DijkstraExample {
 //        B---9--E
 //       /|      |
 //      / |      |
 //     /  |      |
 //    14  2      6
 //   /    |      |
 //  /     |      |
 // A---9--C--11--F
 //  \     |     /
 //   \    |    /
 //    7  10   15
 //     \  |  /
 //      \ | /
 //       \|/
 //        D      G
  	public static Graph exampleGraph() {
		Graph g = new SingleGraph("example");
		g.addNode("A").addAttribute("xy", 0, 1);
		g.addNode("B").addAttribute("xy", 1, 2);
		g.addNode("C").addAttribute("xy", 1, 1);
		g.addNode("D").addAttribute("xy", 1, 0);
		g.addNode("E").addAttribute("xy", 2, 2);
		g.addNode("F").addAttribute("xy", 2, 1);
		g.addNode("G").addAttribute("xy", 2, 0);
		g.addEdge("AB", "A", "B").addAttribute("length", 14);
		g.addEdge("AC", "A", "C").addAttribute("length", 9);
		g.addEdge("AD", "A", "D").addAttribute("length", 7);
		g.addEdge("BC", "B", "C").addAttribute("length", 2);
		g.addEdge("CD", "C", "D").addAttribute("length", 10);
		g.addEdge("BE", "B", "E").addAttribute("length", 9);
		g.addEdge("CF", "C", "F").addAttribute("length", 11);
		g.addEdge("DF", "D", "F").addAttribute("length", 15);
		g.addEdge("EF", "E", "F").addAttribute("length", 6);
		for (Node n : g)
			n.addAttribute("label", n.getId());
		for (Edge e : g.getEachEdge())
			e.addAttribute("label", "" + (int) e.getNumber("length"));
		return g;
	}

	public static void main(String[] args) {
		Graph g = exampleGraph();
		g.display(false);

		// Edge lengths are stored in an attribute called "length"
		// The length of a path is the sum of the lengths of its edges
		Dijkstra dijkstra = new Dijkstra(Dijkstra.Element.EDGE, null, "length");

		// Compute the shortest paths in g from A to all nodes
		dijkstra.init(g);
		dijkstra.setSource(g.getNode("A"));
		dijkstra.compute();

		// Print the lengths of all the shortest paths
		for (Node node : g)
			System.out.printf("%s->%s:%10.2f%n", dijkstra.getSource(), node,
					dijkstra.getPathLength(node));

		// Color in blue all the nodes on the shortest path form A to B
		for (Node node : dijkstra.getPathNodes(g.getNode("B")))
			node.addAttribute("ui.style", "fill-color: blue;");

		// Color in red all the edges in the shortest path tree
		for (Edge edge : dijkstra.getTreeEdges())
			edge.addAttribute("ui.style", "fill-color: red;");

		// Print the shortest path from A to B
		System.out.println(dijkstra.getPath(g.getNode("B")));

		// Build a list containing the nodes in the shortest path from A to B
		// Note that nodes are added at the beginning of the list
		// because the iterator traverses them in reverse order, from B to A
		List<Node> list1 = new ArrayList<Node>();
		for (Node node : dijkstra.getPathNodes(g.getNode("B")))
			list1.add(0, node);

		// A shorter but less efficient way to do the same thing
		List<Node> list2 = dijkstra.getPath(g.getNode("B")).getNodePath();

		// cleanup to save memory if solutions are no longer needed
		dijkstra.clear();

		// Now compute the shortest path from A to all the other nodes
		// but taking the number of nodes in the path as its length
		dijkstra = new Dijkstra(Dijkstra.Element.NODE, null, null);
		dijkstra.init(g);
		dijkstra.setSource(g.getNode("A"));
		dijkstra.compute();

		// Print the lengths of the new shortest paths
		for (Node node : g)
			System.out.printf("%s->%s:%10.2f%n", dijkstra.getSource(), node,
					dijkstra.getPathLength(node));

		// Print all the shortest paths between A and F
		Iterator<Path> pathIterator = dijkstra.getAllPathsIterator(g
				.getNode("F"));
		while (pathIterator.hasNext())
			System.out.println(pathIterator.next());

	}
 }
{% endhighlight %}


### Other version of this document

- [GraphStream 1.0](1.0/)

