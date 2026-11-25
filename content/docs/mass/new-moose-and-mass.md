---
description:  New MOOSE and MASS system
tags:
- met office
- moose
- tape
title: New MOOSE and MASS
---

This article contains information about the new Azure MOOSE and MASS system (AZ-MOOSE and AZ-MASS). These are now the operational versions of MOOSE and MASS, so please replace any saved links and reference material referring to the previous version of MASS and MOOSE.

Please also be aware that once AZ-MOOSE and AZ-MASS are embedded, this page will be removed.

MASS refers to the tape archive and MOOSE is the interface used to interact with MASS, allowing you to do GETs, SELECTs and other commands.

## Changes to your MASS Account

AZ-MASS User Account Changes
    
Item | Old System | New System | Notes
---|---|---|---
Account Name | `mon_user_jane.smith.mon/ext` | `jane.smith` | You will have a single account for all MASS access. In the previous system, you had separate accounts for different systems.
Data access | Data access is specific to the platform | Data access is the same on any platform
Authentication | `.moosedir` file | `moo login --device-code` command | You will be required to log into the MOOSE system using the command line which will prompt you to enter a code into a web browser. 
{.table .table-striped}

Note that although what you can access in AZ-MASS will remain the same regardless of what platform you are signing in from (Monsoon/JASMIN/other) the AZ-MOOSE commands you can perform will differ. JASMIN remains a read-only platform (GET/SELECT etc.).

## Changes to data access

There will be some changes to what data access you have for a period of time after service commencement. 

If you access datasets that are not associated with any of your projects but are covered by a project access rule, you may lose access to it. We have taken action to prevent this from happening, but we do expect edge cases to arise. Where this happens, please contact: monsoon@metoffice.gov.uk 

## Removed and Altered MOOSE Commands

Some uncommon commands and options are longer available and for a few their behaviour has changed. The following aims to provide a definitive list of those commands and options as a reference for users.
    
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


## Requesting an account

- {{< fas icon="arrow-right" wrapper="fa-li" >}}
See [How to apply for MASS access]({{% ref "how-to-apply-for-mass-access" %}}).
{.fa-ul}

## Resources and Further Reading

{{<alert alert-type="info" >}}
  These links will only be accessible by Met Office staff members.
{{</alert>}}

- [MASS User Guide](https://docs.mass.metoffice.gov.uk/docs/category/welcome-to-mass) About the new MASS, key concepts, and how to get started.
- [MOOSE CLI Reference](https://docs.mass.metoffice.gov.uk/docs/category/cli-reference) A command reference, plus all you need to know to use the MOOSE CLI
- {{<link "https://metoffice.sharepoint.com/sites/SupercomputingInvestmentCommsSite/SitePages/Training-Resource-hub.aspx">}}Training and resource hub{{</link>}}

If you have any questions, please email: monsoon@metoffice.gov.uk.
