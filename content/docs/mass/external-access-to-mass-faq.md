---
aliases: /article/231-external-access-to-mass-faq
description: External Access to MASS FAQ
slug: external-access-to-mass-faq
tags:
- met office
- moose
- tape
title: External Access to MASS FAQ
---

## Introduction

The Managed Archive Storage System (MASS) provides storage and restore services for large volumes of Met Office data. It is a service operated by the UK Met Office.

This article provides answers to MASS frequently asked questions:
Click on the link for each of the FAQs below to expand the answer.

## General

{{< accordion id="accordion-1" >}}

  {{< accordion-item title="Can I use my existing MASS account" show="false" >}}
    No. You need a separate MASS account for use on the Met Office internal
network (CDN), Monsoon, ECMWF HPCs, and JASMIN. With these different account
types, you can have permission to access different datasets specific to these
computing environments.
  {{< /accordion-item >}}

  {{< accordion-item title="How do I use MOOSE?" >}}
    Please see the [MOOSE User Guide here]({{< ref "moose-the-mass-client-user-guide" >}})
  {{< /accordion-item >}}

  {{< accordion-item title="Will my account expire?" >}}
Yes. By default, MASS via JASMIN accounts will expire after 500 days and your
account will be automatically disabled.

Shortly before your account is due to expire you will receive an email, and it
will contain instructions for you and your sponsor about how to extend your
access. If your account has already expired and you are looking to reactive
it, please email: [Monsoon@metoffice.gov.uk](mailto:Monsoon@metoffice.gov.uk)
  {{< /accordion-item >}}

  {{< accordion-item title="Why am I asked for a password when logging in to mass-cli?" >}}
    There are two reasons that may result in you being prompted for a password
when attempting to login to the MASS client machine (mass-cli.jasmin.ac.uk).

The first is if you do not have permission to access the machine. A quick
method to check is to verify if you are a member of the `moose` user group. It
should be listed when you use the ‘groups’ command:

```
[login1]$ groups
moose
```
If this happens, please contact:
[Monsoon@metoffice.gov.uk](mailto:Monsoon@metoffice.gov.uk)

The second is if you forget the `-A` option for agent forwarind when you ssh to a JASMIN login
node. You can test for this condition by listing loaded identities on the
login node, and finding you have none:

```
[login1]$ ssh-add -l
Could not open a connection to your authentication agent.
```

If this happens, please exit back to your local machine and ssh in again using
the `-A` flag or tick the relevant box for "agent forwarding".

  {{< /accordion-item >}}

  {{< accordion-item title="How can I directly login to the MASS client machine?" >}}
    You can't, but you can edit your ssh configuration so that it automatically enables
you to jump through the intermediary login servers.

Add the following to your home institute ssh config file ($HOME/.ssh/config
file):
```
Host mass-cli 
    User your_jasmin_userid 
    HostName mass-cli.jasmin.ac.uk
    ProxyCommand ssh -YA -t your_jasmin_userid@login1.jasmin.ac.uk -W %h:%p 2>/dev/null
```

You should then be able to login directly using:

```
$ ssh mass-cli
```

Please note that this only works if you are using **OpenSSH version 5.4** or
greater as earlier versions do not support the `-W` flag. You can check your
version using: `ssh -v`
  {{< /accordion-item >}}

  {{< accordion-item title="Can I write to MASS from JASMIN?" >}}
    No, MASS access from JASMIN is strictly read-only. If you need to write to the MASS archive,
    contact monsoon@metoffice.gov.uk and ask to be put in touch with the relevant team.
  {{< /accordion-item >}}

{{< /accordion >}}

## MOOSE messages and what to do

{{< accordion id="accordion-2" >}}

  {{< accordion-item title="Is this process running in the correct environment?" show="false" >}}
    When running 'moo install' you may get an error message similar to:

```
Cannot read file: /home/user/<userid>/.moosedir/moose     
- is this process running in the correct environment?
```

This can be the result of the wrong combination of Unix user-id and UID having
been used to encrypt the credentials file. If you encounter this error
message, please type `id` on the command line whilst logged into JASMIN, and
send the `uid=` section of the output to:
[Monsoon@metoffice.gov.uk](mailto:Monsoon@metoffice.gov.uk)

Your credentials file will then be reissued.
    {{</accordion-item>}}

    {{<accordion-item title="Your password is due to expire in X day(s).">}}
Occasionally on running a MOOSE command you will be told that your password is
due to expire with a message of the form:

    
    
    Your password is due to expire in 6 day(s).   
    A new password can be generated using 'moo passwd -r'.
    

This refers specifically to your MASS via JASMIN, it does not affect any other
MOOSE accounts you may have.

You need to run the command as advised in order to update your credentials
whilst you are logged into mass-cli. You do not actually need to provide a new
password, as this is generated and hidden from you by the command.

If you have a retrieval in progress, it is safe to run this command as it will
not affect processes already running.
    {{</accordion-item>}}

    {{< accordion-item title="ERROR_SINGLE_COPY_UNAVAILABLE" >}}
    
MOOSE - Single Copy Unavailable error

On occasion, a tape library needs to be taken down for maintenance. If a user is trying to retrieve a single-copy file stored on one of those tapes, the retrieval will temporarily fail with the message `ERROR_SINGLE_COPY_UNAVAILABLE`. As soon as the maintenance is completed, the file will be available again.

Tapes are taken out of MASS for copying to the new MASS system and become unavailable for roughly 14 days. The process is as follows:

- Thursday (week one): Tapes are marked unavailable for indexing by the system.
- Tuesday (week two): Tapes get taken out for copying to the new MASS system.
- Following Thursday (week three): Tapes are returned to Met Office library and should be available again.

So, if you find that data or files are unavailable due to the `ERROR_SINGLE_COPY_UNAVAILABLE` error, try reading the data again on Friday, and if still not available, try the following Friday when the migration should have completed.

    {{< /accordion-item >}}

{{< /accordion >}}

## MOOSE basics

{{< accordion id="accordion-3" >}}

  {{< accordion-item title="What is MOOSE?" >}}
    The software that allows you to interact with MASS.
  {{< /accordion-item >}}

  {{< accordion-item title="What is a project?" >}}
    A collection of access rules.
  {{< /accordion-item >}}

  {{< accordion-item title="What is an access rule?" >}}
    Permission to access an area in MASS. For example, project-random might have
an access rule to moose:/crum/random-numbers

Being part of project-random would allow you to access the random-numbers set.

  {{< /accordion-item >}}

    {{< accordion-item title="How do I see what projects I am a member of?" >}}
    You can use: `moo prls`
  {{< /accordion-item >}}

    {{< accordion-item title="How do I see what access rules a project has?" >}}
    You can use: `moo projinfo -l projectname` (Replace _projectname_ with the name of one of your projects)
  {{< /accordion-item >}}
  
  {{< accordion-item title="How do I get access to a project, or add an access rule to one of my projects?" >}}
Please contact your sponsor. They can then complete this form if they also
agree you require access:

https://metoffice.service-now.com/sp?id=sc_cat_item&sys_id=5653331e1bbaf0d88ffa422ad34bcba0&referrer=recent_items

Please note that the link above is only visible to those in the Met Office.
  {{< /accordion-item >}}

      {{< accordion-item title="Why can I not access a set that I know is part of a project?" >}}
    If you are given access to a project but do not have access to all the sets
associated with it, this can be due to the Access Control Lists (ACLs).

The project owner will be able to change the ACLs on sets to make them
readable if it is appropriate.
      {{< /accordion-item >}}

  {{< accordion-item title="How do I retrieve a file from MASS?" >}}
Use `moo get` or `moo select`. More information about both commands is in the
[MOOSE User Guide]({{< ref "moose-the-mass-client-user-guide" >}}).
  {{< /accordion-item >}}

    {{< accordion-item title="How do I make sure my directory has all the available data retrieved from MASS?" >}}
**The problem:** You are running a model over a period of several days or weeks,
and you need to analyse the output of the model as it runs. You have a moo get
or moo select command that you run to fetch the data that is available. You
want to be able to re-run it to fetch the files or fields that have been added
to MASS since you last ran the command, but you do not want it to waste time
re-fetching things you already have.

**The solution:** Use the -i or --fill-gaps option when you run moo get or moo
select. This option tells MOOSE that you only want to fetch files that don't
already exist in the specified local directory. Note that MASS works out where
gaps are by doing checks to see if files of the expected name exist in your
destination directory, so it won't behave correctly if you rename files after
you have retrieved them, or if you use the -C option with moo select which
condenses all the matching fields into a single file.

You might also find the `-g` / `--get-if-available` option to moo get useful. This
tells MOOSE to get every file from your moo get list that is available, but
ignore ones that are not there rather than exit with an error. This could help
if you are expecting files to be archived at some point but are not sure
whether they will be there when your job runs. If you use this option MOOSE
will get as much as it can from your list without bailing out.
  {{< /accordion-item >}}

    {{< accordion-item title="How can I script my data retrieval from MASS?" >}}
There are restrictions on how to login to JASMIN and use of Linux utilities
such as ‘cron’ and ‘at’ but it is possible to remotely initiate a retrieval
from MASS on to JASMIN, provided you have your ssh agent running on a machine
local to you.

```
eval $(ssh-agent -s)
ssh-add ~/.ssh/jasmin_id_rsa 
ssh -A -X sci1.jasmin.ac.uk 'ssh mass-cli my_script.sh'
```   

If you have set up your $HOME/.ssh/config to allow more direct access, then
the following should work:

```
ssh mass-cli my_script.sh
```    

This will run the script “my_script.sh” on the MASS client VM. You can put the
moose retrieval commands into a script and it should work:

```bash
#!/bin/bash 
SRC_URI=moose:/opfc/atm/global/SOMETHING
moo get $SRC_URI jasmin_copy.pp 
exit
```

If you have access to an appropriate JASMIN workspace, then you can scp data
from the workspace directly through one of the dedicated data transfer VMs.
Again, you need the ssh-agent running locally:

```
eval $(ssh-agent -s)
ssh-add ~/.ssh/jasmin_id_rsa 
scp userid@xfer-vm-01.jasmin.ac.uk:/group_workspaces/cems/<project>/jasmin_file.pp my_local_copy.pp
```
  {{< /accordion-item >}}
  
  {{< accordion-item title="Can I run MASS retrievals on LOTUS or through a workload manager?" >}}
In addition to the interactive `mass-cli` server there is also a node of the [LOTUS batch processing cluster]({{< ref "lotus-overview">}}) lotus-overview with the MASS client installed. To submit jobs to this, you must use the [Slurm scheduler]({{< ref
"slurm-scheduler-overview" >}}). You will need to specify: 

- the **account** `mass`
- **partition** `mass` and
- **QOS** `mass`

for example:

```
 sbatch -A mass -p mass -q mass [<options>] <jobscript>
``` 

where \<jobscript\> looks something like:
```bash
#!/bin/bash 
SRC_URI=moose:/opfc/atm/global/SOMETHING
moo get $SRC_URI jasmin_copy.pp 
exit
```       

It is also easy to configure the [Rose/Cylc workflow manager]({{< ref "rose-cylc-on-jasmin" >}}) to submit jobs to moose1 through the Slurm scheduler by
including the following lines in your suite.rc file:

```
[[[job submission]]]
    method = slurm
[[[directives]]]
    --partition=mass
    --account=mass
    --qos=mass
[<options>]
```

  {{< /accordion-item >}}

{{< /accordion >}}
