---
title: Source Repository
permalink: /doc/Source-Repository/1.3/
layout: documentation
latest: /doc/Source-Repository/

---

GraphStream uses [git](http://git-scm.com/) to manage its sources. If you are not initiated to this
revision control system, you could find a tutorial [here](http://www.kernel.org/pub/software/scm/git/docs/gittutorial.html).

GraphStream is divided into several modules, and there is a repository for each of them. The main ones are :

- ``gs-core``
- ``gs-algo``
- ``gs-ui``

``gs-core`` is the base of GraphStream which is all you need to read a graph
and display it easily. ``gs-algo`` contains extra algorithms which can be run
on a graph. ``gs-ui`` provides other graphic viewers and will contain sources for graphical tools.

Actually, public repositories of GraphStream are hosted on [github](https://www.github.com/graphstream/).


## Clone a GraphStream repository

To retrieve sources of GraphStream, you have to clone the corresponding repository.
You have to use the following command :

{% highlight bash %}
git clone git://github.com/graphstream/gs-xxx.git
{% endhighlight %}

where ``xxx`` is one of 

- ``core``
- ``algo``
- ``ui``

Git will create a new directory ( named ``gs-xxx`` ) and download files of the
repository. This cloned repository is in read-only mode, so you can not push changes
you will bring on files.


## Work with the team on a repository

First you have to be registered on github and to be added as a gs-developer.
Then, you have to clone the repository in ssh-mode:

{% highlight bash %}
git clone git@github.com:graphstream/gs-core.git
{% endhighlight %}

Then you can bring changes to files. To learn how to commit your changes on the repository, you can read the "*Making changes*" part of the [git tutorial](http://www.kernel.org/pub/software/scm/git/docs/gittutorial.html).

