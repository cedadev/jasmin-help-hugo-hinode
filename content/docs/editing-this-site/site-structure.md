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

The combination of these building blocks makes it easy to achieve a clean, consistent and professional-looking site while writing content which primarily concentrates on subject matter rather than presentation.

Other features include:

- a fast search feature (perhaps unexpected on a static site), updated at build time, so that users can perform rapid and up-to-date searches of site content. A custom Google search integration provides a secondary option.
- a curated "library" of commonly-used links, which can be updated in one place to take effect across the site
- table-of-contents for each page, auto-generated from markdown heading levels
- convenient handling of local assets like images
- responsive design including light/dark modes

## Directory structure

