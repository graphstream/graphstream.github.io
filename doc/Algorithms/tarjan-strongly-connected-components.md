---
title: Tarjan Strongly Connected Components
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Tarjan-Strongly-Connected-Components/
redirect_from: /doc/Algorithms/Tarjan-Strongly-Connected-Components_development/
---

## Example

{% highlight java %}
	Graph g = new MultiGraph("g");
	
	String nodes = "abcdefgh";
	String edges = "abbccddccgdhhdhggffgbfefbeea";
	
	for (int i = 0; i < 8; i++)
		g.addNode(nodes.substring(i, i + 1));
	
	for (int i = 0; i < 14; i++) {
		g.addEdge(edges.substring(2 * i, 2 * i + 2),
				edges.substring(2 * i, 2 * i + 1),
				edges.substring(2 * i + 1, 2 * i + 2), true);
	}

	g.display();
	
	TarjanStronglyConnectedComponents tscc = new TarjanStronglyConnectedComponents();
	tscc.init(g);
	tscc.compute();
	
	for (Node n : g.getEachNode())
		n.addAttribute("label", n.getAttribute(tscc.getSCCIndexAttribute()));
{% endhighlight %}

