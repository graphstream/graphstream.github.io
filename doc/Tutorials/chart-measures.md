---
title: Chart Measures
layout: documentation
docpath: Tutorials|/doc/Tutorials/
permalink: /doc/Tutorials/Chart-Measures/
redirect_from: /doc/Tutorials/Chart-Measures_development/
---

{% include development_version.html %}

## What is chart measure ?



## Example

### Simple lined plotting

{% highlight java %}
ChartSeries1DMeasure m = new ChartSeries1DMeasure("my first measure");
Random r = new Random();

for (int i = 0; i < 100; i++)
	m.addValue(r.nextDouble() * 10);

m.plot();
{% endhighlight %}

![Simple Plot]({{ site.content_img }}/simplePlot.png)


### Plotting two measures

{% highlight java %}
ChartSeries1DMeasure m1 = new ChartSeries1DMeasure("my first measure");
ChartSeries1DMeasure m2 = new ChartSeries1DMeasure("my second measure");
Random r = new Random();

for (int i = 0; i < 100; i++) {
	m1.addValue(r.nextDouble() * 10);
	m2.addValue(r.nextDouble() * 10);
}

PlotParameters params = new PlotParameters();
params.title = "Hello World";
plot(params, m1, m2);
{% endhighlight %}

![Two Measures]({{ site.content_img }}/twoMeasures.png)


### Scatter plot with 2D series

{% highlight java %}
ChartSeries2DMeasure m1 = new ChartSeries2DMeasure("my measure");
Random r = new Random();

for (int i = 0; i < 100; i++)
	m1.addValue(r.nextDouble() * 10, r.nextDouble() * 10);

PlotParameters params = new PlotParameters();
params.title = "Hello Scattered World";
params.type = PlotType.SCATTER;
plot(params, m1);
{% endhighlight %}

![Scatter Plot]({{ site.content_img }}/scatterPlot.png)

