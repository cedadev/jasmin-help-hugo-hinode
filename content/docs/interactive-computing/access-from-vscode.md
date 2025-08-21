---
description: How to access JASMIN from VSCode
tags:
- editor
- ssh
- remote
title: Access from VSCode
slug: access-from-vscode
weight: 120
---

## Introduction

{{<link "https://code.visualstudio.com/docs/remote/ssh" >}}Visual Studio Code{{</link>}} is a richly-featured editor and Integrated Development Environment (IDE)
which has remote access and other useful features that can be used with JASMIN.

This article is in response to requests from users about how use VSCode with JASMIN and is not a product endorsement. Other IDEs with similar features are also available, for example {{<link "https://www.jetbrains.com/pycharm/" >}}PyCharm{{</link>}}.

The following demonstrates how to use VSCode to connect to JASMIN, and mentions some of its features for further reading.

## Obtaining VSCode

Follow the "setup" link from the page linked above
to obtain VSCode for your platform: this should be your **local** machine, **not** JASMIN.

{{<alert alert-type="info">}}
**There should be no need for you to install VSCode on JASMIN, and we ask you not to.**

We don't provide it centrally, because the multitude of different extensions and configurations 
would be too difficult to manage in a multi-user environment, so it makes more sense if
you install your own local instance of it, which you can configure as you like: the remote capabilities
of VSCode make a central installation unnecessary.
{{</alert>}}

Read about the following extensions and decide which you think you need (you can always "upgrade" later)

- {{<link "https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh">}}Remote-SSH extension{{</link>}}
  - enables you connect & remotely edit files
- {{<link "https://aka.ms/vscode-remote/download/extension" >}}Remote Development extension pack{{</link>}}
  - this includes the Remote-SSH extension as well as others which enable a raft of other features.

You should read about those extensions first, at the links above, but actually install the one
you choose by using the Extensions menu within VSCode once you've installed the application.

You will also almost certainly want the following for working with Python locally and on JASMIN.

- {{<link "https://marketplace.visualstudio.com/items?itemName=ms-python.python">}}Python{{</link>}}  (includes Pylance and Python Debugger).

There are many, many other extensions to add, but you now have the most relevant ones to get you started.

**These extensions are best installed locally, before connecting to any remote hosts.**

## How to connect?

You will need to set up at least one SSH connection profile to a remote host on JASMIN: we'll cover **which** host(s), shortly.

VSCode has a tool to help you set this up, and creates entries in your `~/.ssh/config` file for the SSH client that you're using.

1. First consider your SSH client: VSCode will connect using the SSH client of your operating system: there isn't one built into
VSCode itself. See [presenting your ssh key]({{% ref "present-ssh-key" %}}) for details of the "agent" method: this is more convenient
as this is persistent across sessions and you won't be asked for your passphrase on each connection. If that doesn't work for you,
note the extra configuration below which can be added to specify the location of your key instead.

2. Next, consider which remote host(s) on JASMIN you want to connect to:

- `login` servers are available from any location, but don't have any software or storage mounted other than your home directory
- `sci` servers are probably where you want to work, but aren't directly accessible from outside of the STFC network.
- `xfer` servers might be a good choice if it's just editing you're likely to be doing, since they're directly accessible from anywhere
and have all filesystems mounted (except scratch). But they're not for doing processing.

So the ideal setup might be 2 profiles as follows:

1. `sci` server, accessed via a login server
1. `xfer` server, accessed directly

If we use the tool provided by VSCode to create these, we can customise them further.

The following video demonstrates these steps, and the initial setup of 2 connection profiles, on Windows. But the interface
is almost identical on Mac and Linux.

{{< video media-id="PAwSWtHwhSQ">}}

Notes:

- the sequences have been shortened slightly while installing extensions and initiating the connection.
- the demo shown assumes the SSH key is already loaded in an ssh-agent. To specify the key location instead, see below.
- the `-A` option is only needed IF you will be making onward SSH connections from the remote host ...this can be omitted if not

### Essential steps

- Install the extensions
- Create a connection profile
  - start by entering the one-liner command you would use to connect to a sci server via a login server, i.e.
    ```bash
    ssh -A username@sci-vm-01.jasmin.ac.uk -J username@login-01.jasmin.ac.uk
    ```
  - this creates an entry in `~/.ssh/config` (it's recommended to choose that location)
- This entry can be customised, by editing that file
  - note that the `Host` is a "friendly name" which you can define, whereas `HostName` is the actual full name of the host including domain, e.g. `sci-vm-01.jasmin.ac.uk`
- Add other entries as needed
  - in this case, we added a second profile for `xfer-vm-01` which, being an `xfer` server, is directly accessible so does not need the `ProxyJump`
- Save the file `~/.ssh/config` and restart VSCode
- The new profiles are available next time you open it
- Connect to one of the remote hosts you just made
- Open a terminal on that host
- ...and now you're able to work on JASMIN

### Specifying the key location

Alternative method if you can't get the "agent" method to work (but means that you may be prompted for the key passphrase each time you connect):

- edit `~/.ssh/config` and add the line with `IdentityFile` as shown:

```config
Host sci-vm-01-via-login-01
  Hostname sci-vm-01.jasmin.ac.uk
  User username
  ProxyJump username@login-01.jasmin.ac.uk
  ForwardAgent yes
  IdentityFile ~/.ssh/id_ecdsa_jasmin
```

## Further tips

- Editing large files may be slow compared to editing them in place on the remote server.
- If you're using VSCode locally **without** the remote host connection described above, you can still open a Terminal to use SSH commands to connect to remote hosts, but this will be without the integration that the full remote host connection provides (e.g. won't display your remote directories and files in the explorer bar).
- There's a lot more that you can do with VSCode locally (even without the remote connection that this article describes).

For example:

- syntax colouring and code auto-completion for a huge range of languages
- {{<link "https://code.visualstudio.com/docs/sourcecontrol/overview" >}}Git integration{{</link>}}, note you need `git` installed locally(see {{<link "https://git-scm.com/downloads/win" >}}git{{</link>}} for Windows)
- {{<link "https://code.visualstudio.com/docs/datascience/jupyter-notebooks" >}}Working with Jupyter notebooks{{</link>}} locally in VSCode

and many other features beyond the scope of this article.

This makes an IDE such as VSCode a good choice to install locally, rather than using the (fairly basic) editors available on JASMIN.

## Troubleshooting

### Permission denied

If you get `permission denied` when connecting, you should troubleshoot this as you would any other SSH connection.

Open a terminal within VSCode and check that your SSH key is being presented correctly. If it's not listed when you do

```console
ssh-add -l
```

then:

- go back to [presenting your ssh key]({{% ref "present-ssh-key" %}}) and check your setup
- alternatively, [specify the location of your key]({{% ref "#specifying-the-key-location" %}}) as detailed above

### Can't connect to a remote host that previously worked

VSCode starts a small server process on the remote host when you connect. Occasionally this can get
stuck. One method of fixing this is to:

- quit VSCode
- from a separate SSH client terminal, log in to the **same** host
- identify any `.vscode-server` process running on that host, e.g.
```
ps -ef | grep $USER | grep vscode
```
- note the process ID (PID) number (1st numerical column) and kill that process
```
kill <PID>
```
- recursively delete the `~/.vscode-server` directory which VSCode created in your JASMIN home directory
```
rm -rf ~/.vscode-server
```
- Retry connecting to the remote host
- If that doesn't work, try rebooting your own machine, then repeating the above steps.
