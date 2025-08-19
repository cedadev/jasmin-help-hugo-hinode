---
aliases: /article/4847-using-the-jasmin-object-store
description: Using the JASMIN Object Store
title: Using the JASMIN Object Store
---

{{<alert alert-type="info">}}
**Workaround for bug affecting deletion when quota is reached**

Currently the JASMIN Object store is set to be **"read-only and delete"** when the quota for the tenancy is reached, i.e. stopping writes, but allowing reads and deletes.
However, there is currently a bug which blocks deletes done with a `HTTP POST` request. `HTTP DELETE` requests are still allowed when the quota is reached.

This means that when the tenancy is full, you won't be able to do deletes with a `POST` request, including recursive deletes. You will have to do a `DELETE` request to free up some space and unlock the tenancy for writes, then do a recursive delete if you need to.

For example:

```bash
mc rm
```

does a

```bash
POST... /?delete=
```

but if you use

```bash
s3cmd rm
```

to delete a single object it uses

```bash
DELETE ...
```

{{</alert>}}

This article describes how to use the JASMIN high-performance object storage.

## What is object storage?

An {{< link "https://en.wikipedia.org/wiki/Object_storage" >}}object store{{</link>}} is a data
storage system that manages data as objects referenced by a globally unique
identifier, with attached metadata. This is a fundamental change from
traditional file systems that you may be used to, as there is no directory
hierarchy - the objects exist in a single flat domain. These semantics allow
the object store to scale out much more easily than a traditional shared file
system.

The other fundamental change is that the data is no longer accessed by
mounting a file system onto a host and referencing a file path (where
authentication is "can I log in to the host"). Instead, the data is accessed
over HTTP, with authentication using HTTP headers. This has many benefits, the
biggest of which is that we can make the object store available outside of the
JASMIN firewall, for example to the JASMIN External Cloud. Data can be read
**and written** in the same way, using the same tools, from inside and outside
JASMIN. Contrast this with Group Workspaces, where you must be logged in to a
JASMIN host in order to write data using the file system, and data is only
accessible externally in a readonly way using HTTP or OPeNDAP or via data 
transfer methods.

Object stores are seen as the most efficient (and cheapest!) way to store and
access data from the cloud, and all the major cloud providers support some
variant of object store. The JASMIN object store is 
{{< link "https://www.scality.com/topics/what-is-s3-compatible-storage/" >}}S3 compatible{{</link>}} \-
S3 is the object store for Amazon Web Services (AWS), and has become a de-
facto standard interface for object stores. This means that all the same tools
that work with AWS S3 will also work with the JASMIN object store.

## Accessing the object store

The JASMIN object store is organised into **tenancies**. These are shared
areas of the object store, similar in concept to Group Workspaces, and are
requested by users, usually Group Workspace Managers. Several users can have
access to a tenancy, and so they can be used collaboratively.

To join an existing object store tenancy, navigate to the "Services" section
in the JASMIN Accounts Portal and select the "Object store" category. Select a
tenancy and submit a request to join. This request will then be considered by
the manager of the tenancy and either accepted or rejected.

{{<image src="img/docs/using-the-jasmin-object-store/file-kHfcUlqbAf.png" caption="">}}

For details on how to request and manage an object
store tenancy, please see the help article "JASMIN Object Store for Managers"
(forthcoming).

## Default access policies

As of Jan 2024, we have changed the default access policy for newly created tenancies to provide a more sensible and flexible set of access policies.

The old policy allowed any members of the tenancy access to any bucket created in the tenancy by default. The new policy allow Users (USER only in the JASMIN Accounts Portal) of the tenancy only access to buckets they own by default. This can be effectively changed to the old policy by setting the policy of the bucket to the LDAP group for the tenancy members (<tenancy>-members, e.g. cedadev-o-members) - this can be done using the JASMIN Object Store portal (below) or the Swarm portal. Specific JASMIN users or groups can also be given permission to buckets (group access is controlled by LDAP groups, and only existing LDAP group will work - you may need to ask for one to be created).

The new policy also gives admin access for tenancy MANAGER and DEPUTY roles, who have access to all the buckets in the tenancy.

## Creating an access key and secret

Authentication with the object store uses an access key and secret that are separate to your JASMIN username and password. You can generate keys and manage bucket permissions through the {{<link "jasmin_object_store_portal">}}JASMIN Object Store Portal.{{</link>}}

{{<image src="img/docs/using-the-jasmin-object-store/file-OkGcJm0Mpo.png" caption="JASMIN sbject store portal">}}

You can log in with your JASMIN username and password. You can then click on the "Object Stores" button on the right. This will present you with the list of object store tenancies that you have access to. If you don't see an object store tenancy that you expect to, please check you have access in the {{<link "jasmin_accounts_portal">}}JASMIN Accounts Portal{{</link>}}. If you have access in the Accounts Portal, but not in the Object Store Portal then please email the helpdesk.

{{<image src="img/docs/using-the-jasmin-object-store/file-3kmJDqsPGr.png" caption="List of object store tenancies">}}

The URL for the object store tenancy is also presented here for convenience. You can click on the "Manage Object Store" button to manage you keys and buckets. This will ask you to confirm your JASMIN password.

{{<image src="img/docs/using-the-jasmin-object-store/file-J7sWRXVp9D.png" caption="Prompt for password">}}

You will then be presented with the following page.

{{<image src="img/docs/using-the-jasmin-object-store/file-gRPOhQpGBG.png" caption="existing keys">}}

From this page you can view your existing keys, and delete them if you require. You can also use the "Create Key" tab on the left.

{{<image src="img/docs/using-the-jasmin-object-store/file-L8tOrtBj7z.png" caption="Create access key">}}

You need to name the key and enter an expiry date for it. This will then present you with a pop-up with details on your access key and secret key. **This is the only time your secret key will visible, so save it immediately in a secure password manager.**

## Managing bucket permissions

You can also manage the permissions on buckets using the "Buckets" tab from this page. This allows you to manage the access policies for your buckets without using the S3 API or the Swarm portal.

{{<image src="img/docs/using-the-jasmin-object-store/file-6m0rwBsm9K.png" caption="Bucket permissions">}}

Click on the "Manage permissions" button for a bucket to add or change access policies for that bucket.

{{<image src="img/docs/using-the-jasmin-object-store/file-CxoXaC08wI.png" caption="Granting access">}}

By default this lets you grant access to specific JASMIN Users and/or groups (these are LDAP groups and you might need to request that one is created for you if you require a subgroup for your tenancy). The advanced tab gives you the same options as available through the Swarm portal - including making buckets publicly accessible. Once done, hit the save to add the policy to the bucket. You can edit or delete permissions from that bucket through the "View Bucket Policies" tab.

## Legacy method for key creation

This is the old way of creating keys which still works, but the new way above is accessible outside JASMIN on the public internet.

You can generate an access key and secret using the Caringo portal. 

Authentication with the object store uses an access key and secret that are
separate to your JASMIN username and password. You can generate an access key
and secret using the Caringo portal. This portal is not currently available
outside of JASMIN - you will need to use a graphical session on JASMIN to
access a Firefox browser running on a JASMIN system.

**The recommended way to do this is using the** [NX Graphical Desktop
service]({{% ref "graphical-linux-desktop-access-using-nx" %}}). You can start Firefox from
the "Activities" menu once you have logged in to your graphical desktop on one
of the `nx-login*` servers (so no need to make an onward connection to a `sci`
server).

An alternative option is to using X11 Forwarding on your SSH connection. You 
need to do this on one of the `nx*` servers (not the sci servers as previously)
because this is where firefox is now installed:

    
```bash
ssh -X <user>@nx1.jasmin.ac.uk firefox
```

(try `-Y` if `-X` does not work for you).

Once you have Firefox open, navigate to

```bash
http://my-os-tenancy-o.s3.jc.rl.ac.uk:81/_admin/portal
```

but replace `my-os-tenancy-o` with your tenancy name.

You will see a login screen where you
should enter your JASMIN username and password:

{{<image src="img/docs/using-the-jasmin-object-store/file-4dszwvVbge.png" caption="">}}

If you receive a "HTTP ERROR 500 java..." error, it is likely that you haven't
added the port (81) to the address.  
  
Upon successfully entering the username and password of a user who belongs to
the tenancy, you will see a dashboard. To create an access key and secret,
click on the cog icon and select "Tokens":

{{<image src="img/docs/using-the-jasmin-object-store/file-sazR2YE8xn.png" caption="">}}

On the tokens page, click "Add":

{{<image src="img/docs/using-the-jasmin-object-store/file-tiUnM6oyq6.png" caption="">}}

In the dialogue that pops up, enter a description for the token and set an
expiration date. Make sure to click "S3 Secret Key" - this will expose an
additional field containing the secret key. **Make sure you copy this and
store it somewhere safe - you will not be able to see it again!** This value
will be used whenever the "S3 secret key" is required.

{{<image src="img/docs/using-the-jasmin-object-store/file-8ezAbSQY56.png" caption="">}}

Once the token is created, it will appear in the list. The "Token" should be
used whenever the "S3 access key" is required:

{{<image src="img/docs/using-the-jasmin-object-store/file-QSg6RtIAv8.png" caption="">}}

# Accessing data in the object store

## URLs for internal and external access

Although the data is exactly the same in both cases, a slightly different URL
must be used depending on whether you are accessing the object store from the
JASMIN managed cloud servers or from the JASMIN External Cloud.

From inside JASMIN, including LOTUS and the Scientific Analysis servers, 
`my-os-tenancy-o.s3.jc.rl.ac.uk` should be used, with the `http://`` prefix.

From the JASMIN External Cloud, and from locations external to JASMIN, `my-os-tenancy-o.s3-ext.jc.rl.ac.uk` should be
used - note the `https://` prefix and additional `-ext`.

(Where `my-os-tenancy-o` needs to be replaced with your tenancy name)

## Using s3cmd

`s3cmd` is a command line tool provided by Amazon to work with S3 compatible
Object Storage. It is installed on JASMIN, both on the sci-machines and on
LOTUS. It is a little more complicated to use than the MinIO client, but is
more powerful and flexible. For full details on `s3cmd`, see the 
{{< link "http://s3tools.org" >}}s3tools.org website{{</link>}}.

To configure `s3cmd` to use the JASMIN object store, you need to create and
edit a `~/.s3cfg` file. To access the `my-os-tenancy-o` tenancy (where "my-os-
tenancy-o" needs to be replaced with your tenancy name), the following should
be in the `~/.s3cfg `file:

```
access_key = <access key generated above>
host_base = my-os-tenancy-o.s3.jc.rl.ac.uk
host_bucket = my-os-tenancy-o.s3.jc.rl.ac.uk
secret_key = <secret key generated above>
use_https = False
signature_v2 = False
``` 

or, from an external tenancy or locations outside of JASMIN:

```
access_key = <access key generated above>
host_base = my-os-tenancy-o.s3-ext.jc.rl.ac.uk
host_bucket = my-os-tenancy-o.s3-ext.jc.rl.ac.uk
secret_key = <secret key generated above>
use_https = True
signature_v2 = False
``` 

To see which commands can be used with s3cmd, type:

```bash
s3cmd -h
```

To list a tenancy's buckets:

```bash
s3cmd ls
```    

To list the contents of a bucket:

```bash
s3cmd ls s3://<bucket_name>
```    

Make a new bucket:

```bash
s3cmd mb s3://<bucket_name>
```

`s3cmd` uses PUT and GET nomenclature for copying files to and from the object
store.  
To copy a file to a bucket in the object store:

```bash
s3cmd put <file name> s3://<bucket_name>
```

To copy a file from a bucket in the object store to the file system:

```bash
s3cmd get s3://<bucket_name>/<object_name> <file_name>
```

For more commands and ways of using `s3cmd`, see the [s3tools
website](https://s3tools.org/s3cmd).

## Using the MinIO client

The MinIO Client is a command line tool to connect to object stores (among
other types of file storage) and interface with it as you would with a UNIX
filesystem. As such, many of the UNIX file management commands found in
standard installations of the OS are found within this client ( `ls`, `cat`,
`cp`, `rm` for example).

There are a number of ways to install this client as shown in the
{{< link "https://docs.min.io/docs/minio-client-quickstart-guide.html" >}}quickstart guide{{</link>}}. Methods
include: docker, Homebrew for macOS, wget for Linux and instructions for
Windows. Follow these steps to get the client installed on the relevant
system.

MinIO Client is not installed on JASMIN, but users can download and install it
to their own user space, following the instructions for "64-bit Intel" (linux-
amd64) in the MinIO quickstart guide. Below is an example to install it into
the `bin` directory in your user space

```bash
mkdir ~/bin
wget https://dl.min.io/client/mc/release/linux-amd64/mc ~/bin
chmod u+x ~/bin/mc
```

You can then add the `~/bin` directory to the PATH environment variable in
your `~/.bashrc` file to allow `mc` to be accessed from anywhere on JASMIN.

```bash
# User specific aliases and functions
PATH=$PATH:$HOME/bin
```

To configure the client with the JASMIN object store, create an access key and
secret as documented above and insert them into the command:

```bash
mc config host add [ALIAS] [S3-ENDPOINT] [TOKEN] [S3 SECRET KEY]
```

The ALIAS is the name you'll reference the object store when using the client.
To demonstrate, if the alias was set to "jasmin-store", displaying a specific
bucket in the object store would be done in the following way:

```bash
mc ls jasmin-store/my-bucket
```

The commands available in the client are documented in the quickstart guide
(linked above). Copying an object from one place to another is very similar to
a UNIX filesystem:

```bash
mc cp jasmin-store/my-bucket/object-1 jasmin-store/different-bucket/
```

## From Python

One method of accessing the object store from Python is using
{{< link "https://s3fs.readthedocs.io/en/latest/index.html" >}}s3fs{{</link>}}. This library builds
on
{{< link "https://botocore.amazonaws.com/v1/documentation/api/latest/index.html" >}}botocore{{</link>}}
but abstracts a lot of the complexities away. There are three main types of
object in this library:
{{< link "https://s3fs.readthedocs.io/en/latest/api.html#s3fs.core.S3FileSystem" >}}S3FileSystem{{</link>}},
{{< link "https://s3fs.readthedocs.io/en/latest/api.html#s3fs.core.S3File" >}}S3File{{</link>}} and
{{< link "https://s3fs.readthedocs.io/en/latest/api.html#s3fs.mapping.S3Map" >}}S3Map{{</link>}}.
The filesystem object is used to configure a connection to the object store.
Note: it's **strongly** recommended to store the endpoint, token and secret
outside of the Python file, either using environment variables or an external
file. This object can be used for lots of the operations which can be done
MinIO:

    
```python
import json
import s3fs

with open('jasmin_object_store_credentials.json') as f:
    jasmin_store_credentials = json.load(f)

    jasmin_s3 = s3fs.S3FileSystem(
        anon=False, secret=jasmin_store_credentials['secret'],
        key=jasmin_store_credentials['token'],
        client_kwargs={'endpoint_url': jasmin_store_credentials['endpoint_url']}
    )

    # list the objects in a bucket
    my_objects = jasmin_s3.ls('my-bucket')
    print('My objects: {}'.format(my_objects))

    # report the size of an object
    my_object_size = jasmin_s3.du('my-bucket/object-1')
    print('Size: {}'.format(my_object_size))

```

Please note in the example above, the `jasmin_object_store_credentials.json`
file would look along the lines of:

    
```json
{
    "token": "<access key generated above>",
    "secret": "<secret key generated above>",
    "endpoint_url": "http://my-os-tenancy-o.s3.jc.rl.ac.uk"
}
```

or, from an external tenancy or locations outside of JASMIN:

```json
{
    "token": "<access key generated above>",
    "secret": "<secret key generated above>",
    "endpoint_url": "https://my-os-tenancy-o.s3-ext.jc.rl.ac.uk"
}
```

S3File is used for dealing with individual files on the object store within
Python. These objects can read and written to and from the store:

```python
file_object = s3fs.S3File(jasmin_s3, 'my-bucket/object-1', mode='rb')
# refresh can be set to True to disable metadata caching
file_metadata = file_object.metadata(refresh=False)

# Writing data to variable in Python
file_object.write(data)
# Data will only be written to the object store if flush() is used. This can be executed in S3FS source code if the buffer >= the blocksize
file_object.flush()
```

S3Map is very useful when using {{< link "http://xarray.pydata.org/en/stable/" >}}xarray{{</link>}}
to open a number of data files (netCDF4 for example), and turn them into the
zarr format ready to be stored as objects on the store. The function for this
can store a `.zarr` file in a POSIX filesystem, or can be streamed directly to
an object store. These datasets can then be opened back into Python:

    
```python
xarray.open_mfdataset(filepath_list, engine=netcdf4)
s3_store = s3fs.S3Map('my-bucket/zarr-data', s3=jasmin_s3)
dataset.to_zarr(store=s3_store, mode='w')

# Reopening the dataset from object store using xarray
xarray.open_zarr(s3_store, consolidated=True)
```

## Using `rclone`

Rclone can be configured to perform operations on an S3 object store backend, just as it can for
a long list of other backend storage types. It is mentioned in our data transfer section here, but
extensively documented here.

Below is an example of how to copy data to the JASMIN object store using `rclone`, in a very similar manner to how you would use `rsync`. However, first you need to define parameters for accessing the JASMIN object store. 

Do this by using the `rclone config` wizard. This will update the configuration file (~/.config/rclone/rclone.conf) so that it looks like this:

```config
[cedadev-o]
type = s3
provider = Other
access_key_id = <access key as above>
secret_access_key = <secret key as above>
endpoint = cedadev-o.s3-ext.jc.rl.ac.uk
acl = private
```

You could then copy the contents of a directory to this remote, using the `rclone copy` command ({{<link "https://rclone.org/commands/rclone_copy/">}}full description here{{</link>}}):

{{<command user="user" host="localhost">}}
rclone copy source:sourcepath dest:destpath
{{</command>}}

This will copy the contents of `sourcepath` to `destpath`, but not the directories themselves. By default, it does not transfer files that are identical on source and destination, testing by modification time or md5sum. It will not delete files from the destination (but note that the `rclone sync` command will). For copying single files, use the `rclone copyto` command.

The example above copies from a local `sourcepath`, which could be a directory on your local machine (either your local laptop/desktop, or perhaps a JASMIN `xfer` server). But given that you can set up multiple **remotes**, you could also configure one of the remotes as SFTP using one of the `xfer` servers, useful if you want to coordinate the transfers from elsewhere rather than on JASMIN itself.

{{<alert alert-type="danger">}}
Please note that you are asked **NOT to use** the `rclone mount`, `rcd` or `serve` commands when working with storage on JASMIN, [see here]({{% ref "rclone#dos-and-donts" %}}).
{{</alert>}}
