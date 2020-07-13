---
title: The Welsh-Powell Algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Welsh-Powell/
redirect_from: /doc/Algorithms/Welsh-Powell_1.0/
---

This class is intended to implement the Welsh-Powell algorithm for the
problem of graph coloring. It provides a greedy algorithm that runs on a
static graph.

This is an iterative greedy algorithm:

- Step 1: All vertices are sorted according to the decreasing value of their degree in a list V.
- Step 2: Colors are ordered in a list C.
- Step 3: The first non colored vertex v in V is colored with the first available color in C. <i>available</i> means a color that was not previously used by the algorithm.
- Step 4: The remaining part of the ordered list V is traversed and the same color is allocated to every vertex for which no adjacent vertex has the same color.
- Step 5: Steps 3 and 4 are applied iteratively until all the vertices have been colored.

Note that the given colors are not real colors. Instead they are positive
integers starting 0. So, for instance, if a colored graph's chromatic number
is 3, then nodes will be "colored" with one of 0, 1 or 2.

After computation using ``compute()``, the algorithm result for the
computation, the chromatic number, is accessible with the
``getChromaticNumber()`` method.  Colors (of "Integer" type) are stored in the graph as attributes (one for each node).
By default the attribute name is "WelshPowell.color", but you can optional choose the
attribute name.


## Example

{% highlight java %}
 import java.io.IOException;
 import java.io.StringReader;
 
 import org.graphstream.algorithm.coloring.WelshPowell;
 import org.graphstream.graph.ElementNotFoundException;
 import org.graphstream.graph.Graph;
 import org.graphstream.graph.Node;
 import org.graphstream.graph.implementations.DefaultGraph;
 import org.graphstream.stream.GraphParseException;
 import org.graphstream.stream.file.FileSourceDGS;
 
 public class WelshPowellTest {
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
 	public static void main(String[] args) throws IOException, ElementNotFoundException, GraphParseException {
 		Graph graph = new DefaultGraph("Welsh Powell Test");
 		StringReader reader  = new StringReader(my_graph);
 		
 		FileSourceDGS source = new FileSourceDGS();
 		source.addSink(graph);
 		source.readAll(reader);
 		
 		WelshPowell wp = new WelshPowell("color");
 		wp.init(graph);
 		wp.compute();
 		
 		System.out.println("The chromatic number of this graph is : "+wp.getChromaticNumber());
 		for(Node n : graph){
 			System.out.println("Node "+n.getId()+ " : color " +n.getAttribute("color"));
 		}
 	}
 }
{% endhighlight %}

This shall return:

	The chromatic number of this graph is : 3
	Node D : color 0
	Node E : color 2 
	Node F : color 1
	Node A : color 2
	Node B : color 1
	Node C : color 0


## Display Colors

Consider you what to display the result of the coloring algorithm on a displayed graph,  then adding the following code to the previous example may help you:


{% highlight java %}
 Color[] cols = new Color[wp.getChromaticNumber()];
 for(int i=0;i< wp.getChromaticNumber();i++){
 	cols[i]=Color.getHSBColor((float) (Math.random()), 0.8f, 0.9f);
 }
 for(Node n : graph){ 
 	int col = (int) n.getNumber("color");
 	n.setAttribute("ui.style", "fill-color:rgba("+cols[col].getRed()+","+cols[col].getGreen()+","+cols[col].getBlue()+",200);" );
 }
 
 graph.display();
{% endhighlight %}


## Complexity

This algorithm is known to use at most d(G)+1 colors where d(G) represents the largest value of the degree in the graph G.


## Reference

- Welsh, D. J. A.; Powell, M. B. (1967), "An upper bound for the chromatic number of a graph and its application to timetabling problems", The Computer Journal 10 (1): 85–86, doi:10.1093/comjnl/10.1.85

