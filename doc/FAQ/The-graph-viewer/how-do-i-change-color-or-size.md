---
title: How do I dynamically change the color and size of elements in the viewer ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/How-do-I-dynamically-change-color-and-size-in-the-viewer/index.html
versions: "2.0/"
---

You have three options to do this.


## Using CSS classes

One of the options is to use CSS classes. For example, imagine you have two types of nodes, standard nodes and important nodes, that you want to visually differentiate. You can create two CSS classes:

{% highlight css %}
node {
	fill-color: grey;
	size: 10px;
	stroke-mode: plain;
	stroke-color: black;
	stroke-width: 1px;
}

node.important {
	fill-color: red;
	size: 15px;
}
{% endhighlight %}

We defined two styles, one for all the nodes, another for nodes having the CSS class ``important``. Then in our code, at any time, we can add or change the attribute ``ui.class`` on individual nodes to change their appearance:

{% highlight java %}
node.setAttribute("ui.class", "important"); // make the node appear as important.
{% endhighlight %}

Or:

{% highlight java %}
node.removeAttribute("ui.class"); // make the node appear as standard.
{% endhighlight %}

The class style "cascade" with the default style. This means that style properties defined for the standard nodes that do appear in the ``important`` style will be kept. For example, in the example above, the stroke mode (width and color of the border) will be applied both to standard nodes and to important nodes.

You can furthermore have several classes applied to a node. If the size and color are not correlated, you can create a class ``important`` for color ``red``, and a class ``big`` for size ``15px`` and apply them independently to graph elements. For example:

{% highlight css %}
    node {
        fill-color: grey;
        size: 10px;
        stroke-mode: plain;
        stroke-color: black;
        stroke-width: 1px;
    }
    node.important {
        fill-color: red;
    }
    node.big {
        size: 15px;
    }
{% endhighlight %}

And in the Java code:

{% highlight java %}
node1.setAttribute("ui.class", "big, important");
node2.setAttribute("ui.class", "big");
node3.setAttribute("ui.class", "important");
{% endhighlight %}


## Using dynamic styles

As the color and size are visual parameters that can vary a lot, it is sometimes not practical to define a class for each category of size and color. Imagine for example that your nodes can take any size proportional to a variable in your program or that the edges can be colored on a gradient from green to red depending on their importance in your simulation.

Using CSS classes to do this would quickly become difficult, as you would have to define a class for each color of the gradient, or for each possible size.

Instead to do this you can use dynamic size and color. For color; if you have a Color object, you can use for example the following style:

{% highlight css %}
node {
	fill-mode: dyn-plain;
}
{% endhighlight %}

And then simply pass the Color object as argument of a the special attribute ``ui.color`` on individual graph elements, here nodes, to set the color of the element:

{% highlight java %}
node.setAttribute("ui.color", Color.RED);
{% endhighlight %}

However, sometime, you may need a lot of different colors, for example you may need a gradient of colors to indicate some range of values. In this case, you can use the color interpolation feature. Use a style like this one:

{% highlight css %}
node {
	fill-mode: dyn-plain;
	fill-color: green, red;
}
{% endhighlight %}

And in your Java code you can use the special attribute ``ui.color``, but this time with a numeric argument:

{% highlight java %}
node1.setAttribute("ui.color", 0); // The node will be green.
node2.setAttribute("ui.color", 1); // The node will be red.
node3.setAttribute("ui.color", 0.5); // The node will be a mix of green and red.
{% endhighlight %}

As you can see, the colors are interpolated. This means that any color along a gradient from green to red is available, since the values for ``ui.color`` can be any value between 0 and 1.

Furthermore, you can have more colors in the ``fill-color`` property:

{% highlight css %}
node {
	fill-mode: dyn-plain;
	fill-color: blue, green, red;
}
{% endhighlight %}

This feature allows you to have very bad taste. Here for example the value 0 for ``ui.color`` will make the element appear blue, the value 1 will make it appear red and the value 0.5 will make it appear green. Value 0.25 for example will be a mix of blue and green.

For varying sizes, you can use almost the same method, use such a style:

{% highlight css %}
node {
	size-mode: dyn-size;
	size: 10px;
}
{% endhighlight %}

This style gives a default size of 10 pixels to nodes, but allows to change it dynamically by using a ``ui.size`` attribute on graph elements, here nodes. The size you give is by default used in pixels, but you can give other units.

For example:

{% highlight java %}
node1.setAttribute("ui.size", 30);     // The node will use 30 pixels.
node2.setAttribute("ui.size", "2gu");  // The node will use 2 graph units.
{% endhighlight %}

(Graph units are the units you use to position nodes when using the ``xyz`` or ``x`` and ``y`` attributes, using graph units, your nodes can change size when you change the zoom).


## What if I want to specify my RGB values directly as node attributes ?

You can use the ``ui.style`` attribute on nodes or edges. For example:

{% highlight java %}
node.setAttribute("ui.style", "fill-color: rgb(0,100,255);");
{% endhighlight %}

However be warned that doing this will store a color inside each node. The benefit of using styles is that if you have thousands of nodes with the same color, they all share the same style. If you use the dynamic color styles, as shown in the previous section, you use the same style with only one real number indicating the color. If you use the example just above, you store a style with one color for each node.

