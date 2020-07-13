---
title: The Prim Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/,Spanning-tree|/doc/Algorithms/Spanning-tree/
permalink: /doc/Algorithms/Spanning-tree/Prim/
redirect_from: /doc/Algorithms/Prim-spanning-tree-algorithm_1.0/
---

Prim's algorithm is an algorithm which allows to find a minimal spanning tree
in a weighted connected graph. More informations on 
[Wikipedia](http://en.wikipedia.org/wiki/Prim%27s_algorithm).


## Example

The following example generates a graph with the Dorogovtsev-Mendes generator
and then compute a spanning-tree using the Prim algorithm. The generator
creates random weights for edges that will be used by the Prim algorithm.

If no weight is present, algorithm considers that all weights are set to 1.

When an edge is in the spanning tree, the algorithm will set its "ui.class"
attribute to "intree", else the attribute is set to "notintree". According to
the css stylesheet that is defined, spanning will be displayed with thick
black lines while edges not in the spanning tree will be displayed with thin
gray lines.

{% highlight java %}
import org.graphstream.graph.Graph;
import org.graphstream.graph.implementations.DefaultGraph;

import org.graphstream.algorithm.Prim;
import org.graphstream.algorithm.generator.DorogovtsevMendesGenerator;

public class PrimTest {

	public static void main(String ... args) {
		DorogovtsevMendesGenerator gen = new DorogovtsevMendesGenerator();
		Graph graph = new DefaultGraph("Prim Test");

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

		Prim prim = new Prim("ui.class", "intree", "notintree");

		prim.init(graph);
		prim.compute();
	}
}
{% endhighlight %}


## Complexity

0(m+m<sup>2</sup>log(m)), where m = \|E\|


## Reference

* R. C. Prim: *Shortest connection networks and some generalizations*.
  In: Bell System Technical Journal, 36 (1957), pp. 1389–1401

