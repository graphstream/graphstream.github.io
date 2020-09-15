---
title: Why do I get NullPointerException with JavaFX UI?
layout: documentation
docpath: FAQ|/doc/FAQ/,The graph viewer|/doc/FAQ/The-graph-viewer/
permalink: /doc/FAQ/The-graph-viewer/null-pointer-exeption-javafx/
---

I get this error:

```sh
java.lang.NullPointerException
    at com.sun.javafx.tk.quantum.QuantumToolkit.resumeTimer (QuantumToolkit.java:513)
    at com.sun.javafx.tk.quantum.QuantumToolkit$PulseTask.set (QuantumToolkit.java:204)
    at com.sun.javafx.tk.quantum.QuantumToolkit.setAnimationRunnable (QuantumToolkit.java:884)
    at com.sun.javafx.tk.quantum.MasterTimer.postUpdateAnimationRunnable (MasterTimer.java:105)
    at com.sun.scenario.animation.AbstractMasterTimer$MainLoop.updateAnimationRunnable (AbstractMasterTimer.java:324)
    at com.sun.scenario.animation.AbstractMasterTimer.addPulseReceiver (AbstractMasterTimer.java:176)
    at javafx.animation.Animation.addPulseReceiver (Animation.java:148)
    at javafx.animation.Animation.startReceiver (Animation.java:154)
    at javafx.animation.Animation.play (Animation.java:912)
    at org.graphstream.ui.fx_viewer.FxViewer.lambda$init$1 (FxViewer.java:220)
    at java.lang.Thread.run (Thread.java:830)
```


Somehow, your java program starts before the JavaFX engine. Use the following system property in order to delay the start of the viewer:

```
org.graphstream.debug=true
```



