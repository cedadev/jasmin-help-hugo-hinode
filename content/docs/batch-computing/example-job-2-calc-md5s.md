---
aliases: /article/3836-example-job-2-calc-md5s
description: 'Sample workflows for LOTUS'
slug: example-job-2-calc-md5s
title: 'Example Job 2: Calculating MD5 Checksums on many files'
---

This page records some early CEDA usage of the LOTUS cluster for various
relatively simple tasks. Others may wish to use these examples as a starting
point for developing their own workflows on LOTUS.

## Case 1: Calculating MD5 Checksums on many files

This is a simple case because:

1. the archive only needs to be read by the code and
2. the code that we need to run involves only the basic Linux commands so there are no issues with picking up dependencies from elsewhere.

### Case Description

- we want to calculate the MD5 checksums of about 220,000 files. It will take a day or two to run them all in series.
- we have a text file that contains 220,000 lines - one file per line.

### Solution under LOTUS

- Split the 220,000 lines into 22 files of 10,000 lines.
- Write a template script to:
  - Read a text file full of file paths
  - Run the `md5sum` command on each file and log the result.
- Write a script to create 22 new scripts (based on the template script), each of which takes one of the input files and works through it.

### Workflow steps

Log in to the `sci` server (use any of `sci-vm-0[1-6]`, access from a `login` server):

{{<command user="user" host="login-01">}}
ssh -A <username>@sci-vm-01.jasmin.ac.uk
{{</command>}}

Split the big file:

{{<command user="user" host="sci-vm-01">}}
split -l 10000 -d file_list.txt # Produces 22 files called "x00"..."x21"
{{</command>}}

Create the template file: `scan_files_template.sh`

```bash
#!/bin/bash
#SBATCH -A mygws
#SBATCH -p standard 
#SBATCH -q standard
#SBATCH -e %J.e

infile=/home/users/astephen/sst_cci/to_scan/__INSERT_FILE__  

while read f ; do         

    /usr/bin/md5sum $f >> /home/users/astephen/sst_cci/output/scanned___INSERT_FILE__.log

done < $infile
```

Run a script to generate all the script files:

```bash
for i in `ls /home/users/astephen/sst_cci/to_scan/` ; do
    cp scan_files_template.txt bin/scan_files_${i}.sh 
    perl -p -i -w -e 's/__INSERT_FILE__/'${i}'/g;' bin/scan_files_${i}.sh 
done
```

Submit all 22 jobs to LOTUS:

```bash
for i in `ls /home/users/astephen/sst_cci/to_scan/` ; do      
    echo $i    
    cat /home/users/astephen/sst_cci/bin/scan_files_${i}.sh | sbatch -o /home/users/astephen/sst_cci/output/$i   
done
```

Monitor the jobs by running:

{{<command user="user" host="sci-vm-01">}}
squeue -u <username>
{{</command>}}

All jobs ran within about an hour.

## Case 2: Checksumming CMIP5 Data

A variation on Case 2 has been used for checksumming datasets in the CMIP5
archive. The Python code below will find all NetCDF files in a DRS dataset and
generate a checksums file and error log. Each dataset is submitted as a
separate Slurm job.

```python
""" 
Checksum a CMIP5 dataset
usage: checksum_dataset.py dataset_id ...
    where dataset_id is a full drs id including version 
    e.g. cmip5.output1.MOHC.HadGEM2-ES.historical.6hr.atmos.6hrLev.r1i1p1.v20110921
"""
import os
import os.path as op
import sys
import optparse

DRS_ROOT = '/badc/cmip5/data'

def submit_job(dataset):
    # Assume version is in the dataset-id for now
    parts = dataset.split('.')
    path = op.join(DRS_ROOT, '/'.join(parts))


    if not op.exists(path):
        raise Exception('%s does not exist' % path)
    job_name = dataset
    cmd = ("sbatch -A mygws -p standard -q standard -J {job_name} "
            "-o {job_name}.checksums -e {job_name}.err "
            "--wrap \"srun /usr/bin/md5sum {path}/*/*.nc\""
        ).format(job_name=job_name, path=path)
    
    print(cmd)
    os.system(cmd)

def main():
    parser = optparse.OptionParser(description='Checksum DRS datasets')
    (options, args) = parser.parse_args()

    datasets = args
    for dataset in datasets:
        submit_job(dataset)

if __name__ == '__main__':
    main()
```

If you have a file containing a list of dataset ids you can submit each as a
separate job by invoking the above script as follows:

{{<command user="user" host="sci-vm-01">}}
./checksum_dataset.py $(cat datasets_to_checksum.dat)
(out)sbatch -A mygws -p standard -q standard -J cmip5.output1.MOHC.HadGEM2-ES.rcp85.day.seaIce.day.r1i1p1.v20111128 -o cmip5.output1.MOHC.HadGEM2-ES.rcp85.day.seaIce.day.r1i1p1.v20111128.checksums -e cmip5.output1.MOHC.HadGEM2-ES.rcp85.day.seaIce.day.r1i1p1.v20111128.err --wrap "srun /usr/bin/md5sum /badc/cmip5/data/cmip5/output1/MOHC/HadGEM2-ES/rcp85/day/seaIce/day/r1i1p1/v20111128/*/*.nc"
(out)Submitted batch job 40898728
(out)...
{{</command>}}
