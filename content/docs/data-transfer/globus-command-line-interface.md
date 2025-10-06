---
aliases: /article/4480-data-transfer-tools-globus-command-line-interface
description: 'Data Transfer Tools: Using the Globus Command-Line Interface'
slug: globus-command-line-interface
title: 'Globus Command-Line Interface'
---

{{<alert alert-type="info">}}
Updated for new JASMIN Default Collection (replaces previous JASMIN Globus Endpoint)
{{</alert>}}

Please read {{<link "globus-transfers-with-jasmin"/>}} first for a wider introduction to Globus on JASMIN.

This article describes

- how to transfer data using the Globus Command Line Interface. It covers:
  - how an end-user can set up their host (laptop, desktop or home directory on their departmental server) with the Globus Command-Line Interface (CLI)
  - examples of common tasks using the CLI

It is not necessary to use the Globus CLI on a JASMIN server: it is a tool
that you can use anywhere (for example your own desktop/laptop) to interact
with the Globus service, to orchestrate a transfer between 2 endpoints (collections, in new Globus terminology). The
CLI is not centrally installed on JASMIN, and does not need to be in the same
place as either of the 2 collections involved in the transfer. You could use the CLI on your own
laptop/desktop, even if the 2 collections were 2 institutional Globus collections
on opposite sides of the world. You could of course decide to install the CLI
in your home directory on JASMIN if that were useful as part of your
processing/data transfer workflow.

The [Globus CLI is fully documented here](https://docs.globus.org/cli/) with
[examples](https://docs.globus.org/cli/examples/). It provides a command-line
interface for managed transfers via the Globus cloud-based transfer service,
which usually achieves the best possible transfer rate over a given route
compared to other methods. Typically this will be significantly faster than
can be achieved over scp, rsync or sftp transfers, particularly if the
physical network path is long.

The Globus CLI is designed for use either interactively within an interactive
shell or in scripts. An alternative [Python software development kit
(SDK)](https://globus-sdk-python.readthedocs.io/en/stable/) is also available
and should be considered for more sophisticated workflows.

Alternatively, the Globus web interface at <https://app.globus.org> can be
used as an easy-to-use interface to orchestrate transfers interactively.

Whichever method is used: CLI, SDK or web interface, transfers are invoked as
asynchronous, managed tasks which can then be monitored, and if need be set to
retry automatically until some pre-set deadline.

## Prerequisites

- Linux environment with normal user privileges, **or**
- Mac environment with ability to install applications, **or**
- Windows environment with ability to install applications
- Python environment for that platform, with ability to create virtual environments (to enable installation of additional packages)
- For use of the JASMIN Default Collection: 
  - An active JASMIN user account, with “jasmin-login” role
- You may also wish to [set up your own Globus endpoint using Globus Connect Personal]({{% ref "globus-connect-personal" %}}), though this is not needed for these examples.

## Initial Setup

### Get a Globus identity

Go to https://app.globus.org and either:

- choose one of the listed identity providers (e.g. GitHub, Google, ...)
- follow the link at the bottom to "use Globus ID to sign in"

See also https://docs.globus.org/how-to/get-started/

### Set up the Globus CLI on your machine

Do the following on your own (local) machine.
Make a Python virtual environment and activate it:

{{<command host="localhost" user="localuser">}}
python3 -m venv ./venv
source ./venv/bin/activate
{{</command>}}

Download the Globus CLI and install it into the virtual environment ( `venv`).

{{<command host="localhost" user="localuser">}}
pip install globus-cli
{{</command>}}

Try the `globus login` command. The first time you run this, you will be
prompted to authorise the Globus CLI to carry out operations on behalf of your
Globus ID. The URL will open in your default browser, where you should
authenticate with your Globus ID credentials. If you prefer, you can
copy/paste the URL from the command-line to a browser of your choice. Either
way, you then need to click "Allow" in the browser window, then copy/paste the
resulting "Native App Authorization Code" back to the terminal window where
you issued the `globus login` command:

{{<command host="localhost" user="localuser">}}
globus login --no-local-server
(out)Please authenticate with Globus here:
(out)------------------------------------
(out)https://auth.globus.org/v2/oauth2/authorize?client_id=abc1234-9c3c-4ad42-be31-8d6c87101239014&redirect_uri=https%3A%2F%2Fauth.globus.org%2Fv2%2Fweb%2Fauth-code&scope=openid+profile+email+urn%3Aglobus%3Aauth%3Ascope%3Aauth.globus.org%3Aview_identity_set+urn%3Aglobus%3Aauth%3Ascope%3Atransfer.api.globus.org%3Aall+urn%3Aglobus%3Aauth%3Ascope%3Agroups.api.globus.org%3Aall+urn%3Aglobus%3Aauth%3Ascope%3Asearch.api.globus.org%3Aall&state=_default&response_type=code&access_type=offline&prompt=login
(out)------------------------------------ 
(out)Enter the resulting Authorization Code here:
{{</command>}}

You should then see the following:

{{<command>}}
(out)You have successfully logged in to the Globus CLI!
(out)
(out)You can check your primary identity with
(out)  globus whoami
(out)
(out)For information on which of your identities are in session use
(out)  globus session show

(out)Logout of the Globus CLI with
(out)  globus logout
{{</command>}}

You can now use the Globus CLI commands as listed by the following command:

{{<command>}}
globus  --help
(out)  Usage: globus [OPTIONS] COMMAND [ARGS]...
(out)  
(out)    Interact with Globus from the command line
(out)  
(out)    All `globus` subcommands support `--help` documentation.
(out)  
(out)    Use `globus login` to get started!
(out)  
(out)    The documentation is also online at https://docs.globus.org/cli/
(out)  
(out)  Options:
(out)    -v, --verbose                  Control level of output
(out)    -h, --help                     Show this message and exit.
(out)    -F, --format [unix|json|text]  Output format for stdout. Defaults to text
(out)    --jmespath, --jq TEXT          A JMESPath expression to apply to json
(out)                                    output. Takes precedence over any specified '
(out)                                    --format' and forces the format to be json
(out)                                    processed by this expression
(out)    --map-http-status TEXT         Map HTTP statuses to any of these exit codes:
(out)                                    0,1,50-99. e.g. "404=50,403=51"
(out)  
(out)  Commands:
(out)    bookmark        Manage endpoint bookmarks
(out)    collection      Manage your Collections
(out)    delete          Submit a delete task (asynchronous)
(out)    endpoint        Manage Globus endpoint definitions
(out)    get-identities  Lookup Globus Auth Identities
(out)    group           Manage Globus Groups
(out)    list-commands   List all CLI Commands
(out)    login           Log into Globus to get credentials for the Globus CLI
(out)    logout          Logout of the Globus CLI
(out)    ls              List endpoint directory contents
(out)    mkdir           Create a directory on an endpoint
(out)    rename          Rename a file or directory on an endpoint
(out)    rm              Delete a single path; wait for it to complete
(out)    search          Use Globus Search to store and query for data
(out)    session         Manage your CLI auth session
(out)    task            Manage asynchronous tasks
(out)    transfer        Submit a transfer task (asynchronous)
(out)    update          Update the Globus CLI to its  latest version
(out)    version         Show the version and exit
(out)    whoami          Show the currently logged-in identity
{{</command>}}

## Examples

  1. **Find an endpoint (aka collection)**

We will use the `globus endpoint search` subcommand. Find help on the
particular options for that with

{{<command>}}
globus endpoint search --help
(out)Usage: globus endpoint search [OPTIONS] [FILTER_FULLTEXT]
(out)
(out)  Search for Globus endpoints with search filters. If --filter-scope is set to
(out)  the default of 'all', then FILTER_FULLTEXT is required.
(out)
(out)  If FILTER_FULLTEXT is given, endpoints which have attributes (display name,
(out)  legacy name, description, organization, department, keywords) that match the
(out)  search text will be returned. The result size limit is 100 endpoints.
(out)
(out)Options:
(out)  --filter-scope [all|administered-by-me|my-endpoints|my-gcp-endpoints|recently-used|in-use|shared-by-me|shared-with-me]
(out)                                  The set of endpoints to search over.
(out)                                  [default: all]
(out)  --filter-owner-id TEXT          Filter search results to endpoints owned by
(out)                                  a specific identity. Can be the Identity ID,
(out)                                  or the Identity Username, as in
(out)                                  "go@globusid.org"
(out)  --limit INTEGER RANGE           The maximum number of results to return.
(out)                                  [default: 25; 1<=x<=1000]
(out)  -v, --verbose                   Control level of output
(out)  -h, --help                      Show this message and exit.
(out)  -F, --format [unix|json|text]   Output format for stdout. Defaults to text
(out)  --jmespath, --jq TEXT           A JMESPath expression to apply to json
(out)                                  output. Takes precedence over any specified
(out)                                  '--format' and forces the format to be json
(out)                                  processed by this expression
(out)  --map-http-status TEXT          Map HTTP statuses to any of these exit
(out)                                  codes: 0,1,50-99. e.g. "404=50,403=51"
{{</command>}}

Search for the collections matching the search term "tutorial":

{{<command>}}
globus endpoint search "tutorial"
(out)ID                                   | Owner                                                        | Display Name                                  
(out)------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------
(out)6c54cade-bde5-45c1-bdea-f4bd71dba2cc | 6df1b656-c953-40a3-91a9-e9e8ad5173ea@clients.auth.globus.org | Globus Tutorial Collection 1                  
(out)31ce9ba0-176d-45a5-add3-f37d233ba47d | 6df1b656-c953-40a3-91a9-e9e8ad5173ea@clients.auth.globus.org | Globus Tutorial Collection 2 
{{</command>}}

The 2 globus tutorial collections actually "see" the same filesystem, so we'll
just use the first one.

For convenience, let's set environment variables representing the ID of this collection:

{{<command>}}
export c1=6c54cade-bde5-45c1-bdea-f4bd71dba2cc
echo $c1
(out)6c54cade-bde5-45c1-bdea-f4bd71dba2cc
{{</command>}}

Let's try listing that collection, so that we know we can interact with it. We are prompted to grant consent first:
{{<command>}}
globus ls $c1
(out)The collection you are trying to access data on requires you to grant consent for the Globus CLI to access it.
(out)
(out)Please run:
(out)
  (out)globus session consent 'urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/6c54cade-bde5-45c1-bdea-f4bd71dba2cc/data_access]'
(out)
(out)to login with the required scopes.
{{</command>}}

Copy & paste the command it gives you (don't copy the one above) and run it, which should open a web browser window. Follow the instructions which should complete the process, then return to your terminal session.

Now let's find another collection, this time a public test collection which can be used for performance testing:

{{<command>}}
globus endpoint search "star dtn"
(out)ID                                   | Owner              | Display Name                                     
(out)------------------------------------ | ------------------ | -------------------------------------------------
(out)ff2ee779-54fb-4dac-ade2-57568c587ae3 | esnet@globusid.org | ESnet STAR DTN private collection                
(out)ece400da-0182-4777-91d6-27a1808f8371 | esnet@globusid.org | ESnet Starlight DTN (Anonymous read only testing)
(out)e9e0d9f4-c419-44e0-8198-017fd61bf0c4 | esnet@globusid.org | ESnet Starlight DTN (read-write testing)  
{{</command>}}

We'll use the one labelled {{< mark >}}Anonymous read only testing{{</mark>}}.
Set `stardtn` to the ID of this endpoint:

{{<command>}}
export stardtn=ece400da-0182-4777-91d6-27a1808f8371
{{</command>}}

{{<alert alert-type="info">}}
None of the endpoints mentioned so far require **authentication** in
order to use them. This makes demonstrating basic functionality simpler, but
we'll look at how to use one that does, later.
{{</alert>}}

  2. **Listing files at a path on an collection**

Use the `endpoint ls` command to list the contents of the `stardtn` endpoint,
at the path `/`

{{<command>}}
globus ls $stardtn:/
(out)500GB-in-large-files/
(out)50GB-in-medium-files/
(out)5GB-in-small-files/
(out)5MB-in-tiny-files/
(out)Climate-Huge/
(out)Climate-Large/
(out)Climate-Medium/
(out)Climate-Small/
(out)bebop/
(out)logs/
(out)write-testing/
(out)100G.dat
(out)100M.dat
(out)10G.dat
(out)10M.dat
(out)1G.dat
(out)1M.dat
(out)500G.dat
(out)50G.dat
(out)50M.dat
{{</command>}}

These are files and directories containing dummy data which can be used for
test purposes.

  3. **Copy a file from one endpoint to another**

Let's transfer the file `1M.dat` from the `stardtn` endpoint to `c1`:

{{<command>}}
globus transfer $stardtn:/1M.dat $c1:/~/1M.dat
(out)Message: The transfer has been accepted and a task has been created and queued for execution
(out)Task ID: 74cb181c-bf63-11ee-a90e-032e06ca0965
{{</command>}}

The transfer task is a separate activity and does not require any connection
from the CLI client to either of the 2 endpoints: the Globus transfer service
manages the transfer for us. We can check on the progress of this transfer
task with:

{{<command>}}
globus task show 74cb181c-bf63-11ee-a90e-032e06ca0965
(out)Label:                        None
(out)Task ID:                      74cb181c-bf63-11ee-a90e-032e06ca0965
(out)Is Paused:                    False
(out)Type:                         TRANSFER
(out)Directories:                  0
(out)Files:                        1
(out)Status:                       SUCCEEDED
(out)Request Time:                 2024-01-30T11:33:58+00:00
(out)Faults:                       0
(out)Total Subtasks:               2
(out)Subtasks Succeeded:           2
(out)Subtasks Pending:             0
(out)Subtasks Retrying:            0
(out)Subtasks Failed:              0
(out)Subtasks Canceled:            0
(out)Subtasks Expired:             0
(out)Subtasks with Skipped Errors: 0
(out)Completion Time:              2024-01-30T11:34:01+00:00
(out)Source Endpoint:              ESnet Starlight DTN (Anonymous read only testing)
(out)Source Endpoint ID:           ece400da-0182-4777-91d6-27a1808f8371
(out)Destination Endpoint:         Globus Tutorial Collection 1
(out)Destination Endpoint ID:      6c54cade-bde5-45c1-bdea-f4bd71dba2cc
(out)Bytes Transferred:            1000000
(out)Bytes Per Second:             421388
{{</command>}}

We can also list the destination collection to check that the file has reached
its destination:

{{<command>}}
globus ls $c1:/~/
(out)  1M.dat
{{</command>}}

We can also make a subdirectory with `mkdir`:
{{<command>}}
globus mkdir $c1:/~/mydata/
(out)    The directory was created successfully
{{</command>}}

We can move our `1M.dat` into that directory with a `globus rename` command
{{<command>}}
globus rename $c1 /~/1M.dat /~/mydata/1M.dat
(out)    File or directory renamed successfully
{{</command>}}

We now have a directory `mydata` containing files `1M.dat`:

{{<command>}}
globus ls $c1:/~/mydata/
(out)    1M.dat
{{</command>}}

  4. **Recursively copy a directory and its contents, from one endpoint to another**

Now Let's copy a directory from the `stardtn` collection which contains some small
files, to our destination endpoint `c1` (The Globus tutorial collections only
provide very limited storage space).

The files we want to copy are at the path `/5MB-in-tiny-files/a/a/` on
the `stardtn` endpoint, and are small, as their names suggest:

{{<command>}}
globus ls $stardtn:/5MB-in-tiny-files/a/a/
(out)a-a-1KB.dat
(out)a-a-2KB.dat
(out)a-a-5KB.dat
{{</command>}}

Copy the parent directory recursively to `ep1`:

{{<command>}}
globus transfer -r $stardtn:/5MB-in-tiny-files/a/a $c1:/~/star-data
(out)Message: The transfer has been accepted and a task has been created and queued for execution
(out)Task ID: 4ae9bab0-7d40-11ec-bef3-a18800fa5978
{{</command>}}

Check destination content:

{{<command>}}
globus ls $c1
(out)mydata1/
(out)star-data/
(out)
globus ls $c1:/~/star-data
(out)a-a-1KB.dat
(out)a-a-2KB.dat
(out)a-a-5KB.dat
{{</command>}}

We could now delete one of the small files using the `globus delete` command:
{{<command>}}
globus delete $c1:/~/star-data/a-a-2KB.dat
(out)Message: The delete has been accepted and a task has been created and queued for execution
(out)Task ID: be4d6934-7d40-11ec-891f-939ceb6dfaf1
{{</command>}}

And list contents again, to verify that it has been deleted:

{{<command>}}
globus ls $c1:/~/star-data
(out)a-a-1KB.dat
(out)a-a-5KB.dat
{{</command>}}

  5. **Sync a source directory to a target (repeatable)**

We could now repeat the copying of the source data, but this time using the
`-s` or `--sync-level exists` command so that we only copy the data that is
now missing from the destination. The full set of sync options is
`[exists|size|mtime|checksum]`.

{{<command>}}
globus transfer -s exists -r $stardtn:/5MB-in-tiny-files/a/a $c1:/~/star-data
(out)Message: The transfer has been accepted and a task has been created and queued for execution
(out)Task ID: 759a3cac-7d41-11ec-bef3-a18800fa5978
{{</command>}}

This should only copy the data that do not already exist at the desination: We
end up with the same set of files at the destination:

{{<command>}}
globus ls $c1:/~/star-data
(out)a-a-1KB.dat
(out)a-a-2KB.dat
(out)a-a-5KB.dat
{{</command>}}

But we can see that only 2000 bytes were transferred (so we know it only
copied that one file, which is what we wanted):

{{<command>}}
globus task show 759a3cac-7d41-11ec-bef3-a18800fa5978
(out)Label:                        None
(out)Task ID:                      759a3cac-7d41-11ec-bef3-a18800fa5978
(out)Is Paused:                    False
(out)Type:                         TRANSFER
(out)Directories:                  1
(out)Files:                        3
(out)Status:                       SUCCEEDED
(out)Request Time:                 2022-01-24T18:14:24+00:00
(out)Faults:                       0
(out)Total Subtasks:               5
(out)Subtasks Succeeded:           5
(out)Subtasks Pending:             0
(out)Subtasks Retrying:            0
(out)Subtasks Failed:              0
(out)Subtasks Canceled:            0
(out)Subtasks Expired:             0
(out)Subtasks with Skipped Errors: 0
(out)Completion Time:              2022-01-24T18:14:58+00:00
(out)Source Endpoint:              ESnet Starlight DTN (Anonymous read only testing)
(out)Source Endpoint ID:           ece400da-0182-4777-91d6-27a1808f8371
(out)Destination Endpoint:         Globus Tutorial Collection 1
(out)Destination Endpoint ID:      6c54cade-bde5-45c1-bdea-f4bd71dba2cc
(out)Bytes Transferred:            2000
(out)Bytes Per Second:             60
{{</command>}}

This task could be repeated in a shell script, cron job or even using the
Globus timer functionality, for either a source or destination directory that
is expected to change.

  6. **Interact with a collection that requires authentication**

Most Globus Connect Server endpoints are configured to require some form of authentication & authorization process. 
In the case of the JASMIN Default Collection, you link your Globus identity to your JASMIN identity.
This may be different for other collections that you use elsewhere.

Let's find, then set up an alias to the JASMIN Default Collection Endpoint. We can search for that name:

{{<command>}}
globus endpoint search "jasmin default"
(out)ID                                   | Owner                                                        | Display Name
(out)------------------------------------ | ------------------------------------------------------------ | -------------------------
(out)a2f53b7f-1b4e-4dce-9b7c-349ae760fee0 | a77928d3-f601-40bb-b497-2a31092f8878@clients.auth.globus.org | JASMIN Default Collection
{{</command>}}

Set up an alias for this collection:

{{<command>}}
export jdc=a2f53b7f-1b4e-4dce-9b7c-349ae760fee0
{{</command>}}

If you've already interacted with this collection recently, you should find that you can list
it with the CLI already. If not, you will be prompted to authenticate. Follow through all the
steps until you complete the process, then return to the terminal session.

If successful, you can now interact with the JASMIN endpoint, for example
listing your home directory:

{{<command>}}
globus ls $jdc:/~/
(out)...
(out)(file listing of your JASMIN home directory)
(out)...
{{</command>}}

The authentication via your JASMIN account lasts for 30 days, so you can run and re-run transfers during that period without
needing to repeat the process (hence without any human interaction, if you have scheduled/automated transfers, see below).

If this needs to be renewed, then:

the simple way to do this is to either:

- (manually) visit the Globus web interface and access the JASMIN Default Collection again
- (manuall) use the CLI to list the collection again

In either case, if the authentication has timed out, you will be prompted to follow instructions to renew it,
then the action (listing the directory) should complete successfully.

There are ways to do use a "refresh token" programatically to renew the authentication. Watch this space for 
details of how to do that (or f)

### Automation

The functionality demonstrated above can be combined into scripts which can perform
useful, repeatable tasks such as:

- recursively syncing the contents of directories between 2 endpoints

Globus provide 2 implementations of this here:

[Examples of automation using the Globus CLI](https://github.com/globus/automation-examples), specifically:

- [cli-sync.sh](https://github.com/globus/automation-examples/blob/master/cli-sync.sh) : bash script using the Globus CLI as demonstrated above
- [globus_folder_sync.py](https://github.com/globus/automation-examples/blob/master/globus_folder_sync.py) : Python code using the Globus Python Software Development Kit (SDK)

We have not covered the Python SDK here, but this is a useful example of how you could integrate Globus transfer functionality into your own code and workflows. You would need to install and authorise this SDK first.

Taking the first of these examples, we can adapt it slightly:

1\. Select the JASMIN endpoint at the destination, and set the destination
path. Modify the corresponding variables in the script to these values:

{{<command>}}
DESTINATION_COLLECTION='a2f53b7f-1b4e-4dce-9b7c-349ae760fee0' ##JASMIN Default Collection ID
DESTINATION_PATH='/home/users/<username>/sync-demo/' ##replace <username> with your JASMIN username
{{</command>}}

{{<alert alert-type="info">}}
For **STFC users only** where the other collection in the transfer is within the STFC network, an additional collection is provided ["JASMIN STFC Internal Collection"](https://app.globus.org/file-manager/collections/591d44ac-adbb-43db-9931-977708d07450/overview) and has ID `9efc947f-5212-4b5f-8c9d-47b93ae676b7`.
{{</alert>}}

2\. If you haven't already, activate the Python virtual environment where you
have the CLI installed, and login:

{{<command>}}
source ~/.globus-cli-venv/bin/activate
globus login
{{</command>}}

3\. Check that you can interact with the JASMIN collection from the CLI, by trying to list it

Follow any instructions needed, if you need to renew your authentication.

4\. Run the script to sync the data from the Globus Tutorial Endpoint to the
destination directory.

You should see output similar to that shown below.

{{<command>}}
./cli-sync.sh
(out)Checking for a previous transfer
(out)Last transfer f5db7238-8f06-11ec-8fe0-dfc5b31adbac SUCCEEDED, continuing
(out)Verified that source is a directory
(out)Submitted sync from 6c54cade-bde5-45c1-bdea-f4bd71dba2cc:/share/godata/ to a2f53b7f-1b4e-4dce-9b7c-349ae760fee0:/~/sync-demo/
(out)Link:
(out)https://app.globus.org/activity/04e277f4-8f07-11ec-811e-493dd0cf73a1/overview
(out)Saving sync transfer ID to last-transfer-id.txt
{{</command>}}

5\. Check on the status of the task. You could do this by

- following the URL to https://app.globus.org to view the task under "activities", or

{{<command>}}
globus task show <taskid>
{{</command>}}

6\. You could then make some change to either source or destination directory,
and simply re-run the script

{{<command>}}
./cli-sync.sh
{{</command>}}

7\. Experiment by changing the `SYNCTYPE`. Other options are:

See [here for descriptions of the available sync levels](https://docs.globus.org/cli/reference/transfer/#sync_levels):
- `EXISTS`
- `SIZE`
- `MTYPE`
- `CHECKSUM`

8\. Automating repeats of the sync operation

You could then consider how to repeat the task automatically. For example:
- **triggering** a re-run of the `cli-sync.sh` command according to some condition that's met in your workflow.
- **scheduling** the running of the `cli-sync.sh` command on your own machine using cron on your own machine.
  - Remember: the invocation of the command does NOT need to be done on JASMIN, it can be done wherever you have the CLI installed, for example your local machine.
- use the web interface (go to "Transfer & Timer Options") to configure repeating tasks initiated there.
- Learn about how to [use timers with Globus](https://www.globus.org/blog/globus-now-supports-recurring-and-scheduled-transfers): these can be set up using the web interface or using an additional CLI [globus-timer-cli](https://pypi.org/project/globus-timer-cli/) which can be installed into the same `virtualenv` as the main globus cli.
- Learn about [Globus Flows](https://docs.globus.org/api/flows/) to create fully automated workflows. Globus have created a number of pre-canned workflow actions (e.g. "make directory", "transfer", "delete", ..) which you can chain together in your own workflow, or combine with your own to create custom workflows. A useful example might be:
  - watching a directory for arrival/creation of a certain file
  - triggering a compute/analysis step on files in the directory (using a [Globus Compute](https://www.globus.org/compute) endpoint of your own?)
  - transferring the output of that analysis to elsewhere, and cleaning up

## CLI Troubleshooting
### Missing data_access consent

If you get an error like the following:

```txt
The resource you are trying to access requires you to re-authenticate with specific identities.
message: Missing required data_access consent
Please use "globus session update" to re-authenticate with specific identities
```

you can explicitly request the `data_access` consent for the collection with which you are
trying to interact, with the following command, using the ID of the collection, i.e.

{{<command>}}
globus session consent 'urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/<COLLECTION_ID>/data_access]'
{{</command>}}

for example, for the JASMIN Default Collection:

{{<command>}}
globus session consent 'urn:globus:auth:scope:transfer.api.globus.org:all[*https://auth.globus.org/scopes/a2f53b7f-1b4e-4dce-9b7c-349ae760fee0/data_access]'
{{</command>}}

This should take you through the steps to add the required consent to your session.