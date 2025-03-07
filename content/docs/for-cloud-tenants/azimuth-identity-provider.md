---
description: How to use the Azimuth Identity Provider
slug: azimuth-identity-provider
title: Azimuth Identity Provider
weight: 70
---

Azimuth provides a Keycloak realm for each tenancy. Some of the platforms in Azimuth use this Keycloak to manage access to the platforms by creating new users and adding those users to groups. External identity providers can also be added to the Keycloak realm to provide access. Any created users can be given access to Azimuth platforms, but not Azimuth itself, and not any manually created machines. The following platforms can have users managed by this identity provider:

- JupyterHub


To access the Identity Provider, go to the **Identity Provider** tab, and click **Open identity provider**.

{{<image src="img/docs/azimuth-identity-provider/azimuth-id.png"  wrapper="col-12 mx-auto text-center">}}

You can now sign in with Azimuth with the button on the bottom, which uses the Azimuth login to sing into Keycloak. Alternatively any created users can sign in with with username/email and password.

{{<image src="img/docs/azimuth-identity-provider/keycloak-signin.png"  wrapper="col-6 mx-auto text-center">}}

Search, edit or create users in the **Users** tab on the left hand side. Use **Add user** to create a new user.
{{<image src="img/docs/azimuth-identity-provider/keycloak-add-user.png"  wrapper="col-12 mx-auto text-center">}}

You can then add Username, and any other fields. Its advised that the *Update Password* **Required user action** is selected so that users must change their password before logging in. 
{{<image src="img/docs/azimuth-identity-provider/create-test-user.png"  wrapper="col-9 mx-auto text-center">}}


Before clicking create (you can go back to this if you edit the user), users can be added to any groups. These groups give access to the deployed platforms in Azimuth. For example below, the `kubeapp-jhub` group is a JupyterHub platform with the name `jhub`. Other created platforms with appear in this list once created with the format `kubeapp-<platformname>`. To add a user to all deployed platforms (that can me managed through this), add the user to the `platform-users` group. Users who need access as a Keycloak admin, can be added to the `admins` group. 
{{<image src="img/docs/azimuth-identity-provider/join-groups.png"  wrapper="col-6 mx-auto text-center">}}

In order to sign in, a user needs to be given a temporary password. This can be done by going to the detail of the user, navigating to the **Credentials** tab, and clicking **Set password**. If the *Update Password* action was chosen during setup, then the user will be forced to change their password when they first log in.

{{<image src="img/docs/azimuth-identity-provider/set-password.png"  wrapper="col-12 mx-auto text-center">}}