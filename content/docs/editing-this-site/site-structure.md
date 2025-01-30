---
title: Site structure
description: Structure of this site
weight: 20
draft: false
---

## Software and template system

The site uses the {{<link "hugo">}}Hugo{{</link>}} static site builder and {{<link "hinode_docs" >}}Hinode{{</link>}} template system, which in turn uses {{<link "https://getbootstrap.com/" >}}Bootstrap{{</link>}} styling and
{{<link "https://fontawesome.com/" >}}Font Awesome{{</link>}} icons.

Hugo itself and Hinode both offer **shortcodes** which enable sophisticated rendering of simple markup using pre-defined styling elements.
Hinode provides a set of shortcodes which implement many of the common components of Bootstrap

The combination of these building blocks makes it easy to achieve a clean, consistent and professional-looking site while writing content which concentrates on the subject matter rather than presentation, making maintenance easier.

Other features include:

- a fast search feature (perhaps unexpected on a static site), updated at build time, so that users can perform rapid and up-to-date searches of site content. A custom Google search integration provides a secondary option.
- a curated "library" of commonly-used links, which can be updated in one place to take effect across the site
- table-of-contents for each page, auto-generated from markdown heading levels
- convenient handling of local assets like images
- responsive design including light/dark modes

## Directory structure

The main elements of the directory structure **that you need to know about for making everyday edits to the site** are:

```txt
assets/
  img/
    docs/
       <slug>         #one directory per docs page, containing the images used in that page
config/
  _default/
    params.toml       #curated links defined here for use with 'link' shortcode
content/
  docs/
    <category>/       #directory for each category
    _index.md         #category details, icon, weighting
    <slug>.md         #article page, filename matches slug
    ...
  guides/             #not used yet
  training/           #not used yet
data/
  abbr.yml            #curated set of abbreviations defined here for use with 'abbr' shortcode
  docs.yml            #docs sidebar structure defined here
```

A few notes on this structure:

- Not all items are shown (for more fundamental changes to the site, consult Hinode and Hugo documentation first)
- This is the structure of the input data, not the structure of the output site content.
- Images should be stored in the `img/docs/<slug>` directory corresponding to the page with that <slug>. Store the best-resolution copy that you need: Hinode will generate all the lower-resolution derivatives from it automatically to optimise page loading.
- Please don't edit anything else in `config/_default/params.toml` without consulting Matt P.

Don't attempt to change anything in the `public` directory that gets created when you build the site, and don't commit that directory.

Periodically, the dependencies used by the site need to be updated, occasionally this can result in changes to the site directory structure.
