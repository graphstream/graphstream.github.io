---
title: Why "graph streams" ? What is a "dynamic graph" ?
layout: documentation
docpath: FAQ|/doc/FAQ/,General Questions|/doc/FAQ/General-Questions/
permalink: /doc/FAQ/General-Questions/Why-graph-streams-What-is-a-dynamic-graph/
redirect_from: /doc/FAQ/General-Questions/Why-graph-streams-What-is-a-dynamic-graph_1.0/
---

As GraphStream can handle graph evolution, graphs are defined as a "*flow of graph events*", instead of only a set of nodes, edges and eventually sets of values associated to node and edges.

Events tells when a node, edge or associated value appears, changes and disappears. Therefore a graph is not described as a static, fixed, representation, but by the whole evolving history of graph elements.

