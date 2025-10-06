---
aliases: /article/4536-install-jasmin-xfc-client
description: Install XFC client
slug: install-xfc-client
title: Install XFC client
---

## XFC client install

In order to initiate and manage your usage of the XFC (transfer cache)
service, you need to use the XFC client.

Once set up, you don't need to use this client to read/write data to XFC
storage itself, but you can use it to interrogate the system to find out what
data you have stored and how much of your quota(s) you are using.

The following steps should be used to create a python virtual environment and
pip to install the xfc client:

NOTE: do these steps on one of the `sci` (not `xfer`) servers:

  1. Log into one of the sci machines: e.g. `sci-vm-01.jasmin.ac.uk` (1 - 8 is available)
  2. The `xfc` client can be used with Python 3 using jaspy.  

{{<command user="user" host="sci-vm-01">}}
module load jaspy
{{</command>}}

Setup a virtual environment in your home directory:

{{<command user="user" host="sci-vm-01">}}
python -m venv ~/xfc_venv
{{</command>}}

  3. The following steps for Python 2 and Python 3 are now the same.
  4. Activate the virtual environment:
  
{{<command user="user" host="sci-vm-01">}}
source ~/xfc_venv/bin/activate
{{</command>}}

  5. Download the client software using git to your home directory:

{{<command user="user" host="sci-vm-01">}}
git clone https://github.com/cedadev/xfc_client.git
{{</command>}}

  6. pip install the xfc client

{{<command user="user" host="sci-vm-01">}}
pip install -e ~/xfc_client
{{</command>}}

  7. Use xfc on the command line
  
{{<command user="user" host="sci-vm-01">}}
xfc -h
{{</command>}}

Users who already have a Python virtual environment can skip step 2 and
install into an existing virtual environment.

The recommendation for users using NLA, XFC and JDMA is to create a single
virtual environment to install all 3 client applications into.

The `xfc` client can be used without activating the python virtualenv by
adding the path to the xfc client to the `$PATH$` environment variable:

{{<command user="user" host="sci-vm-01">}}
export PATH="$PATH:~/xfc_venv/bin" `
echo 'export PATH="$PATH:~/xfc_venv/bin"' >> "$HOME/.bashrc"
{{</command>}}

The `xfc` client can now be used by invoking `xfc` from the command line
without activating the virtualenv. **Python 3** users   load jaspy
using the command `module load jaspy`

For instructions on how to use the xfc client, see the article [JASMIN
Transfer Cache (XFC).]({{% ref "xfc" %}})
