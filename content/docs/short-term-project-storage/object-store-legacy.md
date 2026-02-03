---
description: Legacy Content for the JASMIN Object Store
title: Legacy Content for the JASMIN Object Store
---



## Legacy method for key creation

This is the old way of creating keys which still works, but the new way above is accessible outside JASMIN on the public internet.

You can generate an access key and secret using the Caringo portal. 

Authentication with the object store uses an access key and secret that are
separate to your JASMIN username and password. You can generate an access key
and secret using the Caringo portal. This portal is not currently available
outside of JASMIN - you will need to use a graphical session on JASMIN to
access a Firefox browser running on a JASMIN system.

**The recommended way to do this is using the** [NX Graphical Desktop
service]({{% ref "graphical-linux-desktop-access-using-nx" %}}). You can start Firefox from
the "Activities" menu once you have logged in to your graphical desktop on one
of the `nx-login*` servers (so no need to make an onward connection to a `sci`
server).

An alternative option is to using X11 Forwarding on your SSH connection. You 
need to do this on one of the `nx*` servers (not the sci servers as previously)
because this is where firefox is now installed:

    
```bash
ssh -X <user>@nx1.jasmin.ac.uk firefox
```

(try `-Y` if `-X` does not work for you).

Once you have Firefox open, navigate to

```bash
http://my-os-tenancy-o.s3.jc.rl.ac.uk:81/_admin/portal
```

but replace `my-os-tenancy-o` with your tenancy name.

You will see a login screen where you
should enter your JASMIN username and password:

{{<image src="img/docs/using-the-jasmin-object-store/file-4dszwvVbge.png" caption="">}}

If you receive a "HTTP ERROR 500 java..." error, it is likely that you haven't
added the port (81) to the address.  
  
Upon successfully entering the username and password of a user who belongs to
the tenancy, you will see a dashboard. To create an access key and secret,
click on the cog icon and select "Tokens":

{{<image src="img/docs/using-the-jasmin-object-store/file-sazR2YE8xn.png" caption="">}}

On the tokens page, click "Add":

{{<image src="img/docs/using-the-jasmin-object-store/file-tiUnM6oyq6.png" caption="">}}

In the dialogue that pops up, enter a description for the token and set an
expiration date. Make sure to click "S3 Secret Key" - this will expose an
additional field containing the secret key. **Make sure you copy this and
store it somewhere safe - you will not be able to see it again!** This value
will be used whenever the "S3 secret key" is required.

{{<image src="img/docs/using-the-jasmin-object-store/file-8ezAbSQY56.png" caption="">}}

Once the token is created, it will appear in the list. The "Token" should be
used whenever the "S3 access key" is required:

{{<image src="img/docs/using-the-jasmin-object-store/file-QSg6RtIAv8.png" caption="">}}

