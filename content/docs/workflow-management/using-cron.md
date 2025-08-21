---
aliases: /article/3847-using-cron
description: Using Cron
slug: using-cron
title: Using Cron
---

Cron is a very common job scheduler for linux. It allows users to run the same
command or shell script periodically. Typically it is used to automate tasks,
for example, every Monday run my script to plot last week's data. There are
many guides to using [cron and
crontab](https://www.google.co.uk/?q=cron%20crontab) (the command for loading
the cron job table).

## Cron on JASMIN

Generally cron is disabled on the JASMIN general access machines such as
`sci-vm-01.jasmin.ac.uk`. This is to avoid people killing the machine by setting up
lots of processing jobs when better alternatives, e.g. Lotus, are available.
However, there are times when it is appropriate to use cron and so a generic
cron service machine is provided. `cron-01.jasmin.ac.uk` is configured like
`sci*.jasmin.ac.uk`, except cron is enabled. Anyone who can log into `sci*`
should also be able to login to `cron-01.jasmin.ac.uk`.

An additional transfer server `xfer-vm-03.jasmin.ac.uk` is equipped with `cron` for
scheduling transfers only (no processing), although other methods for
{{<link "../data-transfer/scheduling-automating-transfers">}}scheduling/automating transfers{{</link>}} are available. See also [transfer servers]({{% ref "transfer-servers/#xfer-servers" %}}).

There are a few rules of the road to using this service:

  1. **Avoid process pile up** : If a job has not finished before the cron starts the next instance of the same job then competition for resources probably means that job will also not finish. Eventually a mass of unfinished jobs will overwhelm the whole machine and it will crash. To avoid this jobs should test to see if the previous job is still running by using a lock file, or making sure the jobs timeout. The crontamer wrapper script, documented below, is available to help you implement this.
  2. **Expect it to break occasionally** : Regardless of any measure introduced by users to stop process pile up, you can expect it to go rouge at some point. We will reboot the machine when this happens, probably without warning. **_We may remove offending jobs from the cron table but persistent offenders may be barred from using the service._**
  3. **Don't do heavy processing or data transfers on `cron-01`**. You can submit jobs to lotus  to offload the processing resource: Slurm submission tools like `sbatch` are installed on `cron-01.jasmin.ac.uk`.
  4. Use `xfer-vm-03` for cron-based transfers (not `cron-01`).

## Common Cron Gotchas

The bash shell environment when cron launches scripts is not identical to the
one when working interactively. Annoyingly, the path to common tools, like
`sbatch`, may not have been setup so that you get an error message from `cron`
when it works perfectly well interactively. A way to get round this is to
source the .bash_profile in the `crontab` file so that the interactive
environment is used by `cron`.

```bash
24 * * * * . $HOME/.bash_profile; sbatch -W 12:0 mycmd.sh
```

## Crontamer

Crontamer is a wrapper script to implement lock file and time out checking for
cron jobs to avoid issues of "runaway" jobs causing problems for everyone
(e.g. where new jobs start before old ones finish, which can cause a snowball
effect).

You can download the crontamer script from
<https://github.com/cedadev/crontamer>. It is already installed on
`cron-01` and `xfer-vm-03`.

Use `cron` as normal, but include the `crontamer` command before the users own
script and arguments.  

{{<command shell="bash">}}
crontab -l
(out)## e.g. cron file entry to run job every day at 4am:
(out)0 4 * * * crontamer -t 2h '/home/users/jblogs/bin/my_repeat_script.sh -opt1 arg1 arg2'
{{</command>}}

Note: `crontamer` has a number of options which can be conflated with the
options for the wrapped script. Use single quotes to make sure the script runs
with the right options.

The flow of the crontamer script is like this:

- Check for existing lock file to indicate if the script is already running. If the lockfile is there and it can see the matching process still running then it exits silently.
- If the lock file is not there or it can't see the matching process on the system then it starts the wrapped script.
- Periodically check the wrapped script is running. If the script fails, with a non-zero exit return code, then it can email you.
- If the script has been running longer than specified timeout (default 12hr) then it will be killed.

Unless a named lock file is given the lock files are created in the `/tmp` directory as

```bash
/tmp/crontamer.{unique_id}
```

These files should be cleaned up automatically, but users may need occasional
checks or find them helpful for identifying problems running their scripts.
The `{unique_id}` is based on a combination of the username, passed script and
arguments, enabling multiple calls of a script with different arguments to be
handled separately.

All the principles above apply whether using cron on:

- the cron server `cron-01.jasmin.ac.uk` (for initiating processing workflows)
- the transfer server `xfer-vm-03.jasmin.ac.uk` (for initiating automated transfers)