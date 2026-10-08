---
layout: post
title: Adventures in Jekyll (p1)
date:   2020-05-29 21:22:00 -0400
category: tech
# published: false
---

## Installation

There's not much to say about Jekyll that hasn't been written in the [documentation](https://jekyllrb.com/docs/). I'd recommend starting there before you go looking to learn anything here. In fact, there's nothing here you'll learn other than my own journey forward.

### Get yer Ruby

If you're new to Ruby, or perhaps have chosen to ignore it until this point, you'll want to grab something to manage the version you're using. Or you can YOLO can choose the system installed one. If so, ignore everything, you've made a magnificent choice and no one is judging you.

For me, I chose [asdf](https://asdf-vm.com/), partially because I use it in my node based projects, but mostly because I didn't want to evaluate [rbenv](https://github.com/rbenv/rbenv), [rvm](https://rvm.io/), and [chruby](https://github.com/postmodern/chruby). Choice overload is real, and it was best for me to pick the jack of all trades solution.

Following the rest of the installation instructions leads to a nice empty site to work with.

## Customize it

The defaults of Jekyll are simple enough to get writing, but there were some little bits that I wanted to customize. The documentation on making updates can be a bit difficult to navigate, but there were only a handful of things that I found important and worth repeating.

1. Read the [theme docs](https://jekyllrb.com/docs/themes).
2. Read the [theme docs](https://jekyllrb.com/docs/themes), again. Thoroughly this time.
3. Layouts are simple to create, but you'll need to understand [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) to get the most out of it.
4. Figure out a folder structure that works for you. The default folder structure is a bit messy since everything is at the top level, but I think I'll live with it for the foreseeable future.
5. Write content. A wildly customized jekyll site is just empty shininess without content. Plus there's always the future.
