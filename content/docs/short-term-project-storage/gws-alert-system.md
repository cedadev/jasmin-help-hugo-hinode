---
title: "GWS Alert System"
description: "App to alert GWS managers/deputies when their GWS is reaching capacity"
date: 2024-06-26T09:37:00+01:00
---

The Group Workspace (GWS) Alert system is an app which runs a daily scan to check the capacity of volumes, then emails GWS managers if it is over the default threshold of 90% or the defined threshold in the GWS config file.

**_Please note this service is under beta-testing so if you receive any emails in error please let us know (September 2025)_**

## What is the GWS Alert System? 

A GWS volume is a collaborative storage made available to a group for a project. Each GWS volume has a certain quota of storage - more information about how the storage is being used within a GWS can be found using the [GWS Scanner UI](https://gws-scanner.jasmin.ac.uk/). The GWS Alert System is set up to notify the managers/deputies of a GWS volume when it is reaching full capacity so the managers can make some more space available. 

## How the GWS Alert System runs

The Python app gets a list of all GWS volumes from the [JASMIN Projects Portal](projects.jasmin.ac.uk), gets the storage information - i.e. how much storage has been used and how much is available, then sends an email alert if the volume is over a certain percentage full. The managers and deputies are obtained from the [JASMIN Accounts Portal]().

The GWS Alert System runs on a schedule at 11am daily. 

### Threshold value

The threshold value at which alerts are sent is obtained from a file within the GWS volume. The file is found at `{GWS_PATH}/.gws_scan/config.ini`. The file should look something like this:

```
[general]
volume_warning_threshold =
```

where the `volume_warning_threshold` is the threshold value used in the GWS Alert system.

If no file can be found, the default value of `90%` is used.

## Issues and questions

If you receive an email in error, or you think the email may contain incorrect information, please let us know.

If you'd like to change the threshold value, please update the `volume_warning_threshold` value in the `config.ini` file as described above. If the value hasn't been updated the following day, please let us know.

If you make changes to your storage and these aren't reflected in the next alert, please let us know.

For more information about managing a GWS, see https://help.jasmin.ac.uk/docs/short-term-project-storage/managing-a-gws/. 

If you have any questions or suggestions, feel free to [get in touch](mailto:nicola.farmer@stfc.ac.uk).