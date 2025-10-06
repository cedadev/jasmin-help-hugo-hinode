---
aliases: /article/3824-data-transfer-tools-bbcp
description: 'Data transfer tool bbcp'
slug: bbcp
title: bbcp
---

This article provides information about the bbcp data transfer tool.

## What is bbcp?

{{<link "http://www.slac.stanford.edu/~abh/bbcp/">}}bbcp{{</link>}} is a simple command-line tool
which can use your SSH connection to transfer data in and out of JASMIN
efficiently. It works in a similar way to [GridFTP over SSH]({{% ref "gridftp-ssh-auth" %}}) in that it connects to the transfer
server using your usual SSH credentials but then can set up parallel data
streams for transferring data. One advantage of `bbcp` that it is provided as
a single binary executable which is easy to download and use.

## Using bbcp on JASMIN

Check with your local administrator to see if it is installed centrally on
your own system. If it isn't, you may need to download the correct binary from
the {{<link "http://www.slac.stanford.edu/~abh/bbcp/bin/">}}bbcp download site{{</link>}} and
simply place it in your path on your local filesystem: this can be done as a
regular/unprivileged user. At the JASMIN end, you can put the same executable
in your home directory (somewhere in your `$PATH` e.g. in your `~/bin`
directory, and make sure you give the file execute permission). Once you have
the `bbcp` command you can access any file which is readable by you when
logged into JASMIN, or write to a Group Workspace that you have access to.

## Configuring bbcp for JASMIN

When contacting `hpxfer[34].jasmin.ac.uk` you will need to set a couple of
important options for it to work. The exact options depend on whether you are
moving data into or out of JASMIN, and from where the transfer is initiated.

The `bbcp` protocol, in common with most high-bandwidth transfer tools,
requires a set of ports to be open at one or both ends in order to establish
data connections. Due to firewall restrictions this range of ports needs to be
agreed in advance. In the case of `hpxfer[34].jasmin.ac.uk` the range of ports
is **50000:51000**. Therefore all `bbcp` commands must contain the option
`--port 50000:51000`.

Also, `hpxfer[34]` will only allow incoming connections on these ports,
therefore `hpxfer[34]` must be the server which listens for data connections.
By default `bbcp` will listen for data connections at the end receiving data
and connect from the end sending data. Therefore, with the default options,
`bbcp` will succeed when pushing data to `hpxfer[34]` but fail when pulling
data from it. In order to pull data, with the transfer initiated on the remote
server, you must include the `-z` flag. Therefore the recommended commands for
transferring in either direction are:

### Initiate on JASMIN: Pull Data from remote server

{{<command user="user" host="hpxfer3">}}
bbcp -v -4 -P 5 -F --port 50000:51000 username@remote-server:<PATH-TO-SOURCE-FILE> <PATH-TO-TARGET-FILE>
{{</command>}}

### Initiate on JASMIN: Push Data

{{<command user="user" host="hpxfer3">}}
bbcp -v -4 -P 5 --port 50000:51000 <PATH-TO-SOURCE-FILE> username@remote-server:<PATH-TO-TARGET-FILE>
{{</command>}}

### Initiate on remote server: Pull Data from JASMIN

{{<command user="user" host="remote">}}
bbcp -v -z -4 -P 5 --port 50000:51000 username@hpxfer3.jasmin.ac.uk:<PATH-TO-SOURCE-FILE> <PATH-TO-TARGET-FILE>
{{</command>}}

### Initiate on remote server: Push Data to JASMIN

{{<command user="user" host="remote">}}
bbcp -v -4 -P 5 -F --port 50000:51000 <PATH-TO-SOURCE-FILE> username@hpxfer3.jasmin.ac.uk:<PATH-TO-TARGET-FILE>
{{</command>}}

In this case the `-v` flag produces verbose output .`-V` can be used for even
more verbose output. The `-4` option forces use of IP version 4 instead of
IPv6 (essential for transfers to and from `hpxfer3` or other JASMIN hosts.
Note: this option may not be available in some older versions of `bbcp`), and
the `-P` <n> option reports the status of the transfer every n seconds. The
default behaviour will print nothing. The `-F` option skips a check on the
target host to check if there is enough disk space. This overcomes occasional
problems where free space is not correctly reported to bbcp by the JASMIN file
system.

For the full set of options, see: <https://www.slac.stanford.edu/~abh/bbcp/>

Note: the `bbcp` command must be in your `$PATH` on both the source and target
machine.

### Initiate on JASMIN: Pull Data from remote server, specifying SSH command to start bbcp

{{<command user="user" host="hpxfer3">}}
bbcp -v -4 -P 5 -F --port 50000:51000 -S "/usr/bin/ssh %I -l %U %H /path/to/bbcp" username@remote-server:<PATH-TO-SOURCE-FILE> <PATH-TO-TARGET-FILE>
{{</command>}}

The path `/path/to/bbcp` can be replaced by `module load bbcp; bbcp` (or
whatever is the appropriate local requirement) in environments where `bbcp` is
a module which needs to be loaded first.

{{<command user="user" host="hpxfer3">}}
bbcp -v -4 -P 5 -F --port 50000:51000 -S "/usr/bin/ssh %I -l %U %H module load bbcp; bbcp" username@remote-server:<PATH-TO-SOURCE-FILE> <PATH-TO-TARGET-FILE>
{{</command>}}

For specifying the SSH command to start bbcp on the TARGET node, use the `-T`
option.

The [bbcp site](http://www.slac.stanford.edu/~abh/bbcp/) has good
documentation on further options, including the `-r` option for recursive
transfers. A number of useful tutorials are also available elsewhere on the
web.

## Tuning Recommendations

We recommend you tune your connection by trying various different options on a
few GBs of data.

1. By default 4 streams are opened. Try 1 stream first, particularly on fast connections, it may be faster. This is achieved with the option `-s 1`.
2. We ask users of JASMIN to tune up to a **maximum of 16 streams** (`-s 16`).
3. Do not tune the window size unless you continue to get very poor bandwidth after adjusting the number of streams. Most modern operating systems will auto-tune this parameter.
4. `bbcp` is not ideal for large directory trees of small files. If you have thousands of small files you may be better off with rsync or possibly GridFTP/Globus, depending on the network. Another simpler option is tarring/zipping the data first before transferring.

## Troubleshooting

- `bbcp` uses SSH to establish the control connection so you need to set up your SSH key in the same way as you would to SSH into `hpxfer[12].jasmin.ac.uk`. If `bbcp` isn't working you should first check you can SSH to `hpxfer[34].jasmin.ac.uk`. If you can't, please review the steps in the [Getting Started]({{% ref "get-started-with-jasmin" %}}) section before contacting the [JASMIN Helpdesk](mailto:support@jasmin.ac.uk).
- Make that you have logged in (via SSH) to both the JASMIN transfer server and the remote server with the `-A` option (agent-forwarding enabled), to ensure that your credentials are used by SSH as it invokes `bbcp` on the other server.
- Try adding the `-F`option to disable `bbcp`'s filesystem checking if you get the following error:

```txt
bbcp: Insufficient space to copy all the files from <hostname>.
```

- If you see the following error message:

```txt
Address family not supported by protocol creating inet socket
```

this is most likely because the `-4` flag was not specified. This may happen with commands that once worked, as a previously installed version of `bbcp` on JASMIN defaulted to IPv4. Currently there is no support for IPv6 on JASMIN. If the version of `bbcp` you have available on your system is old and does not have the `-4` option, consider downloading the appropriate (newer) version from the link above. It is also possible to compile the executable from source.
