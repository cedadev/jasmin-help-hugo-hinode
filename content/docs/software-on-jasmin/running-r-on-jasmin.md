---
aliases: /article/5026-running-r-on-jasmin
description: Running R on JASMIN
slug: running-r-on-jasmin
tags:
- R
- software
- JASMIN
- environment
- packages
- Rscript
title: Running R on JASMIN
---

On the JASMIN `sci` servers and LOTUS, we support the use of **R** through the
"jasr" environment(s), as listed on the [Jaspy page]({{% ref "jaspy-envs" %}}).

In order to activate the R environment, you will need to use:

{{<command user="user" host="sci-vm-01">}}
module load jasr
{{</command>}}

Note that the Jaspy page lists [all available environments]({{% ref "jaspy-envs" %}}). You can also list the R packages that are available in the
environment by typing:

{{<command user="user" host="sci-vm-01">}}
ls $CONDA_PREFIX/lib/R/library/
{{</command>}}

Once you have activated the environment, you can start R, using:

{{<command user="user" host="sci-vm-01">}}
R
(out)
(out)R version 4.0.5 (2021-03-31) -- "Shake and Throw"
(out)Copyright (C) 2021 The R Foundation for Statistical Computing
(out)Platform: x86_64-conda-linux-gnu (64-bit)
(out)
(out)R is free software and comes with ABSOLUTELY NO WARRANTY.
(out)You are welcome to redistribute it under certain conditions.
(out)Type 'license()' or 'licence()' for distribution details.
(out)
  (out)Natural language support but running in an English locale
(out)
(out)R is a collaborative project with many contributors.
(out)Type 'contributors()' for more information and
(out)'citation()' on how to cite R or R packages in publications.
(out)
(out)Type 'demo()' for some demos, 'help()' for on-line help, or
(out)'help.start()' for an HTML browser interface to help.
(out)Type 'q()' to quit R.
(out)
(out)[Previously saved workspace restored]
(out)
{{</command>}}

If you have an R script that you wish to run, you can use the "Rscript"
command, such as:

{{<command user="user" host="sci-vm-01">}}
Rscript <myscript>
{{</command>}}

The following shows the options available when using "Rscript":

{{<command user="user" host="sci-vm-01">}}
Rscript --help
(out)Usage: /path/to/Rscript [--options] [-e expr [-e expr2 ...] | file] [args]
(out)
(out)
(out)--options accepted are
    (out)--help              Print usage and exit
    (out)--version           Print version and exit
    (out)--verbose           Print information on progress
    (out)--default-packages=list
                        (out)Where 'list' is a comma-separated set
                        (out)of package names, or 'NULL'
(out)or options to R, in addition to --no-echo --no-restore, such as
    (out)--save              Do save workspace at the end of the session
    (out)--no-environ        Don't read the site and user environment files
    (out)--no-site-file      Don't read the site-wide Rprofile
    (out)--no-init-file      Don't read the user R profile
    (out)--restore           Do restore previously saved objects at startup
    (out)--vanilla           Combine --no-save, --no-restore, --no-site-file
                        (out)--no-init-file and --no-environ
(out)
(out)
(out)'file' may contain spaces but not shell metacharacters
(out)Expressions (one or more '-e <expr>') may be used *instead* of 'file'
(out)See also  ?Rscript  from within R
{{</command>}}
    

The version number (currently 4.0.5) is reported when you start R, or if you
type:
{{<command user="user" host="sci-vm-01">}}
R --version
(out)R version 4.0.5 (2021-03-31) -- "Shake and Throw"
(out)Copyright (C) 2021 The R Foundation for Statistical Computing
(out)Platform: x86_64-conda-linux-gnu (64-bit)
(out)
(out)R is free software and comes with ABSOLUTELY NO WARRANTY.
(out)You are welcome to redistribute it under the terms of the
(out)GNU General Public License versions 2 or 3.
(out)For more information about these matters see
(out)https://www.gnu.org/licenses/.
(out)
{{</command>}}

Here are commands to do a simple plot to a file, which you can use to test
running R either interactively or with "Rscript" as described above.

```r
png("myplot.png")
x <- c(1,2,3,4)
y <- x*x
plot(x,y)
dev.off()
```

(You could use the "display" command on JASMIN to view the output file.)

Here is a minimal example of using the "library" command to load one of the
many add-on libraries that have been installed to supplement the core R
distribution. It uses the "prettyunits" package to convert a number of bytes
to human-readable format.

{{<command user="user" host="sci-vm-01">}}
module load jasr
R --quiet
{{</command>}}
{{<command prompt=">">}}
library(prettyunits)
pretty_bytes(12345678)
(out)    [1] "12.35 MB"
{{</command>}}

Finally, to quit R, type the following:

{{<command prompt=">">}}
q()
(out)Save workspace image? [y/n/c]: n
{{</command>}}
