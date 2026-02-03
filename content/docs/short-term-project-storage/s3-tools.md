---
description: Object Store Tools
title: Object Store Tools
---

S3 object store has many different tools which can be used to access and managed it. This page goes through some examples of tools.

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

## s4cmd and s5cmd

s3cmd is a convenient way to interact with the S3 compatible storage like the JASMIN object store. [s4cmd](https://github.com/bloomreach/s4cmd) and [s5cmd](https://github.com/peak/s5cmd) provide a similar interface, but with significantly improved performance over s3cmd. They are not installed by default on JASMIN, but are easy to install without the need for sudo or root.

### s4cmd

[s4cmd](https://github.com/bloomreach/s4cmd) uses Python's boto3 library to run commands in parallel. It can be installed into a user's Python environment.

If you don't have an existing environment to install Python packages into one will need to be created.

```bash
module load jaspy
virtualenv venv-s4cmd
source venv-s3cmd/bin/activate
```

Once created and activated s4cmd can be installed.

```bash
pip install s4cmd
```

Note that the environment will always need to be activated before s4cmd can be used.

In order to use s4cmd with the JASMIN object store, you need to create a key and set environment variables so that s4cmd can pick up the configuration.

```bash
export S3_ACCESS_KEY=<your key>
export S3_SECRET_KEY=<your secret>

```

Once set s4cmd can be used. For example copying data from a local disk to a bucket.

```bash
s4cmd --endpoint-url http://my-os-tenancy-o.s3.jc.rl.ac.uk put ./* s3://bucket-name/
```

Note the requirement of the ```--endpoint-url``` argument for accessing the JASMIN object store. For external access, use the s3-ext url.

See the [documentation for s4cmd](https://github.com/bloomreach/s4cmd) for other usage.


### s5cmd

[s5cmd](https://github.com/peak/s5cmd) is a parallel tool for interacting with S3 compatible object stores which offers [significant speed increases over s3cmd and s4cmd](https://github.com/peak/s5cmd/blob/master/README.md#Benchmarks).
Its speed increase comes from being written in Go, and working in parallel.

It is not available by default on JASMIN, but a binary can be downloaded and used. (Check the [releases](https://github.com/peak/s5cmd/releases) page on s5cmd's github for the latest version and alter the wget command below as required.)

```bash
wget https://github.com/peak/s5cmd/releases/download/v2.3.0/s5cmd_2.3.0_Linux-64bit.tar.gz
tar xvzf s5cmd_2.3.0_Linux-64bit.tar.gz
chmod +x s5cmd
```

In order to use s5cmd with the JASMIN object store, you need to create a key and set environment variables so that s5cmd can pick up the configuration.

```bash
export AWS_ACCESS_KEY_ID=<your key>
export AWS_SECRET_ACCESS_KEY=<your secret>
```

Once set s5cmd can be used. For example copying data from a local disk to a bucket.

```bash
s5cmd --endpoint-url http://my-os-tenancy-o.s3.jc.rl.ac.uk cp './*' s3://bucket-name/
```

Note the requirement of the ```--endpoint-url``` argument for accessing the JASMIN object store. For external access, use the s3-ext url.

See the [documentation for s5cmd](https://github.com/peak/s5cmd) for other usage.


## Using the MinIO client

https://github.com/minio/mc/issues/5263#issuecomment-3614266966

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
