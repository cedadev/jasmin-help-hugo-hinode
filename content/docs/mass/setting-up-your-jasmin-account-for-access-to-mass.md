---
aliases: /article/230-setting-up-your-jasmin-account-for-access-to-mass
description: Steps to access MASS from JASMIN
slug: setting-up-your-jasmin-account-for-access-to-mass
title: Setting up your JASMIN account for access to MASS
---

The following notes are written assuming that you:

- are using the machine where your SSH key is stored (your laptop or desktop in your home institution)
- have [applied for a new MASS account]({{% ref "how-to-apply-for-mass-access" %}})
- have received an email from the Met Office Storage Team with your new MASS credentials file attached.

## Load your SSH key

Use one of the methods in [Present SSH Key]({{% ref "present-ssh-key/#2-loading-your-key-into-an-agent" %}}) to make sure your key is
available for use in your Terminal session.

{{<alert alert-type="info">}}It's a good idea to use separate private keys for different systems 
(e.g. JASMIN, Met Office) so you may have multiple SSH private key files, named as per those systems.

If so, you can repeat the process of presenting your key for each private key file, so that you have all
the keys that you need loaded within the same agent in your Terminal session.
{{</alert>}}

## Test login to the JASMIN login node

{{< alert alert-type="info" >}}
Please read the notes in [login servers]({{% ref "login-servers/#recent-changes" %}}) about the need to
keep your SSH client up to date in order to be able to connect securely to JASMIN.
{{< /alert >}}

**Note:** You will need **"agent forwarding"** enabled for your **initial** connection: this is the `-A` option for the initial connection to the login node. Graphical clients normally provide a tick-box option for this. Likewise, if you need graphics output you should also use `-X` to enable X11 forwarding, but for any graphics-heavy applications you are recommended to make the initial connection using the [NX graphical linux desktop service]({{% ref "graphical-linux-desktop-access-using-nx" %}}) instead and use a Terminal window within that environment.

In your terminal window:

{{<command user="localuser" host="localhost">}}
ssh -A -X <userid>@login-01.jasmin.ac.uk
{{</command>}}

## Test login to the MASS client host

From the login machine, you can now make the onward connection to the "MASS client" host.

{{<command user="user" host="login-01">}}
ssh -X <userid>@mass-cli.jasmin.ac.uk
{{</command>}}
{{<command user="user" host="mass-cli">}}
echo "Hello World"
(out)Hello World
exit
{{</command>}}
{{<command user="user" host="login-01">}}
exit
{{</command>}}
{{<command user="localuser" host="localhost">}}
## back on your local machine
{{</command>}}

If the mass client host does not let you in, even when you have correctly set up agent
forwarding (test this by making an onward connection to a `sci` server), then you have
either:

- not requested additional access to the dedicated client machine, or
- access hasn't been approved yet, in which case [email the Met Office Service Manager](mailto:monsoon@metoffice.gov.uk), to verify that approval has been granted.

Allow a couple of days for this process to happen after submitting your request for access to the VM.

## Install your MOOSE credentials file

You should now copy your MOOSE credentials file from your local machine to your JASMIN home directory
using `scp` via a JASMIN [transfer server]({{% ref "transfer-servers" %}}). Make sure the credentials file is called `moose` and in a directory with the correct permissions.

Start on your local machine, where you should have the credentials file:

{{<command user="user" host="localhost">}}
scp moose <userid>@xfer-vm-01.jasmin.ac.uk:~/moose
ssh -A -X <userid>@login-01.jasmin.ac.uk
{{</command>}}
{{<command user="user" host="login-01">}}
ssh -X <userid>@mass-cli.jasmin.ac.uk
{{</command>}}

Create a `.moosedir` directory and set the correct permissions:

{{<command user="user" host="mass-cli">}}
mkdir .moosedir/
chmod 700 .moosedir/
{{</command>}}

Move your moose credentials file into the directory and set permissions:

{{<command user="user" host="mass-cli">}}
mv moose .moosedir/
chmod 600 .moosedir/moose
{{</command>}}

Run the following command:
{{<command user="user" host="mass-cli">}}
moo si -l
{{</command>}}

You will be prompted to run `moo passwd -r` next — please run this.

To confirm you have the ability to run moose commands, run:

{{<command user="user" host="mass-cli">}}
moo si -l
{{</command>}}

## Test use of the locally installed MOOSE client

{{<command user="user" host="mass-cli">}}
which moo  
(out)/opt/moose/external-client-version-wrapper/bin/moo   
moo si  
(out)<system information appears here>  
moo help  
(out)<help details appear here>      
moo projlist  
(out)<list of projects appears here>
{{</command>}}

You have now successfully accessed MASS from JASMIN!

If you are new to MOOSE, you might like to read the 
[User Guide]({{% ref "moose-the-mass-client-user-guide" %}}) next.
