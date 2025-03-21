---
aliases: /article/286-best-practice
description: Best practice
slug: best-practice
title: Best practice
---

External Cloud Tenancy additional notes

Best practice guides for “server hardening” of Linux machines facing the
internet:

- <https://www.slideshare.net/myowntelco/centos-linux-server-hardening>

And particularly for web servers:

- <https://www.slideshare.net/akashm/securing-a-linux-web-server-in-10-steps-or-less>

Additional notes regarding JASMIN External Cloud environment:

- The Shield NAT/Firewall device is the only isolation between Tenant VMs and the raw internet.
  - We monitor network traffic at the gateway/router but
  - Security is the responsibility of the tenant. Please follow suggested security hardening guidelines for all VMs with connections to 192.171.139.0/25
- Access to other JASMIN hosts and services from the external cloud, is the same as access from internet to these services.
- The default CentOS public catalog template is configured to use DNS, NTP and yum repo network services from the internet, not from the RAL site. 
  - SMTP (mail) server/relay configuration is the responsibility/choice of the tenant.
    - We recommend tenants choose a hosted email server with virus and SPAM filtering and not attempt to configure their own email pipelines.
  - Reverse DNS (IP to hostname) for 192.171.129.0/25 is managed by NERC DNS servers along with ( shortly ) default forward A name records.

Tenants may setup forward A or CNAME DNS records (hostname to IP) for any
domainnames they own/control via their own DNS or institutional name servers
