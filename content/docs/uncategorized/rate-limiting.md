---
description: Rate limiting applied to JASMIN web services
slug: rate-limiting
title: Rate Limiting
---

To protect the JASMIN and CEDA web services from abuse and ensure fair access for all users, rate limiting is applied to all HTTP requests.

The specific limits listed below may be adjusted over time as we gain experience with usage patterns and as the needs of the JASMIN and CEDA communities evolve. Rather than relying on any particular threshold remaining fixed, the most important thing is that your code correctly handles `429 Too Many Requests` responses by backing off and retrying. Code that does this will continue to work correctly regardless of how the limits change.

### Limits
**Per-service request rate**
A maximum of 100 requests per second is permitted to any individual JASMIN web service.

**Per-service concurrent connections**
A maximum of 50 concurrent connections is permitted to any individual JASMIN web service.

**Error rates**
Enforcement for error rates is significantly stricter than for request rates. Clients generating large numbers of HTTP 4xx or 5xx errors will be rate limited quickly. Users and developers should not attempt to discover valid URLs by walking unknown paths- only make requests to URLs you know to be valid.

**Cluster wide requests**
Limits also exist for the total number of requests and connections across all CEDA and JASMIN services. Please do not make large amounts of connections to more than one of our services at once.

### What happens when a limit is exceeded
Requests that exceed these limits will receive an HTTP `429 Too Many Requests` response. If the rate of requests is extreme, connections may be refused before an HTTP response can be sent.

### Guidance scripting
If you are writing scripts or applications that access JASMIN or CEDA web services, please ensure they do not make requests in tight loops without appropriate delays. If you receive a `429` response, you should back off and retry after a short delay.

### Support
If you are having problems with rate limiting and need our support in acquiring the date you require, please don't hesitate to contact us at support@jasmin.ac.uk or support@ceda.ac.uk as appropriate.
