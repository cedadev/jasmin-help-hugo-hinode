---
aliases: /article/231-external-access-to-mass-faq
description: Answers to MASS & MOOSE frequently asked questions
slug: external-access-to-mass-faq
tags:
- met office
- moose
- tape
title: External Access to MASS FAQs
---

## Introduction

The Managed Archive Storage System (MASS) provides storage and restore services for large volumes of Met Office data.

This article provides answers to MASS frequently asked questions. Click on the link for each of the FAQs below to expand the answer.

## General

{{< accordion id="accordion-1" >}}

  {{< accordion-item title="Can I use my existing MASS account?" show="false" >}}
    Yes. Note that JASMIN is a read only site, so you will be unable to issues commands such as `PUT`.
  {{< /accordion-item >}}


  {{< accordion-item title="How do I use MOOSE?" >}}
    Please see the [MASS User Guide](https://docs.mass.metoffice.gov.uk/docs/category/welcome-to-mass) and you will find a reference for MOOSE in the **CLI Reference** section.
  {{< /accordion-item >}}


  {{< accordion-item title="Will my MASS account expire?" >}}
  Yes. There are two ways you account may expire. First, in order to create your MASS account you will have been added as a Guest account to the Met Office's system. The Guest account will prompt you to confirm continued access via email. Secondly, your JASMIN mass additional service will expire after 500 days. You will be able to request an extension.

  If you see the message `LOGIN_EXPIRED` this is your session that has expired, not your account. See the FAQ below for how to log back in if you see this message.
  {{< /accordion-item >}}


  {{< accordion-item title="Why am I asked for a password when logging in to mass-cli.jasmin.ac.uk?" >}}
  There are two reasons that may result in you being prompted for a password when attempting to login to the MASS client machine (`mass-cli.jasmin.ac.uk`).
  
  The first is if you do not have permission to access the machine. A quick method to check is to verify if you are a member of the `moose` user group. It should be listed when you use the `groups` command whilst logged into a JASMIN login node:

  {{<command user="user" host="login-NN">}}
  groups
  (out)moose
  {{</command>}}

  If the moose group is not listed, please contact:
  [monsoon@metoffice.gov.uk](mailto:monsoon@metoffice.gov.uk)

  The second is if you forget the `-A` option for agent forwarding when you SSH to a JASMIN login node. You can test for this condition by listing loaded identities on the login node, and finding you have none:

  {{<command user="user" host="login-NN">}}
  ssh-add -l
  (out)Could not open a connection to your authentication agent.
  {{</command>}}

  If this happens, please exit back to your local machine and SSH in again using the `-A` flag or tick the relevant box for "agent forwarding".
  {{< /accordion-item >}}

  {{< accordion-item title="How can I directly login to the MASS client machine?" >}}
  You can't, but you can edit your SSH configuration so that it automatically enables you to jump through the intermediary login servers.

  Add the following to your home institute SSH config file (`$HOME/.ssh/config file`):

  ```SSH Config
  Host mass-cli 
      User your_jasmin_userid 
      HostName mass-cli.jasmin.ac.uk
      ProxyCommand ssh -YA -t your_jasmin_userid@login.jasmin.ac.uk -W %h:%p 2>/dev/null
  ```

  You should then be able to login directly using:

  ```shell
  $ ssh mass-cli
  ```

  Please note that this only works if you are using **OpenSSH version 5.4** or
  greater as earlier versions do not support the `-W` flag. You can check your
  version using: `ssh -v`
  {{< /accordion-item >}}

  {{< accordion-item title="Can I write to MASS from JASMIN?" >}}
    No, MASS access from JASMIN is strictly read-only.
  {{< /accordion-item >}}

{{< /accordion >}}

## MOOSE messages and what to do

{{< accordion id="accordion-2" >}}

  {{< accordion-item title="LOGIN_EXPIRED" show="false" >}}
  When re-authentication is required, you will see an error of `LOGIN_EXPIRED`. This could be prompted at any time and on each different device that you use MASS from (Monsoon, JASMIN, MASS Portal, etc.).
  
  Run `moo login --device-code` and follow the prompts.
  {{</accordion-item>}}

  {{< accordion-item title="MAINTENANCE_MODE" >}}
    On occasion, MASS will be down for maintenance. Check your emails for any outage notifications and the expected duration. If you believe this error is being returned to you incorrectly, please contact [monsoon@metoffice.gov.uk](mailto:monsoon@metoffice.gov.uk)
  {{< /accordion-item >}}

  {{< accordion-item title="MOOSE_UPGRADE_REQUIRED" >}}
    Please contact [monsoon@metoffice.gov.uk](mailto:monsoon@metoffice.gov.uk)
  {{< /accordion-item >}}

{{< /accordion >}}

## MOOSE basics

{{< accordion id="accordion-3" >}}

  {{< accordion-item title="What is MOOSE (also called the CLI)?" >}}
    The software that allows you to interact with MASS.
  {{< /accordion-item >}}


  {{< accordion-item title="How do I log into my MASS account?" >}}
    Run `moo login --device-code` and follow the prompts on screen.
  {{< /accordion-item >}}


  {{< accordion-item title="How do I see what projects I am a member of?" >}}
    You can use: `moo prls`
  {{< /accordion-item >}}

  
  {{< accordion-item title="How do I get access to a project, or get access to a dataset via one of my projects?" >}}
  Please contact your sponsor. They can then [complete this form](https://metoffice.service-now.com/sp?id=sc_cat_item&sys_id=5653331e1bbaf0d88ffa422ad34bcba0&referrer=recent_items) if they also agree you require access.

  Please note that the link above is only visible to those in the Met Office.
  {{< /accordion-item >}}


  {{< accordion-item title="How do I retrieve a file from MASS?" >}}
    Use `moo get` or `moo select`. More information about both commands is in the [MASS User Guide](https://docs.mass.metoffice.gov.uk/docs/category/welcome-to-mass) on the following pages: [GET](https://docs.mass.metoffice.gov.uk/docs/CLI/Commands/moo-get) and [SELECT](https://docs.mass.metoffice.gov.uk/docs/CLI/Commands/moo-select).
  {{< /accordion-item >}}


  {{< accordion-item title="How do I make sure my directory has all the available data retrieved from MASS?" >}}
  **The problem:** You are running a model over a period of several days or weeks,
  and you need to analyse the output of the model as it runs. You have a `moo get`
  or `moo select` command that you run to fetch the data that is available. You
  want to be able to re-run it to fetch the files or fields that have been added
  to MASS since you last ran the command, but you do not want it to waste time
  re-fetching things you already have.

  **The solution:** Use the `-i` or `--fill-gaps` option when you run `moo get` or `moo
  select`. This option tells MOOSE that you only want to fetch files that don't
  already exist in the specified local directory. Note that MASS works out where
  gaps are by doing checks to see if files of the expected name exist in your
  destination directory, so it won't behave correctly if you rename files after
  you have retrieved them, or if you use the `-C` option with `moo select` which
  condenses all the matching fields into a single file.

  You might also find the `-g` / `--get-if-available` option to `moo get` useful. This
  tells MOOSE to get every file from your `moo get` list that is available, but
  ignore ones that are not there rather than exit with an error. This could help
  if you are expecting files to be archived at some point but are not sure
  whether they will be there when your job runs. If you use this option MOOSE
  will get as much as it can from your list without bailing out.
  {{< /accordion-item >}}

{{< /accordion >}}
