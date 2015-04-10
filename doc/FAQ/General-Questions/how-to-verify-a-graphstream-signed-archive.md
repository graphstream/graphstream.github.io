---
title: How to verify a GraphStream signed archive ?
layout: documentation
docpath: FAQ|/doc/FAQ/,General Questions|/doc/FAQ/General-Questions/
permalink: /doc/FAQ/General-Questions/How-to-verify-a-GraphStream-signed-archive/
---

GraphStream uses GnuPG to sign its archives. Signatures allow to
ensure that the archive you download is the one that have been
created by the team and have not been modified by a malicious third
party.

To verify an archive, you have to :

1. download the public key,
2. import the key in gpg,
3. verify the archive.


## Download the public key

The public key is stored in a simple file. It can be downloaded here :
[GraphStream public key]({{ "/graphstream_team-public.key" | prepend: site.media }}):
 
	-----BEGIN PGP PUBLIC KEY BLOCK-----
	Version: GnuPG v2

	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
	/dvsKUwEBGQbV8UZ4w==
	=WIHs
	-----END PGP PUBLIC KEY BLOCK-----


Key is available on the [key server](http://pool.sks-keyservers.net/pks/lookup?op=get&search=0x572273AB43B5C51C):

	pool.sks-keyservers.net


## Import the public key in your gpg keyring

Once the public key is downloaded, you have to import it in your
gpg keyring. This can be done with the following command::

{% highlight bash %}
gpg --import graphstream_team-public.key
{% endhighlight %}

Else you can use the public key server to receive the key::

{% highlight bash %}
gpg --keyserver pool.sks-keyservers.net --recv-keys 43B5C51C
{% endhighlight %}

You can check if key is imported by listing keys of your keyring
with the command::

{% highlight bash %}
gpg --list-keys
{% endhighlight %}

If the GraphStream Team public key is imported, you should see the
following output:

	pub   2048R/31063213 2011-05-14 [expire: 2014-05-13]
	uid                  GraphStream Team <team@graphstream-project.org>
	sub   2048R/61554F80 2011-05-14 [expire: 2014-05-13]

To check if the key is the one of the GraphStream Team, you can
use its fingerprint:
 
{% highlight bash %}
gpg --fingerprint "GraphStream Team <team@graphstream-project.org>"
{% endhighlight %}

The valid fingerprint of the GraphStream Team key is ``02F0 5D22 6E6C E7ED F875  C395 5722 73AB 43B5 C51C``.
When in doubt, please contact the team.


## Verify an archive

Each archive on the GraphStream website should be released with an
attached signature file. For example, the archive ``gs-core-1.0.jar``
should have a ``gs-core-1.0.jar.asc``. To verify the archive integrity,
download it with its signature and run the command::

{% highlight bash %}
gpg --verify gs-core-1.0.jar.asc
{% endhighlight %}

If ``gs-core-1.0.jar`` is valid, the following message should appears:

	gpg: Good signature from « GraphStream Team <team@graphstream-project.org> »

and if not valid:

	gpg: BAD signature from « GraphStream Team <team@graphstream-project.org> »


