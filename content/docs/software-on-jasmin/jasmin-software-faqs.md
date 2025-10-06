---
aliases: /article/4918-jasmin-software-faqs
description: JASMIN software FAQs
slug: jasmin-software-faqs
tags:
- matlab
title: JASMIN software FAQs
---
{{< accordion id="accordion-default" >}}

  {{< accordion-item title="Why do I have to load/activate a software environment?" >}}

We have a range of different users on JASMIN who work on many different
projects. Each project has its own software requirements and timeline. By
providing multiple software environments (such as Python2.7 and Python3.7) we
can support a wider range of users on the same platform. Since we do not
assume a "standard" environment it is up to the user to "load" (or "activate")
a software environment before usage. This is typically done by using: 
{{<command>}}
module load <environment>
{{</command>}}

See the [overview]({{< ref path="software-overview" >}}) page for more details.

  {{< /accordion-item >}}

  {{< accordion-item title="How do I set the Jaspy environment as my default?" >}}
If you want your JASMIN sessions to automatically use the default "jaspy"
environment then append this line to the end of your "$HOME/.bashrc" file:

{{<command>}}
module load jaspy
{{</command>}}

  {{< /accordion-item >}}

  {{< accordion-item title="How do I set the `jasmin-sci` environment as my default?" >}}
If you want your JASMIN sessions to automatically know about the packages in
the "jasmin-sci" environment then add this line to the end of your
"$HOME/.bashrc" file:

{{<command>}}
module load jasmin-sci
{{</command>}}

  {{< /accordion-item >}}

{{< accordion-item title="How do I activate a combination of Jaspy and `jasmin-sci` environments together?" >}}
If you want to activate (or load) both the current Jaspy and the "jasmin-sci"
environments at the same time, use:

{{<command>}}
module load jasmin-sci
module load jaspy
{{</command>}}

{{< /accordion-item >}}

{{< accordion-item title="What is the plan for the future of Jaspy and `jasmin-sci` environments?" >}}
We have moved over to using [Conda](https://docs.conda.io/en/latest/) as the
primary tool for building and deploying software environments. The [Jaspy]({{<
ref "jaspy-envs" >}}) environments are all Conda-based and make use of the
significant community efforts supporting scientific computing such as the
"[conda-forge](https://conda-forge.org/)" repositories. For some packages, not
available through Conda, we have also created the "jasmin-sci" environment.
Ideally, we would like to move to a Conda-only solution in order to simplify
both the management and user perspectives.
{{< /accordion-item >}}

{{< accordion-item title="Can I install my own Conda environment?" >}}
If you need to install a set of packages that are not provided in Jaspy or the
"jasmin-sci" environment then you can create your own Conda installation. It
is important to note that this **will not be compatible** with the Jaspy
environments and please take note of the FAQ below: "Where should I install
software environments on JASMIN?".
{{< /accordion-item >}}

{{< accordion-item title="Where should I install software environments on JASMIN?" >}}
If you need to install your own software environment(s) on JASMIN then we
strongly advise that you install it on one of the SSD file systems:

- Under your `$HOME` directory - if you are the only user who needs access.
- Within a "small files" Group Workspace - if you wish to share the environment with other JASMIN users.
{{< /accordion-item >}}

{{< accordion-item title="Is MATLAB available on JASMIN?" >}}
No, MATLAB is not one of our supported software packages and is not installed
on JASMIN for general use. As a result, we are not able to provide support for
MATLAB-related issues.

An alternative is [Gnu Octave](https://www.gnu.org/software/octave), which is
a ‘drop-in’ replacement for MATLAB, and can be used on LOTUS without license
restrictions.

Some users/groups have arranged their own MATLAB license to be available for
use in certain locations on JASMIN, but this is something which users/groups
would need to arrange for themselves with the vendor,
[Mathworks](https://uk.mathworks.com/).

If you do have your own license, please be aware that any installation of
MATLAB would need to be done in a location that meets the terms of the
license, and the installation would normally need to be carried out with
regular user permissions (JASMIN users do not have root or sudo permissions).

There are 2 places where it would be OK to install MATLAB in this case:

* Within a group workspace, with access restricted to members of the group, but available for use on one of the shared sci machines (but see note below)
* On a tenancy sci machine: this is a special type of sci server deployed within a JASMIN Cloud tenancy, for exclusive use by members of that tenancy. The manager of the tenancy should do the installation.

**Safe use of temporary directories if using MATLAB on JASMIN**

By default, Matlab makes use of the local `/tmp` area on the
machine where it is being used, so if this is on a shared machine, it can fill
up the `/tmp` area and cause issues for all other users of the machine. You
are therefore advised to create and use a subdirectory of a group workspace
instead of `/tmp` for your own `TMPDIR` area. To do this, please do the
following (or similar):

The following lines added to your 
`$HOME/.bashrc` file will set an environment variable `TMPDIR`, and create the
corresponding directory if it does not already exist:

```bash
export TMPDIR=/gws/<path_to_your_group_workspace>/<your_username>/tmp
[ -d $TMPDIR ] || mkdir -p $TMPDIR
```

This should get automatically set at login, or can be manually invoked with:
{{<command>}}
. ~/.bashrc
{{</command>}}

But please note that we are not able to help with MATLAB queries beyond the
information provided here.
{{< /accordion-item >}}

{{< /accordion >}}
