---
aliases: 
  - /article/187-login
  - /docs/getting-started/login
description: How to login to JASMIN
slug: how-to-login
title: How to login
weight: 100
---

The instructions below cover the process of logging in using a terminal client
only. For a graphical Linux desktop, please see alternative instructions using
[NoMachine NX]({{% ref "graphical-linux-desktop-access-using-nx" %}}).

## Preparing your credentials: loading your SSH private key

In order to log in using SSH, you need to present your SSH private key as your
credential (instead of a username and password). Your private key should
reside **only** on your local machine, so this process of loading your key is
something that you do on that local machine. Even if you connect via a
departmental server, there should be no need to upload your private key to
that machine: the process of loading your key and enabling agent forwarding
should ensure that the key is available to subsequent host(s) in the chain of
SSH "hops".

The details of how to do this can vary depending on whether your local machine
runs Windows, macOS or Linux.

{{<alert alert-type="info">}}
See [presenting your SSH key]({{%ref "present-ssh-key" %}}) for recommended methods
to present your SSH key, depending on what type of machine you are using.
{{</alert>}}

Once you have set that up successfully, return here and continue below.

## The JASMIN login servers

See this article for a [description and listing of the login servers]({{% ref "login-servers" %}}).

## Logging in to JASMIN

Assuming that you have loaded your SSH private key using one of the methods
described above, then you can login to a login server as follows (do this on your own/local machine):

{{<command user="user" host="localhost">}}
ssh -A <user_id>@<login_server>
{{</command>}}

For example, user `jpax` might login to a JASMIN login server with:

{{<command user="user" host="localhost">}}
ssh -A jpax@login-01.jasmin.ac.uk
{{</command>}}

The `-A` **argument is important** because it enables "agent-forwarding".
This means that your the information about your SSH private key is forwarded
to your remote session on the login server so that you can use it for further
SSH connections.

## Can't login?

- Check our troubleshooting guide: [login problems]({{% ref "login-problems" %}})

## The login message

When you first login you will see a message that provides some useful
information (see Figure 1).

{{<image src="img/docs/login/motd-labelled.png" caption="The login message shown on login-01.jasmin.ac.uk.">}}

## X-forwarding for graphical applications (within JASMIN only)

Some applications involve displaying graphical output from an application or user interface running on a remote server,
typically to display or interact with data graphically. You can instruct
your SSH connection to enable forwarding of X-server capability by adding the
`-X` argument to the `ssh` command, as follows:

{{<command user="user" host="localhost">}}
ssh -X <user>@<hostname>
{{</command>}}

Note that the `-X` argument can be used in conjunction with the agent-forwarding
`-A` argument. In some cases the `-Y` option may be needed instead of
`-X`.

Please note that this arrangement sends your graphical output back to your
desktop machine over the network, so **should only be used within JASMIN, not
to your local desktop machine**. A solution has been put in place for a
[graphical linux desktop environment within JASMIN using NoMachine NX]({{% ref "graphical-linux-desktop-access-using-nx" %}}),
removing the need to send X11
graphics over the wide-area network. You are strongly advised to use NX for
any situation which involves graphical output on JASMIN. **Using X11 graphics
over the wide-area network outside of JASMIN is not supported: you will not
get good performance** and this makes inefficient use of shared resources
which can impair performance for other users. **Please use NX instead.** Of
course, you may still need to use X11 graphics to send graphical output back
to your JASMIN-side graphical desktop within JASMIN, but this is OK as it is
all within the JASMIN network.

## Where next?

Having been through all the steps and made an initial connection to JASMIN (well done!) you
will be keen to do some real work. You should try the [sci servers]({{% ref "sci-servers" %}}) to get started. Use
the list presented on the login screen to select a `sci` server which is not
under heavy usage.

For example, from the JASMIN login server, you might choose to login to
`sci-vm-01`:

{{<command user="user" host="login-01">}}
ssh <user>@sci-vm-01.jasmin.ac.uk
{{</command>}}

If you are asked for a password when trying to login to this second machine,
it indicates that your SSH key is not being forwarded. Please check that you
have used the `-A` option in your initial connection to the login server, or
set up agent forwarding permanently in your SSH client configuration on your
local machine.

**There is no point in trying to enter a password (or even the passphrase
associated with your key) as only an SSH key presented in the way described
above is accepted.**

Note that once you are logged into a login server then you can omit the
`<user_id>@` prefix before the server name for the onward connection, since
your username will be the same on both systems. But there is no harm in
including it anyway, to ensure that you connect as the correct user. As shown
above, the `-A` option is not needed for the onward connection, although there
is no harm in including it.

Remember to log out of the login server in addition to the sci server when you
have finished your work, to get back to your own (local) machine:

{{<command user="user" host="sci-vm-01">}}
exit
(out)logout
{{</command>}}
{{<command user="user" host="login-01">}}
(out)Connection to sci-vm-01.jasmin.ac.uk closed.
exit
(out)logout
{{</command>}}
{{<command user="user" host="localhost">}}
#
(out)Connection to login-01.jasmin.ac.uk closed.
{{</command>}}

You are then back on your own machine.

See also [connecting to a sci server via a login server]({{% ref "login-servers#connecting-to-a-sci-server-via-a-login-server" %}})
for some options of different methods for connecting to a sci server.