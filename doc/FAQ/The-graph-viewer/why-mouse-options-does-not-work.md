---
title: Why mouseOver/mouseLeft methods does not work ? Why I can't select edges ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/why-mouse-options-does-not-work/
redirect_from: /doc/FAQ/The-graph-viewer/why-mouse-options-does-not-work 1.0/
---

By default, certain measures have been taken to save resources. These include the edge selection and the over/left function.
If you want to activate them, you can use the method ``enableMouseOptions`` of ``View``:

```java
viewer.getDefaultView().enableMouseOptions();
```

See also [Graph visualisation](/doc/Tutorials/Graph-Visualisation/).

