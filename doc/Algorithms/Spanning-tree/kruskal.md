---
title: The Kruskal Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/,Spanning-tree|/doc/Algorithms/Spanning-tree/
permalink: /doc/Algorithms/Spanning-tree/Kruskal/
redirect_from: /doc/Algorithms/Kruskal-spanning-tree-algorithm_1.0/
---

Compute a spanning tree using the Kruskal algorithm.

Kruskal's algorithm is a greedy algorithm which allows to find a minimal
spanning tree in a weighted connected graph. More informations on 
[Wikipedia](http://en.wikipedia.org/wiki/Kruskal%27s_algorithm).


## Example

The following example generates a graph with the Dorogovtsev-Mendes generator
and then compute a spanning-tree using the Kruskal algorithm. The generator
creates random weights for edges that will be used by the Kruskal algorithm.

If no weight is present, algorithm considers that all weights are set to 1.

When an edge is in the spanning tree, the algorithm will set its "ui.class"
attribute to "intree", else the attribute is set to "notintree". According to
the css stylesheet that is defined, spanning will be displayed with thick
black lines while edges not in the spanning tree will be displayed with thin
gray lines.


{% highlight java %}
import org.graphstream.graph.Graph;
import org.graphstream.graph.implementations.DefaultGraph;

import org.graphstream.algorithm.Kruskal;
import org.graphstream.algorithm.generator.DorogovtsevMendesGenerator;

public class KruskalTest {
	public static void main(String .. args) {
		DorogovtsevMendesGenerator gen = new DorogovtsevMendesGenerator();
		Graph graph = new DefaultGraph("Kruskal Test");

	  	String css = "edge .notintree {size:1px;fill-color:gray;} " +
				 "edge .intree {size:3px;fill-color:black;}";

	  	graph.setAttribute("ui.stylesheet", css);
	 	graph.display();
	 
	 	gen.addEdgeAttribute("weight");
	  	gen.setEdgeAttributesRange(1, 100);
	  	gen.addSink(graph);
	 	gen.begin();
	 	for (int i = 0; i < 100 && gen.nextEvents(); i++)
	  		;
	 	gen.end();

	 	Kruskal kruskal = new Kruskal("ui.class", "intree", "notintree");
	 
	 	kruskal.init(g);
	 	kruskal.compute();
	}
}
{% endhighlight %}


## Complexity 

m*(log(m)+3)+n+n<sup>2</sup>, m = \|E\|, n = \|V\|


## Reference

* Joseph. B. Kruskal: *On the Shortest Spanning Subtree of a Graph and the Traveling Salesman Problem*. 
  In: Proceedings of the American Mathematical Society, Vol 7, No. 1 (Feb, 1956), pp. 48–50

