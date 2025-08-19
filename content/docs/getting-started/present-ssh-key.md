---
description: Present your SSH key for an SSH connection
slug: present-ssh-key
title: Present your SSH key
weight: 145
---

There are 2 main ways to present your SSH key when connecting via SSH-based methods:

1. **File method:** specifying the path to the private key file and entering the passphrase each time
1. **Agent method:** loading the key into a persistent `ssh-agent`, which stores the key ready for any subsequent connections you want to make (sometimes, this works for other applications too).

| Method | pros/cons |
| ---|---|
| 1. Specify the location of your SSH private key | {{< icon fas plus text-success >}} simple <br>{{< icon fas plus text-success >}} no admin permissions needed<br>{{< icon fas plus text-success >}} works for all platforms if you update your key to ECDSA |
| 2. Use your key stored in a local `ssh-agent` | {{< icon fas plus text-success >}} useful if you use many applications which use SSH (e.g. NX, VSCode)<br>{{< icon fas minus text-warning >}} may need admin permissions for 1st-time agent setup<br>{{< icon fas minus text-warning >}} careful editing of config file required in some cases |
{.table .table-striped}

## 1\. Specifying the key location each time

This simply involves including the `-i` option in the SSH command to specify the location of your private key:

(You would type this command in a terminal window on your local computer i.e. desktop/laptop). This might be:

- Windows
  - Windows command or PowerShell terminal window (no additional software needed)
  - MobaXterm (a 3rd party Linux terminal emulator for windows, licence required)
  - PuTTy (a 3rd party suite of SSH tools including some GUI utilities)
- Mac: "Terminal" or similar applications
- Linux: "Terminal" or similar applications

Note: the "standard" location to store your key is the `.ssh` directory within your home directory. Storing it elsewhere, particularly on Windows, can cause problems with permissions.

{{<command user="user" host="localhost">}}
ssh -i path_to/my_private_key user@remotehost
{{</command>}}

## 2\. Loading your key into an agent

We'll demonstrate the following methods:

- Windows (option 1): Windows OpenSSH Client in `cmd` window
- Windows (option 2): MobaXterm
- Mac: "Terminal" application
- Linux: "Terminal" or similar application

### Methods to load your key

{{<nav tab-type="tabs" id="tabs-methods">}}
  {{<nav-item title="Windows (1: cmd, gui)" show="true">}}

  {{<video media-id="DXZ-4UISkYg" title="MobaXterm" >}}

  Follow the video above for how to set up the `ssh-agent` and load your key:

  Once you have loaded your key this way, and if you have set the Windows OpenSSH Authentication Agent service to start automatically, then next time you restart Windows, your key will load automatically when you log in to Windows. You should consider whether that is the desired behaviour, considering any shared use of that machine, and you should protect your Windows login with strong security.
  
  {{</nav-item>}}

  {{<nav-item title="Windows (2: Pageant)">}}

  {{<video media-id="2__EzPqWZBc" title="MobaXterm" >}}

  Follow the video above for how to set up the `ssh-agent` and load your key. This method should not need any additional admin permissions once you have got the [PuTTY suite of tools installed](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) (PuTTY, PuTTYgen, Pageant)
  {{</nav-item>}}
  {{<nav-item title="Windows (2: MobaXterm)">}}
  {{<video media-id="eoQG1jjoPsg" title="MobaXterm" >}}
Notes:
- Remember that you need a licence to use MobaXterm beyond the intial free trial period.
- The method shown above does not work with applications outside of MobaXterm (like NoMachine NX or VSCode): you would need to use the Windows OpenSSH client instead to use these with an agent, or set MobaXterm to use the external Pageant agent.
  
  The video above shows the following steps to enable MobAgent and load your key:
  
  - Go to `Settings > Configuration > SSH`
  - Tick `Use internal SSH agent "MobAgent"`
  - **Un**-tick `Use external Pageant`
  - Click the `+` symbol to locate your private key file (e.g. `id_ecdsa_jasmin`)
  - Click OK to save the settings. MobaXterm will now need to restart.
  - When you restart MobaXterm, you will be prompted for the passphrase associated with your private key.
   
  The equivalent action in a MobaXterm terminal window is

  {{<command user="user" host="mobaxterm">}}
  ssh-add ~/.ssh/id_ecdsa_jasmin
  {{</command>}}

  but note the following:

  1. This loads the key from `~/.ssh`, which is within your **MobaXterm** home directory. This may not be the same location as your **Windows** home directory `$USERPROFILE/.ssh`. Which one you use depends on where you saved your key when you generated it. Beware, though: the Windows representation of the path (e.g. `C:\Users\Fred\.ssh\`) needs to be converted to the cygwin representation using `cygpath`, for use within the MobaXterm terminal (`cygpath` is part of [Cygwin](https://cygwin.com), the underlying Linux emulation library used by MobaXterm). Or just `cd` to that directory first!
  {{<command user="user" host="mobaxterm">}}
  cygpath $USERPROFILE/.ssh/
  (out)/drives/c/Users/Fred/.ssh/
  {{</command>}}
  2. This method only persists for this particular MobaXterm session. If you want it to always load your key when MobaXterm starts, use the method described in the video above.

  {{< /nav-item >}}
  {{< nav-item title="Windows (3: Powershell)" >}}
  
  The equivalent steps in Powershell are as follows:

  - Check that the OpenSSH client installed with, either by
    
    - locating "optional features" and finding "OpenSSH Client"
    - if it's not installed, tick the box to select it, then click "Next", then "Add" (and wait: NB this can be slow!)

  - or
    - typing this command in a PowerShell window, as administrator

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Client*'
  {{</command >}}
  
  if it **IS** installed, you'll see something like this:

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  (out)Name  : OpenSSH.Client~~~~0.0.1.0
  (out)State : Installed
  {{</command>}}

  if it's **NOT** installed, you'll see

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  (out)Name  : OpenSSH.Client~~~~0.0.1.0
  (out)State : NotPresent
  {{</command>}}

  in which case, note the name and version, and use them in this command:

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
  {{</command >}}

  Eventually (this can be slow!) you should see:

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  (out)Path          :
  (out)Online        : True
  (out)RestartNeeded : False
  {{</command>}}

  Now you can set up the OpenSSH client:

  - Set the `ssh-agent` service so that it starts manually, and start it on this occasion:

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  Get-Service ssh-agent
  Set-Service ssh-agent -StartupType Manual
  Start-Service ssh-agent
  {{</command>}}

  (once you're confident that it's working correctly, you could set `-StartupType Automatic`)

  - Load your key into the `ssh-agent`

  Load the key from where it's saved: this should be your `.ssh` directory in your home directory. Storing it elsewhere can cause problems with permissions.

  Note that the Windows environment variable `%USERPROFILE%` is `${env:USERPROFILE}` in PowerShell. In this example, we're in that directory already, so we can just use the relative path `.ssh\` to the key. But the full path would be `${env:USERPROFILE}\.ssh\id_ecdsa_jasmin`.

  {{<command prompt="PS C:\Users\User>" shell="powershell">}}
  ssh-add .ssh\id_ecdsa_jasmin
  (out)Enter passphrase for <path to key>: ## right-click to paste your passphrase, then press return
  (out)Identity added: (<path to key>)
  {{</command>}}

  Once you have loaded your key this way, and if you have set the Windows OpenSSH Authentication Agent service to start automatically, then next time you restart Windows, your key will load automatically when you log in to Windows. You should consider whether that is the desired behaviour, considering any shared use of that machine, and you should protect your Windows login with strong security.

  {{</nav-item >}}
  {{<nav-item title="Mac">}}
  
  ## Mac

  Mac users (OS X Leopard onwards) can benefit from linking the SSH
  key to Keychain, which securely stores the passphrase as well. This means that
  even after a reboot, your SSH key is always available in any terminal session
  automatically. You can do this by running `ssh-add` with `--apple-use-keychain`:

  {{<command user="user" host="localhost">}}
  ssh-add ~/.ssh/id_ecdsa_jasmin --apple-use-keychain
  {{</command>}}

  And then by adding the corresponding command with `--apple-load-keychain`  to your `.zshrc` file so
  that it loads it for every new terminal session:

  {{<command user="user" host="localhost">}}
  echo "ssh-add --apple-load-keychain" >> ~/.zshrc
  {{</command>}}

  {{</nav-item>}}
  {{<nav-item title="Linux">}}
  
  ## Linux

  Some Linux terminal and desktop environments provide an `ssh-agent` as a graphical application: consult the 
  documentation for your system.

  A common one is `gnome-keyring-daemon`: check for this first in your list of processes: if it's there and
  running already, skip to the `ssh-add` command, rather than starting up another `ssh-agent` (which might then
  be ignored by the application you're trying to use).

  In the absence of an already-running process, you can use the following commands in a terminal session:

  - Start the `ssh-agent`

  {{<command user="user" host="localhost">}}
  eval $(ssh-agent -s)
  (out)Agent pid 94631
  {{</command>}}

  If the agent starts successfully, a process ID (`pid`) is returned as above.

  - Load the key

  {{<command shell="bash">}}
  ssh-add <path to key>
  (out)Enter passphrase for <path to key>: ## right-click to paste your passphrase, then press return
  (out)Identity added (<path to key>)
  {{</command>}}

  {{</nav-item>}}
{{</nav>}}

  ### Check that your key is loaded

  In all cases, you should now check that the key is loaded and ready to use

  {{<command shell="bash">}}
  ssh-add -l
  (out)521 SHA256:ZeddNKK5U3am1vyCaUCq4CgMRpvoyv+cJiviqz3zvfw ~/.ssh/id_ecdsa_jasmin (ECDSA)
  {{</command>}}

  If you see output similar to the above, your key is now ready to be used in an SSH connection.
  
  Sometimes the last part of this output shows your email address, but it is
  just a comment field, which can be ignored. The fact
  that it's returned something which looks like a key "fingerprint",
  shows that your key is loaded successfully into the agent.
  
  If you don't see your key listed in output similar to the above, please try
  again: perhaps you entered the wrong passphrase? But you will need to succeed
  in loading your key before you can use it to make an SSH connection.

  Once the key is loaded, it can be used in an SSH connection, but whether this persists between different
  sessions may be dependent on your system configuration.

## Troubleshooting

### Unprotected private key file

Sometimes the SSH agent or application will refuse to load the private key from the file if the file's permissions are set too loosely: some SSH clients insist that you and only you (no other users or services
on the same machine) can access the file.

To overcome this you have 3 options:

- **(Solves most Windows cases)** Move the key files (`id_edcsa_jasmin` and `id_edcsa_jasmin.pub`: keep them together) to the `.ssh` directory which is inside your home directory. This is the "standard" location, helps to manage all
your keys in one place. Windows also applies different permissions rules to files in this location, so 
this usually solves the problem

- **(Next simplest)** Another option is to send just the **contents of the file** to the `ssh-add` command:

  In your terminal where you give the `ssh-add` command, try this instead:

  {{<command>}}
  cat ~/.ssh/id_ecdsa_jasmin | ssh-add -
  {{</command>}}
  (replace `id_ecdsa_jasmin` with the path to and/or name of your private key file)

  The `cat` command simply "streams" the contents of the file to standard output (`stdout`), while the trailing hyphen tells the `ssh-add` command to accept this streamed input (`stdin`) instead of from a file.

  (Windows: while the `cat` command **is** available in PowerShell and MobaXterm terminal environments, it is not in the Windows `cmd` environment).

  You should be asked for your passphrase in the normal way and can check that the key has loaded correctly with:

  {{<command>}}
  ssh-add -l
  {{</command>}}

  or (perhaps for a more permanent solution), and/or if you are getting similar errors mentioning the `~/.ssh/config` file, might need to change the permissions permanently on these file(s).

- **Change the permisisons on the file**

  {{<nav tab-type="tabs" id="tabs-key-perms">}}
  {{<nav-item title="Linux/Mac/cygwin/Mobaxterm" show="true">}}
  {{<command>}}
chmod 600 ~/.ssh/id_ecdsa_jasmin
  {{</command>}}
  (replace `id_ecdsa_jasmin` with the path to and/or name of your private key file)
  {{</nav-item>}}
  {{<nav-item title="Windows: PowerShell">}}
  The equivalent method in Windows PowerShell involves these steps,
  replacing the expression with `id_ecdsa_jasmin` with the path to your key if different. 
  You may need to open the PowerShell window with "run as administrator".
{{<command prompt="PS C:\Users\User>" shell="powershell">}}
## Set a variable "Key" to hold the key filename:
New-Variable -Name Key -Value "$env:UserProfile\.ssh\id_ecdsa_jasmin"
## Remove Inheritance:
Icacls $Key /c /t /Inheritance:d
## Set Ownership to Owner:
## For a key file located beneath directory $env:UserProfile:
Icacls $Key /c /t /Grant ${env:UserName}:F
## For a key file located outside of directory $env:UserProfile:
TakeOwn /F $Key
Icacls $Key /c /t /Grant:r ${env:UserName}:F
## Remove All Users, except for Owner:
Icacls $Key /c /t /Remove:g Administrator "Authenticated Users" BUILTIN\Administrators BUILTIN Everyone System Users
## Verify:
Icacls $Key
## Remove Variable:
Remove-Variable -Name Key
{{</command>}}
  {{</nav-item>}}
  {{</nav>}}
