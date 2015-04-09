---
title: Dijkstra's Shortest Path Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Dijkstra/1.0/
redirect_from: /doc/Algorithms/Dijkstra_1.0/
latest: /doc/Algorithms/Dijkstra/
---

Dijkstra's algorithm is a greedy algorithm that solves the single-source
shortest path problem for a directed graph with non negative edge weights.
Check [Dijkstra's algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) article on the Wikipedia for more details.

This length can be the absolute length of the path (a path with 3 edges has
a length of 3), it can also be computed considering other constraints
situated on the edges or on the nodes.

Note that Dijkstra's algorithm only computes with non-negative values.


## Complexity

O(n log(n) + m) with n the number of nodes and m the number of edges.

## Reference

- E W Dijkstra. A note on two problems in connexion with graphs. Numerische Mathematik, 1:269–271, 1959.


## Usage

The classical usage of this class takes place in 4 steps. 

(i) Definition of a Dijkstra instance with parameters needed for the initialization.
(ii) Initialization of the algorithm with a graph through the ``init(Graph)`` method from the ``Algorithm`` interface.
(iii) Computation of the shortest path tree with the ``compute()`` method from the ``Algorithm`` interface.
(iv) Retrieving of shortest paths for given destinations with the ``getShortestPath(Node)`` method for instance.


The creation of the Dijkstra instance is done with the ``Dijkstra(Element, String, String)`` constructor by giving 3 parameters:

- First, the type of element that is consider for the computing of shortest paths (``Dijkstra.Element.edge`` or ``Dijkstra.Element.node``).
- Second, the key string of the attribute used for the weight computation.
- The third parameter is the id of the source node the shortest tree will be constructed for.


## Example

{% highlight java %}
 import java.io.ByteArrayInputStream;
 import java.io.IOException;
 
 import org.graphstream.algorithm.Dijkstra;
 import org.graphstream.algorithm.Dijkstra.Element;
 import org.graphstream.graph.Graph;
 import org.graphstream.graph.implementations.DefaultGraph;
 import org.graphstream.stream.file.FileSourceDGS;
 
 /**
  * 
  *     B-(1)-C
  *    /       \
  *  (1)       (10)
  *  /           \
  * A             F
  *  \           /
  *  (1)       (1)
  *    \       /
  *     D-(1)-E
  */
 
 public class DijkstraTest {
 	static String my_graph = 
 		"DGS004\n" 
 		+ "my 0 0\n" 
 		+ "an A \n" 
 		+ "an B \n"
 		+ "an C \n"
 		+ "an D \n"
 		+ "an E \n"
 		+ "an F \n"
 		+ "ae AB A B weight:1 \n"
 		+ "ae AD A D weight:1 \n"
 		+ "ae BC B C weight:1 \n"
 		+ "ae CF C F weight:10 \n"
 		+ "ae DE D E weight:1 \n"
 		+ "ae EF E F weight:1 \n"
 		;
 
 	public static void main(String[] args) throws IOException {
 		Graph graph = new DefaultGraph("Dijkstra Test");
 		ByteArrayInputStream bs = new ByteArrayInputStream(my_graph.getBytes());
 		
 		FileSourceDGS source = new FileSourceDGS();
 		source.addSink(graph);
 		source.readAll(bs);
 		
 		Dijkstra dijkstra = new Dijkstra(Element.edge, "weight", "A");
 		dijkstra.init(graph);
 		dijkstra.compute();
 		
 		System.out.println(dijkstra.getShortestPath(graph.getNode("F")));
 		}
 }
{% endhighlight %}

The output of this test program should give:

	[F, E, D, A]


## Some Features

### Shortest Path Value

If you only need to know the value of a shortest path and are not interested in the path itself, then the ``getShortestPathValue(Node)`` method with its given target element is for you.


### ShortestPath Length

If you are interested in the length of a path in terms of elements nodes or edges rather than in the path itself or its value, then you can use ``getShortestPathLength(Node)``. 


### Static Access

The ``getShortestPath(String, Node, Node)`` is a static method to get shortest paths from a graph already computed with Dijkstra.

This means tha given nodes (source and target) should belong to a
graph that contains attributes with the given ``identifier`` as
a key.

It allows to get rid of Dijkstra instances once computed. Since all
the useful information to retrieve a shortest path is stored in the
graph, a Dijkstra instance is not necessary. You will use this method if
you are computing a lot of instances of Dijkstra in a raw and want to
lower the memory consumption.


The 3 following parameters are necessary to this method:

- ``identifier``: a unique string used to identify attributes that represent the solution of a Dijkstra computation (a shortest tree rooted in the source node/edge).
- ``source``: the source node for what a Dijkstra object as already been initialized.
- ``target``: the Target node to be sought in the graph according the given identifier.


### All Shortest Paths

It is possible that multiple path in a graph are the shortest ones. Especially if the graph is a grid and the weight is unitary.  The ``getAllShortestPaths(Node)`` tries to construct all the possible shortest paths linking the computed source to the given destination.


### All Edges involved

The ``getEdgeSetShortestPaths(Node)`` methods returns the set of edges that are involved in the shortest paths. If Several paths are the shortest paths and some edges belong to several of these paths, then those edge will appear only once. In other words, the return List is a set according to the mathematical definition of a set (no repetition, no order).

