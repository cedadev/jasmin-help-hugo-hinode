---
aliases: /article/191-login-servers
description: Login servers
tags:
- login
title: Login servers
weight: 30
---

## Available login servers

There are four login servers available to access resources within JASMIN.
Users with the `jasmin-login` access role can access the following servers via
{{<abbr SSH>}}.

{{<alert alert-type="info" >}}
All four login servers now have identical configuration and should be accessible from any network.
{{</alert>}}

name |
--- |
`login-01.jasmin.ac.uk` |
`login-02.jasmin.ac.uk` |
`login-03.jasmin.ac.uk` |
`login-04.jasmin.ac.uk` |
{.table .table-striped .w-auto}

## Features of login servers

Login servers have minimal resources and software installed. They provide:

- a means to access other resources within JASMIN (inside the {{<abbr STFC >}} firewall)
- access to your home directory (`/home/users/<username>`)
- no analysis software
- no access to group workspaces

### Recent changes

- There is no longer any requirement for forward/reverse DNS lookup or any restriction by
institutional domain.
- You no longer need to register non-`*.ac.uk` domains with the JASMIN team.
- This means all users can access all login servers (previously some users could only use particular ones)
- As before, no filesystems other than the home directory are mounted.
- Use only as a "hop" to reach other servers within JASMIN.
- **Make sure your SSH client is up to date**. Check the version with `ssh -V`. If
it's significantly older than `OpenSSH_8.7p1, OpenSSL 3.0.7`, speak to your local
admin team as it may need to be updated before you can connect securely to JASMIN.
  
See also [How to login]({{% ref "how-to-login" %}}) and other articles in the [Getting started]({{% ref "getting-started" %}}) category.

See also [NoMachine NX service]({{% ref "graphical-linux-desktop-access-using-nx" %}}) which provides login to a graphical Linux desktop, rather than a single terminal window.

## How to use the login servers

For full details of how to log in, including making onward connections to
other machines, please see the article ["How to login"]({{% ref "how-to-login" %}}).

{{<alert alert-type="danger">}}
Users are **not permitted to execute commands which require
administrative privileges**. This applies to all hosts in the managed part of
JASMIN where users have SSH login access (for example `login`, `nx`,
`sci`, `xfer` and `hpxfer` machines).

In other words, the **use of `su` and `sudo` is not permitted**.

Please be careful when typing commands,
particularly if you have multiple terminal windows open on your own computer,
that you do not accidentally attempt `sudo`on a JASMIN machine: expect some
follow-up from the JASMIN team if you do!
{{</alert>}}

## Connecting to a sci server via a login server

The connection via a login server can be done either with 2 hops, or using a login server as a Jump Host (-J):

- 2 hops method:

{{<command user="user" host="localhost">}}
ssh -A fred@login-01.jasmin.ac.uk
{{</command>}}
{{<command user="fred" host="login-01">}}
ssh fred@sci-vm-01.jasmin.ac.uk
## no -A needed for this step, if no onward connections from sci server
{{</command>}}
{{<command user="fred" host="sci-vm-01">}}
## now on sci server
{{</command>}}

- Jump Host method:

{{<command user="user" host="localhost">}}
ssh -A fred@sci-vm-01.jasmin.ac.uk -J fred@login-01.jasmin.ac.uk
{{</command>}}
{{<command user="fred" host="sci-vm-01">}}
## now on sci server
{{</command>}}

Alternatively, the same effect can be achieved with a ProxyJump directive in your local `~/.ssh/config` file:

```config
Host Sci1ViaLogin01
  User fred
  ForwardAgent yes
  HostName sci-vm-01.jasmin.ac.uk
  ProxyJump fred@login-01.jasmin.ac.uk
```

You could then simply connect to `Sci1ViaLogin01`:

{{<command user="user" host="localhost">}}
ssh Sci1ViaLogin01
{{</command>}}
{{<command user="fred" host="sci-vm-01">}}
## now on sci server
{{</command>}}

If you don't want to have to set up a separate alias for each machine that you want to log into, you can also set up a wildcard, for example:

```config
Host *.jasmin.ac.uk
  User fred
  ForwardAgent yes

Host *.jasmin.ac.uk !login*.jasmin.ac.uk !xfer*.jasmin.ac.uk !nx*.jasmin.ac.uk
  ProxyJump login-01.jasmin.ac.uk
```

Then you when you connect to any JASMIN host (other than a login or transfer host), it will go via login-01:

{{<command user="user" host="localhost">}}
ssh sci-vm-01.jasmin.ac.uk
{{</command>}}
{{<command user="fred" host="sci-vm-01">}}
## now on sci server
{{</command>}}

If on your local machine you have also set up a domain search path for hostname lookups that includes `jasmin.ac.uk` so that you can use short hostnames e.g. `ssh sci-vm-01`, then you will also need to add the following lines so that ssh converts these to full hostnames -- otherwise the above wildcard will not match when you do this.

```config
CanonicalizeHostname yes
CanonicalDomains jasmin.ac.uk
```

This sort of configuration is useful for connections needed by remote editing/development tools such 
as VSCode. The example above relies on having your key loaded locally in an ssh-agent.

An alternative is to include a line specifying
the location of your key, so you'll then be prompted for your passphrase whenever you connect:

```config
Host Sci1ViaLogin01
  User fred
  ForwardAgent yes
  HostName sci-vm-01.jasmin.ac.uk
  ProxyJump fred@login-01.jasmin.ac.uk
  IdentityFile ~/.ssh/id_ecdsa_jasmin
```

