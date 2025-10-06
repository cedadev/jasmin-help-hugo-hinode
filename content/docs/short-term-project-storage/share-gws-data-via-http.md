---
aliases: /article/202-share-gws-data-via-http
description: Sharing GWS data via HTTP
slug: share-gws-data-via-http
title: Sharing GWS data via HTTP
---

## What is HTTP data sharing?

Specific parts of JASMIN Group Workspaces (GWSs) can be made available via
HTTP, so that:

- data can be shared with users who do not have JASMIN accounts
- common clients such as `wget`, `curl`, client libraries and web browsers can be used to access the data via a commonly-supported protocol.

In this respect, the service should be regarded as another [data transfer
tool]({{% ref "data-transfer-tools" %}}). However it must be arranged in
advance between the Group Workspace manager and the JASMIN Helpdesk. It
involves:

1. A member of the workspace creating a `public` directory and placing data inside it
2. The **GWS manager** making a request to the [JASMIN Helpdesk](mailto:support@jasmin.ac.uk) to request that this specific GWS is configured to be shared via HTTP.

Both these steps need to be completed in order for the GWS to be visible via
HTTP. By default, GWSs are not visible by HTTP.

Once a GWS has been made available, it is publicly visible by the entire
internet: please bear that in mind.

The following sections below describe how to set up restricted and
unrestricted access to your "public" directory. If you require access control
then see the section on password-protected access below. [Note: this is
currently possible, though not recommended, only because the current webserver
configuration permits this (now deprecated) means of restricting access.
Future revisions of the service may remove or change the way access
restrictions can be imposed].

{{<alert alert-type="danger">}}
This facility is **not to be used for hosting project websites**. It is
provided as a simple means for specific data files to be made available to a
wider audience than members of a Group Workspace, using a convenient data
transfer protocol (HTTP). Likewise, it is not recommended to build tools or
front-end applications relying on this service as a dependency if they are to
be operated as a production or (near-)real-time service. The JASMIN team
reserves the right to apply rate-limiting (by project and/or IP address) or to
remove GWSs from the service if they are considered to be causing problems for
the network or other parts of the service infrastructure.

Projects considering web-based solutions for showcasing or disseminating their
data via more complex tools or with specific availability requirements should
consider requesting an external tenancy in the JASMIN Community Cloud, or
indeed external service providers if more appropriate, but should be prepared to
do the necessary design, development, operation and maintenance of those
services themselves.
{{</alert>}}

## Public access set up

In some cases the GWS manager may want to make some files and directories
available over HTTP so that users (perhaps a wider audience than just the
membership of the GWS) can access the data via a web browser or other HTTP-
based tools. This can be done by creating a `public` directory in the top-
level directory of the GWS, for example:

{{<command user="user" host="sci-vm-01">}}
cd /group_workspace/jasmin/foobaa/
mkdir public 
chmod -Rf 755 public
{{</command>}}

You should then contact [JASMIN Support](mailto:support@jasmin.ac.uk) and ask
for this directory to be made visible via the `gws-access` server. The JASMIN
team will configure this change and your `public` directory will then be
visible from:

https://gws-access.jasmin.ac.uk/public/foobaa/

{{<alert alert-type="info">}}
The URL of this service changed in June 2020. A redirect
is in place from the old URL of `https://gws-access.ceda.ac.uk/`, so the change
should be transparent to existing users, but **please use the new URLs**
beginning with `https://gws-access.jasmin.ac.uk/` to avoid any problems for
example with HTTP clients that are unable to handle redirects.
{{</alert>}}

Please see the section below if you wish to control who can access the content
of one or more of the sub-directories within your `public` directory.

## Restricted access set up

In order to restrict access to your "public" directory, and/or any sub-
directories, you will need to create an ".htaccess" file within it. In turn,
the ".htaccess" file must point to a ".htpasswd" file which lists the
usernames and encrypted passwords that have read-access to that directory.

{{<alert alert-type="danger">}}
This method of access control is entirely independent of the SSH login
accounts used on JASMIN and would be the responsibility of the GWS Manager to
maintain. It is not secure by modern standards and not particularly
recommended as it adds complication for GWS managers and users, but is an
option for some basic access control if no other options are available.

**Future
revisions of the service may revise or remove this feature.**
{{</alert>}}

In order to create the ".htpasswd" file, you will need access to the
"htpasswd" command. This is available on the transfer servers
xfer[12].jasmin.ac.uk

You can then create the ".htpasswd" file as follows (using the example of a
Group Workspace called "foobaa"):

{{<alert alert-type="info">}}
The `htpasswd` tool is going to be put on the new sci and xfer-vm servers shortly, 
but please use it on the old ones (e.g sci1) for now.
{{</alert>}}

{{<command user="user" host="sci1">}}
export GWS=/group_workspaces/jasmin/foobaa/
cd $GWS
mkdir -p public 
cd public
htpasswd -b -m -c $GWS/public/.htpasswd i_am_a_user i_am_a_password
{{</command>}}

Before this will work, you also need to create a ".htaccess" file which you
could do as follows

{{<command user="user" host="sci1">}}
cat >.htaccess <<EOL
AuthType Basic
AuthName "Password Required"
AuthUserFile /group_workspaces/jasmin/foobaa/public/.htpasswd
Require valid-user
EOL
{{</command>}}

Finally, change the permissions on these files:

{{<command user="user" host="sci1">}}
chmod 644 .htaccess .htpasswd
{{</command>}}

Now, you can test that you get prompted for the username and password by
visiting

https://gws-access.jasmin.ac.uk/public/foobaa/
