---
title: Generator for square grids
layout: documentation
docpath: Generators|/doc/Generators/
permalink: /doc/Generators/Square-Grid-generator/
redirect_from: /doc/Generators/Square-Grid-Generator_1.0/
---

This generate square grid graphs of any size with each node not on the
border of the graph having four neighbours for regular grids or
height neighbours for cross grids. The nodes at each of the four
corners of the grid consequently have only two or three (cross)
neighbours. The nodes on the side of the grid have three or five (cross)
neighbours.

The generated grid can be closed as a torus, meaning that there is
no border nodes will exist, therefore all nodes will have the same
degree four or height (cross).


## Usage

At the contrary of most generators, this generator does not produce
only one node when you call ``nextEvents()``. It adds a row
and column to the grid, making the side of the square grow by one.
Therfore if you call the ``nextEvents()`` methode n times you
will have *n^2* nodes.

You can indicate at construction time if the graph will be a regular
grid (no argument) or if it must be a cross-grid (first boolean argument to
true) and a tore (second boolean argument to true).

A constructor with a third boolean parameter allows to indicate that nodes
must have a ``xyz`` attribute to position them or not. This is the default
behaviour. 

![Grid Generator 1]({{ "gridGenerator1.png" | prepend: site.content_img }} "Simple square grid of size 10")
![Grid Generator 2]({{ "gridGenerator2.png" | prepend: site.content_img }} "Cross square grid of size 10")

![Grid Generator 3]({{ "gridGenerator4.png" | prepend: site.content_img }} "Tore square grid of size 10")
![Grid Generator 4]({{ "gridGenerator3.png" | prepend: site.content_img }} "Tore square cross grid of size 10")


## Complexity

At each call to ``nextEvents()`` *((n+1)*2)* new nodes are generated
with n the size of a side of the grid.


## Example

Here is an exemple of use:

{% highlight java %}
Graph graph = new SingleGraph("grid");
Generator gen = new GridGenerator();

gen.addSink(graph);
gen.begin();

for(int i=0; i<10; i++) {
	gen.nextEvents();
}

gen.end();

// Nodes already have a position.
graph.display(false);
{% endhighlight %}
    
