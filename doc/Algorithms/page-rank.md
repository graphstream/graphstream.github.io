---
title: The PageRank Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/PageRank/
redirect_from: /doc/Algorithms/PageRank_development/
---

The PageRank is an algorithm that measures the "importance" of the nodes in a
graph. It assigns to each node a rank. This rank corresponds to the
probability that a "random surfer" visits the node. The surfer goes from node
to node in the following way: with probability *d* she chooses a
random outgoing arc and with probability *1 - d* she "teleports" to a
random node (possibly not connected to the current). The probability
*d* is called damping factor. By default it is 0.85 but it can be
customized using the ``setDampingFactor(double)`` method. The ranks are real
numbers between 0 and 1 and sum up to one.

## Usage

This implementation uses a variant of the power iteration algorithm to
compute the node ranks. It computes the approximate ranks iteratively going
closer to the exact values at each iteration. The accuracy can be controlled
by a precision parameter . When the L1
norm of the difference between two consecutive rank vectors becomes less than
this parameter, the result is considered precise enough and the computation
stops.

This implementation works with both directed and undirected edges. An
undirected edge acts as two directed arcs.

The graph dynamics is taken into account and the ranks are not computed from
scratch at each modification in the structure of the graph. However, the
ranks become less and less accurate after each modification. To establish the
desired precision, one must either explicitly call ``compute()`` or ask
for a rank of a node by calling ``getRank(Node)``.

The computed ranks are stored in node attribute. The name of this attribute
can be changed by a call to ``setRankAttribute(String)`` but only before
the call to ``init(Graph)``. Another way to obtain the ranks is to call
``getRank(Node)``. The second method is preferable because it will
update the ranks if needed and will always return values within the desired
precision.


## Example

{% highlight java %}
	import org.graphstream.algorithm.PageRank;
	import org.graphstream.algorithm.generator.DorogovtsevMendesGenerator;
	import org.graphstream.graph.Graph;
	import org.graphstream.graph.Node;
	import org.graphstream.graph.implementations.SingleGraph;

	public class DemoPageRank {
		public static void main(String[] args) throws InterruptedException {
			Graph graph = new SingleGraph("test");
			graph.addAttribute("ui.antialias", true);
			graph.addAttribute("ui.stylesheet", "node {fill-color: red; size-mode: dyn-size;} edge {fill-color:grey;}");
			graph.display();

			DorogovtsevMendesGenerator generator = new DorogovtsevMendesGenerator();
			generator.setDirectedEdges(true, true);
			generator.addSink(graph);

			PageRank pageRank = new PageRank();
			pageRank.setVerbose(true);
			pageRank.init(graph);

			generator.begin();
			while (graph.getNodeCount() < 100) {
				generator.nextEvents();
				for (Node node : graph) {
					double rank = pageRank.getRank(node);
					node.addAttribute("ui.size", 5 + Math.sqrt(graph.getNodeCount() * rank * 20));
					node.addAttribute("ui.label", String.format("%.2f%%", rank * 100));
				}
				Thread.sleep(1000);
			}
		}
	}
{% endhighlight %}


## Complexity

Each iteration takes *O(m + n)* time, where *n* is the number of
nodes and *m* is the number of edges. The number of iterations
needed to converge depends on the desired precision.


## Reference

- Lawrence Page, Sergey Brin, Rajeev Motwani and Terry Winograd. The
  PageRank citation ranking: Bringing order to the Web. 1999

