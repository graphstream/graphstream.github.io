---
title: How do I hide or show nodes, edges or sprites individually ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/How-do-I-hide-or-show-nodes-edges-or-sprites-individually/
redirect_from: /doc/FAQ/The-graph-viewer/How-do-I-hide-or-show-nodes-edges-or-sprites-individually_1.0/
---

You can use the ui.hide attribute on nodes, edges and sprites. The viewer tests the presence of this attribute on elements and disable the rendering of this element. The value of the attributes is not used at all. For example, to hide a node you can use :

{% highlight java %}
node.setAttribute( "ui.hide" );
{% endhighlight %}

Then to make it visible anew :

{% highlight java %}
node.removeAttribute( "ui.hide" );
{% endhighlight %}

