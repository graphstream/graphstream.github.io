---
title: Reading files using FileSource
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/Reading-files-using-FileSource/
redirect_from: /doc/Tutorials/Reading-files-using-FileSource_1.0/
---

File sources allow to turn a file into a source of events for a graph.
There are two ways to make this : reading the whole file in a single
instruction, or reading the file event by event. Some file formats do
not support to be read in the event-by-event way. Actually, GraphStream
is able to read the following file format :

* ``DGS`` (GraphStream)
* ``DOT`` (GraphViz)
* ``GML``
* ``TLP`` (Tulip)
* ``NET`` (Pajek)
* ``GraphML``
* ``GEXF`` (Gephi)

File sources are source of events, so a sink has to be added to the source
to have some effect :

{% highlight java %}
import org.graphstream.graph.Graph;
import org.graphstream.graph.implementations.DefaultGraph;
import org.graphstream.stream.file.FileSource;

public class TutorialFileSource {
	public static void main(String ... args) {
		Graph g = new DefaultGraph("g");
		FileSource fs = ... ;

		fs.addSink(g);

		...
	}
}
{% endhighlight %}


## Read a whole file in a single instruction

FileSource provides ``readAll(XXX)`` methods which can be used with
an InputStream, a Reader, or just a file path.

{% highlight java %}
Graph g = ... ;
FileSource fs = ... ;

fs.addSink(g);

try {
	fs.readAll("path/to/my/graph");
} catch( IOException e) {
	...
} finally {
	fs.removeSink(g);
}
{% endhighlight %}


## Read a file event-by-event

Event-by-event reading is done using three methods :

1. ``begin(xxx)``, where ``xxx`` is an InputStream, a Reader or a String;
   this method is used to open the source, possibly by producing some
   events;
2. ``nextEvents()`` or ``nextStep()`` : read some events; ``nextStep()``
   can be used in format supporting time step to read a block of events, in
   the DGS format for example;
3. ``end()`` : close the source and attached ressources.

Reading can be done in this way :

{% highlight java %}
Graph g = ... ;
FileSource fs = ... ;

fs.addSink(g);

try {
	fs.begin("path/to/my/graph");

	while (fs.nextEvents()) {
	// Optionally some code here ...
	}
} catch( IOException e) {
	...
}

// Here we use a second try/catch block rather than a big one
// to be sure to call the end() method even if there is some
// troubles while reading events.
try {
	fs.end();
} catch( IOException e) {
	...
} finally {
	fs.removeSink(g);
}
{% endhighlight %}


## File source factory

It is possible to let GraphStream choose the right file source to
read a file using FileSourceFactory :

{% highlight java %}
Graph g = ... ;
FileSource fs = FileSourceFactory.sourceFor("path/to/my/file");

...
{% endhighlight %}


##Full example code

{% highlight java %}
import org.graphstream.graph.Graph;
import org.graphstream.graph.implementations.DefaultGraph;
import org.graphstream.stream.file.FileSource;
import org.graphstream.stream.file.FileSourceFactory;

import java.io.IOException;

public class TutorialFileSource {

	public static void main(String ... args) {
		String filePath = "...";
		Graph g = new DefaultGraph("g");
		FileSource fs = FileSourceFactory.sourceFor(filePath);

		fs.addSink(g);

		try {
			fs.begin(filePath);

			while (fs.nextEvents()) {
				// Optionally some code here ...
			}
		} catch( IOException e) {
			e.printStackTrace();
		}

		try {
			fs.end();
		} catch( IOException e) {
			e.printStackTrace();
		} finally {
			fs.removeSink(g);
		}
	}
}
{% endhighlight %}


