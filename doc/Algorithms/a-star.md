---
title: The A* Shortest path algorithm
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/A-star/
redirect_from: /doc/Algorithms/A_1.0/
---

A* computes the shortest path from a node to another in a graph. It can eventually fail if the two nodes are in two distinct connected components.


In this A* implementation, the various costs (often called g, h and f) are
given by a ``org.graphstream.algorithm.AStar.Costs`` class. This class
must provide a way to compute:

- The cost of moving from a node to another, often called g;
- The estimated cost from a node to the destination, the heuristic, often noted h;
- f is the sum of g and h and is computed automatically.


By default the ``org.graphstream.algorithm.AStar.Costs`` implementation
used uses a heuristic that returns 0 for any heuristic. This makes A an
equivalent of the Dijkstra algorithm, but also makes it far less efficient.


## Complexity

Depends on the cost functions used...


## Reference

- Hart, P. E.; Nilsson, N. J.; Raphael, B. (1972). "Correction to "A Formal Basis for the Heuristic Determination of Minimum Cost Paths"". SIGART Newsletter 37: 28–29.


## Usage

The basic usage is to create an instance of A*, then to ask it to compute from a shortest path from one target to one destination, and finally to ask for that path:

{% highlight java %}
 AStart astar = new AStar(graph);
 astar.compute("A", "Z"); // with A and Z node identifiers in the graph.
 Path path = astar.getShortestPath();
{% endhighlight %}

The advantage of A* is that it can consider any cost function to drive the search. You can create your own cost functions implementing the ``Costs`` interface. 

You can also test the default "distance" cost function on a graph that has "x" and "y" values. You specify the Cost function before calling the ``compute(String,String)`` method:


{% highlight java %}
 AStart astar = new AStar(graph);
 astar.setCosts(new DistanceCosts());
 astar.compute("A", "Z");
 Path path = astar.getShortestPath();
{% endhighlight %}


## Example

{% highlight java %}
 import java.io.IOException;
 import java.io.StringReader;
 
 import org.graphstream.algorithm.AStar;
 import org.graphstream.algorithm.AStar.DistanceCosts;
 import org.graphstream.graph.Graph;
 import org.graphstream.graph.implementations.DefaultGraph;
 import org.graphstream.stream.file.FileSourceDGS;
 
 public class AStarTest {
 	
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
 		+ "an A xy: 0,1\n" 
 		+ "an B xy: 1,2\n"
 		+ "an C xy: 2,2\n"
 		+ "an D xy: 1,0\n"
 		+ "an E xy: 2,0\n"
 		+ "an F xy: 3,1\n"
 		+ "ae AB A B weight:1 \n"
 		+ "ae AD A D weight:1 \n"
 		+ "ae BC B C weight:1 \n"
 		+ "ae CF C F weight:10 \n"
 		+ "ae DE D E weight:1 \n"
 		+ "ae EF E F weight:1 \n"
 		;
 
 	public static void main(String[] args) throws IOException {
 		Graph graph = new DefaultGraph("A Test");
 		StringReader reader = new StringReader(my_graph);
 
 		FileSourceDGS source = new FileSourceDGS();
 		source.addSink(graph);
 		source.readAll(reader);
 
 		AStar astar = new AStar(graph);
 		//astar.setCosts(new DistanceCosts());
 		astar.compute("C", "F");
 
 		System.out.println(astar.getShortestPath());
 	}
 }
{% endhighlight %}

The output of this test program should give:

	[C, B, A, D, E, F]

If you un comment the ``setCosts`` line, then you get:

	[C, F]

