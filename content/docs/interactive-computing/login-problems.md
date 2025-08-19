---
aliases: /article/848-login-problems
description: Login problems?
tags:
- ssh
- password
- connection
title: Login problems
weight: 40
---

Having problems connecting to a host on JASMIN? Details of how to login to
JASMIN can be found [here]({{% ref "how-to-login" %}}), but this article may help to
resolve login problems. It provides information for the following issues:

- Unable to login to a `login` server
- Can login to `login` server but can't login to a subsequent server
- `ssh-add` command gives error: "Could not open a connection to your authentication agent."
- Errors when trying to connect with MobaXterm

## Unable to login to login server

If you are unable to login to a login server e.g. `login-01.jasmin.ac.uk` then
look carefully at any error messages displayed as this can help diagnose what
is wrong:

**1) "Connection reset by peer"**

This suggests a problem with the configuration of your machine or local
network. We no longer restrict access to JASMIN by network domain, and no longer
require registration of non-`*.ac.uk` domains, so you should be able to connect from
anywhere. If your local admin team is not able to resolve the issue, please
contact JASMIN support.

**2) "Permission denied"**

Here, the most likely cause is that the SSH key which your client is
presenting does not match the one in your JASMIN account. This can be for a
number of reasons:

  * **Your SSH client is old and needs updating**
    * You can check this with `ssh -V` and comparing to the [versions mentioned here]({{% ref "login-servers#recent-changes" %}}).
    * You will need to update your client before you can connect to JASMIN securely. Ask your local admin team for help: this is
    not something that we can "fix" at the JASMIN end.
  * **You have omitted to specify the username in your SSH connection**
    * In this case, you will be attempting to connect with the username you have on your local machine, which may not be the same.
  * **You have only recently uploaded your SSH key (it can take 20 to 60 minutes before the key propagates to all the places it needs to on JASMIN).**
    * Try waiting a few minutes before trying again.
  * **You don't have your key presented or loaded in your local authentication agent (e.g. ssh-agent).**
    * Check that you are following the method suitable for your operating system
      * Please see the [presenting your SSH key]({{%ref "present-ssh-key" %}}) article for the recommended methods depending on what type of machine you are using.
    * Note that connections using the [NoMachine client]({{% ref "graphical-linux-desktop-access-using-nx" %}}) don't require an authentication agent: this can be a good alternative if you're having problems.
  * **You have not yet been granted `jasmin-login` access or your access has expired.**
    * To check, go to [My services](https://accounts.jasmin.ac.uk/services/my_services/?page=1&active=1&_apply_filters=1) on the JASMIN accounts portal and check that `Login Services : jasmin-login` is listed with a green box and a tick like this: {{<icon fas square-check text-success>}} `USER`. If not, then you either need to [apply for or extend your `jasmin-login` access](https://accounts.jasmin.ac.uk/account/login/?next=/services/login_services/jasmin-login/). If you have already done this recently, you may simply need to wait for it to be approved. Note, that if you have been granted access to a group workspace, you still need `jasmin-login` access in order to connect to JASMIN machines.

**3) "The authenticity of host 'nnnn (<ip address>)' can't be established."
or "key for host nnnn has changed"**

Your local computer stores a list of all the other SSH hosts which it has
successfully connected to in the past. If you use an intermediate host like a
login server to make onward connections to a sci machine, the login host will
maintain another such list. In both cases there should be a
`~/.ssh/known_hosts` file (so one in your local home directory on your own
machine, and one in your JASMIIN home directory).

When the SSH client first contacts the host for the SSH connection, it checks
to see if the remote host is one that it recognises. If this check fails, you
may get a message like the following:

**Message 1:**

{{<command>}}
(out)The authenticity of host 'nnnn (<ip address>)' can't be established.
(out)ECDSA key fingerprint is SHA256:8QY9iBcOQFyEYkpOtBUU8WQGeADb0DyMff01BRuvYls.
(out)ECDSA key fingerprint is MD5:f9:19:c4:5f:2b:fa:ed:aa:34:86:c9:23:dd:1c:44:30.
(out)Are you sure you want to continue connecting (yes/no)?
{{</command>}}

**Message 2:**

{{<command>}}
(out)@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
(out)@       WARNING: POSSIBLE DNS SPOOFING DETECTED!          @
(out)@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
(out)The ECDSA host key for nnnn has changed,
(out)and the key for the corresponding IP address <IP address>
(out)has a different value. This could either mean that
(out)DNS SPOOFING is happening or the IP address for the host
(out)and its host key have changed at the same time.
(out)Offending key for IP in /home/users/username/.ssh/known_hosts:62
(out)@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
(out)@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
(out)@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
(out)IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
(out)Someone could be eavesdropping on you right now (man-in-the-middle attack)!
(out)It is also possible that a host key has just been changed.
(out)The fingerprint for the ECDSA key sent by the remote host is
(out)SHA256:Evr7U40sEGSLVypfafLYtbF2oYvGDuBxTyrALdx11pk.
(out)Please contact your system administrator.
(out)Add correct host key in /home/users/username/.ssh/known_hosts to get rid of this message.
(out)Offending ECDSA key in /home/users/username/.ssh/known_hosts:115
(out)ECDSA host key for nnnn has changed and you have requested strict checking.
(out)Host key verification failed.
{{</command>}}

This can happen when:

- machines are re-installed (as part of maintenance by the JASMIN team)
- when you modify your `~/.ssh/known_hosts` file  
- when you access a "known" host but via a different name (e.g. `sci-vm-01` vs `sci-vm-01.jasmin.ac.uk`)

Message 1 means that you don't have an entry for that host in your
`~/.ssh/known_hosts` file. In most cases, you can safely reply "yes" and the
SSH connection should proceed as normal from then on.

If you get message 2, and are confident that the change is for a legitimate
reason, the solution is to modify your `~/.ssh/known_hosts` file, removing the
entries for that host (there may be more than one, as above for `sci1` vs
`sci-vm-01.jasmin.ac.uk`) by deleting those lines. Next time you try and connect,
you will get message 1, but can reply "yes" and the SSH connection should
proceed as normal.

**Note:** If you're using a graphical SFTP or SCP client for data transfers,
the error messages above may be hidden and so it can be harder to establish
the reason for failure. Using a terminal session (in MobaXterm on Windows, or
Mac/Linux terminal) to the problem host will likely reveal the messages and
enable you to follow the steps above to solve the problem.

## Can login to login server but can't login to a subsequent host

Here, there are 3 main possibilities:

**1) You have not set up agent forwarding correctly on your local machine.**

This allows your SSH key to be used for logging in from the login server to
other machines. To check, run the following command on the login server:

{{<command user="user" host="login-01">}}
echo "$SSH_AUTH_SOCK"
{{</command>}}

This should display something that looks similar to (but not identical to)

{{<command user="user" host="login-01">}}
(out)/tmp/ssh-RNjiHr2844/agent.2844
{{</command>}}

If nothing is displayed then it indicates
that agent forwarding is not working. Please read 
[how to login]({{% ref "how-to-login" %}}) and make sure
 you are running ssh-agent (or similar), have loaded
your private key and are using the `-A` option on your SSH command for the
connection to the login server. NX users should make sure that the "agent
forwarding" option is ticked when setting up a connection profile.

**2) Some hosts within JASMIN are restricted to particular (groups of)
users.**

The [`sci` servers]({{% ref "sci-servers"%}}) and [`xfer` servers]({{% ref "transfer-servers" %}})
should be available to all with `jasmin-login` access
(see above). Where you need special access to a particular service, this will be indicated
in the relevant documentation on this site. Normally you would apply for access for the relevant
access role via the {{<link "jasmin_accounts_portal">}}JASMIN accounts portal{{</link>}}.

**3) There is a problem with the host you are trying to connect to.**

Occasionally there may be problems with the host (machine) which you are
trying to connect to. The sci servers (particularly physical/high-memory hosts
`sci-ph-[12]`) experience very high usage loads and occasionally run out of
resources. This may prevent you from logging in. In some circumstances ask you
for a password: this is normally a sign that something is wrong with the
machine, since passwords are not used for SSH logins on JASMIN, so there is
no point in trying to enter your account password or SSH passphrase at this
stage. In this case please contact the JASMIN helpdesk.

If you still have problems then please contact us using the help beacon below.
It would be helpful if you can include as much of the following information as
possible:

- The IP address and full hostname of the machine you are trying to connect from.
- The date and time that you tried connecting (to the nearest minute if possible). This will help us to identify any relevant messages in any log files.
- The exact command you were using
- Add `-vvv` to your `ssh` command and send us the the output (please include the command itself)
- List the SSH keys directory on your local machine. On a Mac/Linux machine this can be done with the command: `ls -l ~/.ssh`

## ssh-add command gives error: "Could not open a connection to your authentication agent."

On some terminal sessions the usual instructions for starting the ssh-agent
session and adding the key may give the following error:

{{<command user="user" host="localhost">}}
ssh-add ~/.ssh/id_ecdsa_jasmin
(out)Could not open a connection to your authentication agent.
{{</command>}}

If you get this message, please try either:

modifying the method you use to start the ssh-agent, to:

{{<command user="user" host="localhost">}}
eval $(ssh-agent -s)
{{</command>}}

(and then trying to load the key again)

or see below (if using MobaXterm) which now has a better way of loading the SSH key.

## Errors when connecting with Mobaxterm

Please follow the [instructions for MobaXterm]({{% ref "mobaxterm" %}}) (which
include a video to show how to load your key into its own ssh-agent, `MobAgent`).

These instructions have changed with more recent versions of MobaXterm, and
replace the need to use the `ssh-add` command, so please make sure that both the
version you are using, and your method, are up to date!

Please note that even if your initial connection to (for example) your
university host does not require your JASMIN SSH key, you should still load
the key AND enable agent forwarding, for your initial connection to that host,
so that the key can be used for the subsequent connection to the JASMIN login
host. This actually applies to any connection method, not just MobaXterm.
