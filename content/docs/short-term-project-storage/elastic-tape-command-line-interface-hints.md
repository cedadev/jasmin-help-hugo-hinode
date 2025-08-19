---
aliases: /article/4454-elastic-tape-command-line-interface-hints
description: Elastic Tape command-line interface hints
slug: elastic-tape-command-line-interface-hints
title: Elastic Tape command-line interface hints
---

{{<alert alert-type="info">}}
- Information below relates to the Elastic Tape command-line tools. The [JDMA]({{<ref "jdma">}}) system provides a better interface for putting/retrieving data into the Elastic Tape System)
- A new system called [NLDS](https://techblog.ceda.ac.uk/2022/03/09/near-line-data-store-intro.html) is coming very shortly (as of Feb 2023) and will eventually replace both of these.
{{</alert>}}

This article explains the return codes of certain Elastic Tape (ET) commands.

## et_put.py

Command-line tool to register large numbers of files for upload to Elastic
Tape

### Return codes

```txt
rc 0: normal exit    
rc 1: error in start up parameters    
rc 2: error processing list
```

{{<alert alert-type="danger">}}
When writing data to the ET system, it is very important that data remains in place on disk, in the location where ET expects to find them, until the status of the batch in question has reached `CACHED_SYNCED` or `SYNCED`.  This means that the data have actually been written to tape, but is not the case until that status is shown.

The location where ET expects to find the files will be specified in the `LISTFILE` that the user supplied to the `et_put.py` command, or all files and directories under the `DIR`.  The status of user's batches can be checked by going to the webpage: http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php.

You need to be logged into JASMIN to see this webpage, via the
[nx login servers]({{% ref "graphical-linux-desktop-access-using-nx" %}}), and use Firefox as the web browser.

Deleting the data from disk prematurely can cause problems for the ET system as a whole (impacting other users) so please be careful with this aspect.
{{</alert>}}

## et_get.py

Command-line tool to download large numbers of files from Elastic Tape

### Return codes

```txt
0: normal exit
1: error in start up parameters
2: cannot write to target directory
3: error received during download
4: closed by interrupt (^c probably)
5: completed with "bad files" (see list via stderr)
```

## et_rm.py

Command-line tool to delete files from Elastic Tape

### Return codes

```txt
rc 0: normal exit    
rc 1: error in start up parameters    
rc 2: error processing list
```

## et_ls.py

Command-line tool for listing holdings in Elastic Tape

### et_ls.py and grep

The first character on any data line is the line's type. This allows a script
to know the type of line it is trying to parse

### Return codes

```txt
0: normal exit    
1: error in start up parameters or reading config file    
2: requestor is not authorised for the intended workspace    
4: closed by interrupt (^c probably) or as a result of a head/tail command
```

## et_transfer_mp

### Return codes

```txt
0: OK    
1: config error    
2: log directory error   
3: already running    
4: error creating client
```
