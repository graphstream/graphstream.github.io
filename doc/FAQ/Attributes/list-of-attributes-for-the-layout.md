---
title: Is there a list of attributes with a predefined meaning for the layout algorithms ?
layout: documentation
docpath: FAQ|/doc/FAQ/,Attributes|/doc/FAQ/Attributes/
permalink: /doc/FAQ/Attributes/Is-there-a-list-of-attributes-with-a-predefined-meaning-for-the-layout-algorithms/
redirect_from: /doc/FAQ/Attributes/Is-there-a-list-of-attributes-with-a-predefined-meaning-for-the-layout-algorithms_1.0/
---

Yes, but they are (or will be) specific for each kind of layout.

For the default "force-based" layout used by the graph viewer, you can use these attributes on the graph:

- ``layout.force`` on the graph. This sets the global force of the layout, that is the amount the nodes are moved at each step. Be careful, changing this value may lead to very large oscillations in the layout. 

- ``layout.quality`` an integer between 0 and 4. With value 0 the layout is faster but it also can be farther from equilibrium. With value 4 the algorithm tries to be as close as possible from equilibrium (the n-tree and  Barnes-Hut algorithms are disabled), but the computation can take a lot of time (the algorithm becomes O(n^2)).

- ``layout.stabilization-limit`` At which stabilization value the layout stops its computation. The stabilization of a layout is a number between 0 and 1. 1 means fully stable, but this value is rare. Therefore one can consider the layout is stable at a lower value. The default is 0.9. You can fix it with this attribute. To freeze the layout when the stabilization is sufficient to your needs and therefore avoid consuming CPU.

You can also put the following attributes on nodes :

- ``layout.weight`` The force of repulsion of a node. The larger the value, the more the node repulses its neighbours
 
And on edges, you can use the attributes:

- ``layout.weight`` the multiplier for the desired edge length. By default the algorithm tries to make each edge of length one. This is the position of lowest energy for a spring. This coefficient allows to modify this target spring length. Value larger than one will make the edge longer. Values between 0 and 1 will make the edge smaller.


