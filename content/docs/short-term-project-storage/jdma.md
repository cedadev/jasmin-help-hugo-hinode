---
aliases: /article/4698-jdma
description: Joint-storage Data Migration App (JDMA)
slug: jdma
title: Joint-storage Data Migration App (JDMA)
---

{{<alert alert-type="info">}}
Please see [Near-Line Data Store](nlds) for details of JASMIN's new storage service, which will replace both JDMA and Elastic Tape and is now available for use.
{{</alert>}}

**See the JDMA user documentation
at:[cedadev.github.io/jdma_client](https://cedadev.github.io/jdma_client/docs/build/html/index.html)
for more information about using JDMA.**

The joint-storage data migration app (JDMA) is a multi-tiered storage system
which provides a single API to users to allow the movement of data to a number
of different storage systems, query the data they have stored on those storage
systems and retrieve the data.

These interactions are carried out using a common user interface, which is a
command line tool to be used interactively, a python library or a HTTP API,
both to be used programmatically. The command line tool essentially provides a
wrapper for calls to the python library, which in turn makes calls to the HTTP
API.

JDMA was designed with the following usability criteria in mind:

- The user experience for moving data, regardless of the underlying storage systems, should be identical.
- The user should not be responsible for maintaining the connection to the storage system in the case of asynchronous transfers.
- User and group ownership and permissions should be preserved and restored on downloading the data
- The user should receive notifications when the transfers are complete.
- Users should be able to transfer data from one storage system to another
- JDMA is only a request and query layer. Any cataloguing of data should be carried out by the backend system. So that, if JDMA fails, then the data is still available independently of JDMA, from the storage backend.

**See the JDMA user documentation
at:[cedadev.github.io/jdma_client/](http://cedadev.github.io/jdma_client/docs/build/html/index.html)
for more information about using JDMA.**

JDMA was development under a Horizon 2020 grant from the EU Commission. A
report submitted to the EU Commission can be found in the repository at:
[github.com/cedadev/django-jdma_control/blob/master/doc/ESiWACE-
Milestone-8_final.pdf](https://github.com/cedadev/django-
jdma_control/blob/master/doc/ESiWACE-Milestone-8_final.pdf)

The JDMA client github is at:
[github.com/cedadev/jdma_client](https://github.com/cedadev/jdma_client)

### Quick guide to installing the JDMA client on JASMIN

If you are working on JASMIN and you wish to use the JDMA client, then you can
install it as follows on a `sci` server:

{{<command user="user" host="sci-vm-01">}}
module load jaspy
python -m venv ~/venvs/jdma-venv
source ~/venvs/jdma-venv/bin/activate
pip install git+https://github.com/cedadev/jdma_client
{{</command>}}

You should then have the **jdma** command-line tool available in your terminal
session.

{{<alert alert-type="info">}}
  In **August 2024** the JDMA server was upgraded to a new operating system.
  This requires an upgraded JDMA client to be installed.
  If you were using JDMA prior to **August 2024** then you will *have* to upgrade your client.
  This is a straightforward process of three steps, shown below:

  1. Activate the virtual environment as above:
  2. Install the upgraded JDMA client:
  3. Check the version of the JDMA client:

  The correct version is ``1.0.1``
  {{<command user="user" host="sci-vm-01">}}
  source ~/jdma_venv/bin/activate
  pip install --upgrade git+https://github.com/cedadev/jdma_client
  pip list | grep jdma-client
  {{</command>}}

{{</alert>}}