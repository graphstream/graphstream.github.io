---
title: The Centroid Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Centroid/
redirect_from: /doc/Algorithms/Centroid_1.0/
---

Compute the centroid of a connected graph.

In a graph G, if d(u,v) is the shortest length between two nodes u and v (ie
the number of edges of the shortest path) let m(u) be the sum of d(u,v) for
all nodes v of G. Centroid of a graph G is a subgraph induced by vertices u
with minimum m(u).


## Requirements

This algorithm needs that APSP algorithm has been computed before its own
computation.


## Example

{% highlight java %}
 import java.io.StringReader;
 import java.io.IOException;
  
 import org.graphstream.algorithm.Centroid;
 import org.graphstream.graph.Graph;
 import org.graphstream.graph.implementations.DefaultGraph;
 import org.graphstream.stream.file.FileSourceDGS;
 
 //                     +--- E
 // A --- B --- C -- D -|--- F
 //                     +--- G
 
 public class CentroidTest {
 	static String my_graph =
                "DGS004\n" + 
                "my 0 0\n" + 
                "an A \n" +
                "an B \n" +
                "an C \n" +
                "an D \n" +
                "an E \n" +
                "an F \n" +
                "an G \n" +
                "ae AB A B \n" +
                "ae BC B C \n" +
                "ae CD C D \n" +
                "ae DE D E \n" +
                "ae DF D F \n" +
                "ae DG D G \n";
 
 	public static void main(String[] args) throws IOException {
 		Graph graph = new DefaultGraph("Centroid Test";);
 		StringReader reader = new StringReader(my_graph);
 
 		FileSourceDGS source = new FileSourceDGS();
 		source.addSink(graph);
 		source.readAll(reader);
 
 		APSP apsp = new APSP();
 		apsp.init(graph);
 		apsp.compute();
 
 		Centroid centroid = new Centroid();
 		centroid.init(graph);
 		centroid.compute();
		graph.nodes().forEach( n -> {
 			Boolean in = n.getAttribute("centroid");
 
 			System.out.printf("%s is%s in the centroid.\n", n.getId(), in ? ""
 					: " not");
 		});
 	}
 }
{% endhighlight %}

Output will be:

 A is not in the centroid
 B is not in the centroid
 C is not in the centroid
 D is in the centroid
 E is not in the centroid
 F is not in the centroid
 G is not in the centroid


## Complexity

O(n2)


## Reference

* F. Harary, Graph Theory. Westview Press, Oct. 1969. [Online].
  Available: [link](http://www.amazon.com/exec/obidos/redirect?tag=citeulike07-20&path=ASIN/0201410338)
