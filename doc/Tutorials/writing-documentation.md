---
title: Writing Documentation
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/Writing-Documentation/
---

GraphStream uses [GitHub Pages](https://pages.github.com/) to manage its documentation. The GitHub Pages process combines a git repository containing your documentation and the [Jekyll](https://jekyllrb.com/) platform to create a website from this documentation. The latter is written using the [Markdown](https://en.wikipedia.org/wiki/Markdown) markup language (but you can use HTML directly). For example, just have a look to [the source of this tutorial](https://raw.githubusercontent.com/graphstream/graphstream.github.io/master/doc/Tutorials/writing-documentation.md).

## Writing Your Document

### Preliminaries

First you have to decide a few things :

1. Title of your document ;
2. Where your document belongs into the documents hierarchy, it will be called *document path*. This one belongs to the `Tutorials` part, with `/doc/Tutorials/` as path.

### File Name

File containing your document should be named after the document title, with no space, only word characters, and `-` between words. Use the `.md` extension and put your file inside the directory linked to your document path.

### Document Headers

Jekyll uses file headers to identify which files should be processed. Headers should start at the very beginning of the file (first characters) with `---` on a single line, and have to end with the same `---` chain. Between these two lines will come some meta-informations about your document. There is one information by line, on the form `key: value`.

The basic header you will have to set is :

    ---
    title: Your Document Title
    docpath: YourDocumentPathName|/your/document/path
    layout: documentation
    permalink: /your/document/path/Your-Document-Title/
    ---

The `layout` information is used to tell Jekyll the template that will be used. You can add other informations like `author`.

### Referencing your document

We have to tell files contained in each section. Jekyll will have later a feature called `collections`, but this is actually unstable. So you have to do the job.

List of files in a section are stored as `data`. Jekyll stored these data, which are YAML file, in the `_data` directory. If we consider the *Tutorials* section, we can find the `_data/doc/tutorials.yml` file, listing all document in this section. Name convention is :
- to use lower case ;
- to use `snake_case` to format each path component ;
- to use `-` between components, ending the file with `.yml`.

For example, if we consider the FAQ section about the graph class `/doc/FAQ/The-Graph-Class`, we should put list of files in this section in the data file named `_data/doc/faq-the_graph_class.yml`.

Have a look to the existing files to become familiar with the YAML syntax. There are two main lists in these files, `paths` and `documents`. The former to reference subsections, and the latter to reference documents. Inside these lists, each entry has two items, `title` and `href`.

## Testing Locally

Before performing a pull request on the git repository, you should test your modifications locally. You will need the ruby tool called `gem`.

### Install bundler

Bundler will help us to manage the ruby part of this. You can install it using `gem install bundler`. Then, inside the root of the git repository, create a file called `Gemfile` and put the following content inside :

    source 'https://rubygems.org'
    gem 'github-pages'

You may have to install other gems like `rb-pygments` and `jekyll-redirect-from`. These gems are used by the GraphStream website.

### Run Jekyll

To launch your Jekyll server, just run `bundle exec jekyll serve`. It will generating the website (in the `_site` directory), and create and http server at [http://localhost:4000](http://localhost:4000). Jekyll is listening to file changes, so you should not have to restart it after making some changes.
