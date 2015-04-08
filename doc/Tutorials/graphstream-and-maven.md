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

Each project, called *artifact*, is identified by three informations :

1. a group id, it allows to group several artifacts together. For example ``org.graphstream`` is common to every GraphStream artifact;
2. an artifact id, for example ``gs-core``, this id has to be unique according to the group;
3. and a version, ``1.1``.

These informations are defined in the POM using the following
tags

{% highlight xml %}
<project>
	...
	<artifactId>gs-core</artifactId>
	<groupId>org.graphstream</groupId>
	<version>1.1</version>
	...
</project>
{% endhighlight %}

These informations have to be used to define dependencies

{% highlight xml %}
<project>
	...
	<!-- Start list of dependencies -->
	<dependencies>
	<!-- Add a org.graphstream/gs-core/1.1 as dependency -->
		<dependency>
			<groupId>org.graphstream</groupId>
			<artifactId>gs-core</artifactId>
			<version>1.1</version>
			<optional>false</optional>
		</dependency>
	</dependencies>
	...
</project>
{% endhighlight %}


## Building GraphStream using Maven

### Install dependencies

First, you have to get depencies module of the ``gs-core``,
named ``gs-deps``. It can be cloned from git using :

{% highlight bash %}
git clone git://github.com/graphstream/gs-deps.git
{% endhighlight %}

If you already have cloned ``gs-deps`` and just want to make an update
of it, try to pull changes (if any):

{% highlight bash %}
cd gs-deps
git pull
{% endhighlight %}

Next step is to build and install the artifact. Just go into the
artifact directory and run:

{% highlight bash %}
cd gs-deps
mvn install
{% endhighlight %}

This will compile, package and install the project into your local
repository, so it will reachable by other project.


### Install ``gs-core`` and other modules

To install any ``gs-xxx`` module, just follow the process above,
starting by ``gs-core``:

{% highlight bash %}
git clone git://github.com/graphstream/gs-xxx.git
cd gs-xxx
git pull /* to pull changes if project has been already cloned */
mvn install
{% endhighlight %}

In the case where only the build of the package is needed, just run
the:

{% highlight bash %}
mvn package
{% endhighlight %}

in the module directory. This will produce a ``gs-xxx-version.jar``
in ``gs-xxx/target`` that you can use directly. Be carefull, this jar
does not include dependencies, for example, building the jar of
``gs-core`` does not include classes of ``mbox2`` and ``pherd``.


### Activate optional profiles

POM allows to define profiles that can be activated while the project
is being built. The following is the list of available profiles.

#### ``nodeps`` profile

Available in ``gs-core`` and ``gs-ui``. It allows to include some
dependencies in the final jar 

#### ``proguard`` profile

#### ``release`` profile

## Create a new project using GraphStream with the help of Maven

### Get the Project Object Model skeleton

If you are not familiar with POM, you can download a skeleton from the
site: [pom.xml]({{ site.media }}/skeleton/pom.xml).

### Set project informations

You have to redefine the following informations in the pom:

* artifactId
* groupId (optional)
* version
* name
* description
* url

{% highlight xml %}
<project>
	<!-- artifactId, groupId and version are need. -->
	<artifactId>gs-powaa</artifactId>
	<groupId>org.graphstream</groupId>
	<version>0.1-SNAPSHOT</version>

	<!-- Name, description and url are optional.
	 You can remove these sections. -->
	<name>gs powaa project</name>
	<description>This project use all the GraphStream powaa.</description>
	<url>http://gs-powaa.graphstream-project.org</url>

	...
</project>
{% endhighlight %}

If your project needs more dependency that ``gs-core``, you have to add
these dependencies in the ``dependencies`` section. You can have a look
to `Maven Search <http://search.maven.org/>`_ to find artifacts you need.

For example, if you need the 2.1 version of ``commons-math`` from Apache,
you can make a search on the previous link and find the informations about
this artifact (org.apache.commons:commons-math:2.1). Then you just have to
add the dependency in the ``dependencies`` section

{% highlight xml %}
<project>
	...
	<dependencies>
		<dependency>
			<artifactId>gs-core</artifactId>
			<groudId>org.graphstream</groupId>
			<version>1.0</version>
			<optional>false</optional>
		</dependency>

		<!-- The new dependency : -->
		<dependency>
			<artifactId>commons-math</artifactId>
			<groupId>org.apache.commons</groupId>
			<version>2.1</version>
			<optional>false</optional>
		</dependency>
	</dependencies>
</project>
{% endhighlight %}

More informations are done as comments in the ``pom.xml`` skeleton.

### Use your Maven project in Eclipse [optional]

#### Configure Eclipse

When creating the classpath of your project, Maven references
dependencies from your Maven local repository as the classpath
variable "M2_REPO".

This variable has to be defined in your Eclipse settings to allow
Eclipse to find the dependencies.

This can be done with the following command :

{% highlight bash %}
mvn eclipse:configure-workspace
{% endhighlight %}


#### Generate Eclipse project files

Once the project informations have been set in the POM, you can tell
Maven to generate the Eclipse project files (.classpath, .project)
with the following command :

{% highlight bash %}
mvn eclipse:eclipse
{% endhighlight %}

Then, go to Eclipse and select "import" in the file menu. Choose
"Existing projects into workspace" and select your project directory.


#### Alternatively, use a Maven artifact in your build path

Once your workspace in configured using the previous command, you can
directly add a maven artifact in the build path of your eclipse
project.

First, right-click on your eclipse project and go the build path
configuration. Then click on "*Add Variable*" in the "*Librairies*"
tab.

![Screenshot 1]({{ site.content_img }}/eclipse-set-variable-part1.jpg)

Select the "*M2_REPO*" variable and click on "*Extend*".

![Screenshot 2]({{ site.content_img }}/eclipse-set-variable-part2.jpg)

Final step is to select the artifact you want to use.

![Screenshot 3]({{ site.content_img }}/eclipse-set-variable-part3.jpg)

If the artifact you want to use is not in your local Maven repository,
you can download it using the following command ::

{% highlight bash %}
mvn dependency:get -Dartifact=groupId:artifactId:version -DrepoUrl=http://repo1.maven.org/maven2/
{% endhighlight %}

replacing ``groupId``, ``artifactId`` and ``version`` by those of
the artifact you want.

## Using snapshot versions of GraphStream

### a. by extending oss pom

You just have to set the ``parent`` section in the POM of your project :

{% highlight xml %}
	<parent>
		<groupId>org.sonatype.oss</groupId>
		<artifactId>oss-parent</artifactId>
		<version>7</version>
	</parent>
{% endhighlight %}

Then, use the snapshot version of GraphStream in your dependencies :

{% highlight xml %}
	<dependency>
		<groupId>org.graphstream</groupId>
		<artifactId>gs-algo</artifactId>
		<version>1.2-SNAPSHOT</version>
		<optional>false</optional>
	</dependency>
{% endhighlight %}


### b. by adding snapshot repositories

You have to add the Sonatype snapshot repository in your POM :

{% highlight xml %}
	<repositories>
		<repository>
			<releases>
				<enabled>false</enabled>
				<updatePolicy>always</updatePolicy>
				<checksumPolicy>warn</checksumPolicy>
			</releases>
			<snapshots>
				<enabled>true</enabled>
				<updatePolicy>never</updatePolicy>
				<checksumPolicy>fail</checksumPolicy>
			</snapshots>
			<id>sonatype-nexus-snapshots</id>
			<name>Sonatype Nexus Snapshots</name>
			<url>https://oss.sonatype.org/content/repositories/snapshots</url>
			<layout>default</layout>
		</repository>
	</repositories>
{% endhighlight %}

Then, use the snapshot version of GraphStream in your dependencies :

{% highlight xml %}
	<dependency>
		<groupId>org.graphstream</groupId>
		<artifactId>gs-algo</artifactId>
		<version>1.2-SNAPSHOT</version>
		<optional>false</optional>
	</dependency>
{% endhighlight %}

