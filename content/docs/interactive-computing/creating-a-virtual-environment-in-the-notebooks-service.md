---
aliases: /article/5084-creating-a-virtual-environment-in-the-jasmin-notebooks-service
description: Adding custom Python packages to Jupyter Notebooks
tags:
- notebook
title: Creating a virtual environment in the JASMIN Notebooks Service
weight: 90
---

Creating a virtual environment is useful to allow a discrete set of extra
packages to be installed to meet specific requirements. This allows a user to
run multiple environments with different dependencies without conflicts.

There are a number of ways to create a virtual environment to use with the
Notebooks Service. This document outlines the most common and recommended
methods, and then some other ways which you might find useful.

Please note that environments created for the Notebooks Service **will not work**
on the JASMIN scientific analysis servers or the LOTUS batch processing.

## Step 1: Creating a virtual environment

This step creates a Python virtual environment, and allows you to install
packages into it.

{{<alert alert-type="danger">}}
These commands are intended for use at the Jupyter
Notebooks shell, **not on the JASMIN sci machines**
{{</alert>}}

To get started, open the [JASMIN Notebooks Service](https://notebooks.jasmin.ac.uk/)
and in the launcher click the terminal button.

{{<image src="/img/docs/creating-a-virtual-environment-in-the-jasmin-notebooks-service/notebook-terminal.png" caption="Opening the terminal">}}

{{<alert alert-type="info">}}
Don't worry if you see this: this is a known issue but should not cause you a problem.

```txt
id: cannot find name for user ID NNNNN
[I have no name!@jupyter-user notebooks-misc]$ 
```
{{</alert>}}

Then, type these commands at the bash shell which appears.

First, make a directory in which to store your virtual environments. You can
put this wherever you like, as long as you reference the same place later. You
could store several virtual environments within this directory, for different
purposes. Then, change into that directory.

{{<command user="user" host="jupyter-user">}}
mkdir ~/nb_envs
cd ~/nb_envs
{{</command>}}

Next, create a new empty virtual environment. We recommended including the
`--system-site-packages` argument which will allow you to add packages on top
of `jaspy`, rather than starting completely from scratch.

{{<command user="user" host="jupyter-user">}}
python -m venv name-of-environment --system-site-packages
{{</command>}}

Then, activate the specific virtual environment created above, which will
allow you to install packages.

{{<command user="user" host="jupyter-user">}}
source name-of-environment/bin/activate
{{</command>}}

If you want to be able to use your virtual environment as a Jupyter Notebook
kernel (recommended), you should install `ipykernel` using pip.

{{<command user="user" host="jupyter-user">}}
pip install ipykernel
{{</command>}}

You can then install whatever packages you need in the environment.

{{<command user="user" host="jupyter-user">}}
pip install pyjokes
{{</command>}}

If you change your mind and need to add more packages in the future, it is
simple to activate the virtual environment in the same way as above and use
`pip` to install more packages.

## Step 2: Making the notebooks service recognise your new kernel

These steps are also run from the notebooks' service shell, as above.

If you aren't still there from the last step, cd to the location of your `venv`.

{{<command user="user" host="jupyter-user">}}
cd ~/nb_envs
{{</command>}}

If it isn't already active, activate the virtual environment.

{{<command user="user" host="jupyter-user">}}
    source name-of-environment/bin/activate
{{</command>}}

Running the following command will make the Notebooks Service notice your new
virtual environment, and include it in the list of kernels which you can run
code with. You only have to do this once.

{{<command user="user" host="jupyter-user">}}
python -m ipykernel install --user --name=name-of-environment
{{</command>}}

## Step 3: Using your new kernel

{{<image src="/img/docs/creating-a-virtual-environment-in-the-jasmin-notebooks-service/197739637-1e75ce45-c0de-49ec-b168-d2dc101ca7fe.png" caption="Select kernel, in this case: 'name-of-environment'" wrapper="col-6 mx-auto">}}

You can then choose this kernel from the Jupyter Notebook homepage, or from the top
right of any open notebook. No changes to the Python code within are required.

{{<image src="/img/docs/creating-a-virtual-environment-in-the-jasmin-notebooks-service/197740127-074abd6d-f0f2-4450-8c4c-232a5800137c.png" caption="Kernel name shown in notebook title tab">}}

## Other tips & useful knowledge

### Activating an environment without it being a kernel

If you follow Step 1 above to create a virtual environment, it is possible to
use the packages from this environment in a Python file without making it a
kernel. While this can be useful, it has the very distinct disadvantage of
hardcoding the path to your virtual environment in your Python code. For this
reason we discourage using this method with a medium level of severity. To do
this, simply add the following code to your Python file **before** any
imports. Adjust the `venv_path` variable to be correct for the `venv` you
created.

```python
import sys
import pathlib
import platform

venv_path = "~/nb_envs/name-of-environment"

py_version = platform.python_version_tuple()
sys.path.append(
    str(
        pathlib.Path(
            f"{venv_path}/lib/python{py_version[0]}.{py_version[1]}/site-packages/"
        ).expanduser()
    )
)
```

Explanation: this adds the `site-packages` folder from your `venv` directly to the
path Python uses to search for packages (`$PYTHONPATH`). This lets Python
find them to import.

### Can I install packages from inside my Python code?

We very strongly recommend **NOT** trying to install Python packages from
inside notebook code. `pip` isn't designed for it, and it is almost always
easier to activate the `venv` as above and install things that way.

If you wish to record the set of packages inside your `venv` so you can install
them en-masse later, `pip` has the facility to do this. To export a list of
packages that exist inside a `venv`, from the notebook's bash shell with the
virtual environment in question activated:

{{<command user="user" host="jupyter-user">}}
pip freeze > requirements.txt
{{</command>}}

To install a list of packages which have been exported:

{{<command user="user" host="jupyter-user">}}
pip install -r requirements.txt
{{</command>}}

Exporting packages in this way is also useful for sharing your environment
with others, reinstalling when it breaks etc. It's a good idea to keep the
requirements file alongside the code in version control. If your code becomes
more complex it is probably more sensible to make it a Python package, and
install it as one, but doing that is outside the scope of this document.

If you really must, you can call `pip` from inside your notebook like this:
(after first updating the packages variable to be the ones you want to
install.)

```python
import sys
import subprocess as sp

packages = ['pyjokes']

sp.check_call([sys.executable, '-m', 'pip', 'install'] + packages)
```

### Can I use conda instead of a virtual environment?

Yes, no problem.

To create a conda environment, simply run the following at the JASMIN
Notebook shell:

{{<command user="user" host="jupyter-user">}}
conda create --name name-insert-here ipykernel
{{</command>}}

Install any packages you which to use in the environment:

{{<command user="user" host="jupyter-user">}}
conda install --name name-insert-here pyjokes
{{</command>}}

Make the Notebooks Service recognise your environment as a kernel:

{{<command user="user" host="jupyter-user">}}
conda run --name name-insert-here python -m ipykernel install --user --name name-insert-here
{{</command>}}

### Can I get rid of my old kernels from the Notebooks Service?

Yes.

To list the names of kernels you have installed, run the following at the
JASMIN Notebook shell:

{{<command user="user" host="jupyter-user">}}
jupyter kernelspec list
{{</command>}}

To remove one of them, run:

{{<command user="user" host="jupyter-user">}}
jupyter kernelspec uninstall insert-name-here
{{</command>}}
