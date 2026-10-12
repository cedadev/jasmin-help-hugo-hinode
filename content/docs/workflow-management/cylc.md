---
aliases:
- /article/147-cylc-rose-on-jasmin
- /docs/workflow-management/rose-cylc-on-jasmin
description: Use Cylc to manage workflows on JASMIN
slug: cylc
tags:
- JULES
- cylc
- rose
title: Workflow Management with Cylc
---

## Introduction

Cylc is a workflow management tool. You can:

- Configure a Cylc workflow to work with the LOTUS batch cluster on JASMIN.
- Run a Cylc workflow and monitor its progress using the Cylc GUI.

## Add the location of the Cylc executable to $PATH

The tool is installed under the following common directory which is visible
on all LOTUS nodes and the dedicated Cylc server:

```bash
export PATH=/apps/jasmin/metomi/bin:$PATH
```

Jobs must be scheduled from the JASMIN server: `cylc.jasmin.ac.uk`

All users with a JASMIN login account can log in to this server.

If you would like to run the Cylc GUI, please use X-forwarding via the [NoMachine servers]({{% ref "graphical-linux-desktop-access-using-nx" %}}) for a smoother connection.

## Example Cylc workflow

Please see the JASMIN Workshop tutorial for a {{<link "https://github.com/cedadev/jasmin-workshop/tree/master/tutorials/tut02">}}worked example{{</link>}} of setting up a Cylc workflow and run it on LOTUS.

## Further reading

Please see {{<link "https://cylc.github.io/">}}the Cylc website{{</link>}} and {{<link "https://cylc.github.io/cylc-doc/stable/html/index.html">}}the Cylc documentation{{</link>}} for more information.
