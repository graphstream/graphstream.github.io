---
title: What are the Graph implementations ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The Graph Class|/doc/FAQ/The-Graph-Class/
permalink: /doc/FAQ/The-Graph-Class/What-are-the-Graph-implementations/
redirect_from: /doc/FAQ/The-Graph-Class/What-are-the-Graph-implementations_1.0/
---

Actually four implementations:

- ``DefaultGraph``. The default implementation that should fit most purposes. It is quite robust (since used for a long time) and ensures the graph is coherent at any time (removing a node will remove the attached edges for example). However it does not handle several edges between two same nodes. Adding an undirected edge between two nodes will trigger an error if an undirected edge already exists.

- ``MultiGraph``. A new implementation, very like ``DefaultGraph``, but that allows to put several edges between two same nodes. It shares a lot of code with the default graph.

- ``AdjacencyListGraph``. An implementation that will use almost twice less memory than ``DefaultGraph`` but may be slower for some uses.

- ``ConcurrentGraph``. An implementation of a Graph with multi-thread capabilities. It is similar to the ``AdjacencyListGraph`` class,  but with thread-safe data structures. 

