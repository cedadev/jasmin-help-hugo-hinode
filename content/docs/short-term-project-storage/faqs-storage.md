---
aliases: /article/4702-faqs-storage
description: New storage FAQs and issues
slug: faqs-storage
tags:
- netCDF3
- small files
title: New storage FAQs and issues
---

{{<alert alert-type="info">}}This article was originally written in 2018/19 to introduce new forms of storage which were brought into production at that stage. Some of the information and terminology is now out of date, pending further review of JASMIN documentation.{{</alert>}}

Workflows with some of the issues highlighted below will have a knock on
effect for other users, so please take the time to check and change your code
to make appropriate use of new storage system. If used correctly, the new
storage offers us a high performance scalable file system, with the capability
for object storage as tools and interfaces evolve, and we can continue to
serve the growing demand for storage in the most cost effective manner.

We understand these changes may cause you some extra work, but we hope that
you can understand why they were necessary and how to adapt to these changes.
We will continue to add to this page when new issues or solutions are found.

---

## 1\. Known cases where parallel write can occur (may be unknowingly to you!):

### Use of MPI-IO or OpenMPI

_Parallel threads can update the same file concurrently on same or from
different servers._

**Suggested solution:** use a `/work/scratch-pw*` volume which is PFS (but not
`/work/scratch-nopw*` !), then move output to SOF storage.

---

### Writing all the logs from a LOTUS job or job array to the same output or log file

**Suggested solution:** see job submission advice 
[here]({{% ref "how-to-submit-a-job-to-slurm" %}}) showing how to use SBATCH options to use distinct output and log files for each job, or element of a job array.

---

### Deleting a file via one host before another host has closed it

_This is a form of parallel write truncation_

**Suggested solution:** take care to check for completion of 1 process before
another process deletes or modifies a file. Be sure to check a job has
completed before interactively deleting files from any server you are logged
into (eg. sci1.jasmin.ac.uk)

---

### Attempting to kill a process that was writing/modifying files, but not checking that it has been killed before starting a replacement process which attempts to do the same thing

_This can happen with rsync leading to duplicate copying processes._

**Suggested solution:** check for successful termination of 1 process before
starting another.

---

### Opening the same file for editing in more than one editor on the same or different servers

Here’s an example of how this shows up using “lsof” and by listing user
processes with “ps”. The same file “ISIMIPnc_to_SDGVMtxt.py” is being edited
in 2 separate “vim” editors. In this case, the system team was unable to kill
the processes on behalf of the user, so the only solution was to reboot sci1.
 
{{<command user="user" host="sci-vm-01">}}
lsof /gws/nopw/j04/gwsnnn/
(out)COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
(out)vim     20943 fbloggs  cwd    DIR   0,43        0 2450 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP
(out)vim     20943 fbloggs    4u   REG   0,43    24576 2896 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP/.ISIMIPnc_to_SDGVMtxt.py.swp
(out)vim     31843 fbloggs  cwd    DIR   0,43        0 2450 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP
(out)vim     31843 fbloggs    3r   REG   0,43    12111 2890 /gws/nopw/j04/gwsnnn/fbloggs/sdgvm/ISIMIP/ISIMIPnc_to_SDGVMtxt.py
ps -ef | grep fbloggs
(out)......
(out)fbloggs 20943     1  0 Jan20 ?        00:00:00 vim ISIMIPnc_to_SDGVMtxt.py
(out)fbloggs 31843     1  0 Jan20 ?        00:00:00 vim ISIMIPnc_to_SDGVMtxt.py smc_1D-2D_1979-2012_Asia_NewDelhi.py
{{</command>}}

**Suggested solution:** If you are unable to kill the processes yourself,
contact the helpdesk with sufficient information to ask for it to be done for
you. In some cases, the only solution at present is for the host or hosts to
be rebooted.

---

## 2\. Issues with small files

The larger file systems in operation within JASMIN are suitable for storing
and manipulating large datasets and not currently optimised for handling small
( <64kBytes) files. These systems are not the same as those you would find on
a desktop computer or even large server, and often involve many disks to store
the data itself and metadata servers to store the file system metadata (such
as file size, modification dates, ownership etc). If you are compiling code
from source files, or running code from python virtual environments, these are
examples of activities which can involve accessing large numbers of small
files.

Later versions of our PFS systems handled this by using SSD storage for small
files, transparent to the user. SOF however, can’t do this (until later in
2019), so in Phase 4, we introduced larger home directories based on SSD, as
well as an additional and larger scratch area.

**Suggested solution:** Please consider using your home directory for small-
file storage, or `/work/scratch-nopw2` for situations involving LOTUS
intermediate job storage. It should be possible to share code, scripts and
other small files from your home directory by changing the file and directory
permissions yourself.

We are planning to address this further in Phase 5 by deploying additional SSD
storage which could be made available in small amounts to GWSs as an
additional type of storage. [Now available: please ask about adding an "SMF" volume to your workspace]

### Issues writing netCDF3 classic files to SOF storage type

Writing netCDF3 classic files to SOF storage e.g. `/gws/nopw/j04/*` should be
avoided. This is due to the fact that operations involving a lot of
repositioning of the file pointer (as happens with netCDF3 writing) has
similar issues from writing large numbers of small files to SOF storage (known
as QB ).

**Suggested solution:** It is more efficient to write netCDF3 classic files to
another filesystem type (e.g. `/work/scratch/pw*` or `/work/scratch-nopw2`) and then move them to a SOF GWS, rather than writing directly to SOF.

---

## 3\. "Everything's running slowly today"

This can be due to overloading of the scientific analysis servers
(`sci*.jasmin.ac.uk`) which we provide for interactive use. They’re great
for testing a code and developing a workflow, but are not designed for
actually doing the big processing. Please take this heavy-lifting or
long-running work to the LOTUS batch processing cluster, leaving the
interactive compute nodes responsive enough for everyone to use.

**Suggested solution:** When you log in via one of the `login*.jasmin.ac.uk`
nodes, you are shown a 'message of the day': a list of all the `sci*` machines,
along with memory usage and the number of users on each node at that time.
This can help you select a less-used machine (but don’t necessarily expect the
same machine to be the right choice next time!).

---

## 4\. Transport endpoint not connected error

This is a known issue with the SOF storage which provides the group workspace volumes. It happens when the server you are on loses connection to the main storage system, and can occur whenever you try to `cd`, `ls` a directory, or read a file. The error looks something like this:

{{<command user="user" host="sci-vm-02">}}
ls /gws/nopw/j04/my_gws/path/to/my/data/
(out)ls: cannot access '/gws/nopw/j04/my_gws/path/to/my/data/': Transport endpoint is not connected
{{</command>}}

**Suggested solution:**

If you encounter this issue, there are two things you should do:

1. Try accessing the same directory/file on [another `sci` server]({{% ref "sci-servers"%}}). If that works, then the issue is just on the first server. If not, there might be a wider issue.
2. [Report to the JASMIN helpdesk]({{% ref "how-to-contact-us-about-jasmin-issues"%}}) specifying **BOTH**:
    - the **full path** of the directory/file that you can't access
      - `/gws/nopw/j04/my_gws/path/to/my/data/` in this example, **and**
    - the **hostname** of server that you are getting this error on
      - `sci-vm-02` in this example

If it's a wider issue, we will provide updates on the {{< link "ceda_status" >}}CEDA Status page{{< /link >}} and in the MOTD (Message of the day) which appears when you log into JASMIN.

Please make sure you include **BOTH** the items above in your report, otherwise the helpdesk team will need to ask you for them before the issue can be investigated, which can cause further delay.
