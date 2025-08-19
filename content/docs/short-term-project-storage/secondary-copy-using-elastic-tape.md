---
aliases: /article/3842-secondary-copy-using-elastic-tape
description: Secondary copy using Elastic Tape
slug: secondary-copy-using-elastic-tape
title: Secondary copy using Elastic Tape
---

{{<alert alert-type="info">}}
Please see [Near-Line Data Store](nlds) for details of JASMIN's new storage service, which will replace both JDMA and Elastic Tape and is now available for use.
{{</alert>}}

## Introduction

Elastic Tape is a system developed for use with JASMIN Group Workspaces
(GWSs), enabling the Group Workspace Manager to:

- Optimise their use of high-performance online disk by moving data to and from cheaper near-line storage
- Create and manage secondary copies of GWS data

At present, the system is designed only to be used by GWS Managers, rather
than individual members of a GWS. It is the responsibility of a GWS Manager to
create and manage backups or additional copies of data in a GWS.  
  
The servers used to access Elastic Tape changed in January 2021.
Previous users should note that the server to use now is `et.jasmin.ac.uk`.

**The maximum size for any file put into Elastic Tape is 500GB.  This changed in 2023, when the underlying tape system was upgraded.  Please limit your files to less than 500GB.**

## Who can use ET?

ET is only for use by the named GWS manager, i.e. the individual responsible for managing the GWS disk space. The high-performance disk space used for a GWS is a valuable commodity and the role of the GWS Manager involves making best use of the online space. This may mean moving data to tape to free up space online, or taking a copy of online data to make a secondary copy. **No undertaking is provided that the secondary copy will exist beyond the lifetime of the Group Workspace itself, hence it is called a secondary copy and not a backup. It is also NOT long-term archive storage:** some data in GWSs may need to be earmarked for longer-term archive storage and wider availability via the CEDA Archive, but this is a **separate process** for which data management plans, ingest processes and metadata need to be put in place. Please contact the helpdesk if this is the case, but ideally this needs to be considered at project design phase (as it may need funding!).

Each GWS has a quota of online disk space (agreed at the time of its creation) and initially the ET quota has been set to the same value. So if you have a 10 Tb workspace, you initially have a 10Tb quota of ET storage to match.

## How does it work?

Putting data into ET storage involves creating a "batch" of data which is
transferred to the ET system. Using either a file list or top-level directory
for reference, the system calculates resources needed and creates a batch,
identified by a batch ID. This must be retained by the GWS manager as a
"ticket" for later retrieval of this batch of data. It is recommended that you
assess the data that you plan to transfer so that you have an idea of the
overall volume to be transferred before initiating any actual transfer jobs.
It is also recommended to test operation with a small set of test data.

Transparent to the user, and asynchronously (so it is not necessary to wait
with a terminal window open), the data are transferred first to online cache
and then to tape storage. It is not an instant process and the task of
migrating data from online cache to tape can take several hours, even days,
depending on factors such as the size of the transfer, contention for the tape
system and network conditions. An RSS feed and a web page provide updates on
the process of data transfer for each batch. Data can later be retrieved, or
removed from ET storage via similar tools.

The transfer of data via a batch involves the "registration" of each file in a
database so that its existence is recorded.

Command line tools are provided on a dedicated machine within the JASMIN
infrastructure, to which GWS managers will be given access. A GWS manager has
access to the python tools `et_put.py`, `et_get.py`, `et_rm.py` and
`et_ls.py`. Some initial documentation for these command line tools is
attached.

## What should I do next?

It is recommended to try sending **and retrieving** some small data transfers
(a few Gb) at first using the documentation below, but the system has been
designed to cope with storing entire GWSs. You will need ssh login access to
`et.jasmin.ac.uk` first. This should have been arranged for you as part of the 
GWS setup process. If not, please contact the JASMIN helpdesk. Once
there, you should be able to see your group workspace and try out the commands
on a small set of test data.

## System overview

Elastic Tape provides the ability to create "batches" of files which are then
sent to the storage system, initially to an online disk cache before being
written to near-line tape. Batches can later be retrieved, or removed. An
alert system provides the user with the ability to monitor the progress of
transfer jobs.

The system comprises:

- A command-line interface on a client machine
- A backend system, consisting of 
  - I/O servers connected to an online disk cache and database
  - A near-line tape system

## Configuration file

As a GWS manager, you will normally be responsible for one or more GWSs. The
GWS with which you wish to work using ET needs to be specified either in a
configuration file in your home directory, or by specifying the workspace as
an option in the command line interface.

Certain default settings are set in a system-wide config file at
`/etc/et_config`.

If needed, you need to create a small text file in your home directory named
`.et_config`, which contains the following, replacing "myworkspace" with the
name of your default workspace:

```ini
[Batch]
Workspace = myworkspace
```

`myworkspace` should just be the short name of the workspace, not the full
path to it.

The workspace specified in any command-line option overrides that specified in
the user's (`~/.et_config`) config file, which in turn overrides that
specified in the system (`/etc/et_config`) config file.

Please **REMOVE** any previous reference to host and port from your individual
`~/.et_config file`. This setting is now set from the system /etc/et_config
file.

Further configuration options are available in the `[DIRECTORY]` section of
the file, see the system-wide file /etc/et_config for examples. The main
parameter for which you may wish to override the default is:

```ini
outputLevel = workspace|batch|file
```

although these can be over-ridden at the command line anyway. See `et_ls.py`
command documentation below for the meaning of these options.

## User interface

Please note that NOT ALL features of the currently-implemented user interface
are described here, however we would recommend that users limit their usage to
those features described below.

The user interface consists of the following components:

- **et_put.py** Put data onto tape
- **et_get.py** Retrieve data from tape
- **et_rm.py** Remove data from tape
- **et_ls.py** List data holdings on tape
- **Alerts** Get information about processes and holdings via web interface

The commands are available on host `et.jasmin.ac.uk`. As a GWS manager you
should have been granted login access to this machine using your JASMIN
account, however if accessing the host from outside the RAL network you will
need to use one of the login gateways `login*.jasmin.ac.uk`. Use the -A option or
equivalent for agent forwarding in ssh. STFC users may use the STFC VPN to
connect to `et.jasmin.ac.uk` as if it were a local connection.

{{<alert alert-type="danger">}}
When writing data to the ET system, it is very important that data remains in place on disk, in the location where ET expects to find them, until the status of the batch in question has reached `CACHED_SYNCED` or `SYNCED`.  This means that the data have actually been written to tape, but is not the case until that status is shown.

The location where ET expects to find the files will be specified in the `LISTFILE` that the user supplied to the `et_put.py` command, or all files and directories under the `DIR`.  The status of user's batches can be checked by going to the webpage: http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php. You need to be logged into JASMIN to see this webpage, via the [nx-login servers]({{% ref "graphical-linux-desktop-access-using-nx" %}}), and use Firefox as the web browser.

Deleting the data from disk prematurely can cause problems for the ET system as a whole (impacting other users) so please be careful with this aspect.
{{</alert>}}

* * *

### et_put.py

Put data onto tape.

#### Synopsis

```bash
et_put.py [-v] [-l LOGFILE] [-w WORKSPACE] [-c] [-t one-word-tag] [ -f LISTFILE | DIR ]
```

#### Description

Data files to be stored can be specified either in an input list file (-f) or
by specifying the path to the top of a directory tree containing files to be
stored. All symbolic links are ignored (see note below). In both cases, the
system will analyse the request and create a **batch** , identified by a
`BATCH ID`, which can later be used to retrieve that set of files from
storage. Although the main "put" operation is asynchronous (and does not
require you to maintain a terminal connection for its duration), the initial
registration step, which creates the BATCH ID is synchronous, so you should
wait for this step to complete before disconnecting.

Given current resources, all users of Elastic Tape share the current
throughput capacity of about 25 TB/day, which may increase over time. Please
consider this when organising your input batches and expectations of
completion time. Large numbers of small files will degrade performance.

#### Options

option | details
---|---  
-v  |  Verbose output
-l LOGFILE  |  Log file in which to record process output
-f LISTFILE  |  Text file containing ABSOLUTE paths of files to be stored, 1 file per line. NB Files and directory names are case-sensitive. The list should not contain any blank lines or extraneous white space.
-w WORKSPACE  |  Name of the group workspace to use. Overrides default set in config file. Case sensitive.
DIR  |  ABSOLUTE path to top of directory tree containing files to be stored  
-c  |  Continue if errors encountered.
-t tag  |  Tag batch with descriptive label meaningful to user. Should be single one-word string. Appears as "Batch name" in ET alert output and "Tag" in et_ls output.
{.table .table-striped}
  
#### Example usage

Simple case, using a file input.list which contains paths of all the files to
be included in the batch:

{{<command user="user" host="et">}}
et_put.py -v -l et_put.log -f input.list -w myworkspace
{{</command>}}

In the following example, the `-c`option is used to continue on errors. One
error that may be encountered is that a file already exists in the system
(e.g. has already been "put"). This option causes the system to ignore any
errors and continue with the transfer. Note that this should not be used by
default (we would rather know about errors and fix them!)

{{<command user="user" host="et">}}
et_put.py -v -l et_put.log -f input.list -w myworkspace -c
{{</command>}}

Alternative usage specifying a directory beneath which all files / directories
will be included. In this case the directory must be the last parameter in the
command:

{{<command user="user" host="et">}}
et_put.py -v -l et_put.log -w myworkspace /group_workspaces/jasmin/myworkspace/mydir
{{</command>}}

**Symbolic links:** Attempting to include symbolic links in an et_put
operation should cause an error. You can override this with the `-c` option
(although this will ignore ALL errors), but a better solution is to generate a
list file as in the first two examples above. If this list file is generated
with a command like `find <path> -type f > listfile.txt`, then referring to it
in the et_put command will ensure that only those files are included in the
batch. You can then keep the list file (perhaps named as per the resulting
batch ID for your own records.

* * *

### et_get.py

Retrieve data from tape

#### Synopsis

```bash
et_get.py [-v] [-l LOGFILE] [-b BATCHID | -f FILELIST] [-w WORKSPACE] [-r DIR] [-t MAXPROC]
```

#### Description

Data files to be retrieved should be specified by referring to the `batch ID`
of the batch in which they were stored. If files have been stored by
specifying an absolute path e.g. `/group_workspaces/jasmin/myworkspace/mydir`,
the retrieval process will not write the retrieved files to the same location
but a new location specified by `DIR`. The final part of the relative path
needs to correspond with the first part of the absolute path of the stored
files, e.g. `group_workspaces`

Proposed best-practice is to create a temporary directory for retrieved data
within your workspace, e.g. `/group_workspaces/jasmin/myworkspace/ettmp` and
to do the initial retrieval into that directory. Once you are satisfied that
the retrieval has completed correctly, data can be moved back to their
original location in the workspace. NB if you need additional storage space
for this, please see [requesting resources]({{% ref "requesting-resources" %}}).

#### Options

option | details
---|---  
-v  |  Verbose output
-l LOGFILE  |  Log file in which to record process output. Note that the log file location must be capable of accepting multi-threaded input, or this parameter should be omitted and instead the output from the et_get command be piped to the log file from stdout
-b BATCHID  |  ID of batch to be retrieved
-f FILELIST  |  A list of individual files to be retrieved, with one file per line. Note that:<br>- entries in the list must contain the full name of the file, including path, just as it was archived<br>- the list should not contain blank lines or any extraneous white space.
-w WORKSPACE  |  name of the group workspace to use. Overrides default set in config file. Case sensitive.
-r DIR  |  ABSOLUTE path of retrieval location
-t MAXPROC  |  Maximum number of worker processes to use in retrieval. MAXPROC recommended to be between 5 and 10. Please feed back your experience of performance improvement with this feature.
{.table .table-striped}

#### Example usage

{{<command user="user" host="et">}}
cd /group_workspaces/jasmin/myworkspace
mkdir ettmp
et_get.py -v -l et_get.log -w myworkspace -b 507 -r /group_workspaces/jasmin/myworkspace/ettmp
{{</command>}}

At this point, data will be transferred into the specified retrieval
directory. Files and directories will be restored with their ABSOLUTE path
below the retrieval directory. NB this is a synchronous process and you will
need to keep your terminal window open to ensure it completes (or run within
the `screen` command if you are familiar with this).

When the retrieval process has finished, you should satisfy yourself that it
is correct (using your preferred method). When this is the case, you can move
the data to the required location as shown below:

{{<command user="user" host="et">}}
mv /group_workspaces/jasmin/myworkspace/ettmp/group_workspaces/jasmin/myworkspace/* /group_workspaces/jasmin/myworkspace
{{</command>}}

* * *

### et_rm.py

Remove data from tape

#### Synopsis

```bash
et_rm.py [-v] -b BATCHID [-w WORKSPACE]
```    			

#### Description

Deletes the files in the specified batch from the Elastic Tape system.

#### Options

option | details
---|---
-v  |  Verbose output
-b BATCHID  |  ID of batch to be removed   
-w WORKSPACE  |  name of the group workspace to use. Overrides default set in config file. Case sensitive.
{.table .table-striped}

Example usage:

{{<command user="user" host="et">}}
et_rm.py -v -b 507
{{</command>}}

* * *

### et_ls.py

List holdings on tape

#### Synopsis

```bash
et_ls.py [-h] [-X XMLSOURCE] [-H] [-b BATCHID] [-w WORKSPACE] [-L {file,batch,workspace}] [-F {text}]
```

#### Description

Lists the holdings of a workspace within Elastic Tape at the file, batch or
workspace level.

#### Options

option | details
---|---
-h, --help  |  show this help message and exit
-x XMLSOURCE --xmlsource XMLSOURCE  |  Base XML source, if not default. Note that this has to be compatible with the current base source currently, so can’t be pointed at files, for example
-H --headerWanted  |  Print headers showing column names for text output
-b BATCHID --batchid BATCHID  |  ID of batch by which to filter results
-w WORKSPACE  |  Name of the group workspace to use. Overrides default set in config file. Case sensitive.
-L {file, batch, workspace} --outputLevel {file, batch, workspace}  |  Level of detail to display for results (default is "workspace")
-F {text} --outputFormat {text}  |  Format to use for the display of results
{.table .table-striped}

Example usage:

{{<command user="user" host="et">}}
et_ls.py -w myworkspace -H -L file -b 504
{{</command>}}

Works with the workspace "myworkspace", selects display of headers in output,
results at file level, filter by batchid 504 (i.e. shows the files present in
ET in the given batch.)

{{<command user="user" host="et">}}
et_ls.py -w myworkspace -H -L batch
{{</command>}}

Works with the workspace "myworkspace", selects display of headers in output,
results at batch level (i.e. shows the batches present in ET holdings for this
workspace.)

### Alerts

The system provides real-time status messages on the progress of operations
requested. **These services are now available only inside the RAL firewall** ,
so JASMIN users outside of RAL should use the 
[NX graphical desktop service]({{% ref "graphical-linux-desktop-access-using-nx" %}}) to open a
firefox browser on one of the nx-login servers, to access these URLs

**Alerts Dashboard** <http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php>

**RSS Feed** <http://et-monitor.fds.rl.ac.uk/et_rss/ET_RSS_AlertWatch_atom.php>

In both cases these can be customised to display only alerts from the
workspace of interest to the GWS manager.

**Alerts Dashboard** <http://et-monitor.fds.rl.ac.uk/et_user/ET_AlertWatch.php?workspace=WORKSPACE>

**RSS Feed** <http://et-monitor.fds.rl.ac.uk/et_rss/ET_RSS_AlertWatch_atom.php?workspace=WORKSPACE>

(replace `WORKSPACE` with your workspace name in the above URLs)

**Further views**

**ET Home** <http://et-monitor.fds.rl.ac.uk/et_user/ET_Home.php?caller=USERNAME>

**Holdings summary**[http://et-monitor.fds.rl.ac.uk/et_user/ET_Holdings_Summary.php?caller=USERNAME&workspace=WORKSPACE](http://et-monitor.fds.rl.ac.uk/et_user/ET_Holdings_Summary.php?caller=USERNAME&workspace=WORKSPACE)

(replace `USERNAME` with your username, `WORKSPACE` with your workspace name
in the above URLs)
