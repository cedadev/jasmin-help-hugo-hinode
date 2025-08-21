---
title: "GWS Scanner UI"
description: "User interface to GWS scanner"
---

The [Group Workspace (GWS) Scanner](https://gws-scanner.jasmin.ac.uk/) UI is an interactive web application for JASMIN users to view their GWSs.

**_Please note this service is under beta-testing and should be used with care (July 2023)_**

## What is the GWS Scanner UI?

A GWS is collaborative storage made available to a group for a project. The GWS Scanner UI provides information about the structure of GWSs in the form of a tree graph showing the folders within the GWS. The tiles of the graph can be scaled or coloured by size, count or heat. 
- **Size** refers to the size (in TB or GB) of the folder
- **count** refers to the number of files and folders within the directory
- **heat** refers to the average time since last access (hot = recent).

The tree graph only shows tiles for the folders within the GWS, the files are lumped together as **unindexed children**, but the files are considered in the calculation of the GWS statistics - e.g. the number of **children** is the number of folders and files within the GWS. There are also doughnut graphs with additional breakdowns in terms of users, filetypes and heats which can be scaled by either size or count.

## Using the GWS Scanner UI

Navigate to the [GWS Scanner homepage](https://gws-scanner.jasmin.ac.uk/) where you should see a **Log In** button.

{{<image src="img/docs/gws-scanner-ui/gws-scanner-homepage.png" caption="">}}

Clicking the login button will take you to the login page where you can sign in using your JASMIN account. Upon successful sign-in you should be redirected back to the homepage where you will have the option to view [your GWSs](https://gws-scanner.jasmin.ac.uk/my_gws).

{{< alert alert-type="info" >}}
 At any time, you can click the JASMIN logo in the navbar to return to the homepage.
{{< /alert >}}

Here you will see a table with the names of your GWSs and their path. Clicking on the path will take you to the tree page for the GWS.

{{<image src="img/docs/gws-scanner-ui/gws-scanner-my-gws.png" caption="">}}

Alternatively, if you know the path to your GWS you can search for it in the url, e.g. `https://gws-scanner.jasmin.ac.uk/tree/<path-here>`. On this page you will see the path to your GWS at the top, then the tree graph with the coloured tiles representing folders within the GWS. *Note that some larger GWSs may take longer to load*. 

{{<image src="img/docs/gws-scanner-ui/gws-scanner-tree-page.png" caption="">}}

There is a **Toggle Patterns** button which can be used to swap the coloured tiles for patterned tiles. Hovering over a tile will reveal more information about that folder. There are buttons on the right hand side to scale and colour the tiles by size, count or heat as described earlier. There is also a key showing the values the colour of the tiles correspond to in this sidebar as well as information showing when the GWS was last scanned. Scans usually take around two weeks to complete so each GWS should be scanned approximately fortnightly. There is a **Go Up One Level** button which will take you back a level, but note that this will only work if you have gone deeper into the file path as it will not show the structure above the root GWS folder. You can click on a tile on the graph to view the tree graph inside that folder. For example, you may have a folder called *user1* in *group-workspace-1*, you could click on this tile to see the structure of the *user1* directory then you could use the **Go Up One Level** button to go back to *group-workspace-1*. Alternatively, you can just use the back button in your browser to go back. You can keep clicking files to go deeper into the GWS structure until you reach an **unindexed children** level where there are no more folders, only files. This is represented by a tile saying **__unindexed children__** which refers to a collection of files (every level will have an unindexed children tile representing the files within that folder).

{{<image src="img/docs/gws-scanner-ui/gws-scanner-unindexed-children.png" caption="">}}

Scrolling down the page, you will find the doughnut graphs. There is one for the **User Breakdown**, **Filetype Breakdown** and **Heat Breakdown**. Each of these have coloured sections corresponding to different users, filetypes or heats and the size of them is proportional to the size or count (there are **Size** and **Count** buttons to change between them). Again, hovering over a section of the graph will give you more information.

{{<image src="img/docs/gws-scanner-ui/gws-scanner-doughnut-graphs.png" caption="">}}

## Common issues and questions

  * If you get stuck on a loading screen try refreshing the page - we are working on fixing this issue. 
  * If you go to the [My GWSs](https://gws-scanner.jasmin.ac.uk/my_gws) page and don't have any GWSs listed, check that your JASMIN account does have access to the GWS you are looking for.
  * Sometimes, if there are lots of tiles they can be hard to read - you can hover over the tile to get the full title or if you want to view the tree graph for that folder, you search for it by URL instead. 
  * If you are ever stuck and requiring help, the help beacon can be accessed from any page.

{{<image src="img/docs/gws-scanner-ui/gws-scanner-beacon.png" wrapper="col-2 mx-auto" caption="">}}

## Further information

Here are some links to learn more about the GWS Scanner:

  * [The GWS Scanner UI](https://gws-scanner.jasmin.ac.uk/)

If you have any questions or suggestions, feel free to [get in touch](mailto:nicola.farmer@stfc.ac.uk).