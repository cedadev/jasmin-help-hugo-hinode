---
aliases: /article/4733-matplotlib
description: Using Matplotlib for visualisation on JASMIN
slug: matplotlib
title: Using Matplotlib for visualisation on JASMIN
---

This article provides a basic example of using Matplotlib on JASMIN to
generate a plot. It also gives an important tip that may stop your code
failing when run on the LOTUS cluster.

## Matplotlib - a basic example

[Matplotlib](https://matplotlib.org/) is a very well documented plotting
library for Python. Here is a brief example of generating a line graph on a
PNG file using matplotlib.

Load the Jaspy Python 3 environment, and start a Python session:

{{<command user="user" host="sci-vm-02">}}
module load jaspy
python
{{</command>}}

In python, set some x-values, y-values, axis labels and a title, and plot:  

```python
import matplotlib
matplotlib.use('agg')

import matplotlib.pyplot as plt

x_values = [1, 5, 3, 9, 14]
y_values = [2000, 2005, 2010, 2015, 2020]

x_label = 'Temperature (degC)'
y_label = 'Year'

title = 'Average temperature of garden shed (2000-2020)'

plt.plot(y_values, x_values, 'g--')

plt.ylabel(y_label)
plt.xlabel(x_label)
plt.title(title)

plt.savefig('output.png')
```

## Plotting with matplotlib on LOTUS

When using matplotlib on LOTUS hosts please make sure that you are setting the
_rendering_ _backend_ to a setting that will definitely work. This must be
done **before** importing `matplotlib.pyplot`.

On JASMIN it is safe to use:

```python
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
```

or alternatively, the `MPLBACKEND` environment variable can be set in the job
script before invoking python:

```bash
export MPLBACKEND=agg
```

If you do not set this option or you choose an alternative backend then you
may see **failures which include very large dump (error) files being written
(up to 56GB per file!)**. Please remove these files if you accidentally create
them, and switch over to selecting an appropriate rendering backend as
indicated above.

Note that if you see the following error message, this results from attempting
to use the default GTK backend on LOTUS (as GTK is only available in an
interactive X-windows environment). The solution is to use `agg`, as described
above.  

{{<command>}}
(out)ValueError: Namespace Gtk not available for version 3.0
{{</command>}}

For more information please see the [matplotlib back-ends
page](https://matplotlib.org/faq/usage_faq.html#what-is-a-backend).
