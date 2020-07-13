---
title: Why mouseOver/mouseLeft methods does not work ? Why I can't select edges ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/why-mouse-options-does-not-work/index.html
---

By default, in order to save resources, some features have been disabled. These include the edge selection, the mouseOver, and mouseLeft functions.
If you want to activate them, you can use the  ``enableMouseOptions`` method of ``View``:

```java
viewer.getDefaultView().enableMouseOptions();
```

See also [Graph visualisation](/doc/Tutorials/Graph-Visualisation/).

