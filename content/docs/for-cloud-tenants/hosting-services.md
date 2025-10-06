---
description: Hosting Services on JASMIN
slug: hosting-services
title: Hosting services
weight: 25
---

When hosting services on the JASMIN cloud, whether that be through manually created VMs, or through an Azimuth platform, there are a number of things to consider.

1) The tenant is responsible for the use of the service.
2) The tenant is responsible for patching the service and keeping up to date with any vulnerabilities which might affect it. We reserve the right to shut down services which are not kept patched. Updating services causing potential issues is not an excuse for not keeping services up to date.
3) Machines should be regularly recreated from new images to ensure that they are up to date. If this hasn't been followed, and there are issues with specific machines, we will just ask you to redeploy your services on new machines.
4) Consider using HA services and load balancers to limit the impact of any issues we might have with the JASMIN Cloud, and to assist with rotating machines out of service.
5) JASMIN is research support infrastructure, as such we do not offer a guarantee for service uptime. If more resiliency than we can offer is required, consider using public cloud services.
6) By default, no floating IPs are whitelisted for external access like in the old JASMIN Cloud service. Please see the section below on requesting firewall changes.
7) See JASMIN terms and conditions, and STFC Cloud terms and conditions for more.

**Firewall Changes**

To request changes to the firewall and allow external access to services deployed on the JASMIN cloud, please email the JASMIN Helpdesk with the following information:

1) The tenancy your request is for.
2) The purpose of the service which you are requesting changes for.
3) The floating IP, and port.
4) The protocol (TCP, UDP, or other).
5) The direction of access (inbound or outbound).
6) Whether this IP is currently attached to a machine, and if so which machine.
7) Confirm you have read the [JASMIN](https://accounts.jasmin.ac.uk/account/conditions/) and [STFC Cloud](https://stfc.atlassian.net/wiki/spaces/CLOUDKB/pages/211845257/Terms+Of+Service) terms of service [ link]
8) Confirm what security precautions you have in place (e.g. SSL/TLS, Fail2Ban or similar automatic blocking tool, host based firewalls in use)
9) Confirm that you have not removed the following from the image: Pakiti (package vulnerability tracking), ROOT user SSH keys, and automatic updates.

Your request will go through various security checks before the firewall hole is opened, and we will log details of the service.

Once firewall changes have been made for a specific IP, they will remain in place even if the IP is moved between different machines in your tenancy. Please consider whether you need more changes to firewall rules when reusing IPs, especially if ports can be closed.
