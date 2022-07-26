Sara Haxhia
===========

These instructions use example commands suitable for developing on a Mac, but should be
fairly straight-forward on any operating system.

First setup
-----------

To run the website locally, first make sure you use recent versions of Ruby and Bundler:

```
brew install ruby
bundle update --bundler
```

Then install all dependencies:

```
bundle install
```


Local development
-----------------

To build the website using Jekyll, and then serve it locally:

```
bundle exec jekyll serve
```

You can now access the website on `http://localhost:4000`.


Deploying
---------

To deploy the website live, simply push your changes on the default `master` branch.
This will trigger a Jekyll build in Cloudflare Pages and the new version will be live in
a few minutes. If not, you can view the build status on either GitHub or Cloudflare.


Troubleshooting
---------------

Things to try if you get errors when starting Jekyll:

1. Delete the folder `vendor` then run `bundle install` and `bundle exec jekyll serve` again.
2. Delete the folder `vendor` *and* the file `Gemfile.lock` then run `bundle install`
   and `bundle exec jekyll serve` again. (Note that `Gemfile.lock` is version-controlled
   – if this step solves the issue, you should commit the new version.)

Try the above in that order, in other words, first try step one and see if it solves the
issue. If not, try step two, and so on. Note that each of these should be tried after
first stopping Jekyll by pressing Ctrl-C.

For more detailed instructions, see the documentation for each of the used tools:

* Jekyll: https://jekyllrb.com/docs/
* Bundler: https://bundler.io/docs.html
* Cloudflare Pages: https://developers.cloudflare.com/pages/
