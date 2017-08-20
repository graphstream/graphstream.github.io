---
title: Lots of small often used algorithms
layout: documentation
docpath: Algorithms|/doc/Algorithms/
permalink: /doc/Algorithms/Several-often-used-algorithms-on-graphs/
redirect_from: /doc/Algorithms/Several-often-used-algorithms-on-graphs_1.0/
---

The class ``org.graphstream.algorithm.Toolkit`` contains a lot of very small algorithms that could be often useful
with a graph. Most methods take a graph as first argument.


## Usage

### Degrees

The ``degreeDistribution(Graph)`` method allows to obtain an array where
each cell index represents the degree, and the value of the cell the number
of nodes having this degree. Its complexity is O(n) with n the number of nodes.

The ``degreeMap(Graph)`` returns an array of nodes sorted by degree
in descending order. The complexity is O(n log(n)) with n the number of nodes.

The ``averageDegree(Graph)`` returns the average degree. The complexity
is O(1).

The ``degreeAverageDeviation(Graph)`` returns the deviation of the average
degree. The complexity is O(n) with n the number of nodes.


### Density

The ``density(Graph)`` method returns the number of links in the graph
divided by the total number of possible links. The complexity is O(1). 


### Clustering coefficient

The ``clusteringCoefficient(Node)`` method return the clustering
coefficient for the given node. The complexity if O(d^2) where d is the
degree of the node.

The ``clusteringCoefficients(Graph)`` method return the clustering
coefficient of each node of the graph as an array.

The ``averageClusteringCoefficient(Graph)`` method return the average
clustering coefficient for the graph.


### Random nodes and edges

The ``randomNode(Graph)`` returns a node chosen at random in the graph. You can
alternatively pass a ``Random`` instance as parameter with ``randomNode(Graph, Random)``.
The complexity depends on the kind of graph.

The ``randomEdge(Graph)`` returns an edge chosen at random in the graph. You can
alternatively pass a ``Random`` instance as parameter with ``randomEdge(Graph, Random)``.
The ``randomEdge(Node)`` returns an edge chosen at random within the edge set of
the given node. You can also use ``randomEdge(Node, Random)``. To chose a random
edge of a node inside the entering or leaving edge sets only, you can use ``randomInEdge(Node)``
or ``randomInEdge(Node, Random)``, or ``randomOutEdge(Node)`` or finally
``randomOutEdge(Node, Random)``. 


### Nodes position

Extracting nodes position from attributes can be tricky due to the face the positions
can be stored either as separate ``x``, ``y`` and ``z`` attributes or inside ``xy`` or
``xyz`` attributes.

To simplify things you can use ``nodePosition(Node)`` which returns an array of three
doubles, containing the position of the node. You can also use ``nodePosition(Graph, String)``
with a graph and a node identifier.

If you already have an array of doubles with at least three cells you can also use
``nodePosition(Node, double[])`` that will store the position in the passed array.
You can as well use ``nodePosition(Graph, String, double[])``.

All these methods can also handle the ``org.graphstream.ui.geom.Point3`` class instead
of arrays of doubles. Methods that use such an array as argument are the same. Methods
that return a ``Point3`` instead of an array are ``nodePointPosition(Graph, String)``
and ``nodePointPosition(Node)``.


### Diameter
 
The ``diameter(Graph)`` method computes the diameter of the graph, considering
it is not weighted but that it is directed. The diameter of the graph is the largest
of all the shortest paths from any node to any other node.

The ``diameter(Graph, String, boolean)`` method does the same thing, but
considers that the graph is weighted if the second argument is non-null. The second
argument is the weight attribute name. The third argument indicates if the graph must
be considered as directed or not.

The returned diameter is not an integer since some graphs have non-integer weights
on edges.

Note that this operation can be quite costly, the algorithm used depends on the
fact the graph is weighted or not. If unweighted, the algorithm is in O(n*(n+m)) (it
computes a breath-first search from all the vertices to all other vertices and
computes the max of the max depths of each of these searches). If weighted the
algorithm is the Floyd-Warshall algorithm whose complexity is at worst of O(n^3).

The ``unweightedEccentricity(Node node,boolean directed)`` method will compute the
maximum distance in edge jumps from the given node toward each other nodes. This is
the largest of the shortest paths toward other nodes not considering eventual weights.


## Example

You can use this class with a static import for example:

{% highlight java %}
import static org.graphstream.algorithm.Toolkit.*;
{% endhighlight %}

