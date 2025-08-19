---
aliases: 
 - /article/166-ssh-auth
 - /docs/
description: SSH public key authentication
slug: ssh-auth
title: SSH public key authentication
weight: 140
---

JASMIN employs SSH public key authentication for login instead of username and
password. This article provides a basic overview of public key
authentication.

## Public key authentication (for SSH)

SSH stands for "Secure Shell", a protocol that allows login to another
computer over the network. This allows the user to execute commands on a
remote machine. SSH uses encryption to keep the connection secure so that it
is more difficult for hackers to passwords or other sensitive information that
may pass through the connection.

Public key authentication is an alternative means of identifying yourself to a
login server, instead of typing a password. It is more secure and flexible,
but can appear more difficult for new users.

## Why is public key authentication more secure than a password?

When using conventional username/password authentication you will type your
password when you log on to a server. If the server you are working on has
been compromised then an attacker could learn your password and then use it to
gain access to the remote server you are connecting to.

With public key authentication, the private key is kept only on your own machine
and the passphrase to unlock it is entered there too. An attacker would require both knowledge of the
passphrase used to protect your private key as well as the private key file
itself.

{{<alert alert-type="danger">}}
It is imperative that your private key is protected by a strong passphrase so
that only you can use it.
{{</alert>}}

## Public key authentication setup

Setting up SSH keys involves the following steps:

  1. Create a pair of SSH keys (public and private **with associated passphrase** ).
  2. Provide the **public** key to remote machines/services that you wish to login to.

See [instructions for setting this up on JASMIN]({{% ref "generate-ssh-key-pair" %}}).

## Login with your SSH key pair

Once you have set up your key pair and provided your public key to the remote
machine the process is as follows:

  1. Load the **private** key into an "authentication agent" (such as `ssh-agent`) on your local machine.
  2. Use an SSH client (such as the `ssh` command) to login to the remote server. 

See [instructions for setting this up on JASMIN]({{% ref "how-to-login" %}}).

## Logging in from multiple machines

If you have a requirement to login to your JASMIN account from multiple
servers/locations then please copy your private key file securely to the
~/.ssh directory on the new machine. Note that you should restrict access the
private key so it is only readable by you.

## Using public key authentication with other applications

Many other tools use the SSH protocol for their communication with remote
servers or services, for example rsync, scp, git and subversion.
