---
title: "GWS Alert System"
description: "App to alert GWS managers/deputies when their GWS is reaching capacity"
---

The Group Workspace (GWS) Alert system is an app which runs a daily scan to check the capacity of volumes, then emails GWS managers if it is over the default threshold of 90% or the defined threshold in the GWS config file.

{{<alert alert-type="info">}}Please note this service is under beta-testing so if you receive any emails in error please let us know (September 2025){{</alert>}}

## What is the GWS Alert System?

A GWS volume is collaborative storage made available to a group for a project. Each GWS volume has a certain quota of storage - more information about how the storage is being used within a GWS can be found using the [GWS Scanner UI](https://gws-scanner.jasmin.ac.uk/). The GWS Alert System is set up to notify the managers/deputies of a GWS volume when it is reaching full capacity so the managers can contact their users and/or make some more space available.

## How the GWS Alert System runs

The app gets a list of all GWS volumes from the {{<link jasmin_projects_portal />}}, gets the storage information - i.e. how much storage has been used and how much is available, then sends an email alert if the volume is over a certain percentage full. The managers and deputies are obtained from the {{<link jasmin_accounts_portal />}}.

The GWS Alert System runs on a schedule at 11am daily.

### Threshold value

The threshold value at which alerts are sent is obtained from the file `{GWS_PATH}/.gws_scan/config.ini`.

[See here for details of how to customize this file](gws-scanner/#customisation), including this alert threshold.

If no file can be found, or the value not given, the default value of 90% is used, i.e. `volume_warning_threshold = 90`.

## Issues and questions

If you receive an email in error, or you think the email may contain incorrect information, please let us know.

If you'd like to change the threshold value, please update the `volume_warning_threshold` value in the `config.ini` file as described above. If the value hasn't been updated after 11:00 the following day, please let us know.

If you make changes to your storage and these aren't reflected in the next alert, please let us know.

For more information about managing a GWS, see https://help.jasmin.ac.uk/docs/short-term-project-storage/managing-a-gws/.

If you have any questions or suggestions, feel free to [get in touch](mailto:support@jasmin.ac.uk).