---
title: GraphStream v2.0-alpha Release
layout: news
---

We are proud to announce an alpha release of the **version 2** of GraphStream.

In this release a few modification of the public API appeared. Mainly, the use of Java  8 Streams is generalized in GraphStream. New `Stream` methods on graphs, nodes and edges appear when applicable:

```java
graph.nodes().forEach(node -> System.out::println);
```

The main visible feature is a complete rewrite of the user interface. You now have the possibility to use *Swing* (complete Java rewrite) and *Java FX*.

Test it on your project, update your maven dependency using *jitpack.io*. Simply add the `jitpack` repository to your `pom.xml`:

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

then, add the `gs-core` to your dependencies:

```xml
<dependency>
    <groupId>com.github.graphstream</groupId>
    <artifactId>gs-core</artifactId>
    <version>2.0-alpha</version>
</dependency>
```

