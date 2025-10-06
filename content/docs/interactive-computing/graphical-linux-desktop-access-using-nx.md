---
aliases:
- /article/4810-graphical-linux-desktop-access-using-nx
- nx-update-nov24
description: Graphical linux desktop using NoMachine NX
tags:
- nx
- nomachine
- desktop
- X11
title: Graphical linux desktop using NoMachine NX
weight: 50
---

{{<alert alert-type="info">}}Updated advice Nov 2024, now works for all platforms if you update your SSH key.{{</alert>}}

## Introduction

- This service provides a graphical Linux desktop on JASMIN, ideal
for use with graphics-heavy tasks like interactive work with large images.
- The desktop environment includes a Firefox web browser which can be used to access
internal-only web resources.

Using graphical applications over a wide-area network can be very slow, and is
not recommended or supported on JASMIN. This service provides a better alternative with
graphical desktop **within** the JASMIN environment itself, rather than on the user's local machine.

A small client application, available for you to install on your local machine,
enables you to connect to specific servers within JASMIN. Graphics are then relayed to the client
application in a more efficient form, resulting in much better performance particularly if you need
to interact with what's being displayed.

The service provides an improved user experience and is strongly
recommended over standard X11 graphics.

The following servers have the NX service available and can be
used as described below. These now have **identical configuration**, so you can use any one of them from any network location.

name | notes
--- | ---
`nx1.jasmin.ac.uk` |
`nx2.jasmin.ac.uk` |
`nx3.jasmin.ac.uk` |
`nx4.jasmin.ac.uk` | (new server now available)
{.table .table-striped .w-auto}

### Notes

- The `nx*` servers should only be used with Nomachine Enterprise Client as described below, other than for testing your connection, as this preserves system resources for their intended purpose.
- Although the graphical desktop session should persist when you close the client (unless you specifically log out), you should not rely on this feature, so please don't report this as a problem: occasionally machines run out of resources and sessions get killed. Keeping sessions open consumes resources on the server even when you're not using the session, which may mean that other users can't use the service.

## Installing NoMachine Enterprise Client

Download the
{{<link "https://downloads.nomachine.com/enterprise/?product=enterprise-client" >}}appropriate version of the NoMachine Enterprise Client{{</link>}}
from NoMachine. The first time you click this link, you might be redirected to the homepage of the NoMachine download site. If you click the link a second time, you should be taken straight to the NoMachine Enterprise Client download page.

There are several different NoMachine products: 
**the only one you need to install is NoMachine Enterprise Client.**

Note that **NoMachine Enterprise Client** is a different application to the
"NoMachine Enterprise Desktop" or "NoMachine" available from the more publicised download
links on the NoMachine website or other applications in the NoMachine suite:
the desktop edition contains additional components to enable remote access to
your **own** (local) machine from a remote location: perhaps convenient
but not what we are trying to enable for you here.

The **NoMachine Enterprise Client** is a cut-down client to which connects to a remote
server: in your case, the server is at the JASMIN end, where the desktop session will exist.

Versions are available for Windows, Mac and Linux. You may need privileges on
your local machine in order to install the software so you may need to ask for
help from your local IT helpdesk.

Remember to check for updates for the enterprise client to ensure you always
have the latest stable version. You can configure the application to check for
updates (and optionally apply them automatically) by going to Settings /
Updates in the menu.

## Setting up your connection

There are 2 methods of using your SSH key which should work with JASMIN, these affect how you set up the connection:

| Method | pros/cons |
| ---|---|
| 1. Specify the location of your SSH private key | {{< icon fas plus text-success >}} simple <br>{{< icon fas plus text-success >}} no admin permissions needed<br>{{< icon fas plus text-success >}} works for all platforms if you update your key to ECDSA |
| 2. Use your key stored in a local ssh-agent | {{< icon fas plus text-success >}} useful if you use other applications which use SSH (e.g. VSCode)<br>{{< icon fas minus text-warning >}} may need admin permissions for 1st-time agent setup<br>{{< icon fas minus text-warning >}} careful editing of config file required in some cases |
{.table .table-striped}

For a simple terminal connection to JASMIN, you would follow the instructions in [presenting your ssh key]({{% ref "present-ssh-key/#1-specifying-the-key-location-each-time" %}}), but the NoMachine client needs you to do it a slightly different way. The same principles apply however.

### Method 1: specifying key location

Videos for each platform (click the tab for your operating system):

{{< nav tab-type="tabs" id="tabs-create-key" >}}
  {{< nav-item title="Windows" show="true" >}}
    {{< video media-id="QVj05W9iFJE" >}}
Notes:

- This method has now been tested with Windows 10 and 11, but requires you to [update your SSH key to ECDSA]({{%ref "generate-ssh-key-pair"%}}).
  {{< /nav-item >}}
  {{< nav-item title="Mac" >}}
    {{< video media-id="wXDhnP1Ut1c" >}}
  {{< /nav-item >}}
  {{< nav-item title="Linux" >}}
    {{<video media-id="fsty4PC4Srk">}}
  {{< /nav-item >}}
{{< /nav >}}

#### Step-by-step instructions

{{< accordion id="accordion-create-with-key" >}}
  {{< accordion-item title="Step by step instructions (click to expand)" show="false" >}}
  1. Open the NX client
      1. On Mac and Windows, click the NoMachine Icon
      1. On Linux, the default location for the executable once installed is `/usr/NX/bin/nxplayer`, so you may want to add this to your `$PATH`. Your desktop environment may enable you to add an icon to your desktop.
  1. In the "Machines" view, select "Add"
      1. You're now in the "Address" tab. Type a name for this connection profile, and the full hostname, e.g. `nx1.jasmin.ac.uk`. Set the Protocol to "SSH", which will change the port to 22.
  1. Go to the "Configuration" tab.
      1. Choose **"Use key-based authentication with a key you provide"** , then click the Modify button to the right.
      1. The default is "Use password authentication": **don't** use this.
      1. Use the button to the right to navigate to your private key, or type the path in the box.
      1. Your private key may be in a hidden directory e.g. `~/.ssh` (see {{<link "#cant-find-your-private-key">}}Troubleshooting{{</link>}})
      1. For security, it is recommended NOT to "import the private key to the connection file" (store it in an **encrypted** password manager instead).
      1. Make sure you tick the box "Forward Authentication" **IMPORTANT**

  1. Go back to the "Add connection" dialog
      1. If all is correct, click "Add"
  {{< /accordion-item >}}
{{</accordion>}}

Once you have created the connection profile, go to [Connecting]({{% ref "#connecting" %}}), below, and continue from there.

### Method 2: using an agent

The alternative profile for using an agent instead, is very similar but we need to select option **"Use key-based authentication with a SSH agent"**.

Videos for each platform:

{{< nav tab-type="tabs" id="tabs-create-agent" >}}
  {{< nav-item title="Windows (OpenSSH)" show="true" >}}
    {{< video media-id="CxNJz2rLZuA" >}}
  {{< /nav-item >}}
  {{< nav-item title="Mac" >}}
    {{< video media-id="wBIBtBLGE1g" >}}
  {{< /nav-item >}}
  {{< nav-item title="Linux" >}}
    {{<video media-id="5Yrk8XrmAAE">}}
  {{< /nav-item >}}
{{< /nav >}}

#### Step-by-step instructions

{{< accordion id="accordion-create-with-agent" >}}
  {{< accordion-item title="Steps in more detail (click to expand)" show="false" >}}

- In the "Machines" view, select "Add"
- You're now in the "Address" tab. Type a name for this connection profile, and the full hostname, e.g. `nx1.jasmin.ac.uk`. Set the Protocol to "SSH", which will change the port to 22.
- Go to the "Configuration" tab.
- Choose **"Use key-based authentication with a SSH agent"** , then click the Modify button to the right.
- Make sure you tick the box "Forward Authentication" **IMPORTANT**
- Go back to the "Add connection" dialog
- If all is correct, click "Add"

  {{< /accordion-item >}}
{{</accordion>}}

Once you have created the connection profile, go to [Connecting]({{% ref "#connecting" %}}), below, and continue from there.

## Connecting

### Connecting with method 1 (key)

Follow the steps in the video to show how to connect to the desktop on the `nx` server, and to make the onward connection to the `sci` server:

{{< nav tab-type="tabs" id="tabs-connect-key" >}}
  {{< nav-item title="Windows" show="true" >}}
    {{< video media-id="Ox7S8LOfUwQ" >}}
Notes:
- This method has now been thoroughly tested with the new ECDSA keys and should work for Windows 10 and 11 users if you have updated your key.
- Make sure you have returned your `~/.nx/config/player.cfg` file to its default state if you edited this previously. The relevant lines should be reset as follows, but remember to edit the file with the NoMachine Enterprise Client application **closed**:
```xml
<option key="SSH client mode" value="library">
<option key="SSH Client" value="nxssh.exe">
```
- If it does not work for you particular setup however, please try one of [Methods 2: OpenSSH or 2: Pageant]({{% ref "#method-2-using-an-agent" %}}) instead.
  {{< /nav-item >}}
  {{< nav-item title="Mac" >}}
    {{< video media-id="kNu4oInzEb8" >}}
  {{< /nav-item >}}
  {{< nav-item title="Linux" >}}
    {{<video media-id="3ndUx8JFp0U">}}
  {{< /nav-item >}}
{{< /nav >}}

#### Step-by-step instructions

{{< accordion id="accordion-connect-with-key" >}}
  {{< accordion-item title="Steps in more detail (click to expand)" show="false" >}}

- You'll be asked for your username and the passphrase for your key. It is NOT recommended to save your passphrase in the connection file.
- Click OK
- You may see a list of all the other desktop sessions currently in progress from other users. Ignore these and click "New desktop".
- Select "Create a new virtual desktop", then click "Create"
- **Note the instructions for how to reach the NX menu once in the session, and select screen settings from the list of icons: Recommended setting is "Fit to window" (leftmost icon)**
- Click OK on this and subsequent screens giving information about the NX and desktop environments.
- You should be presented with a linux deskop on the server to which you connected, e.g. `nx1.jasmin.ac.uk`
- You should be presented with a linux deskop on the server to which you connected, e.g. `nx1.jasmin.ac.uk`
- Locate the icon to open the "Terminal" application (bottom of window in Rocky 9 desktop)
- The video demonstrates making an onward connection to a `sci` server and testing the graphics functionality by opening the `xterm` application on that server, before exiting and logging out of the NX desktop.

{{</accordion-item>}}
{{</accordion>}}

### Connecting with method 2 (agent)

**Overview of this method:**

In summary, we need to:

- Load the SSH private key into a local ssh-agent
- Unless using **Pageant** as the agent, edit the NX configuration file to use the native ssh client instead of the NoMachine "library" one.
- Use the connection profile we created earlier, to connect.

1\. Load your SSH private key into your authentication agent

- Follow the [instructions for your platform here]({{% ref "present-ssh-key/#1-loading-your-key-into-an-agent" %}}), then return once you have successfully loaded your key.
  - for **Windows**, this can be either the **Windows "OpenSSH Client" optional feature**, or **Pageant**, which is part of the **PuTTY** suite of SSH tools, but not any other ssh-agent. The MobaXterm agent "MobAgent" will not work for this purpose. 
  - for **Linux**, you may find that a "local" ssh-agent does not work: for example using Gnome desktop, you may need to use the global one for your desktop environment, e.g.  `gnome-keyring-daemon --start` instead, before doing `ssh-add <key>`

2\. Edit the NX configuration file

- Open the file `.nx/config/player.cfg` in a simple text editor (e.g. Windows Notepad). The `.nx` directory should be in your home directory.
- Towards the end of the file, you should see two lines like this:

  ```xml
  <option key="SSH client mode" value="library">
  <option key="SSH Client" value="nxssh.exe">
  ```

  Change them as follows:
  
  (the changes are slightly different for each platform)
{{< nav tab-type="tabs" id="tabs-os2" >}}
  {{< nav-item title="Windows (OpenSSH)" show="true" >}}
```xml
  <option key="SSH client mode" value="native" />
  <option key="SSH Client" value="C:\Windows\System32\OpenSSH\ssh.exe" />
```
  {{< /nav-item >}}
  {{< nav-item title="Windows (Pageant)" >}}
  Leave the file unaltered, with the default settings, as above.
  {{< /nav-item >}}
  {{< nav-item title="Mac" >}}
```xml
  <option key="SSH client mode" value="native" />
  <option key="SSH Client" value="/usr/bin/ssh" />
```
  {{< /nav-item >}}
  {{< nav-item title="Linux">}}
```xml
  <option key="SSH client mode" value="native" />
  <option key="SSH Client" value="/usr/bin/ssh" />
```
  {{< /nav-item >}}
{{< /nav >}}

  **Save** and **close** the file before opening NoMachine Enterprise Client.

Next, follow the video below for actually connecting, or see the step-by-step instructions below:

{{< nav tab-type="tabs" id="tabs-connect-agent" >}}
  {{< nav-item title="Windows (OpenSSH)" show="true" >}}
    {{< video media-id="VUZYOVbugRc" >}}
  {{< /nav-item >}}
  {{< nav-item title="Windows (Pageant)">}}
    {{< video media-id="4URCp5AcJdg" >}}
  This video covers the whole process, including how to convert the key using PuTTYgen and load it using Pageant, then set up a connection and use it to connect.
  {{< /nav-item >}}
  {{< nav-item title="Mac" >}}
    {{< video media-id="Q7JrBPacBao" >}}
  {{< /nav-item >}}
  {{< nav-item title="Linux" >}}
    {{<video media-id="K98A2VdcZo8">}}
  {{< /nav-item >}}
{{< /nav >}}

#### Step-by-step instructions

{{< accordion id="accordion-connect-with-agent" >}}
  {{< accordion-item title="Steps in more detail (click to expand)" show="false" >}}

- Enter your JASMIN username in the box
- Click OK
- You may see a list of all the other desktop sessions currently in progress from other users. Ignore these and click "New desktop".
- Select "Create a new virtual desktop", then click "Create"
- **Note the instructions for how to reach the NX menu once in the session, and select screen settings from the list of icons: Recommended setting is "Fit to window" (leftmost icon)**
- Click OK on this and subsequent screens giving information about the NX and desktop environments.
- You should be presented with a linux deskop on the server to which you connected, e.g. `nx1.jasmin.ac.uk`
- Locate the icon to open the "Terminal" application (bottom of window in Rocky 9 desktop)
- The video demonstrates making an onward connection to a `sci` server and testing the graphics functionality by opening the `xterm` application on that server, before exiting and logging out of the NX desktop.

{{</accordion-item>}}
{{</accordion>}}

## Using the graphical desktop environment

Once you have set up the environment to your liking, you can

  - use the web browser on that system to access web-based resources available only within JASMIN
  - make SSH connections to other systems within JASMIN such as `sci-vm-01.jasmin.ac.uk`
  - use graphical applications on other systems within JASMIN and send the output bask to this desktop
  - the "connecting" videos above show the steps involved for this.

### Notes

  * The number of "virtual desktops" which can be created per user is limited to 1 in order to preserve system resources.
  * Although in theory sessions and desktop windows should persist when you close down the NoMachine client and when you re-open it to the same connection, you should not rely on this feature. Keeping long-running sessions open reduces resources available to other users.
  * The option to shut down the machine does not work for a "regular" user (only admins). Please just "Log out" instead.

## Troubleshooting

### Authentication error (Windows users)

* Update your key to ECDSA (previous recommendation was RSA). This will solve most problems. See updated advice in [Generate SSH key pair]({{%ref "generate-ssh-key-pair"%}}). Remember to leave 15 minutes after uploading your new public key before trying again, so that the new key can be made available in all the places it needs to be.

### Transposed symbol keys

After the first connection (particularly for Mac users), subsequent connections to the same connection profile sometimes have some symbols keys e.g. `@` and `"` transposed.

Click the "settings" option (in the menu, top-right), then go to "settings" and search for "input" to look for alternative keyboard layouts.

### Connection timeout

Please do not try and connect using the proprietary "NX" protocol. Select "SSH" as the protocol. If you mistakenly use "NX" as the protocol you may see an error similar to the following when you try to connect (The correct port for **SSH** connections is 22)

```console
A connection timeout has occurred while trying to connect to 'nx1.jasmin.ac.uk' on port '4000'.
The issue could either be caused by a networking problem, by a firewall or NAT blocking incoming
traffic or by a wrong server address. Please verify your configuration and try again.
```

### Client version

Make sure you have installed and are using the correct and most recent version of the NoMachine Enterprise Client (not the NoMachine Enterprise Desktop or any other applications from NoMachine). [Check the instructions above]({{% ref "graphical-linux-desktop-access-using-nx#installing-nomachine-enterprise-client" %}}) to make sure you have downloaded the correct application.

### Key format

If you created your SSH private key using the "PuTTYgen" application, and are getting "Authentication failed" for a key pair that you know works OK for simple terminal connections, it could be that you need to convert the private key to "OpenSSH format" for use here. By doing this you would be creating an alternately-formatted version of the same private key, so the public key stays the same (and you don't need to re-upload that to JASMIN).

- Open PuTTYgen and "Load an existing private key file" (click "Load")
- Ignore the notice about saving it in PuTTY's own format (this is not useful here) (click "OK")
- In the PuTTYgen menu, select "Conversions", then "Export OpenSSH key"
- Save the newly-formatted private key file locally. The passphrase needed to unlock it should not have changed.
- Use this newly-formatted key file with NoMachine NX.

### Passphrase vs Password

Be sure to use the PASSPHRASE associated with your SSH private key, and not the PASSWORD associated with your JASMIN account, when prompted using the NX client.

### Can't find your private key?

The location of your private key on your local machine may be in a hidden directory for example `~/.ssh`. In order to navigate to it to provide the location when setting up your connection profile, you may need to enable the display of hidden directories/files in your local desktop environment first. On a Mac you can do this with the shortcut {{<kbd "CMD+SHIFT+.">}}. In Windows this is under File Explorer / View / Hidden Items. It's also possible that your home directory itself (normally `/Users/<username>`) is not configured to be displayed by default in `Finder`. If this is case, go to Finder / Preferences / Sidebar / Show these items and tick the box next to the item representing your username: this should make it appear, and `.ssh` should be a subdirectory of this.

Windows users may need to switch on "show hidden files" which is normally an option in File Explorer windows, and/or where you're asked to choose from a list of files.

### Can't make an onward connection

* Does your username have more than 8 characters?
  * Before we realised this was a problem, some users were not prevented from creating accounts with usernames over 8 characters. The names of the servers are now kept as short as possible e.g. `nx1`, `nx2` so this mitigates the problem in most cases. All the new Rocky 9 NX hosts are now the same in this respect. But if your username is very long (>13 characters) you may still run into problems here, in which case please contact the helpdesk.
* [Update your key to ECDSA]({{%ref "generate-ssh-key-pair"%}}): this should solve the problem in most cases.
* If it's still a problem 15 minutes after uploading your new public key, try:
  * uninstalling the NoMachine Enterprise Client
  * deleting the `%USERPROFILE%\.nx` (Windows) or `~\.nx` (Mac/Linux) directory on your machine
  * deleting the `%USERPROFILE%\Documents\NoMachine` or `~\NoMachine` directory on your machine (beware this will remove **all** connection profiles)
  * rebooting, then re-installing and trying again.

### Can't display graphics from sci machine or other onward connection

Did you omit the `-X` option from the SSH command when you made the onward connection to that machine? Try `-Y` if `-X` doesn't work for you.

### Disk space

Check your disk usage in your JASMIN home directory: if this is over the 100G limit, you may not be able to write any temporary files and this could prevent NoMachine from being able to start a new session or even reconnect to an existing virtual desktop session. Clear out some space and re-check with `pdu -sh $HOME` to find out how much space you're using.

### Can't connect or gets stuck connecting to a previous session

Sometimes, you can't connect because you have a previous session which did not terminate correectly, or you might have problems reconnecting to a previous desktop session. Sometimes the client will get stuck with a "spinning wheel" before eventually timing out. You can terminate your own previous session as follows:

- Follow instructions in {{<link "#connecting">}}Connecting{{</link>}} until the point where all the other users' sessions on the machine are displayed.
- Find the one corresponding to your username
- Right-click it and select "Terminate session"

Note that you may lose any unsaved work in the session that you terminate, but it should clear the stuck session and allow you to reconnect. Please try this first before asking the support team, as this is the first thing that they will try in order to clear your session.

### "It worked yesterday"

For occasions where "it worked last time I tried to connect, but now doesn't", please first try the above step to clear any previous session which might have got stuck, otherwise the time-honoured IT support advice of "turning it off and on again" is applicable: try restarting the machine where you are using NoMachine Enterprise Client, as this can sometimes clear issues with the client, your machine or your network connection. Don't forget to re-connect via your VPN if available.
