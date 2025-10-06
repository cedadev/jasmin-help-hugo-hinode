---
aliases: /article/3811-data-transfer-tools-ftp-and-lftp
description: 'Data Transfer Tools: ftp and lftp'
slug: ftp-and-lftp
title: 'ftp and lftp'
---

This article provides information about FTP (File Transfer Protocol) as a data
transfer tool. In particular:

- what is FTP?
- where and how can I use FTP on JASMIN?
- what are its limitations?

## What is FTP?

{{<link "https://en.wikipedia.org/wiki/File_Transfer_Protocol">}}FTP{{</link>}} is a well-established
transfer protocol enabling connections from a client to download
files from, or upload files to, a server, although limited in security. A wide variety of client tools are
available to the user, 2 implementations of which are available on the JASMIN
transfer servers, although no server is provided. `ftp` is also the name of
the basic FTP client program, see below.

## Where and how can I use FTP on JASMIN?

FTP can only be used as a client on JASMIN, to pull data from external FTP
servers to local storage on JASMIN, for example a Group Workspace or your home
directory. **There is no FTP server within JASMIN providing the ability to
upload files to these locations.** Please use an alternative, more secure
method instead. See other [Data Transfer Tools]({{% ref "data-transfer-tools" %}}) such as [scp/rsync/sftp]({{% ref "rsync-scp-sftp" %}}), [bbcp]({{% ref "bbcp" %}}) or GridFTP ([over SSH]({{% ref "gridftp-ssh-auth" %}}) or using [Globus]({{% ref "globus-transfers-with-jasmin"%}}))

On the [transfer servers]({{% ref "transfer-servers" %}}), you can use one of
the installed FTP clients to download data from elsewhere. These are:

- `ftp` basic ftp client. Usage details
- `lftp` parallel-capable ftp client. Usage details

CEDA however runs 2 FTP servers within the JASMIN environment providing
download-only access to the CEDA archive. Access to these is controlled by
your CEDA account and any dataset-specific privileges which are associated
with that account.

## What are its limitations?

- FTP was never designed as a secure protocol and has {{<link "https://en.wikipedia.org/wiki/File_Transfer_Protocol#Security">}}several limitations{{</link>}} affecting how it can be used safely within an environment like JASMIN.
- Some external sites offer anonymous FTP download. In this case, no username or password needs to be exchanged and (as long as the data resources do not need to be protected in any way) this can provide a simple but effective data transfer method.
- Few external sites now provide FTP access to protected data resources, hence many data-intensive institutions are now focussing on more sophisticated data delivery methods which can meet the demands of security and performance in a multi-user environment.

## Basic client usage: ftp

The `ftp` client is available on the transfer servers `xfer*.jasmin.ac.uk`
and high-performance transfer servers `hpxfer*.jasmin.ac.uk`.

Example 1: Downloading a file to a location on JASMIN from a remote FTP
server.

This involves setting up an interactive client session. Once logged in (in
this case, using anonymous FTP), you use FTP commands to interact with the
remote server and locate and download the data you require. The session is
terminated with `bye`.

{{<command user="user" host="xfer-vm-01">}}
ftp someserver.somesite.ac.uk
(out)Trying 123.456.78.123...
(out)Connected to someserver.somesite.ac.uk (123.456.78.123).
(out)220----------------------------------------------------------------------------
(out)220-Welcome message from somesite.ac.uk
(out)220----------------------------------------------------------------------------
(out)220 
(out)Name (123.456.78.123:username): anonymous
(out)331 Please specify the password.
(out)Password:
{{</command>}}

Once connected, the prompt changes to `ftp>`:

{{<command prompt="ftp>">}}
(out)230 Login successful.
Remote system type is UNIX.
(out)Using binary mode to transfer files.
cd /sites/pub/testdir/
(out)(out)(out)250-
250-This is the somesite ftp repository.
250-
(out)250 Directory successfully changed.
get md5.sum
(out)local: md5.sum remote: md5.sum
(out)227 Entering Passive Mode.
(out)150 Opening BINARY mode data connection for md5.sum (45 bytes).
(out)226 Transfer complete.
(out)45 bytes received in 0.00267 secs (16.83 Kbytes/sec)
bye
(out)221 Goodbye.
{{</command>}}

Full details of commands available within an interactive session with the
`ftp` client are available via the man page (`man ftp`).

## Parallel-capable client usage: lftp

The alternative client `lftp` is less verbose, but the basic workflow is the
same.

{{<command user="user" host="xfer-vm-01">}}
lftp someserver.somesite.ac.uk
{{</command>}}

Once connected, the prompt changes to `lftp` and the name of the remote server:

{{<command prompt="lftp someserver.somesite.ac.uk:~>">}}
cd /sites/pub/testdir
(out)cd ok, cwd=/sites/pub/testdir/
get md5.sum
(out)45 bytes transferred
bye
{{</command>}}

The interactive shell provided by `lftp` also benefits from tab completion and
use of up/down arrows for command history.

In fact, lftp can also be used as an SFTP client, with the added benefit that
it can handle multiple SFTP transfers in parallel.

In the following example, we connect to a remote SFTP server using the `sftp://`
syntax. Once logged in to the remote server, the prompt changes and you can
enter lftp-specific commands like `mirror`, in this case with `-P 4` as the option
to use 4 `sftp` processes in parallel. Try other values but please consider
other users so a suggested limit is 16.

{{<command user="user" host="xfer-vm-01">}}
lftp sftp://username@someserver.somesite.ac.uk
Password: (enter password when prompted)
{{</command>}}
{{<command prompt="lftp username@someserver.somesite.ac.uk:~>">}}
mirror -P 4 sourcedata
bye
{{</command>}}

Note that if you're connecting **_to_** a JASMIN transfer server in this way,
then you would need to make your JASMIN private key available in an ssh agent
locally, and you would not be prompted for the password.
