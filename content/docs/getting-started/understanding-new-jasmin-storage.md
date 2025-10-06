---
aliases: /article/4700-understanding-new-jasmin-storage
description: Understanding new JASMIN storage
slug: understanding-new-jasmin-storage
tags:
- automount
title: Understanding new JASMIN storage
weight: 160
---

{{<alert alert-type="info">}}This article was originally written in 2018/19 to introduce new forms of storage which were brought into production at that stage. Some of the information and terminology is now out of date, pending further review of JASMIN documentation.{{</alert>}}

## Introduction

JASMIN continues to grow as a unique collaborative analysis environment for an
expanding community of scientists. Some of the big challenges we attempted to
address with Phase 4 were the ever-growing demand for storage space and the
increasing diversity of scientific workflows. However, we’re aware that some
aspects of the changes introduced in Phase 4 have presented some challenges in
themselves. Here, we outline the reasons for the changes and try to summarise
some of the challenges and what can be done to help deal with them.

## Background

(skip this if you just want to go straight to the advice):

With phase 4 we knew we had to both replace existing storage that had become
uneconomic to maintain, and add significantly more volume! However, we also
knew that most of the data stored on JASMIN disk is not touched for months on
end, but that some data is heavily used. We also knew that the traditional way
of building disk systems was no longer suitable for the scales (volumes of
data) we needed to handle, being supplanted by new technologies, and that at
some point our community would have to get used to these new technologies too.
The solution we chose for JASMIN is the same solution being deployed at most
large HPC sites: deploying tiered storage, that is more types of storage, and
requiring you, the user, to use the right kind of storage in the right place
in your workflow!

## Understanding the four types of JASMIN disk:

We have settled on four kinds of disk storage - quite an increase from the one
we had previously! Each is best for one kind of workflow, although each “can
do” most things, although not always well. We will see below that there is one
kind of activity that we now need to be much more careful about, because doing
it not only causes problems for individuals, but also for everyone else. We
could stop allowing this to happen, but it would be at a performance penalty
which would occur all the time: we have gone for “better with occasional
really slow” in preference to “always predictably slow” performance. What we
need you to do is learn how to avoid creating the “occasionally really slow”
times!

The four types are:

- **Solid state fast but not parallel disk (SSD),** really suitable for small files. This is what is used for your `/home/users` directories, so it is good for things you really don’t want to lose, because this area is backed up. The same type of storage is also used for the scratch area `/work/scratch-nopw`, although this is NOT for persistent storage and is NOT backed up. SSD is great for compiling and storing millions of small files, but is the most expensive storage, so we don’t have a lot of it.
- **Fast parallel disk (PFS)** , great for jobs that read and write the same file from many different processes. This is what we had before. It’s not so great for lots of small files. This is still pretty expensive, which is one of the reasons why we haven’t simply stayed with it. Some GWS still use this, but most are migrating to the next category - scale-out file storage.
- **Scale Out File Storage (SOF)**. This is what most of our Group Workspaces (GWS) will use. This is great for large volumes of data with regular use (consider near-line tape storage if you don’t need access for a significant period). SOF is not so great for small files, so if you have lots of small files, best to either aggregate them or tar them up. This is *terrible* for parallel *write* access to files, and you must avoid that. More details on that below, but the key point is you might find you need to use the fast parallel scratch (currently /work/scratch) in your workflows as an intermediary between persisting your data and your Lotus batch jobs.
- **High Performance Object Storage (HPOS)**. This is a new type of storage, and it’s best if you are working with the cloud. It’s going to be a bit tricky to get the hang of, so pay attention to the various things we’re going to be saying over the next few months about how to use it. It is the future though...

#### What type of storage am I using?

Storage  |  Type  |  Parallel-write  |  Good for small files?  |  Backed up?  
---|---|---|---|---  
/home/users  |  SSD  |  no  |  yes e.g. Installing Conda  |  yes  
/gws/pw/j07/*  |  PFS  |  yes  |  no  |  no  
/gws/nopw/j04/*  |  SOF  |  no  |  no  |  no  
/gws/smf/j04/*  |  SSD  |  no  |  yes  |  yes  
/work/scratch-pw[23] |  PFS  |  yes  |  no  |  no  
/work/scratch-nopw2  |  SSD  |  no  |  yes  |  no  
/work/xfc/volX  |  SOF  |  no  |  no  |  no
{.table .table-striped}
  
**Automounted SOF storage:** GWS storage volumes 
`/gws/nopw/j04/*` are automounted. This means that a particular GWS volume is not mounted by a
particular host until the moment it is first accessed. If the volume you
are expecting to see is not listed at the top level ( /gws/nopw/j04/) you
should use the full path of the volume to access it, and after a very short delay, the
volume should appear.

See also [here]({{% ref "storage" %}}) to see where these are mounted
throughout JASMIN.

## The BIG issue: why you need to be careful about parallel file access

(even if you don’t think you are doing it):

Traditional disk systems try and do cunning things when different processes
are writing to the same file; they can lock the file so only one process can
have a turn at a time, or they can try and stack up the updates and do them
one after another (and hope they don’t interfere), but at scale, all those
tricks come with a performance cost. That cost gets paid in many ways: raw I/O
speed, how many extra copies of blocks get written, how long it takes to
rebuild if things go wrong, how big any part of the storage can be… and, how
much kit and software the vendors need to deliver to make it work. All that
cost is worth it if your workflow needs it (and can’t avoid it), but in the
JASMIN environment, not many workflows actually need it.

Our fast parallel disk is fine for those workflows, but none of the others
support it well, and in particular for our scale-out file storage, as used by
most GWSs, the way it works means that if we turn on the support for parallel
write, it will become much slower and write many more copies of some data
blocks, meaning it will do I/O slower, and it will store less! Not what we
want. The parallel read is fine! However, avoiding parallel writes has turned
out to be harder than we anticipated, your workflows have many more ways of
doing it than we thought! Sadly, when you do parallel writes, the file system
can get “stuck” and that’s when everything goes really slow, for everyone on
that host …

One way around this is for us to apply “global write locking” to a GWS volume
(your GWS manager would need to request this). This solves the problem by
preventing parallel writes altogether, but at a significant cost in
performance.

## FAQs, issues and solutions

Please read our collection of FAQs and known issues (and solutions!) which
we've put together [HERE]({{% ref "faqs-storage" %}}).
