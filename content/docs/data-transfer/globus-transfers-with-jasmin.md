---
aliases: 
- /article/5106-globus-transfers-with-jasmin
- /article/5008-data-transfer-tools-using-the-globus-web-interface
- gridftp-cert-based-auth
slug: globus-transfers-with-jasmin
collection: jasmin-documentation
description: Globus transfers with JASMIN
title: Globus transfers with JASMIN
---

This article describes how to do data transfers to and from JASMIN using {{<link "https://globus.org">}}Globus{{</link>}},
an online data transfer service designed specifically for moving large datasets
between research institutions.

{{<alert alert-type="info">}}
**Globus** now replaces the previous certificate-based **gridftp** service.

Although gridftp transfers are currently still possible (using the perhaps confusingly-named `globus-url-copy` client tool
still available on the
transfer servers), this now only works with [ssh authentication]({{% ref "gridftp-ssh-auth" %}}).
{{</alert>}}

## Main differences

JASMIN moved to a newer version of Globus in 2023, resulting in a few changes:

- Users now interact with a **collection**
  - **Most users**: please use ["JASMIN Default Collection"](https://app.globus.org/file-manager/collections/a2f53b7f-1b4e-4dce-9b7c-349ae760fee0/overview) with ID `a2f53b7f-1b4e-4dce-9b7c-349ae760fee0`
  - For **STFC users only** where the other collection (either {{<link "globus-connect-personal">}}GCP{{</link>}} or {{<link "https://www.globus.org/globus-connect-server">}}GCS{{</link>}}) is within STFC, an additional collection is provided ["JASMIN STFC Internal Collection"](https://app.globus.org/file-manager/collections/9efc947f-5212-4b5f-8c9d-47b93ae676b7/overview) and has ID `9efc947f-5212-4b5f-8c9d-47b93ae676b7`.
- You now use the JASMIN Accounts Portal to authenticate (using your JASMIN account credentials) via OpenID Connect (OIDC).
- During the authentication process, you are redirected to the JASMIN Accounts Portal to link your Globus identity with your JASMIN account.
- Consent needs to be granted at a number of points in the process to allow the Globus service to carry out actions on your behalf.
- The default lifetime of the authentication granted to your JASMIN account is now **30 days**. After this, you may need to refresh the consent for your "session".
- This service is now available to **all** users of JASMIN: you no longer need the `hpxfer` access role (now removed).

The following examples show you how to authenticate with the new JASMIN
Default Collection and list the contents of your home directory. As before,
however, the following file systems are available via this collection

File system  |  Access  
---|---  
`$HOME` (`/home/users/<username>`)  |  Read-write  
`/gws` (group workspaces)  |  Read-write  
`/work/xfc` (transfer cache)  |  Read-write  
`/badc` (CEDA Archive)  
`/neodc` |  Read-only  |  
{.table .table-striped}
  
## List your home directory using the web app

1\. Navigate to <https://app.globus.org>

2\. Log in with your Globus identity (this could be a globusid.org or other
identity)

{{<image src="img/docs/globus-transfers-with-jasmin/file-qEk9SPARZN.png" caption="log in">}}

3\. In File Manager, use the search tool to search for "JASMIN Default
Collection". Select it.

{{<image src="img/docs/globus-transfers-with-jasmin/file-LtMk6bD3Wz.png" caption="Find JASMIN Default Collection">}}

4\. In the transfer pane, you are told that Authentication/Consent is
required. Click Continue.

{{<image src="img/docs/globus-transfers-with-jasmin/file-pprxjkRNiw.png" caption="Consent">}}

5\. Click the link to use the JASMIN Accounts Portal OIDC server to link your
JASMIN identity

6\. You are taken to a page on the JASMIN Accounts portal, where you are
invited to "Authorise" the external application to authenticate and access
your essential account information.

{{<image src="img/docs/globus-transfers-with-jasmin/file-LEssDTYdfN.png" caption="Authorise application">}}

7\. If successful, you are taken back to the Globus web app, where you are
invited to "Allow" the app to use the listed information and services.

{{<image src="img/docs/globus-transfers-with-jasmin/file-lYBGlLIk9A.png" caption="Allow the app to use the info">}}

8\. The directory listing of your home directory should now appear in the
transfer pane.

9\. Try navigating to another collection known to you (previously known as
endpoint) in the other pane and transferring some data. If you have Globus
Connect Personal running locally, you should be able to transfer files to/from
that.

## List your home directory using the command-line interface (CLI)

1\. Load the virtual environment where you have the Globus CLI installed:

(in this example, a Python virtual environment named `~/.globus-cli-venv`
already exists. If it doesn't create one with the command `python3 -m venv
~/.globus-cli-venv` on your local machine). Activate this virtual environment
as follows:

{{<command>}}
source ~/.globus-cli-venv/bin/activate
{{</command>}}

2\. It's recommended to update to the latest version of the CLI by doing the
following:

{{<command>}}
pip install -U globus-cli
{{</command>}}

3\. Check that you have an active globus session and follow any instructions
given, e.g.

{{<command>}}
globus login
globus session show
{{</command>}}

4\. Use the "globus ls" command to list the collection using its ID, starting
at the path of your home directory (/~/)

{{<command>}}
globus ls a2f53b7f-1b4e-4dce-9b7c-349ae760fee0:/~/
{{</command>}}

If you get an error like the following, please see [Globus CLI Troubleshooting](globus-command-line-interface/#cli-troubleshooting):

```txt
The resource you are trying to access requires you to re-authenticate with specific identities.
message: Missing required data_access consent
Please use "globus session update" to re-authenticate with specific identities
```

TIP: you can set the ID of the collection to be an environment variable like
this, for convenience:

{{<command>}}
export JASMIN_GLOBUS=a2f53b7f-1b4e-4dce-9b7c-349ae760fee0
globus ls $JASMIN_GLOBUS:/~/
{{</command>}}

6\. You will be taken through an equivalent set of steps to those needed for
the web app. First off, you will be asked to copy/paste a URL into your
browser and copy/paste back the resulting authentication code.

7\. Once the authentication/consent process has been completed, you should see
a listing of your home directory.

8\. Use the `globus transfer` command to copy data to/from another
**collection** (previously known as endpoint) to your home directory, within
the JASMIN Default Collection. (see `globus transfer --help` for details)

## Where to/from?

Don't forget that to actually transfer data to/from JASMIN (e.g. step 8, above), you'll need another
collection somewhere else. If you're transferring data from ARCHER2, you can use their
{{<link "https://app.globus.org/file-manager/collections/3e90d018-0d05-461a-bbaf-aab605283d21/overview">}}ARCHER2 filesystems collection (id: `3e90d018-0d05-461a-bbaf-aab605283d21`){{</link>}}

If not, unless your institution runs a Globus collection, you'll need to 
install a small piece of software called [Globus Connect Personal]({{% ref "globus-connect-personal" %}})
on a machine at that end that is able to read/write the data that you want to transfer.
A good idea is to try this on your own desktop/laptop first.

Our help doc guides you through how to do this and some examples of how to use it. Versions available for
Windows, Mac and Linux.
