---
title: Creating a movie with FileSinkImages
author: Guilhelm Savin
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/Creating-a-movie-with-FileSinkImages/1.0/
redirect_from: /doc/Tutorials/Creating-a-movie-with-FileSinkImages_1.0/
latest: /doc/Tutorials/Creating-a-movie-with-FileSinkImages/
---

We often have to take screenshot of a graph to show it in a presentation or at
a moment where it is hard to run the program. Problem is that when we are
rendering a dynamic graph, the dynamicity is not rendered in a single
screenshot. Movies could be the dynamic screenshot of such graphs.

This tutorial explains how to produce a sequence of images rendering a graph,
and how to compil these images to produce a movie.

Choosing when images are produced
-------------------------------------------------------------------------------

The sink needs to know *when* images have to be outputted. For example, images
can be outputted in the following cases:

* reception of any event ;
* reception of a node/edge/graph event ;
* a node/edge is added/removed ;
* reception of a step event ;
* ...

The enum ``FileSinkImages.OutputPolicy`` defines all theses cases.

* ``ByEventOutput``
* ``ByElementEventOutput``
* ``ByAttributeEventOutput``
* ``ByNodeEventOutput``
* ``ByEdgeEventOutput``
* ``ByGraphEventOutput``
* ``ByStepOutput``
* ``ByNodeAddedRemovedOutput``
* ``ByEdgeAddedRemovedOutput``
* ``ByNodeAttributeOutput``
* ``ByEdgeAttributeOutput``
* ``ByGraphAttributeOutput``

The corresponding code is:

{% highlight java %}
  OutputPolicy outputPolicy = OutputPolicy.ByStepOutput;
{% endhighlight %}


Choosing the format
-------------------------------------------------------------------------------

Three things have to be defined:

* prefix of image filenames ;
* type of images ;
* resolution of images.

Type of images can be *png* or *jpeg*. Types are contained if the enum
``FileSinkImages.OutputType``.

The enum ``FileSinkImages.Resolutions`` contains classic resolution:

* ``QVGA, 320x240``
* ``CGA, 320x200``
* ``VGA, 640x480``
* ``NTSC, 720x480``
* ``PAL, 768x576``
* ``WVGA 5/3, 800x480``
* ``SVGA, 800x600``
* ``WVGA 16/9, 854x480``
* ``WSVGA, 1024x600``
* ``XGA, 1024x768``
* ``HD720, 1280x720``
* ``WXGA 5/3, 1280x768``
* ``WXGA 8/5, 1280x800``
* ``SXGA; 1280x1024``
* ``SXGAp, 1400x1050``
* ``WSXGAp, 1680x1050``
* ``UXGA, 1600x1200``
* ``HD1080, 1920x1080``
* ``WUXGA, 1920x1200``
* ``TwoK, 2048x1080``
* ``QXGA, 2048x1536``
* ``WQXGA, 2560x1600``
* ``QSXGA, 2560x2048``

but it is possible to define a custom resolution with
``FileSinkImages.CustomResolution``.

The corresponding code is:

{% highlight java %}
 String prefix = "prefix\_";
 OutputType type = OutputType.PNG;
 Resolution resolution = Resolutions.HD720;
{% endhighlight %}


Create the ``FileSinkImages`` object
-------------------------------------------------------------------------------

This is easily done with the following code :

{% highlight java %}
 FileSinkImages fsi = new FileSinkImages( 
	prefix, type, resolution, outputPolicy );
{% endhighlight %}


Choosing a source
-------------------------------------------------------------------------------

The ``FileSinkImages`` is a sink and need a source of events. This source could
be a graph for example, but it could be a generator, a dgs source, etc...

Using a dgs file allows to avoid the creation of a graph object. This can be
usefull when the graph to render is really big and has a high memory cost.

For example :

{% highlight java %}
 FileSourceDGS dgs = new FileSourceDGS();
 
 // Initialization of the sink
 
 dgs.addSink( fsi );
 
 dgs.begin( "path/to/dgs" );
 while( dgs.nextStep() );
 dgs.end();
{% endhighlight %}


Set style of graph/nodes/edges
-------------------------------------------------------------------------------

The definition of a style for graph, nodes or edges is allowed by providing a
css stylesheet. Syntax is the same that in the GraphStream viewer.

{% highlight java %}
 fsi.setStyleSheet(
 	"graph { padding: 50px; fill-color: black; }" + 
 	"node { fill-color: #3d5689; }" +
 	"edge { fill-color: white; }");
{% endhighlight %}


Optionally, enable layout
-------------------------------------------------------------------------------

It is possible to run a layout algorithm. If enabled, the layout can computed
in a ``LayoutRunner`` or before each image outputted. Layout modes are defined
in the enum ``FileSinkImages.LayoutPolicy``:

* ``NoLayout``, layout is disable ;
* ``ComputedInLayoutRunner``, layout is computed in a ``LayoutRunner`` ;
* ``ComputedAtNewImage``, layout is computed when a new image is outputted.

Layout policy can changed with the following code :

{% highlight java %}
 fsi.setLayoutPolicy( LayoutPolicy.ComputedAtNewImage );
{% endhighlight %}


Optionally, enable high quality rendering
-------------------------------------------------------------------------------

Like in the GraphStream viewer, it is possible to enable an high quality
rendering.

This is done by calling ``setHighQuality()`` method :

{% highlight java %}
 fsi.setHighQuality();
{% endhighlight %}


Optionally, add a logo
-------------------------------------------------------------------------------

Sometimes, it could be usefull to add a logo on your movie. The sink provides
an easy way to add a logo-image on outputted images. Only pathname of the logo
and coordinate on outputted images are needed :

{% highlight java %}
 fsi.addLogo( "path/to/logo", x, y );
{% endhighlight %}


Complete example
-------------------------------------------------------------------------------

{% highlight java %}
 // FileSinkImages arguments
 
 OutputPolicy outputPolicy = OutputPolicy.ByStepOutput;
 String prefix = "prefix\_";
 OutputType type = OutputType.PNG;
 Resolution resolution = Resolutions.HD720;
 
 FileSinkImages fsi = new FileSinkImages( type, resolution );
 
 // Create the source
 
 FileSourceDGS dgs = new FileSourceDGS();
  
 // Optional configuration
 
 fsi.setStyleSheet(
 	"graph { padding: 50px; fill-color: black; }" + 
 	"node { fill-color: #3d5689; }" +
 	"edge { fill-color: white; }");
 
 fsi.setOutputPolicy( outputPolicy );
 fsi.setLayoutPolicy( LayoutPolicy.ComputedAtNewImage );
 fsi.setHighQuality();
 fsi.addLogo( "path/to/logo", x, y );
  
 // Images production
 
 dgs.addSink( fsi );
  
 fsi.begin(prefix);
 dgs.begin( "path/to/dgs" );
 while( dgs.nextStep() );
 dgs.end();
 fsi.end();
{% endhighlight %}


Create a movie with outputted images
-------------------------------------------------------------------------------

A way to create the movie is using ``mencoder`` from the 
`MPlayer Movie Player <http://www.mplayerhq.hu>`_

The following bash script compils all images prefix by ``$PREFIX`` and ended by
``$EXT`` to create an high quality movie ``$OUPUT`` :

{% highlight bash %}
 #!/bin/bash

 EXT=png
 OPT="vcodec=mpeg4:vqscale=2:vhq:v4mv:trell:autoaspect"
 FPS=15
 PREFIX="prefix\_"
 OUTPUT="graphstream-movie.avi"
 
 mencoder "mf://$PREFIX*.$EXT" -mf fps=$FPS:type=$EXT -ovc lavc -lavcopts $OPT -o $OUTPUT -nosound -vf scale
{% endhighlight %}


Make a single screenshot
-------------------------------------------------------------------------------

The ``writeAll(String)`` method of the sink can be used to make single screenshot
of the graph:

{% highlight java %}
 DefaultGraph g = new DefaultGraph("my beautiful graph");
 FileSinkImages pic = new FileSinkImages(OutputType.PNG, Resolutions.VGA);
 
 pic.setLayoutPolicy(LayoutPolicy.COMPUTED_AT_NEW_IMAGE);
 	
 g.addNode("A");
 g.addNode("B");
 g.addNode("C");
 		
 g.addEdge("AB", "A", "B");
 g.addEdge("AC", "A", "C");
 g.addEdge("BC", "B", "C");
 		
 pic.writeAll(g, "sample.png");
{% endhighlight %}



