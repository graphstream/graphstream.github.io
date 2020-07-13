---
title: GraphStream & Maven
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/GraphStream-Maven/
redirect_from: /doc/Tutorials/GraphStream-Maven_1.1/
---

## What you have to know about Maven

Maven is a tool to help you managing a project. It allows
to compile, test and package projects. It also provides
a way to manage dependencies by automaticaly looking for
your project dependencies in a remote repository and
installing them on your local repository ("``~/.m2/repository``"
on unix systems).

You can find more informations about [Maven at Wikipedia](https://en.wikipedia.org/wiki/Apache_Maven).

Maven defines *goals* that are tasks to be performed and
that are included in a build lifecycle. Initially, this
lifecycle is:

1. process-resources
2. compile
3. process-test-resources
4. test-compile
5. test
6. package
7. install
8. deploy

Interesting goals here are *compile*, *test*, *package* and
*install*. *compile* is trivial to understand : it
compiles classes of your project. *test* compiles test-classes
of your project and runs these test (using junit).
*package* creates packaged distribution of your project and
*install* installs your project in your local maven
repository.

Description about "how to build your project" are contained
in a [Project Object Model](https://en.wikipedia.org/wiki/Project_Object_Model) (POM) using the XML format. Have
a look on "gs-core/pom.xml" for an example. Dependencies of your project are set in this POM.

from version 2.0, we use (https://jitpack.io) to release the new versions of Graphstream.
JitPack is a novel package repository for JVM and Android projects. It builds Git projects on demand and provides 
artifacts.

Each project, called *artifact*, is identified by three informations :

1. a group id, it allows to group several artifacts together. For example ``org.graphstream`` is common to every GraphStream artifact;
2. an artifact id, for example ``gs-core``, this id has to be unique according to the group;
3. and a version, ``1.1``.

These informations are defined in the POM using the following
tags

```xml
<project>
	...
	<artifactId>gs-core</artifactId>
	<groupId>org.graphstream</groupId>
	<version>1.1</version>
	...
</project>
```

These informations have to be used to define dependencies. However, from the version 2.0,
these informations need to be adjusted according github artifacts.

First, you need to add the jitpack repository to your POM:

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

Then you can define your dependencies :

```xml
<project>
	...
	<!-- Start list of dependencies -->
	<dependencies>
	<!-- Add a com.github/graphstream/gs-core/2.0 as dependency -->
		<dependency>
			<groupId>com.github.graphstream</groupId>
			<artifactId>gs-core</artifactId>
			<version>2.0</version>
			<optional>false</optional>
		</dependency>
	</dependencies>
	...
</project>
```

### Using snapshot versions

A snapshot is a version of Graphstream that has not been released. The difference between a real version 
and a snapshot is that snapshot might still get updates. 
Snapshot versions are useful during development process. To use them you can add
the branch name followed by -SNAPSHOT in the version.

```xml
<dependency>
    <groupId>com.github.graphstream</groupId>
    <artifactId>gs-core</artifactId>
    <version>dev-SNAPSHOT</version>
</dependency>
```

## Building GraphStream using Maven

To install any ``gs-xxx`` module, just follow the process above,
starting by ``gs-core``:

```bash
git clone git://github.com/graphstream/gs-xxx.git
cd gs-xxx
# to pull changes if project has been already cloned
git pull
mvn install
```

In the case where only the build of the package is needed, just run
the:

```bash
mvn package
```

in the module directory. This will produce a ``gs-xxx-version.jar``
in ``gs-xxx/target`` that you can use directly. Be careful, this jar
does not include dependencies, for example, building the jar of
``gs-core`` does not include classes of ``mbox2`` and ``pherd``.

From version 2, an additional jar is provided with dependencies : `gs-core-2.0.0-SNAPSHOT-jar-with-dependencies.jar`


## Using non-maven jar in a Maven project

If you want to use a jar which is not in Maven repository, you can install it directly, providing meta-informations. Just use the following command (replacing `$GroupId`, `$ArtifactId` and `$Version` with the correct values) :

```bash
mvn install:install-file -Dfile=MyJar.jar -DgroupId=$GroupId -DartifactId=$ArtifactId -Dversion=$Version -Dpackaging=jar
```
Next, you will be able to use this jar as a Maven dependency in your project.

### Other version of this document

- [GraphStream 1.3](/doc/Tutorials/GraphStream-Maven/1.3/)
