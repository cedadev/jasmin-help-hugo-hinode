---
description:  New MOOSE and MASS system
tags:
- met office
- moose
- tape
title: New MOOSE and MASS
---

This article contains information about the new Azure MOOSE and MASS system (AZ-MOOSE and AZ-MASS). These are not currently the operational versions of MOOSE and MASS, so please continue to refer to the other MASS pages for current workflows.

MASS refers to the tape archive and MOOSE is the interface used to interact with MASS, allowing you to do GETs, SELECTs and other commands. The current MASS system is aging and a new version of MASS, and a new version of MOOSE, is being developed.

We expect the new AZ-MOOSE commands to work in the same way as current MOOSE commands. However, there will be some differences with the new system, such as new commands to log into AZ-MOOSE.

## What do I need to do? 

1. Make your existing MOOSE commands (GETs, SELECTs etc.) as 'nice' to current MASS as you can. For example, split single large GETs into several smaller GETs.
2. Review your workflows and jobs for those that use `moo` commands so that you know which ones to target for testing when the AZ-MOOSE client becomes available.  
3. Make note of the timeline below to assist with planning of work.
4. Request an account if you wish to explore the new system before it goes live.

This page will be updated with additional information and advice as we receive it.

## Timeline and Switchover

{{<alert alert-type="info" >}}
This is a draft timeline and is potentially subject to further changes.
{{</alert>}}

{{<image src="img/docs/mass/mass_timeline.png" caption="MASS Timeline (maximise window to expand image)">}}

If you would like to be involved in the User Acceptance Testing (UAT) and have not already been contacted about it, please email: monsoon@metoffice.gov.uk 

To safely switchover to the new MASS system we need to pause all MASS access and invoke a MASS outage to complete the metadata migration. The minimum outage for all users is expected to be **48 hours**, but most users should plan for impacts spanning a longer timeframe of up to **5 working days**. The switchover date will be announced as soon possible after User Acceptance Testing to give all users as much notice as possible.

To de-risk the switchover, users may be asked to reduce MASS usage for a short period ahead of the outage. As we get closer to the switchover date, further details about this will be communicated. 

## Changes to your MASS Account 

AZ-MASS User Account Changes
    
Item | Old System | New System | Notes
---|---|---|---
Account Name | `mon_user_jane.smith.mon/ext` | `jane.smith` | You will have a single account for all MASS access. Currently, you will have separate accounts for JASMIN or Met Office systems.
Data access | Data access is specific to the platform | Data access is the same on any platform
Authentication | `.moosedir` file | `moo login` command | You will be required to log into the MOOSE system using the command line which will prompt you to enter a code into a web browser. 
{.table .table-striped}

Note that although what you can access in AZ-MASS will remain the same regardless of what platform you are signing in from (Monsoon/JASMIN/other) the AZ-MOOSE commands you can perform will differ. JASMIN remains a read-only platform (GET/SELECT etc.).

## Changes to data access 

There will be some changes to what data access you have for a period of time after service commencement. 

If you access datasets that are not associated with any of your projects but are covered by a project access rule, you may lose access to it. We are taking action to prevent this from happening, but we do expect edge cases to arise. Where this happens, please contact: monsoon@metoffice.gov.uk 

## Removed and Altered MOOSE Commands 

When the Met Office switches over to Azure MASS, some uncommon commands and options still in infrequent use today will no longer be available and for a few their behaviour has changed. The following aims to provide a definitive list of those commands and options as a reference for users.

Removed and Altered MOOSE Commands
    
MOOSE Verb | Option | Notes 
---|---|---
(any) | `-k` `--conversion-threads` | not supported on Azure MASS
(any) | `-j` `--transfer-threads` | not supported on Azure MASS
(any) | `--usage` | not supported on Azure MASS
filter | `-c` `--local-file-format` | not supported on Azure MASS
filter | `-d` `--disable-resume` | not supported on Azure MASS
filter | `-z` `--compressed-transfer` | not supported on Azure MASS
select | `-c` `--local-file-format` | not supported on Azure MASS
select | `-d` `--disable-resume` | not supported on Azure MASS
select | `-a` `--append` | not supported on Azure MASS
select | `-z` `--compressed-transfer` | not supported on Azure MASS
select |  |`--licence-file` added. `--append` removed. `--regex` added. Duplicate filename collisions now fail.
get | `-d` `--disable-resume` | not supported on Azure MASS
get | `-c` `--local-file-format` | not supported on Azure MASS
get | `-z` `--compressed-transfer` | not supported on Azure MASS
get |  | `--licence-file` option added. `--regex` option added. Changed behaviour when duplicate filenames occur.
ls | `-b` `--backup` | not supported on Azure MASS
ls |  | Cost column removed. Shows MD5 hash instead of Adler-32 checksum. Added `--regex`; extended `--long`/`--full`; `--xml` extended to show File System lock info.
quality |  | not supported on Azure MASS
defer | | not supported on Azure MASS
disable | | not supported on Azure MASS
enable | | not supported on Azure MASS
mdls | `-n` `--numberofatoms` → `--number-of-atoms` | The old option `--numberofatoms` is still supported but an alias `--number-of-atoms` has now been added for consistency.
ownedsets |  | Cost column and its GBP label removed from command output. Archiving Level replaced with Risk Level in command output.
setinfo |  | Cost column removed from command output. Archiving Level replaced with Risk Level in command output.
si |  | The output has been simplified and updated to reflect new MASS architecture.
suspend |  | Can now be used by administrators to suspend another user's operation.
{.table .table-striped}

## Limitations to AZ-MOOSE and AZ-MASS

{{<alert alert-type="info" >}}
This section contains information about limitations to AZ-MOOSE and AZ-MASS during the **UAT period**. It is subject to further updates and changes. 
{{</alert>}}


{{< accordion id="accordion-1" >}}

  {{< accordion-item title="Data availability" >}}
    Data in the Production classes, for example, `moose:/crum/` is **read only** and only contains data up until **19th January 2026**.
  {{< /accordion-item >}}

{{< /accordion >}}


## Requesting an account

{{<alert alert-type="danger" >}}
AZ-MOOSE and AZ-MASS is not yet operational. Continue to use the current MOOSE and MASS system for your workflows. You are welcome to test your workflows with the new system.
{{</alert>}}

**If you have a MONSooN3 AZ-MASS account, you do not need to request an AZ-MASS account for JASMIN.**

1. You must be an existing user of MASS to request an AZ-MASS account (see [How to apply for MASS access](how-to-apply-for-mass-access)) 
2. Email monsoon@metoffice.gov.uk from the email address you registered your existing MASS account with.

## Resources and Further Reading 

{{<alert alert-type="info" >}}
These links will only be accessible by Met Office staff members.
{{</alert>}}

{{<link "https://metoffice.sharepoint.com/sites/SupercomputingInvestmentCommsSite/SitePages/Getting-ready-for-go-live.aspx">}}Getting ready for go live{{</link>}}
{{<link "https://metoffice.sharepoint.com/sites/SupercomputingInvestmentCommsSite/SitePages/Training-Resource-hub.aspx">}}Training and resource hub{{</link>}}

If you have any questions, please email: monsoon@metoffice.gov.uk