---
author: Matt Pritchard
title: JASMIN Help site
description: Documentation and training resources for JASMIN - the UK's data analysis facility for environmental science.
type: docs
content_blocks:
  - _bookshop_name: hero
    heading:
      title: JASMIN Help Site
      content: |-
        Documentation and training resources for JASMIN - the UK's data analysis facility for environmental science.
      width: 8
    breadcrumb: true
    background:
    #  backdrop: /assets/img/jasmin2023.jpg
      color: primary
      subtle: true

    illustration:
      image: /img/jasmin2023.jpg
      ratio: 16x9
      #width: 8
    links:
      - title: Enter docs
        url: /docs
        icon: fas book-open
      - title: About this site
        url: /docs/about-this-site
        icon: fas chevron-right
      - title: About JASMIN
        url: https://www.jasmin.ac.uk
    orientation: horizontal
    justify: center
    
  - _bookshop_name: articles
    heading:
      title: "Docs: find how things work on JASMIN"
      align: start
    input:
      section: docs
      reverse: true
      sort: date
      #keywords: featured
    hide-empty: true
    header-style: none
    more:
      title: More Docs
    padding: 3
    limit: 3
    class: border-1 card-zoom card-body-margin

---
