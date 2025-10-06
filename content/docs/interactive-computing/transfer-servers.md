---
aliases: /article/192-transfer-servers
description: Transfer servers
tags: 
 - transfer
 - xfer-sp
title: Transfer servers
weight: 80
---

This article lists the JASMIN data transfer servers and provides links to how
they can be used.

Please see further articles in the [Data Transfer category]({{% ref "data-transfer-overview" %}}) for details on managing your data transfers.

The standard transfer servers provide a basic and functional service for
moving small amounts of data over relatively short distances. However, the
high-performance data transfer servers shown above are also available for
those with particular requirements.

{{<alert alert-type="info" >}}
Please make sure you use the dedicated transfer servers and not the scientific
analysis or login servers for any significant data transfers. The transfer servers have been configured to achieve the best transfer rates and will perform significantly better than other servers on jasmin, while maintaining the performance of analysis servers for interactive use by other users.
{{</alert>}}

JASMIN provides specific servers for managing data transfers. These are:

### `xfer` servers

Server  |  Purpose  |  Access requirements  |  Further information  
---|---|---|---  
`xfer-vm-01.jasmin.ac.uk` |  Virtual machine for general purpose data transfers.  |`jasmin-login` | Accessible from any network
`xfer-vm-02.jasmin.ac.uk` |  Virtual machine for general purpose data transfers.  |`jasmin-login` | Accessible from any network
`xfer-vm-03.jasmin.ac.uk` |  Virtual machine for general purpose data transfers.<br>Has `cron` for scheduled transfers, see notes.  | `jasmin-login`| Accessible from any network.
{.table .table-striped}

Notes:

- Similar config on all 3 (no domain or reverse DNS restrictions now)
- Same advice applies re. **SSH client version**, see [login nodes]({{% ref "#login-nodes" %}})
- If using cron on `xfer-vm-03`, you must use [crontamer]({{% ref "using-cron/#crontamer" %}})
- Throttle any automated transfers to avoid many SSH connections in quick succession, otherwise you may get blocked.
- Consider using [Globus]({{% ref "#globus-data-transfer-service" %}}) for any data transfer in or out of JASMIN
- A new software collection `jasmin-xfer` has now been added to these servers, providing these tools:

```txt
emacs-nox
ftp
lftp
parallel
python3-requests
python3.11
python3.11-requests
rclone
rsync
s3cmd
screen
xterm
```

### `hpxfer` servers

Server  |  Purpose  |  Access requirements  |  Further information  
---|---|---|---  
`hpxfer3.jasmin.ac.uk` | Physical machine for higher-performance data transfers | `jasmin-login` access role | 
`hpxfer4.jasmin.ac.uk` | Physical machine for higher-performance data transfers | `jasmin-login` access role | 
{.table .table-striped .w-auto}

Notes:

- Tested with `sshftp` (GridFTP over SSH) from ARCHER2
- Same applies re. **SSH client version**, see [login nodes]({{% ref "#login-nodes" %}})
- The software collection `jasmin-xfer` available as per [xfer servers, above]({{% ref "#xfer-servers" %}})
- The `hpxfer` role, and the supplying of client IP addresses is no longer required for these **new** servers.

### Avoid getting locked out with SSH transfers

Access rules in place to enable secure SSH connections from any network are
**sensitive to repeated, rapid connection attempts, which can result in being "locked out"**.
This may happen when attempting the transfer of several small files in quick succession with separate SSH
connections for each.
All the above servers behave the same way in this respect, so please be aware of this when
managing your transfers.

{{<alert alert-type="danger" >}}
Users are **not permitted to execute commands which require
administrative privileges.** This applies to all hosts in the managed part of
JASMIN where users have SSH login access (for example `login`, `nx-login`,
`sci`, `xfer` and `hpxfer` machines). In other words, the **use of`su` or
`sudo` is not permitted**. Please be careful when typing commands,
particularly if you have multiple terminal windows open on your own computer,
that you do not accidentally attempt `sudo`on a JASMIN machine: expect some
follow-up from the JASMIN team if you do!
{{</alert>}}

### GridFTP server

For users of the (now legacy), certificate-based GridFTP only (specifically, `gsiftp://` using the `globus-url-copy` client), there is a new server:

Server  |  Purpose  |  Access requirements  |  Further information  
---|---|---|---  
`gridftp1.jasmin.ac.uk` | Physical machine for legacy GridFTP transfers.  | No SSH login access.<br>Apply for additional access role [here](https://accounts.jasmin.ac.uk/services/additional_services/hpxfer). | Old machine, continue using for now
`gridftp2.jasmin.ac.uk` | Physical machine for legacy GridFTP transfers. | No SSH login access.<br>`jasmin-login` access role | New machine, NOT YET AVAILABLE
{.table .table-striped}

**Users of this service are now strongly advised to migrate to using [Globus]({{% ref "globus-transfers-with-jasmin" %}}) instead.**
