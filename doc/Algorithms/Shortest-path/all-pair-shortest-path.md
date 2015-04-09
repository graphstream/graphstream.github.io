---
title: The All Pair Shortest Path (APSP) Algorithm
layout: documentation
docpath: "Algorithms|/doc/Algorithms/,Shortest path|/doc/Algorithms/Shortest-path/"
permalink: /doc/Algorithms/Shortest-path/All-Pair-Shortest-Path/
redirect_from: /doc/Algorithms/All-Pair-Shortest-Path_1.0/
---

This class implements the Floyd-Warshall all pair shortest path algorithm where the shortest path from any node to any destination in a given weighted graph (with positive or negative edge weights) is performed. 


The computational complexity is O(n^3), this may seems a very large, however this algorithm may perform better than running several
Dijkstra on all node pairs of the graph (that would be of complexity O(n^2 log(n)))  when the graph becomes dense.

Note that all the possible paths are not explicitly computed and stored. Instead, the weight is computed and a data structure similar to network routing tables is created directly on the graph. This allows a linear reconstruction of the wanted paths, on demand, minimizing the memory consumption.

 
For each node of the graph, a ``org.graphstream.algorithm.APSP.APSPInfo`` attribute is stored. The name of this attribute is``org.graphstream.algorithm.APSP.APSPInfo#ATTRIBUTE_NAME``.


## Complexity

The complexity of the all method is O(n^3) in computation time with n the number of nodes.


## Reference

- Floyd, Robert W. "Algorithm 97: Shortest Path". Communications of the ACM 5 (6): 345. doi:10.1145/367766.368168. 1962.
- Warshall, Stephen. "A theorem on Boolean matrices". Journal of the ACM 9 (1): 11–12. doi:10.1145/321105.321107. 1962.


## Usage

The implementation of this algorithm is made with two main classes that reflect the two main steps of the algorithm that are:

1. compute pairwise weights for all nodes;
2. retrieve actual paths from some given sources to  some given destinations.


For the first step (the real shortest path computation) you need to create an APSP object with 3 parameters:

- a reference to the graph to be computed;
- a string that indicates the name of the attribute to consider for the weighting;
- a boolean that indicates whether the computation considers edges direction or not. 

Those 3 parameters can be set in a ran in the constructor ``APSP(Graph,String,boolean)`` or by using separated setters (see example below). 

Then the actual computation takes place by calling the ``compute()`` method which is implemented from the ``Algorithm`` interface. This method actually does the computation. 


Secondly, when the weights are computed, one can retrieve paths with the help of another class: ``APSPInfo``. Such object are stored in each node and hold routing tables that can help rebuild shortest paths. 

Retrieving  an ``APSPInfo`` instance from a node is done for instance for a node of id "F",  like this:

{% highlight java %}
APSPInfo info = graph.getNode("F").getAttribute(APSPInfo.ATTRIBUTE_NAME);
{% endhighlight %}

then the shortest path from a "F" to another node (say "A") is given by:

{% highlight java %}
info.getShortestPathTo("A")
{% endhighlight %}

## Example

{% highlight java %}
 import java.io.ByteArrayInputStream;
 import java.io.IOException;
 
 import org.graphstream.algorithm.APSP;
 import org.graphstream.algorithm.APSP.APSPInfo;
 import org.graphstream.algorithm.APSP.Progress;
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
 public class APSPTest {
 
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
 		Graph graph = new DefaultGraph("APSP Test");
 		ByteArrayInputStream bs = new ByteArrayInputStream(my_graph.getBytes());
 		
 		FileSourceDGS source = new FileSourceDGS();
 		source.addSink(graph);
 		source.readAll(bs);
 		
 		APSP apsp = new APSP();
 		apsp.init(graph); // registering apsp as a sink for the graph
 		apsp.setDirected(false); // undirected graph
 		apsp.setWeightAttributeName("weight"); // ensure that the attribute name used is "weight"
 
 		apsp.compute(); // the method that actually computes shortest paths
 		
 		APSPInfo info = graph.getNode("F").getAttribute(APSPInfo.ATTRIBUTE_NAME);		
 		System.out.println(info.getShortestPathTo("A"));
 	}
 }
{% endhighlight %}


The output of this test program should give:

	[F, E, D, A]


## Features

### Digraphs

This algorithm can use directed graphs and only compute paths according to
this direction. You can choose to ignore edge orientation by calling
``setDirected(boolean)`` method with "false" as value (or use the
appropriate constructor).


### Shortest Paths with weighted edges

You can also specify that edges have "weights" or "importance" that value
them. You store these values as attributes on the edges. The default name for
these attributes is "weight" but you can specify it using the
``#setWeightAttributeName(String)`` method (or by using the appropriate
constructor). The weight attribute must contain an object that implements
java.lang.Number.


### How shortest paths are stored in the graph?

All the shortest paths are not literally stored in the graph because it would
require to much memory to do so. Instead, only useful data, allowing the fast
reconstruction of any path, is stored. The storage approach is alike network
routing tables where each node maintains a list of all possible targets
linked with the next hop neighbor to go through.

Technically, on each node, for each target, we only store the target node
name and if the path is made of more than one edge, one "pass-by" node. As
all shortest path that is made of more than one edge is necessarily made of
two other shortest paths, it is easy to reconstruct a shortest path between
two arbitrary nodes knowing only a pass-by node. This approach still stores a
lot of data on the graph, however far less than if we stored complete paths.

