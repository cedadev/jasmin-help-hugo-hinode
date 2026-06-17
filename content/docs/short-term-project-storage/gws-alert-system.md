---
title: "GWS Alert System"
description: "App to alert GWS managers/deputies when their GWS is reaching capacity"
---

The Group Workspace (GWS) Alert system is an app which runs a daily scan to check the capacity of volumes, then emails GWS managers if it is over the default threshold of 90% or the defined threshold in the GWS config file.


## What is the GWS Alert System?

A GWS volume is collaborative storage made available to a group for a project. Each GWS volume has a certain quota of storage - more information about how the storage is being used within a GWS can be found using the [GWS Scanner UI](https://gws-scanner.jasmin.ac.uk/). The GWS Alert System is set up to notify the managers/deputies of a GWS volume when it is reaching full capacity so the managers can contact their users and/or make some more space available.

## How the GWS Alert System runs

The app gets a list of all GWS volumes from the {{<link jasmin_projects_portal />}}, gets the storage information - i.e. how much storage has been used and how much is available, then sends an email alert if the volume is over a certain percentage full. The managers and deputies are obtained from the {{<link jasmin_accounts_portal />}}.

The GWS Alert System runs daily at roughly midday.

### Threshold value

The default threshold for alerts is when the volume is 90% full. Please get in touch if you want this to be a different value. (This used to be configurable in a file on the volume, but changes to the alert system means that we can't use it any more).

## Issues and questions

If you receive an email in error, or you think the email may contain incorrect information, please let us know.

If you make changes to your storage and these aren't reflected in the next alert, please let us know.

For more information about managing a GWS, see https://help.jasmin.ac.uk/docs/short-term-project-storage/managing-a-gws/.

If you have any questions or suggestions, feel free to [get in touch](mailto:support@jasmin.ac.uk).