---
aliases: /article/285-system-administration-guidance-for-the-unmanaged-cloud
description: System administration guidance (external cloud)
slug: sysadmin-guidance-external-cloud
title: System administration guidance (external cloud)
---

## Managing storage

When provisioned, a virtual machine gets allocated a small hard disk (the
exact size of the disk depends on the selected machine size). This disk is
intended to run the operating system only. If you require additional storage
for data, it is possible to add extra volumes to a virtual machine.

First, create a new volume by navigating to the volumes tab and clicking on
"New Volume":

{{<image src="img/docs/sysadmin-guidance-external-cloud/file-BsmkG3EXIw.png" caption="create volume dialogue">}}

This will launch a dialog that allows you to specify a name and size for the
volume:

{{<image src="img/docs/sysadmin-guidance-external-cloud/file-HRTEvPf0f6.png" caption="specify name and size for volume">}}

Once the volume becomes available, you can attach it to a VM. First, click on
the "Actions" button and select "Attach volume to machine":

{{<image src="img/docs/sysadmin-guidance-external-cloud/file-Y8uws7yYHi.png" caption="menu options">}}

This will open a dialog allowing you to select the VM that you want to attach
the volume to:

{{<image src="img/docs/sysadmin-guidance-external-cloud/file-tMKNp6gxCt.gif" caption="attach volume to VM">}}

Once the volume has attached to the VM, the new disk will be visible to the
machine but will not be usable. This can be verified using the `lsblk`
command:

{{<command>}}
lsblk
(out)NAME   MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
(out)sda      8:0    0   4G  0 disk 
(out)└─sda1   8:1    0   4G  0 part /
(out)sdb      8:16   0  50G  0 disk
{{</command>}}

Here, we can see that the operating system is recognising the new disk - `sdb`
\- but there are no partitions or file systems associated with it. To make the
disk usable, it must be formatted with a filesystem and mounted somewhere,
e.g. `/data`:

{{<command>}}
## Create a single partition spanning the whole disk
fdisk /dev/sdb
(out)Device contains neither a valid DOS partition table, nor Sun, SGI or OSF disklabel
(out)Building a new DOS disklabel with disk identifier 0x598d636f.
(out)Changes will remain in memory only, until you decide to write them.
(out)After that, of course, the previous content won't be recoverable.
(out)
(out)Warning: invalid flag 0x0000 of partition table 4 will be corrected by w(rite)
(out)
(out)Command (m for help): n
(out)Partition type:
(out)    p   primary (0 primary, 0 extended, 4 free)
(out)    e   extended
(out)Select (default p):
(out)Using default response p
(out)Partition number (1-4, default 1):
(out)Using default value 1
(out)First sector (2048-33554431, default 2048):
(out)Using default value 2048
(out)Last sector, +sectors or +size{K,M,G} (2048-33554431, default 33554431):
(out)Using default value 33554431
(out)
(out)Command (m for help): w
(out)The partition table has been altered!
(out)
(out)Calling ioctl() to re-read partition table.
(out)Syncing disks.
(out)
## Verify that the partition was created
lsblk /dev/sdb
(out)NAME   MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
(out)sdb      8:16   0  16G  0 disk
(out)└─sdb1   8:17   0  16G  0 part
(out)
## Create a filesystem on the partition
mkfs.ext4 /dev/sdb1
(out)mke2fs 1.42.9 (4-Feb-2014)
(out)Filesystem label=
(out)OS type: Linux
(out)Block size=4096 (log=2)
(out)Fragment size=4096 (log=2)
(out)Stride=0 blocks, Stripe width=0 blocks
(out)1048576 inodes, 4194048 blocks
(out)209702 blocks (5.00%) reserved for the super user
(out)First data block=0
(out)Maximum filesystem blocks=4294967296
(out)128 block groups
(out)32768 blocks per group, 32768 fragments per group
(out)8192 inodes per group
(out)Superblock backups stored on blocks:
(out)    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
(out)    4096000
(out)
(out)Allocating group tables: done
(out)Writing inode tables: done
(out)Creating journal (32768 blocks): done
(out)Writing superblocks and filesystem accounting information: done
(out)
## Mount the filesystem
mkdir /data
mount /dev/sdb1 /data
(out)
## Verify that the filesystem is now available
lsblk
(out)NAME   MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
(out)sda      8:0    0   4G  0 disk 
(out)└─sda1   8:1    0   4G  0 part /
(out)sdb      8:16   0  50G  0 disk 
(out)└─sdb1   8:17   0  50G  0 part /data
df -h
(out)Filesystem      Size  Used Avail Use% Mounted on
(out)/dev/sda1       4.0G  1.4G  2.7G  34% /
(out)devtmpfs        222M     0  222M   0% /dev
(out)tmpfs           245M     0  245M   0% /dev/shm
(out)tmpfs           245M  8.8M  236M   4% /run
(out)tmpfs           245M     0  245M   0% /sys/fs/cgroup
(out)tmpfs            49M     0   49M   0% /run/user/0
(out)/dev/sdb1        50G   53M   47G   1% /data
(out)
## Add a line to /etc/fstab to make the mount persistent (i.e. automatic mount on boot)
echo "/dev/sdb1  /data  ext4  defaults  0 0" >> /etc/fstab
{{</command>}}
