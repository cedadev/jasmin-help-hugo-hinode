---
description: About regular maintenance for JASMIN & CEDA services
title: Scheduled maintenance
---

JASMIN undergoes regular scheduled maintenance about one day every 3 months. It usually means that all JASMIN and CEDA services will be down that day. We recommend you plan your work around maintenance days accordingly.

## Why we do this

It's important to keep the underlying software running JASMIN and CEDA services up-to-date. Although some software can be updated in the background, occasionally it can be more disruptive. To cause as little unexpected disruption as possible, these updates are applied on regular maintenance days.

## What happens

In advance, usually soon after the previous maintenance day, we will announce the next maintenance day on the {{< link "ceda_status" >}}CEDA status page{{< /link >}}.

The week before, we usually send out a reminder email to users on the [JASMIN Users mailing list]({{% ref "jasmin-status#jasmin-users" %}}).

On the day, expect all JASMIN and CEDA services to be unavailable. Some services may come back online sooner or later than others, depending on the amount of maintenance needed.

After maintenance is complete, we will update the CEDA status page by marking the incident as resolved. If certain services have still not recovered after the maintenance day, we will update the incident with details of which services are affected.

### Interactive services

All interactive machines (e.g., `login`, `sci`, `xfer` servers) will be unavailable on a maintenance day. Even if you are able to connect to a machine, they will be restarted throughout the day without warning as updates are applied. Please do not log in to do any work as you may lose data.

All web services may be unavailable, including the JASMIN Accounts Portal, the JASMIN Notebooks Service, and the CEDA Archive Catalogue.

### LOTUS/ORCHID

The LOTUS and ORCHID batch processing cluster will be unavailable for the duration of a maintenance day, to avoid jobs being adversely affected. A reservation will start at 05:00 UK time until 23:59 on the day. Any job submitted before 04:00 UK time on a maintenance day with a run time that goes over the reservation period will not start until after the reservation has finished.

If you regularly submit long-running jobs, you may find that during the week before the scheduled maintenance day, Slurm won't schedule jobs immediately. For example, if there are 6 days left before the reservation starts, a 7 day job will not be queued until after the maintenance window.
