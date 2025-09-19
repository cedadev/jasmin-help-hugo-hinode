---
aliases: /article/4895-adding-and-removing-ssh-keys-from-an-external-cloud-vm
categories:
- For Cloud Tenants
collection: jasmin-documentation
description: Adding and removing SSH keys from an External Cloud VM
slug: adding-and-removing-ssh-keys-from-an-external-cloud-vm
title: Adding and removing SSH keys from an External Cloud VM
---

When you create a machine in a JASMIN External Cloud tenancy, the SSH key
associated with your JASMIN account is uploaded to the machine to grant you
access to the machine as `root`:

{{<command>}}
ssh -A root@<external ip>
{{</command>}}

However, this is a one-time operation when the machine is created. **Updating
your SSH key in the JASMIN Accounts Portal is not reflected in External Cloud
VMs.** Once initial access has been granted, you as the tenancy admin are
responsible for **all** configuration of the machine, including the SSH keys
allowed to access the machine. For example, you may choose to grant access to
a user who does not have a JASMIN account by adding their SSH key to the
machine.

**IMPORTANT:** When you change your SSH key in the JASMIN Accounts Portal, you
**must retain your old private key** until you have added your new key to all
External Cloud VMs that you administer. Failing to do so will result in you
being locked out of those machines.

## Adding and removing SSH keys

The allowed SSH keys for a user can be found in `$HOME/.ssh/authorized_keys`
for the user. For `root`, this is `/root/.ssh/authorized_keys`.

To grant access to a user, they must first {{<link "../getting-started/generate-ssh-key-pair">}}generate an SSH key pair{{</link>}}. Once they have done this, they should give you
their **public** key. **The private key should never leave the user's
local machine.** Once you have added this public key as a new line to the
`authorized_keys` file for the target user on your External Cloud VM, the user
will be able to SSH to the machine.

Similarly, to disable access for a user, just remove their public key from the
`authorized_keys` file on the machine.

**IMPORTANT:** When replacing an old key with a new one, make sure that you
add the new key before removing the old one or you may accidentally lock
yourself out of your machine.
