---
title: Is there a list of attributes with a predefined meaning for the graph viewer ?
layout: documentation
docpath: FAQ|/doc/FAQ/,Attributes|/doc/FAQ/Attributes/
permalink: /doc/FAQ/Attributes/Is-there-a-list-of-attributes-with-a-predefined-meaning-for-the-graph-viewer/
redirect_from: /doc/FAQ/Attributes/Is-there-a-list-of-attributes-with-a-predefined-meaning-for-the-graph-viewer_1.0/
---

Yes. A few:

- ``x`` for the abscissa of nodes (a float value).
- ``y`` for the ordinate of nodes (a float value).
- ``z`` for the depth of nodes (a float value).
- ``xy`` for the 2D position of nodes (pass two float values).
- ``xyz`` for the 3D position of nodes (pass three float values). It is a good idea to always use xyz.
- ``ui.label`` for node, sprite and edge labels. Setting this attribute will display the text on the node or edge according to the style sheet and text visibility modes.
- ``ui.color`` for node, sprite and edge color interpolation when the style defines at least two colors. The value must be a real number between 0 and 1. The style must define at least two fill colors and the fill mode must be ``dyn-plain``, for example : `node { fill-mode: dyn-plain; fill-color: red, blue; }`. In this example, if the ``ui.color`` value is 0 the node will be red, if the value is 1 the node will be blue and if the value is 0.5 the node will be a mix of the two, some kind of purple.
- ``ui.style`` for node, edge and sprite styling. This merges the style to the actual style sheet.
- ``ui.stylesheet`` for graph styling. Each new addition or change of this attribute will merge the style definitions to the actual style sheet. To completely clear the style, remove this attribute from the graph.
- ``ui.hide`` to hide a node, edge or sprite (only its presence is tested, not its value).
- ``ui.quality`` to enable slower but better rendering.
- ``ui.antialias`` to enable anti-aliasing of shapes drawn by the viewer.
- ``ui.screenshot`` for graphs, to quickly take a screen shot of the viewer. The value must be the name of a the image file you want to save. Once the screen shot has been saved, the attribute is automatically removed. For example `graph.setAttribute("ui.screenshot", "/some/place/image.png");`.

