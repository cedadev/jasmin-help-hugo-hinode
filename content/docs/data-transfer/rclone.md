---
aliases: /article/5037-data-transfer-tools-rclone
description: 'A "Swiss army knife" tool for data transfers'
slug: rclone
title: 'rclone'
tags:
- cloud
- s3
- sync
---

This article provides information about the rclone data transfer tool. In
particular:

- what is rclone?
- installing rclone for yourself on JASMIN.
- configuring rclone
- Dos and Don'ts

## What is rclone?

rclone is a command-line utility which enables access to lots of different
storage systems including object stores and cloud-based storage. It can also
move data between directories act as an SFTP client so could be used to access
files on JASMIN.

It is very well [documented](https://rclone.org/) already, so rather than
repeat that information here, this article highlights aspects relevant to its
use on JASMIN.

Further information will follow in due course as our experience with this tool
develops.

## Accessing rclone

`rclone` is installed on the JASMIN `xfer` servers for you, so there should now be 
no need to install it for yourself.

{{<command user="user" host="xfer-vm-01">}}
which rclone
(out)/usr/bin/rclone
{{</command>}}

You may also want to consider installing it locally on your own machine

## Configuring rclone

Configuring rclone is covered in the rclone documentation. Essentially you
need to configure a **"remote"** representing each storage system you want to
interact with. You can then use rclone to manage data between those "remotes".

## Dos and Don'ts

- Please **DO NOT use the following features on JASMIN** (at least until further notice). Some of these features look useful, but more work is needed to understand if/how they can be used safely on JASMIN without causing problems. 
  - `rclone mount` (mounting a remote as a filesystem) - **DO NOT USE**
  - `rclone rcd` (remote control daemon) - **DO NOT USE**
  - `rclone serve`(serve remote over a protocol) - **DO NOT USE**
- You should safely be able to use the following, between remotes that you have configured:
  - `rclone copyto` (for single files) 
  - `rclone copy` (similar to `rsync`, but does not delete on destination)
  - `rclone sync` (similar to `rsync`, but beware will delete files from destination)
  - `rclone lsd`
  - `rclone ls`
  - `..(other basic commands)`

See [rclone commands](https://rclone.org/commands/)

Help on a particular command is found using

{{<command>}}
rclone <command> --help
{{</command>}}

See also [using rclone]({{% ref "using-the-jasmin-object-store/#using-rclone" %}}) with the JASMIN object store.
