---
aliases: /article/209-idl-and-midl
description: IDL
title: IDL
---



This article explains how to:

- use the IDL software on JASMIN 
- run these tools on the scientific analysis servers and LOTUS
- make efficient use of the IDL licences

## What is IDL?

{{<link "https://www.nv5geospatialsoftware.com/Products/IDL">}}IDL{{</link>}} stands for
Interactive Data Language. It is a licensed data manipulation toolkit made
available on JASMIN.

## Availability of IDL on JASMIN

IDL is available on all [scientific analysis servers]({{% ref "sci-servers" %}}) and [LOTUS]({{% ref "lotus-overview" %}}).

To get started with **IDL**, login to one of scientific analysis servers and
do as follows:

Check which versions are available:

{{<command user="user" host="sci-vm-01">}}
module avail idl
(out)
(out)-------------------------------------------- /apps/jasmin/modulefiles -----------------------------------------------
(out)  idl/8.9 idl/9.1 (D)    midl/20140411
(out)
(out)  Where:
(out)   D:  Default Module
{{</command>}}

The current default version is labelled with `(D)` and can be loaded using just `module load idl`. Alternatively, load a specific version by
adding its version string to the command:

{{<command user="user" host="sci-vm-01">}}
module load idl ## or idl/8.9 to specify the version
idl
(out)IDL 8.9.0 (linux x86_64 m64).
(out)(c) 2023, L3Harris Geospatial Solutions, Inc.
(out)% Error initializing graphics device GL.
(out)Licensed for use by: UKRI Centre for Environmental Data Analysis
(out)License: 492635
{{</command>}}

You can then type commands at the `IDL` prompt

{{<command prompt="IDL>">}}
print,1+4
(out)  5
exit
{{</command>}}

For help on the `idl` module you can type the following :

{{<command user="user" host="sci-vm-01">}}
module help idl
(out)----------- Module Specific Help for 'idl/8.9' --------------------
(out)         Adds IDL 8.9 to your environment variables,  
{{</command>}}

### Making efficient use of IDL development licences

We have a large pool of **run-time** licences but a much more limited pool of
**development** licences. In each case, these consist of floating licences shared
between JASMIN sci machines and the LOTUS cluster.

{{<alert type="info">}}
**6 September 2024: IDL v8.9** This version is available but without the full set of run-time
licences. This may affect usage, particularly on the LOTUS cluster. This will be
resolved in due course. Also please ignore the error message on startup re. GL graphics device.
{{</alert>}}

Users are welcome to run multiple instances of IDL code, but for that purpose
please make use of the run-time licences by compiling your code using a **single**
development session and then running the pre-compiled code using the `-rt`
flag. An example of this is shown in the next section (below).

Please try not to run more than one or two simultaneous IDL development
sessions. However, for licence purposes, each unique combination of username,
hostname, counts as a single session. So for example,
if you run idl (development mode) in one window, then suspend it with {{<kbd "CTRL-Z">}} and
start another development session in the same window, this still is only
counted as one session by the licence server because the username and hostname
are all identical between the two processes. 


### Using IDL on LOTUS (via the run-time Licences)

IDL run-time licences are available for use on the LOTUS cluster. In order to
specify use of the run-time licences please follow the instructions here. You
need to compile your IDL code in order to run in run-time mode.

### Example program

The example program, "foo", depends on some other functions.

```
======== foo.pro =======
    pro foo  
    print, doubleit(10) end 
========================
        


===== doubleit.pro ===== 
function doubleit, n   
return, two() * n 
end 
========================
        


======= two.pro ======== 
function two   
return, 2 
end 
========================
```

You must save a compiled version of the code in order to run it.

1\. Compile the program:

Compiles top-level routine only

{{<command prompt="IDL>">}}
.compile foo
(out)% Compiled module: FOO.
{{</command>}}

2\. Use resolve_all to compile routines it depends on:

Recursively search for and compile modules called

{{<command prompt="IDL>">}}
resolve_all
(out)% Compiled module: DOUBLEIT.
(out)% Compiled module: TWO.
{{</command>}}

3\. Save all compiled routines to a file:

{{<command prompt="IDL>">}}
save, /routines, file='foo.sav'
{{</command>}}

4\. To run the program, using a run-time licence only:

{{<command user="user" host="sci-vm-01">}}
idl -rt=foo.sav 
(out)IDL Version 8.5 (linux x86_64 m64). (c) 2015, Exelis Visual Information Solutions, Inc., a subsidiary of Harris Corporation.
(out)Installation number: 406672.
(out)Licensed for use by: Science & Technology Facilitie
(out)  20
{{</command>}}
    		

{{<alert type="info">}}Using` -vm=` instead of `-rt=` opens the save file in the IDL
virtual machine. No run-time licence is required, but a splash screen must
be dismissed interactively, so it is not suitable for queues on the
cluster.
{{</alert>}}

To see what routines are present in the save file:

{{<command prompt="IDL>">}} 
.reset_session     <=== removes any existing compiled modules  

help               <=== show compiled modules (and variables); there shouldn't be any 
(out)% At $MAIN$           
(out)Compiled Procedures:
        (out)$MAIN$  

(out)Compiled Functions:  

restore,'foo.sav'   <=== load contents of save file  

help 
(out)% At $MAIN$          
(out)Compiled Procedures:
        (out)$MAIN$  FOO                     <=== this was loaded from foo.sav  

(out)Compiled Functions: 
        (out)DOUBLEIT    TWO            <=== so were these
{{</command>}}

### Passing arguments

You can also pass arguments in to your code as follows:

In your code, use function `command_line_args`, for example:

```
argsarray = command_line_args(count = nparams)
```

Call the code with -args flag:

{{<command user="user" host="sci-vm-01">}}
idl -rt=foo.sav -args 10 20 30
{{</command>}}

`command_line_args` returns a string array, so convert type as required, e.g. `n = fix(argsarray[0]) `

### How to call IDL from Python using `idlpy`

It is possible to call IDL from Python using the `idlpy` library as illustrated in the following example:

{{<command user="user" host="sci-vm-01">}}
module load jaspy
module load idl
python
(out)>>> import sys
(out)>>> import os
(out)>>> sys.path.append(os.path.join(os.environ["IDL_DIR"], "lib/bridges"))
(out)>>> from idlpy import IDL
(out)>>> IDL.print("hello world")
(out)hello world
(out)>>> a = IDL.findgen(12)
(out)>>> a
(out)array([ 0.,  1.,  2.,  3.,  4.,  5.,  6.,  7.,  8.,  9., 10., 11.],
      dtype=float32)
{{</command>}}

### Further reading

- Vendor documentation: {{<link "https://www.nv5geospatialsoftware.com/docs/using_idl_home.html">}}Using IDL{{</link>}} (although may be for a newer version than on JASMIN)

### Related software

- The related software `MIDL` is no longer available on JASMIN.
