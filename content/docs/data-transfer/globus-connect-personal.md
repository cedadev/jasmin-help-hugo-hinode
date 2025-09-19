---
aliases: /article/5041-data-transfer-tools-globus-connect-personal
description: 'Globus Connect Personal'
slug: globus-connect-personal
title: 'Globus Connect Personal'
---

## Introduction

This article describes how to create your own Globus collection using Globus Connect Personal.

Please read {{<link "globus-transfers-with-jasmin"/>}} first for a wider introduction to Globus.

Using {{<link "https://www.globus.org/globus-connect-personal">}}Globus Connect Personal (GCP){{</link>}} would enable you to transfer files to/from another Globus collection using
any of the Globus Online transfer tools ({{<link "https://app.globus.org">}}Web app{{</link>}},
{{<link "https://docs.globus.org/cli/)">}}CLI{{</link>}} or {{<link "https://globus-sdk-python.readthedocs.io/en/stable/">}}Python SDK{{</link>}}.

The term "endpoint" has changed meaning with version 5 of Globus, so users now interact with "collections". 
but see {{<link "https://docs.globus.org/cli/collections_vs_endpoints/#:~:text=The%20Endpoint%20is%20used%20for%20some%20operations%20like%20collection%20listing,management%20capabilities%20and%20data%20transfers.">}}Endpoints vs Collections{{</link>}} for a fuller explanation of these entities.

For example, if you set up GCP on your desktop/laptop, you could transfer data files to/from your home directory or
other storage on JASMIN.

{{<alert alert-type="info">}}

- You may not need to do this if your institution already has a Globus endpoint available to you.
- You should NOT install this on a JASMIN server, as a Globus endpoint is already provided for you.
- If you plan to install it in your user area on your departmental server, check with your local IT administrator whether that's an OK thing to do. Point them at the relevant Globus documentation but note that you should be able to do the install with regular/user privileges and that the software does not usually need to be left running: it can be started for the duration of any data transfer tasks, then stopped once they have completed.
{{</alert>}}

## Set up Globus Connect Personal on end-user machine

Installers are available for Linux, Mac and Windows operating systems:  

- Linux (command-line) <https://docs.globus.org/how-to/globus-connect-personal-linux/#globus-connect-personal-cli>
- Mac <https://docs.globus.org/how-to/globus-connect-personal-mac/>
- Windows <https://docs.globus.org/how-to/globus-connect-personal-windows/>

The instructions below show the process for Linux (command-line):

These commands should be executed on YOUR OWN MACHINE (not JASMIN):

{{<command>}}
wget https://downloads.globus.org/globus-connect-personal/linux/stable/globusconnectpersonal-latest.tgz
tar xzf globusconnectpersonal-latest.tgz
{{</command>}}

This will produce a versioned globusconnectpersonal directory
Replace `x.y.z` in the line below with the version number you see

{{<command>}}
cd globusconnectpersonal-x.y.z
./globusconnectpersonal
{{</command>}}

(see links above for details of how to install without the graphical user interface, if you need to)

Complete the installation using the setup key. If a graphical environment is
detected, a window will appear, to guide you through the steps. If not, text
prompts will appear.

**(Please see the relevant installation guide for your platform, linked above,
for further details)**

## Start Globus Connect Personal (Linux)

{{<command>}}
./globusconnectpersonal -start
{{</command>}}

If you use the web application at <https://app.globus.org>, you should now be
able to see your GCP endpoint listed under "Collections" when you filter by
"Administered by you". You can now try listing the files on it and
perhaps transferring a file to/from one of the Globus Tutorial endpoints using
the web interface.

The setup process will have prompted you for a name for your endpoint. It is
assigned a unique ID, too.

**If you have the Globus Command-Line Interface installed** ([see here]({{%ref "globus-command-line-interface" %}})), you can find
the ID of your own endpoint with the CLI command:

{{<command>}}
globus endpoint search <name> --filter-owner-id <your globus id>
{{</command>}}

If successful, you should now be able to interact with your endpoint via any
of the Globus tools (web app, CLI and Python SDK).

For example, you could list the files on the endpoint:

{{<command>}}
globus ls <endpoint_id>:<path>
{{</command>}}

## Set directory permissions

**Don't forget** to configure which directory paths on your system can be accessed by GCP. By default these may NOT be accessible, so you need to allow access.

- Windows: GCP icon in taskbar, then Options / Access
- Mac: menu bar icon / Preferences / Access
- Linux: by editing the config file `~/.globusonline/lta/config-paths`, see {{<link "https://docs.globus.org/globus-connect-personal/install/linux/#config-paths">}}here{{</link>}} for syntax.
