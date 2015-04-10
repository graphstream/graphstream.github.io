---
title: The DGS File Format Specification
layout: documentation
docpath: Advanced Concepts|/doc/Advanced-Concepts/
permalink: /doc/Advanced-Concepts/The-DGS-File-Format/1.0/
redirect_from: /doc/Advanced-Concepts/The-DGS-File-Format_1.0/
latest: /doc/Advanced-Concepts/The-DGS-File-Format/
---

DGS is a file format allowing to store graphs and dynamic graphs in a textual human readable way, yet with a small size allowing to store large graphs. Graph dynamics is defined using events like adding, deleting or changing a node or edge. With DGS, graphs will therefore be seen as stream of such events.


## Introduction

Files following the DGS format are textual files (ASCII, UTF-8, etc.) that may be compressed using gzip. Indeed it is often useful and advantageous to compress dynamic graph streams because of their large redundancy and often very large size. The gzip format has been chosen since it is easily streamable and easy to use in Java. For example to open a gzip-ed file in Java and read its contents as any other textual file, one can use the following code snippet:

{% highlight java %}
    BufferedReader buffer = new BufferedReader(
        new InputStreamReader(
                new GZIPInputStream(
                        (InputStream)new FileInputStream("filename"))));
{% endhighlight %}

DGS sees graphs as composed of nodes and edges. These elements can however be equipped with attributes. Attributes can be arbitrary strings, numbers, or vectors of strings or numbers. There can be any number of attributes per node and edge.


## Syntax

The format is composed of a header and a body. The header contains two lines defining the format version and the graph name and optional lengths. The body contains the events descriptions that will make up the graph stream.

The body is made of a sequence of steps containing zero or more events. Steps allow to introduce a notion of time inside the graph stream. One tick of the clock will pass at each step, and all the events in one step can be considered occurring at the same time. It is however possible to omit step events or to add a step event between each event, as needed.

Each event stands on one line terminated by a line separator. Each field on each line of the header and body is separated by one or more spacing characters.

Comments are allowed everywhere in the file excepted in the header. The two first lines of the file must therefore be free of any comment and must not be preceded by any blank lines.


### The Header

The first line contains a magic cookie defining the file format. This line is invariant for each file in the DGS file format for a given version. It changes from version to version. Actually 003 is the latest:

	DGS003

The second line contains three fields, the graph name followed by the number of steps and hen the total number of events in the graph. Theses numbers are only indicative and may be both set to zero. However, if known, they can describe the stream duration in number of steps (clock ticks) and number of events. In the example under, the graph name is myDynGraph, the number of steps is 2000 and there are 100000 events total.

	myDynGraph 2000 100000


### The Body

Hereafter are listed the events one can encounter inside a graph stream. Some of these events can take parameters (also known as attributes). Parameters allows to define what values will be stored in a node or edge. A parameter is made of a name and a value. They are separated by a : (colon) or = (equal) sign. The accepted values are strings (any sequence of character enclosed by " (double quote) characters), numbers, single words (like strings but without quotes since they do not contain spaces) and vectors. A vector is a sequence of strings, words or numbers separated by the , (comma) character. Vectors can contain heterogeneous elements (mix of strings, words and numbers).

Here is the list of possible events:


``st``. Allows to define a new step (clock tick). The number that follows allows to identify the step. The number is only indicative and is arbitrary. The DGS graph reader does not reorder events according to this number. 
    For the first step for example:

	st 0
	
``an``. Allows to add a node. The command is followed by the unique node identifier allowing to identify this node compared to others. This name can be a single word or a string delimited by the double quote character. Other fields allow to define parameters. 

    The following example adds a node with identifier n1 and valuesx=3.14159265+ and as parameters:

	an n1 x=3.14159265 y=1.61803399
 
``cn``. Allows to modify attributes values for a node. 

    In this example we modify the n1 node attributes (notice that we use ":" as separater for parameters, both "=" and ":" are allowed)::

	cn n1 x:3 y:1

``dn``. Allows to delete a node. 

    In the example we delete the n1 node:

	dn n1
 
``ae``. Allows to add an edge. This command must be followed by the unique identifier of the edge, and then the identifiers of two other nodes. As for nodes, you can specify a parameter list. It is possible to create directed edges by adding a ">" (greater-than) or "<" (smaller-than) character between the nodes identifiers. This indicates the direction of the edge. When no "<" or ">" is present, the edge is not directed. 

    The following examples creates an edge with identifier e1 between nodes n0 and n1 with a parameter weight and another edge e2 between nodes n1 and n2 that is directed from n1 to n2::

	ae e1 n0 n1 weight=23
	ae e2 n1 > n2 weight:40

``ce``. As for nodes, allows to modify the parameters of the edge. 

The following example change the weight parameter of the e1 edge::

 ce e1 weight=10

``de``. Allows to delete an edge.

    Example:

	de e1


## Miscellany

The format accepts empty lines, even if they contain spaces. It is possible to use the # character to introduce comments that will last until the end of the line where they appear. A line containing a single comment will be ignored, but it is possible to add comments at the end of a line.

## Compatibility With Previous Versions

This version of the DGS file format, 003, is not compatible with the first and second versions of the format. The GraphStream library proposes graph readers for the old formats as well as for the new. It only provides a writer for the 003 version.

## Examples

One of the simplest examples is the graph that forms a triangle:

	DGS003
	triangle 0 6
	an A
	an B
	an C
	ae AB A B
	ae BC B C
	ae CA C A

The same with directed edges:

	DGS003
	triangled 0 6
	an A
	an B
	an C
	ae AB A > B
	ae BC B < C
	ae CA C > A

The same with position attributes:

	DGS003
	triangledp 0 6

	an A x:0   y:0
	an B x:1   y=0
	an C x=0.5 y=1

	ae AB A > B
	ae BC B < C
	ae CA C > A

The same with more attributes (examples of vector attributes):

	DGS003
	triangledpm 0 6

	an A x:0   y:0
	an B x:1   y=0
	an C x=0.5 y=1

	ae AB A > B weight:1 values=1,3,5,none
	ae BC B < C weight:5 values=none,2,4,6
	ae CA C > A weight:2 values=none,1

