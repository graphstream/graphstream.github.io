---
title: The DGS File Format Specification
layout: documentation
docpath: Advanced Concepts|/doc/Advanced-Concepts/
permalink: /doc/Advanced-Concepts/The-DGS-File-Format/
redirect_from: /doc/Advanced-Concepts/The-DGS-File-Format_1.1/
versions: "1.0"
---

DGS is the default file format for GraphStream. This documentation documents the
version 4 of the format, which is compatible with version 1.0 of GraphStream.
GraphStream supports all of the previous versions of DGS.


## Introduction

DGS is a file format allowing to store graphs and dynamic graphs in a textual
human readable way, yet with a small size allowing to store large graphs. Graph
dynamics is defined using events like adding, deleting or changing a node or
edge or adding, changing and removing attributes on the graph, nodes or edges.
With DGS, graphs will therefore be seen as stream of such events.


## Compression

Files following the DGS format are textual files (ASCII, UTF-8, etc.) that may
be compressed using gzip. Indeed it is often useful and advantageous to
compress dynamic graph streams because of their large redundancy and often very
large size. The gzip format has been chosen since it is easily streamable and
easy to use in Java. For example to open a gzip-ed file in Java and read its
contents as any other textual file, one can use the following code snippet:

```java
BufferedReader buffer = new BufferedReader(new InputStreamReader(new GZIPInputStream((InputStream)new FileInputStream("filename"))));
```

Naturally, GraphStream automatically supports gzip-ed files.


## Syntax

DGS sees graphs as composed of nodes and edges. These elements can however be
equipped with attributes. Attributes can be arbitrary strings, numbers, or
vectors of strings or numbers. There can be any number of attributes per node
and edge or per graph.

The format is composed of a header and a body. The header contains two lines
defining the format version and the graph name and optional lengths. The body
contains the events descriptions that will make up the graph stream.

The body is made of a sequence of steps containing zero or more events. Steps
allow to introduce a notion of time inside the graph stream. One tick of the
clock will pass at each step, and all the events in one step can be considered
occurring at the same time (although, their order is preserved). It is however
possible to omit step events or to add a step event between each event, as
needed.

Each event stands on one line terminated by a line separator. Each field on
each line of the header and body is separated by one or more spacing characters
(spaces and tabulations).

Comments are allowed everywhere in the file excepted in the header. The two
first lines of the file must therefore be free of any comment and must not be
preceded by any blank lines.


### The Header

The first line contains a magic cookie defining the file format. This line is
invariant for each file in the DGS file format for a given version. It changes
from version to version. Actually 004 is the latest:

	DGS004

The second line contains three fields, the graph name followed by the number of
steps and hen the total number of events in the graph. Theses numbers are only
indicative and may be both set to zero. However, if known, they can describe
the stream duration in number of steps (clock ticks) and number of events. In
the example under, the graph name is myDynGraph, the number of steps is 2000
and there are 100000 events total:

	myDynGraph 2000 100000

This line is deprecated in GraphStream 1.0 and is now maintained only for
compatibility reasons. Indeed DGS is a streamable format, and it is often very
difficult to know by advance the number of events and steps that will be
produced in the rest of the file. It is however still mandatory actually, but
it will disappear in version 5 of the format. You can use:

	null 0 0


### The Body

Hereafter are listed the events one can encounter inside a graph stream. Some
of these events can take parameters (also known as attributes). Parameters
allows to define what values will be stored in a node or edge. A parameter is
made of a name and a value. They are separated by a : (colon) or = (equal)
sign.

The accepted values are strings (any sequence of character enclosed by "
(double quote) characters), numbers, single words (like strings but without
quotes since they do not contain spaces), vectors and colors. A vector is a
sequence of strings, words or numbers separated by the , (comma) character.
Vectors can contain heterogeneous elements (mix of strings, words, numbers and
colors). A color is signaled by a dash # symbol followed by six hexadecimal
numbers, two for the red, two for green and two for blue components of the
color (#FF00FF is cyan for example). It can optionally contain height
hexadecimal numbers, adding two numbers for the alpha component (transparency, #FF00FF88
is half transparent cyan).

Here is the list of possible events:

``st``
    Allows to define a new step (clock tick). The number that follows allows to
    identify the step. The number is only indicative and is arbitrary, but is a
    real number, stored as a double (this may change in next versions). The DGS
    graph reader does not reorder events according to this number.

    For the first step for example:

	st 0

``an``
    Allows to add a node. The command is followed by the unique node identifier
    allowing to identify this node compared to others. This name can be a
    single word or a string delimited by the double quote character. Other
    fields allow to define parameters.

    The following example adds a node with identifier ``n1`` and values
    ``x=3.14159265`` and ``y=1.61803399`` as attributes:

	an n1 x=3.14159265 y=1.61803399

``cn``
    Allows to modify attributes values for a node.

    In this example we modify the ``n1`` node attributes (notice that we use ":" as
    separator for parameters, both "=" and ":" are allowed):

	cn n1 x:3 y:1

    You can also remove an existing attribute by prefixing its identifier with
    a minus sign:

	cn n1 -x -y

    In this example we remove the ``x`` and ``y`` attributes.

``dn``
    Allows to delete a node.

    In the example we delete the ``n1`` node:

	dn n1
 
``ae``
    Allows to add an edge. This command must be followed by the unique
    identifier of the edge, and then the identifiers of two other nodes. As for
    nodes, you can specify a parameter list. It is possible to create directed
    edges by adding a ">" (greater-than) or "<" (smaller-than) character
    between the nodes identifiers. This indicates the direction of the edge.
    When no "<" or ">" is present, the edge is not directed.

    The following examples creates an edge with identifier ``e1`` between nodes
    ``n0`` and ``n1`` with a parameter weight and another edge ``e2`` between
    nodes ``n1`` and ``n2`` that is directed from ``n1`` to ``n2``:

	ae e1 n0 n1 weight=23
	ae e2 n1 > n2 weight:40

``ce``
    As for nodes, allows to modify the parameters of the edge.

    The following example change the weight parameter of the ``e1`` edge:

	ce e1 weight=10

    As for nodes, you can also remove attributes by prefixing the attribute
    identifier by a minus sign.

``de``
    Allows to delete an edge.

    Example:

	de e1

``cg``
     Changes the attributes of a graph.

    As for nodes (``cn``) an edges (``ce``), this allows to add or remove attributes
    directly on the graph. As usual, you can remove an attribute by prefixing
    its identifier by a minus sign.

``cl``
    Clear the whole graph.


## Miscellany

The format accepts empty lines, even if they contain spaces. It is possible to
use the # character to introduce comments that will last until the end of the
line where they appear. A line containing a single comment will be ignored, but
it is possible to add comments at the end of a line.


## Compatibility With Previous Versions

This version of the DGS file format, 004, is compatible with version 003, but
is not compatible with the first and second versions of the format. The
GraphStream library proposes graph readers for the old formats as well as for
the new. It only provides a writer for the 004 version.

## Examples

One of the simplest examples is the graph that forms a triangle:

	DGS004
	triangle 0 6
	an A
	an B
	an C
	ae AB A B
	ae BC B C
	ae CA C A

The same with directed edges:

	DGS004
	triangled 0 6
	an A
	an B
	an C
	ae AB A > B
	ae BC B < C
	ae CA C > A

The same with position attributes:

	DGS004
	triangledp 0 6

	an A x:0   y:0
	an B x:1   y=0
	an C x=0.5 y=1

	ae AB A > B
	ae BC B < C
	ae CA C > A

The same with more attributes (examples of vector attributes):

	DGS004
	triangledpm 0 6

	an A x:0   y:0
	an B x:1   y=0
	an C x=0.5 y=1

	ae AB A > B weight:1 values=1,3,5,none
	ae BC B < C weight:5 values=none,2,4,6
	ae CA C > A weight:2 values=none,1


## The DGS formal specification

The grammar for the DGS format is given below in BNF notation::

```ebnf
    <DGS>        ::= <header> ( <event> | <comment> | <EOL> )*
    <header>     ::= <magic> <EOL> <id> <int> <int> <EOL>
    <magic>      ::= "DGS004" | "DGS003"
    <event>      ::= ( <an> | <cn> | <dn> | <ae> | <ce> | <de> | <cg> | <st> | <cl> ) ( <comment> | <EOL> )
    <an>         ::= "an" <id> <attributes>
    <cn>         ::= "cn" <id> <attributes>
    <dn>         ::= "dn" <id>
    <ae>         ::= "ae" <id> <id> ( <direction> )? <id> <attributes>
    <ce>         ::= "ce" <id> <attributes>
    <de>         ::= "de" <id>
    <cg>         ::= "cg" <attributes>
    <st>         ::= "st" <real>
    <cl>         ::= "cl"
    <attributes> ::= ( <attribute> )*
    <attribute>  ::= ( "+" | "-" )? <id> ( <assign> <value> ( "," <value> )* )?
    <value>      ::= <string> | <real> | "" | <array> | <map>
    <array>      ::= "{" ( <value> ( "," <value> )* )? "}"
    <map>        ::= "[" ( <mapping> ( "," <mapping> )* )? "]"
    <mapping>    ::= <id> <assign> <value>
    <direction>  ::= '<' | '>' | ''
    <assign>     ::= '=' | ':'
    <id>         ::= <string> | <int> | <word> ( '.' <word> )*

    <comment>    ::= "#" ( . )* <EOL>
    <int>        ::= '0' | ( '1' .. '9' ) ( '0' .. '9' )*
    <real>       ::= <int> ( "." ( "0" )* <int> )?
    <word>       ::= ( 'a' .. 'z' | 'A' .. 'Z' ) ( 'a' .. 'z' | 'A' .. 'Z' | '0' .. '9' | '-' | '_' )*
    <string>     ::= '"' ( [^'"'] | '\"' )* '"'
```
