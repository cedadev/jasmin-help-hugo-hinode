---
aliases: /article/230-setting-up-your-jasmin-account-for-access-to-mass
description: Steps to access MASS from JASMIN
slug: setting-up-your-jasmin-account-for-access-to-mass
title: Setting up your JASMIN account for access to MASS
---

The following notes are written assuming you are using a Linux machine in your
home institution, that you have [applied for a new MASS account]({{% ref "how-to-apply-for-mass-access" %}}), and that you have received an email from the
Met Office Storage Team with your new MASS credentials file attached.

## Load your SSH key

Start an SSH agent on your home institution machine, load your private key, and enter your passphrase when requested.

{{<command user="localuser" host="localhost">}}
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_ecdsa_jasmin
(out)Enter passphrase for ~/.ssh/id_ecdsa_jasmin:
{{</command>}}

**Note:** it's a good idea to keep your private keys for different systems
separated, so you may want to keep your private key for JASMIN in a separate
file, just move the one created during the process described above to a new
sensible location such as `~/.ssh/jasmin_id_rsa`.

## Test login to the JASMIN login node

{{< alert type="info" >}}
Please read the notes in [login servers]({{% ref "login-servers/#recent-changes" %}}) about the need to
keep your SSH client up to date in order to be able to connect securely to JASMIN.
{{< /alert >}}

**Note:** that the `-A` in the first SSH command is mandatory to enable access
to the client VM, the `-X` enables X11 forwarding and is optional.

{{<command user="localuser" host="localhost">}}
ssh -A -X <userid>@login-01.jasmin.ac.uk
{{</command>}}

## Test login to the MASS client host

From the login machine, you can then login to the MASS client host.

**Note:** If it does not let you log in even when you have agent
forwarding correctly set up and can log into the sci nodes, then you have
either not requested additional access to the dedicated client machine, or
access hasn't been approved yet,
[email the Met Office Service Manager](mailto:monsoon@metoffice.gov.uk), to verify that
approval has been granted. Allow a couple of days for this process to happen
after submitting your request for access to the VM.

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

## Install your MOOSE credentials file

You can `scp` the file via a JASMIN transfer server, make sure the credentials
file is called `moose`, and you must run the `moo install` command on 
`mass-cli.jasmin.ac.uk` to set it up for you.

{{<alert type="info" >}}
The external moose client has improved security settings, so **you
must use the `moo install` command** to put your moose credentials file in the
correct place in order to get remote access to work. This can only be done on
the client machine `mass-cli.jasmin.ac.uk`. The credentials file is also changed
by the running of moo install, so this process can be run only once.
{{</alert >}}

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
moo si -v
{{</command>}}

You will be prompted to run `moo passwd -r` next — please run this.

To confirm you have the ability to run moose commands, run:

{{<command user="user" host="mass-cli">}}
moo si -v
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
