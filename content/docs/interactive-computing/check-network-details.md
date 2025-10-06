---
aliases: /article/190-check-network-details
description: Check network details
title: Check network details
draft: true
weight: 20
---

{{<alert alert-type="danger">}}
DEPRECATED: This article will shortly become obsolete following JASMIN's [migration to the Rocky 9 operating system](../software-on-jasmin/rocky9-migration-2024). The previous restriction on network domains and reverse DNS does not apply to the set of new machines (and old ones are being replaced).
{{</alert>}}

This article explains how to:

- check that your network domain is able to access JASMIN resources
- check that the particular host from which you are intending to connect to JASMIN has the required network configuration

## Check network domain (non .ac.uk users)

In order to maintain a secure and reliable scientific infrastructure for its
users, JASMIN restricts login access by maintaining an "allow list" of network
domains that are allowed to make SSH connections to the JASMIN login gateways
and data transfer servers.

All `.ac.uk` network domains (i.e. UK universities and "academic" institutions)
are already registered.

If your institution's network domain is not .ac.uk, please request for it to
be added to the allow list by contacting the
[JASMIN Helpdesk](mailto:support@jasmin.ac.uk), after reading the
information in the following section about forward and reverse DNS lookup.

## Check IP address resolves to network domain (all users)

In addition to being on the allowed IP list there is an additional requirement
that the address of your local computer must have **forward and reverse DNS
lookup enabled**. This means that the hostname must resolve to an IP address,
and the IP address must resolve to the fully-qualified hostname.

One easy way to do this is to access the following URL **from the machine
which will be used to make the SSH connection to JASMIN** :

<https://accounts.jasmin.ac.uk/services/reverse_dns_check/>

If you don't have a web browser on that machine, you can use the 'curl' or
'wget' Linux commands to make an HTTP request to that URL, and inspect the
output. A successful response will look like this:

```txt
External IP address: 130.246.123.456
Resolved to host: vpn-3-167.rl.ac.uk
```

Whereas an unsuccessful response will look like this:

```txt
External IP address: 130.246.123.456 
Reverse DNS lookup failed
```

If your IP address does not resolve, please contact your local IT technical
support desk and show them this article to help explain the context.

It is important that the network domain to which the IP address resolves is
part of the network domain which has been allowed. If there is no obvious
relationship between the network domain of the host and that of your
institution (derived from your email address), you may be asked to provide
additional justification or your connection may be denied. Some institutions
prefer not to provide public DNS listings: in this case please ask the
technical support representative to contact the JASMIN helpdesk on your behalf
to see if a technical solution can be found.

This can be a problem if you attempt to connect directly from a commercial
home or business internet service provider. Wherever possible, please connect
to your institution (which is likely to be on the allow list already) before
making an outgoing SSH connection to a JASMIN server.

As long as the IP address resolves to a fully-qualified hostname within the
allowed domain, it does not matter whether the host has a static or
dynamically-assigned (DHCP) IP address.

If you cannot obtain an IP address that resolves in this way, you may still be
able to access (only) `login2.jasmin.ac.uk`, which has been configured to
enable access without the reverse DNS restriction. However, this is likely to
be the only entry point available to you and will limit what you can do on
JASMIN. Doing so can be useful as a temporary solution, but to gain full use
of JASMIN you will need to have an IP address that resolves to the domain of
your institution. For access to graphical desktops, equivalent servers `nx-
login2.jasmin.ac.uk` and `nx-login3.jasmin.ac.uk` have been provided and for
transfer tasks, an additional transfer server `xfer3.jasmin.ac.uk` is
available. See [login servers]({{% ref "login-servers" %}}) and [transfer
servers]({{% ref "transfer-servers" %}}), but note the additional access role
required in the case of the transfer server.
