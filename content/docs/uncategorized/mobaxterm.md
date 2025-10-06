---
aliases: /article/4832-mobaxterm
description: Using MobaXterm with JASMIN
slug: mobaxterm
title: MobaXterm (Windows terminal client)
---

Windows users are recommended to try the 3rd party application MobaXterm for
connecting to JASMIN from Windows.
Please note its licence conditions for ongoing use, however.

## Versions of MobaXterm

The instructions given below are for version 24 of MobaXterm. For other
versions please check the MobaXterm documentation.

The method of configuring MobaXterm to store your private key has changed with
different versions. The recommended method, and an alternative, are shown
below.

## Downloading and installing MobaXterm

Visit the {{< link "https://mobaxterm.mobatek.net/download-home-edition.html" >}}MobaXterm website{{</link>}}
to download the free Home edition.

There are 2 editions available:

- "Portable" edition (can be installed as a regular user)
- "Installer" edition (may need admin privileges on your machine)

Both editions should be functionally the same once installed, but your choice
may depend on what level of access you have to your Windows machine.

For the "portable" edition, the contents of the downloaded zip file should be
extracted to a folder (eg. on your Windows desktop) where you can double-click
the executable file `MobaXterm_Personal_xx.x` (where `xx.x` is the version
number). Note that the `CygUtils.plugin` file should remain in this folder as
this is used for storing settings.

Once opened, MobaXterm presents a screen like this:

{{<image src="img/docs/mobaxterm/initial-screen.png" caption="MobaXterm's initial screen">}}

You can use the `Start local terminal` button or click the `+` tab to open
multiple tabs with a different terminal session in each tab. However, it's
worth setting up MobaXterm so that your private key is held globally and
is available to any new terminal session that you open.

## Enabling MobAgent to store your private key

In order to log in to a remote host (e.g. a JASMIN host) you need to present
your private key which is kept your local machine. MobaXterm provides MobAgent
which can store your key for the time you are running MobaXterm, and can then
present it for you, for any session in any tab, so you don't have to enter your
passphrase for each new tab that you open.

### Video demonstration

The video below demonstrates this process, or you can follow the screenshots
which follow:

{{< youtube nEQB0ztE4yY >}}

### Steps with screenshots

You need to enable MobAgent in `Settings > Configuration > SSH`:

{{<image src="img/docs/mobaxterm/ssh-configuration.png" caption="SSH Configuration tab">}}

To do this:

- Tick `Use internal SSH agent "MobAgent"`
- **Un**-tick `Use external Pageant`
- Click the `+` symbol to locate your private key file (e.g. `id_ecdsa_jasmin`)
- Click OK to save the settings. MobaXterm will now need to restart.
- When you restart MobaXterm you will be prompted for the passphrase associated with your private key.

{{<image src="img/docs/mobaxterm/passphrase-prompt.png" caption="Private key passphrase prompt">}}

Once MobaXterm has started, you can check that your SSH key has been loaded by
clicking on `Start local terminal` and using `ssh-add -l` to list the keys currently loaded.

When you type the following command in the MobaXterm terminal, you should see output similar to below:

{{<alert alert-type="info">}}
IMPORTANT: The box below is an example of what your command line prompt
might look like.

The username and computer name on the left indicates which machine you are
currently on. Everything to the right of the dollar symbol '$' is the command
which you are entering into the terminal.

You don't need to type the '$' or anything before it!

The rest of the documentation will use this format to show whether you should
run the command on your local machine (`user@localhost`) or on JASMIN (`user@sci-vm-01`).
{{</alert>}}

{{<command user="user" host="mobaxterm">}}
ssh-add -l
(out)521 SHA256:ZeddNKK5U3am1vyCaUCq4CgMRpvoyv+cJiviqz3zvfw ~/.ssh/id_ecdsa_jasmin (ECDSA)
{{</command>}}

Sometimes the last part of this output shows your email address, but it is
just a comment field at the end of the key, which can be ignored. The fact
that it's returned something which looks like a key "fingerprint", shows that your key is loaded successfully into the agent.

If you don't see your key listed in output similar to the above, please try
again: perhaps you entered the wrong passphrase? But you will need to succeed
in loading your key before you can connect to JASMIN.

## Logging in to JASMIN using key stored in MobAgent

As shown in the video above, once you have set up MobAgent you can connect to
JASMIN by creating a new terminal window. Click the `Start local terminal`
button.  
Next, try connecting to the login server:

{{<command user="user" host="mobaxterm">}}
ssh -A <user_id>@login-01.jasmin.ac.uk
{{</command>}}

Notes:

- replace `<user_id>` with your own JASMIN username)
- check the list of available [login servers]({{% ref "login-servers" %}}): you don't have to use the one above!

## Logging in to JASMIN without storing your key in MobAgent

MobAgent provides the most convenient way of accessing JASMIN. However, if you
want to login to JASMIN without setting up MobAgent you can do so as follows.

Click on the `Start local terminal` button then enter the following command. The final two lines show the output you should see: you are prompted for your key's passphrase, then if successful, you see confirmation that the key is loaded.

{{<command user="user" host="mobaxterm">}}
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_ecdsa_jasmin
(out)Enter passphrase for ~/.ssh/id_ecdsa_jasmin:
(out)Identity added: ~/.ssh/id_ecdsa_jasmin
{{</command>}}

If your key is named something different, or stored at a different location
than shown above, you will need to specify its location in the `ssh-add`
command. Note that MobaXterm refers to Windows drives as e.g. `/drives/c/`
(with forward slashes). So if you've put your key on your desktop, then the
path to that **might** be `/drives/c/Users/fred/Desktop/id_ecdsa_jasmin` (if "**fred**"
is your local username on Windows).

You will need to do this each time you open a new terminal session. To connect
to JASMIN:

{{<command user="user" host="mobaxterm">}}
ssh -A <user_id>@login-01.jasmin.ac.uk
{{</command>}}

Again, you must replace `<user_id>` with your JASMIN username.

As you can see, the MobAgent method mentioned previously makes this a bit
easier, because it persists between sessions and you navigate to the location
of your private key using graphical tools instead of having to type the path.

## Additional MobaXterm features

MobaXterm is a comprehensive application that enables many useful features
such as:

- Saved session configurations
- X-forwarding / X11 / X server (**Not recommended on JASMIN**, see [NoMachine NX for graphical linux desktop]({{% ref "graphical-linux-desktop-access-using-nx" %}}) instead)
- SSH agent forwarding
- SFTP access (with graphical drag-n-drop)
- Split-tab mode
- SSH tunnelling
- Basic Linux commands such as: `cd, ls, pwd, cat`
- Command-line transfer utilities: `scp, rsync, wget`

Please see the {{< link "https://mobaxterm.mobatek.net/documentation.html" >}}MobaXterm documentation{{</link>}} for details
on these.
