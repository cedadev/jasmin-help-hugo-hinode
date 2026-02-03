---
aliases:
- /article/5077-configurando-cors-for-object-store
- /article/5077-configuring-cors-for-object-store
description: Confguring cross-origin resource sharing (CORS) for object storage.
title: Configuring CORS for object storage
---

## Introduction

This article describes how to configure Cross-Origin Resource Sharing (CORS) on a JASMIN Caringo S3 object store.

## S3 CORS configuration

JASMIN's DataCore (previously Caringo) S3 object storage allows domain owners to configure Cross-Origin Resource Sharing (CORS) at bucket level. This article assumes you have read the {{<link "s3-tools">}}this help article{{</link>}} which introduces the object store and the use of the `s3cmd` command line tool.

## Prerequisites

You will need a valid S3 Token ID and Secret Key for the domain that you wish to modify.

e.g.

```txt
key will not be displayed again!
Token ID: <The Token for your Domain>
S3 Secret Key: <The Secret for your Domain>
Expiration Date: 2024-02-13
Owner: <Your JASMIN ID>
Description: test
See using s3cmd for instructions on generating these.
```

## CORS XML Configuration File

CORS configuration is set on the S3 bucket using an XML file format, as shown below:

```xml
<CORSConfiguration>
   <CORSRule>
      <AllowedOrigin>http://www.example1.com</AllowedOrigin>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>DELETE</AllowedMethod>
      <AllowedHeader>*</AllowedHeader>
   </CORSRule>
   <CORSRule>
      <AllowedOrigin>http://www.example2.com</AllowedOrigin>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>DELETE</AllowedMethod>
      <AllowedHeader>*</AllowedHeader>
   </CORSRule>
   <CORSRule>
      <AllowedOrigin>*</AllowedOrigin>
      <AllowedMethod>GET</AllowedMethod>
   </CORSRule>
</CORSConfiguration>
```

The above example shows a configuration which allows CORS access from external web sites www.example1.com and www.example2.com.

You can create a new file on your filesystem to store your CORS configuration using the above example as a reference. In the next step, you'll learn how to apply this file to your bucket.

## Applying CORS Settings to a Bucket

To apply the CORS XML file you've created, you can use any S3 compatible client to set the CORS configuration.

The following example uses `s3cmd` on a Linux system.

First confirm that your `s3cmd` settings are correct by showing the `info` of the bucket.

e.g.

{{<command>}}
s3cmd info s3://testbin1
(out)s3://testbin1/ (bucket):
(out)   Location:  objectstore4.jc.rl.ac.uk
(out)   Payer:     none
(out)   Expiration Rule: none
(out)   Policy:    {
(out)                "Version":"2008-10-17",
(out)                "Id":"testbin1 Policy",
(out)                "Statement": [
(out)                  {
(out)                    "Sid":"1: Full access for Users",
(out)                    "Effect":"Allow",
(out)                    "Principal":{"anonymous":["*"]},
(out)                    "Action":["*"],
(out)                    "Resource":"*"
(out)                  },
(out)                  {
(out)                    "Sid":"2: Read-only access for Everyone",
(out)                    "Effect":"Allow",
(out)                    "Principal":{"anonymous":["*"]},
(out)                    "Action":["GetObject","GetBucketCORS"],
(out)                    "Resource":"*"
(out)                  }
(out)                ]
(out)              }
(out)   CORS:      none
(out)   ACL:       ahuggan: FULL_CONTROL
{{</command>}}

This example shows a bucket which currently doesn't have a CORS policy set. Specifically, this is the section we're interested in:

```txx
   CORS:      none
```

In this example, we'll set a simple "allow all" CORS configuration. We've already created a file named `test-cors-file` which we will be uploading to the bucket:

```xml
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

Using the `s3cmd` command, we apply the CORS XML file to our S3 bucket:

{{<command>}}
s3cmd setcors test-cors-file s3://testbin1
{{</command>}}

(your S3 address will be different to the one shown here)

We can now run the info command to confirm that the CORS configuration from our file has been set on the bucket:

{{<command>}}
s3cmd info s3://testbin1
(out)s3://testbin1/ (bucket):
(out)   Location:  objectstore4.jc.rl.ac.uk
(out)   Payer:     none
(out)   Expiration Rule: none
(out)   Policy:    {
(out)                "Version":"2008-10-17",
(out)                "Id":"testbin1 Policy",
(out)                "Statement": [
(out)                  {
(out)                    "Sid":"1: Full access for Users",
(out)                    "Effect":"Allow",
(out)                    "Principal":{"anonymous":["*"]},
(out)                    "Action":["*"],
(out)                    "Resource":"*"
(out)                  },
(out)                  {
(out)                    "Sid":"2: Read-only access for Everyone",
(out)                    "Effect":"Allow",
(out)                    "Principal":{"anonymous":["*"]},
(out)                    "Action":["GetObject","GetBucketCORS"],
(out)                    "Resource":"*"
(out)                  }
(out)                ]
(out)              }
(out)   CORS:      <CORSConfiguration>
(out)                <CORSRule>
(out)                  <AllowedOrigin>*</AllowedOrigin>
(out)                  <AllowedMethod>HEAD</AllowedMethod>
(out)                  <AllowedMethod>GET</AllowedMethod>
(out)                  <AllowedHeader>*</AllowedHeader>
(out)                </CORSRule>
(out)              </CORSConfiguration>
(out)   ACL:       ahuggan: FULL_CONTROL
{{</command>}}

To delete the CORS config from the bucket, we can run the following command:

{{<command>}}
s3cmd delcors s3://testbin1
(out)s3://testbin1/: CORS deleted
{{</command>}}
