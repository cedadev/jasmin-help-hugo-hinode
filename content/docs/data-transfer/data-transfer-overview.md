---
aliases: /article/219-data-transfer-overview
description: Overview of data transfer
slug: data-transfer-overview
title: Data transfer overview
---

This article introduces the topic of data transfer to/from JASMIN.

## Introduction to Data Transfer on JASMIN

As a JASMIN user you are very likely to be involved in data transfer. You
might need to copy data files/directories from JASMIN to remote sites (such as
your own PC, MONSooN or ARCHER2) or bring new data on to JASMIN. These data
transfer articles explain how to use the basic
{{<link "data-transfer-tools">}}transfer tools{{</link>}} such as `rsync` and `scp`
as well as more sophisticated services such as Globus. They also cover which
transfer services and servers are available to JASMIN users.

For many users, moving small amounts of data over short distances, the basic
tools will meet their requirements. However, data transfer is a complicated
topic so we also provide articles about how you can improve your transfer
rates to make the most of the available bandwidth. We include details about
transfers over connections to specific sites (such as the Met Office). Advice
is also provided about automating and scheduling data transfers, along with
tips for different transfer workflows.

## Transfers to/from JASMIN

### 1\. Transfers initiated from JASMIN

When initiating a transfer from a transfer server on JASMIN you would usually
start by logging on to the server (via SSH). Once you are logged in you can
initiate a connection to the outside world in order to push/pull the data you
require.

### 2\. Transfers initiated from elsewhere

When initiating a transfer from elsewhere you will transfer data files to/from
a source machine (which may be inside or outside JASMIN) to the transfer
server.

### Transfer directories

You will typically transfer data to/from a Group Workspace that you have been
granted access to. If you are copying data from JASMIN you might want to copy
data from the CEDA archive (mounted on JASMIN) to a remote site. You might
also wish to copy small volumes of data to/from your $HOME directory. All of
these locations are available on the transfer servers.

### JASMIN Transfer servers

JASMIN provides specific {{<link "../interactive-computing/transfer-servers">}}servers{{</link>}} for managing data transfers. Please read about the different servers available for
particular data transfer needs, and about the various {{<link "data-transfer-tools">}}data transfer tools{{</link>}} available.

## Improving your transfer rates

To achieve better transfer rates, for large transfers or where speed and reliability are important, you are recommended to:

- use the {{<link "globus-transfers-with-jasmin">}}Globus data transfer service{{</link>}} (recommended as the best method), or
- use the high-performance data transfer servers (physical equivalents of the transfer VMs, located in a special network zone)
- use other parallel-capable transfer tools such as bbcp, lftp (parallel-capable ftp client), or gridftp: see {{<link "data-transfer-tools">}}Data transfer tools{{</link>}}

Transfer rates depend on many factors, so try to consider all of these:

- **do you really need to transfer some/all of the data?**
  - is the data in the CEDA Archive already (don't copy it, if so, just process it in-place!)
  - can your workflow deal with processing just smaller "chunks" at a time (streaming)?
  - do you really need to have/keep all the source data, if it's stored somewhere else?
- **the network path all the way from where the source data resides, to the destination file system**
  - high-performance data transfer tools are great, but is the "last mile" over WiFi to your laptop?
  - what is the length of the network path? If it's international or intercontinental, SSH-based methods won't work well. Consider Globus.
- **the host at each end**
  - what sort of host is it (laptop, departmental server, virtual machine, physical machine) and what is its network connectivity?
- **the file systems at each end**
  - not all file systems perform the same, for given types of data or transfer methods
- **the size and number of files involved**
  - large numbers of small files can take a long time to transfer
  - are the data in deep directory trees? These can take a long time to recreate on the destination file system
  - consider creating a tar/zip archive to transfer fewer but larger files, or at least a method that copes well with many files in parallel or "in flight" at once.
- **checking data integrity**
  - some methods will verify data integrity at source and destination to ensure integrity. This can be resource-heavy and slow.
- **time of day**
  - would scheduling your transfer to happen at quieter times, mean that it completes more efficiently and/or without impacting others? Consider source and destination time zones!
