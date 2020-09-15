---
title: Source Repository
permalink: /doc/Source-Repository/
layout: documentation
versions: 1.3
---

GraphStream uses [git](http://git-scm.com/) to manage its sources. If you are not familiar with this
revision control system, you could find a tutorial [here](http://www.kernel.org/pub/software/scm/git/docs/gittutorial.html).

GraphStream is divided into several sub-modules organized as separate repositories. The main ones are :

- ``gs-core``
- ``gs-algo``
- ``gs-ui-swing``
- ``gs-ui-javafx``
- ``gs-ui-android``

``gs-core`` is the base of GraphStream which contains graph implementations and file readers and writers. Advances graph related algorithms are located in the  ``gs-algo`` package. Visualization requires the a ui (user interface) package such as `gs-ui-swing` `gs-ui-javafx` or `gs-ui-android`. These ui packages are named after the technology used to develop them. 

Public repositories of GraphStream are hosted on [github](https://www.github.com/graphstream/).

## Clone a GraphStream repository

To retrieve sources of GraphStream, you have to clone the corresponding repository.
You have to use the following command :

{% highlight bash %}
git clone git://github.com/graphstream/gs-xxx.git
{% endhighlight %}

where ``gs-xxx`` is one of the aforementioned package names.
  
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

## Other version of this document

- [GraphStream 1.3](/doc/Source-Repository/1.3/)