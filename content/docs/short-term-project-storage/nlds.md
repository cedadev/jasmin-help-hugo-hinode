---
description: Near-line storage for group workspace data
title: Near-Line Data Store (NLDS)
tags: nlds
---

{{<alert alert-type="info">}}
As of January 2026, a new version of NLDS is available with a much simpler
setup process for users. This includes an updated client, so you should now upgrade
to that version [using these instructions](nlds-step-by-step).
{{</alert>}}

## Introduction

The Near-Line Data Store is JASMIN's new service to bridge the gap between disk and tape storage.

It makes use of a large cache on Object Storage to help stage data efficiently to and from a large-capacity,
high-throughput tape library at the backend. It provides significantly
more functionality than previous generations of near-line storage services, so please take the 
time to find out more.

NLDS aims to provide:

- a more dynamic way of using tape in users' workflows
- more energy-efficient storage, important for both cost and environmental impact of your work
- **all JASMIN users** with a means to store data near-line (previously it was aimed more at GWS managers only)

Documentation is available here:

- [step by step guide](nlds-step-by-step) to setup on JASMIN
- [basic usage](#basic-usage) (this document)
- {{<link "https://cedadev.github.io/nlds-client/tutorial.html" >}}Full NLDS tutorial{{</link>}} as part of NLDS client software documentation.

It is recommended to start with the step-by-step guide.

## Basic usage

You'll need to follow the [step by step guide](nlds-step-by-step) to use these commands on JASMIN, but some examples are:
 
PUT a single file into a holding:

{{<command>}}
nlds put <filepath>
{{</command>}}

(you can PUT a list of files, too).

{{<alert alert-type="info">}}
Before you run `nlds put`, make sure that all the files you want to put into a holding belong to your `gws_<mygws>` group using `chgrp`. In addition, run `chmod g+r` for files and `chmod g+rx` for directories so NLDS can retrieve them.
{{</alert>}}

Check on the status of your holdings:

{{<command>}}
nlds stat
(out)State of transactions for user:frjohn, group:farmers
(out)    user        id    action          job label       label           done  state                  last update
(out)    frjohn      1     put             SheepHerding    SheepPen        100%  COMPLETE               2023-04-18 15:21:41
(out)    frjohn      2     put             test_putlist    Zoo             100%  COMPLETE
{{</command>}}

Retrieve a file from a holding:

First, find the holding that the file is stored in:

{{<command>}}
nlds find
(out)Listing files for holdings for user:frjohn, group:farmers
(out)    user        h-id  h-label         size    date        storage path
(out)    frjohn      1     SheepPen        49.0B   2023-04-18     O    /Users/frjohn/sheep.txt
(out)    frjohn      2     Zoo             96.0B   2023-04-18     O    /Users/frjohn/albatross.txt
(out)    frjohn      2     Zoo             50.0B   2023-04-18     L    /Users/frjohn/rabbit.txt
{{</command>}}

Fetch a single file:

{{<command>}}
nlds get /Users/frjohn/sheep.txt -r ./
(out)GETLIST transaction accepted for processing.
(out)    user            : frjohn
(out)    group           : farmers
(out)    action          : getlist
(out)    job label       : 14bc9846
(out)    transaction id  : 14bc9846-9d45-440a-af6c-dfcb5cb9dcae
{{</command>}}

## Further information

NLDS is {{<link "https://cedadev.github.io/nlds-client/">}}fully documented here{{</link>}}, including:

- Tutorial
- Step-by-step guide to setup
- Hints and Tips

## Webinar

Our webinar in March 2025 gave an overview of NLDS: please watch this to find out more. The NLDS part of the presentation lasts around 33 minutes.

{{<alert alert-type="info">}}
**Jan 2026 update:** An updated version of this webinar, to reflect the simplified setup process, will follow soon - watch this space.
{{</alert>}}

{{< youtube 5qFPGLgXma0 >}}