---
title: Why mouse interaction does not work on javafx ?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/why-mouse-does-not-work-javafx/
redirect_from: /doc/FAQ/The-graph-viewer/why-mouse-does-not-work-javafx 1.0/
---

Most of the time, it's because the elements are added in the same panel as the graph, and due to that, the view panel cannot get the right coordinates.
You can easily prevent that by providing the graph its own panel:

```java
FxViewer view = new FxViewer(graph, FxViewer.ThreadingModel.GRAPH_IN_ANOTHER_THREAD);
FxViewPanel panel = (FxViewPanel) view.addView(FxViewer.DEFAULT_VIEW_ID, new FxGraphRenderer());
		
StackPane graphPane = new StackPane();
graphPane.getChildren().addAll(panel); // prevent UI shift issues
```

