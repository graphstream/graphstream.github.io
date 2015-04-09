---
title: The Bellman-Ford Shortest Path Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/BellmanFord/
redirect_from: /doc/Algorithms/BellmanFord_1.0/
---

The Bellman-Ford algorithm computes single-source shortest paths in a
weighted digraph (where some of the edge weights may be negative). Dijkstra's
algorithm accomplishes the same problem with a lower running time, but
requires edge weights to be non-negative. Thus, Bellman-Ford is usually used
only when there are negative edge weights (from the 
[wikipedia](http://en.wikipedia.org/wiki/Bellman-Ford_algorithm)) 


## Warning

This Implementation is only a stub. For the moment only attributes located on
the edges are supported. If you need more features, consider using the
Dijkstra implementation. If you really need that algorithm, please contact
the team members through the mailing list.


## Reference

Bellman, Richard "On a routing problem", Quarterly of Applied Mathematics 16: 87–90. 1958.


## Complexity

O(VxE) time, where V and E are the number of vertices and edges respectively.


## Example

{% highlight java %}
 import java.io.IOException;
 import java.io.StringReader;
 
 import org.graphstream.algorithm.BellmanFord;
 import org.graphstream.graph.Graph;
 import org.graphstream.graph.implementations.DefaultGraph;
 import org.graphstream.stream.file.FileSourceDGS;
 
 public class BellmanFordTest {
 	
 	//     B-(1)-C
 	//    /       \
 	//  (1)       (10)
 	//  /           \
 	// A             F
 	//  \           /
 	//  (1)       (1)
 	//    \       /
 	//     D-(1)-E
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
 		Graph graph = new DefaultGraph("Bellman-Ford Test");
 		StringReader reader  = new StringReader(my_graph);
 		
 		FileSourceDGS source = new FileSourceDGS();
 		source.addSink(graph);
 		source.readAll(reader);
 
 		BellmanFord bf = new BellmanFord("weight","A");
 		bf.init(graph);
 		bf.compute();
 
 		System.out.println(bf.getShortestPath(graph.getNode("F")));
 	}
 }
 {% endhighlight %}
 
