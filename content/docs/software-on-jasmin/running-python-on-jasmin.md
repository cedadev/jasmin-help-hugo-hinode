---
aliases: /article/293-running-python-on-jasmin
description: Running python on JASMIN
slug: running-python-on-jasmin
tags:
- python
- numpy
- import
- jap
- jaspy
title: Running python on JASMIN
---

On the JASMIN [scientific analysis servers]({{% ref "sci-servers" %}}) and on the Lotus batch cluster, we currently support Python version 3.11 with [Jaspy]({{% ref "jaspy-envs" %}}).

When you first log in, the default version of Python is that provided by the
operating system. This is different to the one you shoud use for your work,
and we recommend using the [Jaspy environments]({{% ref "jaspy-envs" %}}). In this example, we
activate the current Jaspy environment before running Python.

{{<command user="user" host="sci-vm-01">}}
module load jaspy
{{</command>}}

Check the Python version:

{{<command user="user" host="sci-vm-01">}}
python -V
(out)Python 3.11.9
{{</command>}}

Run a script:

{{<command user="user" host="sci-vm-01">}}
python your_script.py
{{</command>}}

If you want to use an executable script (which can be invoked just by name),
then the recommended line to put at the top of the script would be:

```bash
#!/usr/bin/env python
```

after which you should set "write" permission, and then you can run it without
the "python " prefix:

{{<command user="user" host="sci-vm-01">}}
chmod 755 your_script.py
./your_script.py
{{</command>}}

You should work with Python on the [scientific analysis servers]({{% ref "sci-servers" %}}).
Login servers do not have any software installed, or filesystems mounted other than home directories.
