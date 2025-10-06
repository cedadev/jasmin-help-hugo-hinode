---
aliases: /article/5091-multiple-account-types
description: Multiple account types
slug: multiple-account-types
tags:
- shared
- service
- account
title: Multiple account types
weight: 110
---

This article defines the types of account available on JASMIN and their
purpose. It covers:

- STANDARD accounts (with note about training accounts)
- SHARED accounts
- SERVICE accounts

## Introduction

For some time, we have been asked by user communities to cater for legitimate
use cases where accounts need to be shared by a small, known and pre-arranged
set of users, or by services or functions.

To maintain a secure approach, we have brought these together into a clearly-
defined set of account types for each purpose.

## Definitions

### STANDARD accounts

A standard account:

  * is for use by one human individual user only.
  * can login to the JASMIN accounts portal to (re)set a password, store an SSH key and apply for access roles.
  * has a unique SSH key, traceable to its owner.

**Training accounts** are a special type of STANDARD account, issued on a
short-term basis and preconfigured with certain access roles as required for
training events.

A **standard account** holder may act as a **responsible user** on one more
**service** or **shared accounts.**

### SHARED accounts

A shared account:

  * is for use by a small, defined set of **responsible users** , each associated by their **standard account** username
  * has a set of SSH public keys, one for each **responsible user**. The **shared account** itself does not have a key, and users do not share keys. The set of keys associated with the **shared account** is updated automatically in the event that any individual **responsible user** changes their the SSH key on their own **standard account**.
  * can log in to the JASMIN accounts portal using the shared account username to apply for roles and can (re)set a a password, which may be shared securely** and only between the set of responsible users. The accounts portal profile for the shared account will display, but not allow editing of, the public keys of the responsible users.
  * can be used by individual **responsible users** to login via SSH, but using their own individual SSH private key which must not be shared with any other user, and should be kept locally, i.e. not uploaded to anywhere on JASMIN.
  * by default, emails originating from the JASMIN accounts portal destined for **shared accounts** are instead sent to all their **responsible users**. An optional email address for the **shared account** itself may be specified in the accounts portal profile for the account.
  * can perform any action in the system that a standard account can, including but not limited to the following (and subject to membership of relevant access roles): 
    * becoming a member of a group workspace
    * using elastic tape / JDMA
    * submitting a job to the LOTUS batch processing cluster
    * obtaining an short-lived credential for use with a high-performance transfer method
  * may be requested by a user or group of users via the JASMIN helpdesk, but the decision as to whether to grant the request is at the discretion of the JASMIN team, after scrutiny of the request, its justification and the past JASMIN behaviour of the individual users proposed to be responsible for the **shared account.**

**An example of a secure means of sharing a password is to use Keeper (or
similar password manager system) to share a securely-stored entry with a
specific list of other individuals in an encrypted form. Password sharing via
unencrypted means (such as a text file, email or post-it note) is not
permitted.

### SERVICE accounts

A service account:

  * is for use by a service or function only
  * has one or more **responsible users** , each associated by their **standard account** username
  * can never log in to the JASMIN accounts portal or (re)set a password.
  * may be granted roles by arrangement with the JASMIN team
  * has no SSH key
  * emails originating from the JASMIN accounts portal destined for **service accounts** are instead sent to all their **responsible users.** An optional email address for the **service account** itself may be specified in the accounts portal profile for the account.
  * may be requested by a user or group of users via the JASMIN helpdesk, but the decision as to whether to grant the request is at the discretion of the JASMIN team, after scrutiny of the request, its justification and the past JASMIN behaviour of the individual users proposed to be responsible for the **service account.**

**NOTES:**

  * With the implementation of these new account types, existing setups will be examined and discussed with their "owners" and moved over to either **service** or **shared account** types as appropriate.
  * Users of a **shared** or **service account** are jointly responsible for actions performed by the account. This requires coordination and communication between responsible users, which should be done independently of the JASMIN system.
  * Membership of a **shared** or **service account** , and availability of the account itself, may be withdrawn if behaviour falls outside the [JASMIN Terms and Conditions](https://accounts.jasmin.ac.uk/account/conditions/). In serious cases, individual users may be barred from further use of JASMIN altogether. Users are reminded to familiarise themselves with the **Terms and Conditions** and have a responsibility to keep up to date with them as they change. Users must also pay attention to service announcements made by the JASMIN team by email and other means.

Requests for shared or service accounts should be sent to
the JASMIN helpdesk with "shared account
request" or "service account request" in the subject line.
