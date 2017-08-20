---
title: Working with algorithms and generators
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/Working-with-algorithms-and-generators/
redirect_from: /doc/Tutorials/Working-with-algorithms-and-generators_1.0/
---

## Algorithms

We see algorithms like something which can be initialized on a graph and then
computed. For example, an algorithm can colorize nodes or edges of a graph ; an
other can compute a spanned tree ...

The ``org.graphstream.algorithm.Algorithm`` interface defines the structure of
an algorithm. It contains two methods :

* ``init( Graph g )``, which is the initialization step of the algorithm ;
* ``compute()``, which launches the algorithm.

### Why does we not just use a ``compute(Graph)`` method ?

The initialization step and computing step are located in different methods
because you may have to make a new computation of your algorithm without
calling the initialization step again. This initialization step must contain code
which is unique for *a* graph and it has to be called again only if you want to reset
data linked to the algorithm or to change the graph.

This is a good way to use algorithm:

```java
 Graph g = ... ;

 // Creation of the graph

 Algorithm a = ... ; // My algorithm
 a.init(g);
 a.compute();

 // Others operations on g

 a.compute(); // Update results
```

### A basic algorithm example

The following is an example of a basic algorithm that computes min,
max and average degree in the graph:

```java
 public class DegreesAlgorithm implements Algorithm {
    Graph theGraph;
    int minDegree, maxDegree, avgDegree;
  
    public void init(Graph graph) {
        theGraph = graph;
    }
  
    public void compute() {
        avgDegree = 0;
        minDegree = Integer.MAX_VALUE;
        maxDegree = 0;
  
        for(Node n : theGraph.getEachNode() ) {
            int deg = n.getDegree();
  
            minDegree = Math.min(minDegree, deg);
            maxDegree = Math.max(maxDegree, deg);
            avgDegree += deg;
        }
  
        avgDegree /= theGraph.getNodeCount();
    }
  
    public int getMaxDegree() {
        return maxDegree;
    }
  
    public int getMinDegree() {
        return minDegree;
    }
  
    public int getAverageDegree() {
        return avgDegree;
    }
 }
```


### Dynamicity

On GraphStream, dynamicity is at the foreground so it is normal that algorithms
can be dynamic to. The interface ``org.graphstream.algorithm.DynamicAlgorithm``
extends ``Algorithm`` and introduces a new method ``terminate()`` which defines
the end of the algorithm.

Use of this kind of algorithms could be:

```java
 Graph g = ... ;

 // Creation of the graph

 DynamicAlgorithm da = ... ;
 
 da.init(g);

 while( ... ) // something to do
 	da.compute();

 da.terminate();
```


### A basic dynamic algorithm example

In this example, computation is done continuously in a loop. One may want to
make the computation when receiving events. This can be done with a Sink that
will trigger the computation. For example, this is a dynamic algorithm where
computation is done when a node is added:

```java
 public class ApparitionAlgorithm extends SinkAdapter implements
 		DynamicAlgorithm {
 
    Graph theGraph;
    HashMap<String, Integer> apparitions;
    double avg;
  
    public void init(Graph graph) {
        theGraph = graph;
        avg = 0;
        graph.addSink(this);
    }
  
    public void compute() {
        avg = 0;
  
        for (int a : apparitions.values())
            avg += a;
            avg /= apparitions.size();
        }
  
    public void terminate() {
        graph.removeSink(this);
    }
  
    public double getAverageApparitions() {
        return avg;
    }
  
    public int getApparitions(String nodeId) {
        return apparitions.get(nodeId);
    }
  
    public void nodeAdded(String sourceId, long timeId, String nodeId) {
        int a = 0;
  
        if (apparitions.containsKey(nodeId))
            a = apparitions.get(nodeId);
  
        apparitions.put(nodeId, a + 1);
    }
  
    public void stepBegins(String sourceId, long timeId, double step) {
        compute();
    }
  }
```

In this last example, ``init(..)`` is use to set a link between the graph and
the algorithm and ``end()`` removes this link.


## Generators

A generator is an algorithmic source of events that produce a graph according to
criteria. Generators are composed of :

1. a ``begin()`` method that is called one time at the beginning,
2. a ``nextEvents()`` that produces some new events and that can be called as much
   as more events are available,
3. a ``end()`` method that closes the generation.

A trivial example is a generator producing a full connected graph that adds a new
node at each iteration and connects it with all previous nodes.

Generator is a Source, so transmission of events is done in the classic Source/Sink
way:

```java
 Generator gen = ...;
 Graph graph = ...;
 
 gen.addSink(graph);
 
 gen.begin();
 for(int i = 0; i < 100; i++)
    gen.nextEvents();
 gen.end();
```

You can have a look on the overview on generators on
[this page](/doc/Generators/Overview-of-generators_1.0/).


### A basic generator example

A basic full generator can be created easily :

```java
 public class MyFullGenerator extends SourceBase
       implements Generator {
 
    int currentIndex = 0;
    int edgeId = 0;

    public void begin() {
       addNode();
    }

    public boolean nextEvents() {
       addNode();
       return true;
    }
 
    public void end() {
       // Nothing to do
    }
 
    protected void addNode() {
       sendNodeAdded(sourceId, Integer.toString(currentIndex));
 
       for(int i = 0; i < currentIndex; i++)
          sendEdgeAdded(sourceId, Integer.toString(edgeId++),
                Integer.toString(i), Integer.toString(currentIndex), false);
 
       currentIndex++;
 }
```
