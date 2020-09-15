---
title: Install GraphStream  
layout: documentation
permalink: /doc/Install/
---


GraphStream is a Java library that comes with a pre-packaged jar file named `gs-core.jar`. This file  contains the basic GraphStream classes (no user interface, non algorithms). To start using it, simply put it in your class path.

User interfaces (ui), graph algorithms and other features are packaged in their respective projects/packages. See each individual sub-project for installation details : <https://github.com/graphstream/>.

## Install Major Releases

You can download GraphStream on the [github releases pages](https://github.com/graphstream/gs-core/releases/), or on the website <http://www.graphstream-project.org/download>.

But the preferred way to install GraphStream is through a build tool such as [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/).

GraphStream major releases are distributed on the Maven Central Repository so you only need to specify the dependency through its group and artifact ids.

```xml
<dependency>
    <groupId>org.graphstream</groupId>
    <artifactId>gs-core</artifactId>
    <version>2.0</version>
</dependency>
```

## Install Nightly Builds / Development Branches

For specific needs, development version can be used through the build tools using [JitPack](https://jitpack.io/#graphstream/gs-core)

In order to use JitPack one need to specify the repository:

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

then the dependency:

```xml
<dependency>
    <groupId>com.github.graphstream</groupId>
    <artifactId>gs-core</artifactId>
    <version>Tag</version>
</dependency>
```

You can use any version of `gs-core` you need. Simply specify the desired version in the `<version>` tag. The version can be a git tag name (e.g. `2.0`), a commit number, or a branch name followed by `-SNAPSHOT` (e.g. `dev-SNAPSHOT`). More details on the [possible versions on jitpack](https://jitpack.io/#graphstream/gs-core). THe same goes for any other GraphStream project (`gs-algo`, `gs-ui-swing`, `gs-javafx`, etc.)
