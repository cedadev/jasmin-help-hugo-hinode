---
aliases: /article/3810-data-transfer-tools-rsync-scp-sftp
description: 'Data Transfer Tools: rsync, scp, sftp'
slug: rsync-scp-sftp
tags:
- winscp
- scp
- filezilla
title: 'rsync, scp, sftp'
---

This article tells you about some of the basic transfer tools available for
use with JASMIN that work over an SSH connection:

- rsync (over SSH)
- scp
- sftp

## rsync over SSH

rsync is a file synchronisation and file transfer program for Unix-like
systems that can minimise network data transfer by using a form of delta
encoding such that only the differences between and source and destination
data are actually transmitted. rsync can compress the data transferred further
using zlib compression and SSH or stunnel can be used to encrypt the transfer.

rsync is typically used to synchronise files and directories between two
different systems, one local and one remote. For example, the command:

{{<command user="localuser" host="localhost">}}
rsync mydata remoteuser@remotehost:/data/
{{</command>}}

will use SSH to connect as `remoteuser` to `remotehost`. Once connected, it will
invoke another copy of rsync on the remote host, and then the two programmes
will talk to each other over the connection, working together to determine
which parts of `mydata` are already on the remote host and don't need to be
transferred over the connection.

The generic syntax is:

{{<command>}}
rsync [OPTION] ... SRC [SRC] ... [USER@]HOST:DEST
rsync [OPTION] ... [USER@]HOST:SRC [DEST]
{{</command>}}

...where `SRC` is the file or directory (or a list of multiple files and
directories) to copy from, and `DEST` represents the file or directory to copy
to. (Square brackets indicate optional parameters.)

For more information visit the
{{< link "http://rsync.samba.org/" >}}official rsync website{{</link>}}.

### rsync example with JASMIN

Here is a simple example using rsync over SSH to your home directory copy a file to a Group
Workspace on JASMIN:

{{<command user="localuser" host="localhost">}}
exec ssh-agent $SHELL
ssh-add ~/.ssh/id_ecdsa_jasmin  ## local path to your private key file
rsync myfile <username>@xfer-vm-01.jasmin.ac.uk:/gws/nopw/j04/myproject/data/
{{</command>}}

NOTE: The first two lines are the standard method for setting up the SSH agent
in order to allow connections without prompting for a passphrase each time.

## scp

`scp` is another basic command-line tool for secure copying between two
machines. It is installed as part of most SSH implementations and comes as
standard on the JASMIN transfer servers. `scp` is the secure analogue of the
`rcp` command. Typically, the syntax of `scp` is like the syntax of `cp`
(copy):

To copy a file to a host:

{{<command user="localuser" host="localhost">}}
scp myfile remoteuser@remotehost:directory/target
{{</command>}}

To copy a file (or directory) from a host to the local system:

{{<command user="localuser" host="localhost">}}
scp remoteuser@remotehost:directory/source target
scp -r remoteuser@remotehost:directory/source_folder target_folder
{{</command>}}

Note that if the remote host uses a port other than the default of 22, it can
be specified in the command. For example, copying a file from host over a non-
standard SSH port (2222):

{{<command user="localuser" host="localhost">}}
scp -P 2222 remoteuser@remotehost:directory/source target
{{</command>}}

For more information on scp please visit the following
[website](https://linux.die.net/man/1/scp).

## sftp

sftp is a similar command-line tool to scp, but the underlying SFTP protocol
allows for a range of operations on remote files which make it more like a
remote file system protocol. sftp includes extra capabilities such as resuming
interrupted transfers, directory listings, and remote file removal.

For basic transfer of a file on JASMIN to the local machine:

{{<command user="localuser" host="localhost">}}
sftp remoteuser@xfer-vm-01.jasmin.ac.uk:/group_workspaces/jasmin/myproject/data/notes.txt ./
{{</command>}}

For more information see the
{{< link "https://en.wikipedia.org/wiki/SSH_File_Transfer_Protocol" >}}Wikipedia page on SFTP{{</link>}}.

There are various 3rd-party tools and clients, for example, WinSCP, FileZilla,
MobaXterm and others, which can do transfers using the SCP and/or SFTP
protocols. Please refer to the documentation for that particular software, but
the basic principles are the same, i.e that you can set up a connection to a
remote host by specifying the same parameters that you would with the command-
line tool, but often through a graphical user interface instead.

## Note on performance

While convenient and familiar to many users, the tools described above do not
make efficient use of available bandwidth for transferring large quantities of
data via high-speed networks over long distances. Please consult [Data
Transfer Tools]({{% ref "data-transfer-tools" %}}) to learn more about which
might be the most appropriate tool to use in different contexts.
