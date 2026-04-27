---
aliases: /article/185-generate-ssh-key-pair
description: How to create an SSH key pair for logging in to JASMIN
slug: generate-ssh-key-pair
title: Generate an SSH key pair
weight: 20
---

{{< alert alert-type="danger" >}}
These instructions are intended for users setting up an SSH connection to JASMIN **for the first time, or on a new device**.

If you could previously connect with your existing key on the same device and now can’t, **generating a new key pair is unlikely to solve the problem**, and may make it more difficult to troubleshoot.

If you are having problems connecting to JASMIN via SSH, please see [Login problems](../interactive-computing/login-problems). If you are still unable to solve the problem, please contact the [JASMIN Helpdesk](mailto:support@jasmin.ac.uk) before attempting to update your key.
{{< /alert >}}

## SSH client and terminal

When you create an account on the JASMIN Accounts Portal (step 2
of {{<link "get-started-with-jasmin">}}Get Started with JASMIN{{</link>}}), you will be asked to upload the public key of an SSH key pair you have generated.

Generating an SSH key pair requires an SSH client, usually an application which functions as a terminal: 
a text-based environment where you type commands to make things happen. Linux
and Mac users can use a standard terminal which is very likely to have SSH
installed. Windows users are advised to find a suitable SSH client to use or
install on their machine. Suggestions are:

- {{<link "https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement">}}Windows OpenSSH client{{</link>}} an optional feature in Windows 10 or 11, but usually installed by default.
- {{<link "https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html">}}PuTTY{{</link>}} set of SSH tools (includes PuTTYgen GUI tool for generating keys, and Pageant ssh-agent)
- {{<link "../uncategorized/mobaxterm">}}MobaXterm{{</link>}} (requires license), provides a Linux-style terminal
with all the relevant command-line and some GUI utilities included.

There are many more, but if you stick to one of these three, which are known to us, then potentially we can help you if you run into difficulties.

{{<image src="img/docs/generate-ssh-key-pair/file-QrkL51B5fW.png" caption="Example Mac terminal" >}}

{{<image src="img/docs/generate-ssh-key-pair/file-jmOb6PSApE.png" caption="Example terminal using Mobaxterm client on Windows">}}

## Using ssh-keygen to create an SSH key pair

{{<alert alert-type="info">}}
We recommend you use an ECDSA key instead of RSA, for better compatibility with some JASMIN services.
{{</alert>}}

The Linux command `ssh-keygen` should be used to generate your SSH key pair.
Open a terminal and generate your public and private key, as follows, replacing the e-mail address with your own:

{{<command user="localuser" host="localhost">}}
ssh-keygen -m PEM -t ecdsa -b 521 -C "me@somewhere.ac.uk" -f ~/.ssh/id_ecdsa_jasmin
{{</command>}}

(Here, `~/` or `$HOME` both mean "your home directory". The equivalent on Windows is `%USERPROFILE%`)

The equivalent using the graphical PuTTYgen or MobaKeyGen tools is with these settings: choose these **before** clicking "Generate".

{{< image src="img/docs/generate-ssh-key-pair/puttygen-ecdsa-key.png" caption="Settings for generating an ECDSA key in PuTTYgen (same for MobaKeyGen)." wrapper="col-8 mx-auto">}}
When prompted, type a **secure passphrase** to protect your SSH private key.
**This is a requirement for access to JASMIN machines. Use a new, different
passphrase whenever you generate a new key.** Note that nothing is echoed to
the screen when you enter your passphrase, so it may look like it is not
working.

The output from the command-line tools will look something like this:
{{<command user="localuser" host="localhost">}}
(out)Generating public/private ecdsa key pair.
(out)Enter passphrase (empty for no passphrase): <ADD PASSPHRASE HERE>
(out)Enter same passphrase again: <REPEAT PASSPHRASE HERE>
(out)Your identification has been saved in /home/users/meuser/.ssh/id_ecdsa_jasmin.
(out)Your public key has been saved in /home/users/meuser/.ssh/id_ecdsa_jasmin.pub.
(out)The key fingerprint is:
(out)74:14:95:8a:31:73:cc:5c:af:be:91:04:01:c2:39:0b me@somewhere.ac.uk
{{</command>}}

Running `ssh-keygen` will generate two files in your `$HOME/.ssh/` directory:

- `id_ecdsa_jasmin.pub` - public key file
- `id_ecdsa_jasmin` -  private key file (which should have permission "600", i.e. read/write only by you)

The **public** key file is the part that you need to share in order to access
JASMIN. Windows may mistakenly associated the `*.pub` file with Microsoft Publisher so don't try to double-click it. When you need to copy & paste its contents to upload to your JASMIN profile, use a simple text editor (like Notepad). 

- {{< fas icon="arrow-right" wrapper="fa-li" >}} If you are updating an existing key, please follow the instructions in {{<link "update-a-jasmin-account/#update-ssh-public-key">}}Update a JASMIN account{{</link>}} to upload it to your profile.
{.fa-ul}

Make sure both key files are stored in a directory called `.ssh` in your home directory (`~/.ssh`, `$HOME/.ssh` or `%USERPROFILE%\.ssh` on Windows, or `${env:UserProfile}\.ssh` in PowerShell). Storing them elsewhere sometimes causes problems with permissions, but it's also good to keep keys in one place so that they can be kept securely.

{{<alert color="warning" icon="fas lock">}}
The **private** key file should be protected and not shared with
others. It should stay on your local machine: **Do not copy your private key to anywhere on JASMIN.**
{{</alert>}}

- {{< fas icon="arrow-right" wrapper="fa-li" >}} Once you have created your SSH key pair, please follow the instructions on {{<link "present-ssh-key">}}Present your SSH key{{</link>}} in order to connect to JASMIN.
{.fa-ul}
