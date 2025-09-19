---
aliases: /article/4955-community-software-esmvaltool
description: 'Community Software: ESMValTool'
slug: community-software-esmvaltool
tags:
- community
- software
- earth
- system
- model validation
- cmip5
- cmip6
- cordex
- obs4mips
title: 'Community Software: ESMValTool'
---

ESMValTool is installed on JASMIN as a _community package_. This article
provides:

- a brief overview of the ESMValTool software
- a description of the main features of the tool
- a quick-start for using ESMValTool on JASMIN
- links to further information

## Overview of ESMValTool

The Earth System Model Evaluation Tool (ESMValTool) is a community diagnostics
and performance metrics tool for the evaluation of Earth System Models (ESMs)
that allows for routine comparison of single or multiple models, either
against predecessor versions or against observations. The priority of the
effort so far has been to target specific scientific themes focusing on
selected Essential Climate Variables, a range of known systematic biases
common to ESMs, such as coupled tropical climate variability, monsoons,
Southern Ocean processes, continental dry biases and soil hydrology-climate
interactions, as well as atmospheric CO2 budgets, tropospheric and
stratospheric ozone, and tropospheric aerosols.

The tool is being developed in such a way that additional analyses can easily
be added. A set of standard recipes for each scientific topic reproduces
specific sets of diagnostics or performance metrics that have demonstrated
their importance in ESM evaluation in the peer-reviewed literature. The
ESMValTool is a community effort open to both users and developers encouraging
open exchange of diagnostic source code and evaluation results from the CMIP
ensemble. This will facilitate and improve ESM evaluation beyond the state-of-
the-art and aims at supporting such activities within the Coupled Model
Intercomparison Project (CMIP) and at individual modelling centres.
Ultimately, we envisage running the ESMValTool alongside the Earth System Grid
Federation (ESGF) as part of a more routine evaluation of CMIP model
simulations while utilizing observations available in standard formats
(obs4MIPs) or provided by the user.

### Installation as a "community package" on JASMIN

ESMValTool is installed on JASMIN as a _community package_. This means it is
provided, and maintained, by developers outside the CEDA/JASMIN Team. If you
have queries about using ESMValTool _on JASMIN_ then please contact the JASMIN
Helpdesk and we will forward them to the team that supports this package on
JASMIN.

## Main Features

ESMValTool has the following features:

- Facilitates the complex evaluation of ESMs and their simulations submitted to international Model Intercomparison Projects (e.g., CMIP).
- Standardized model evaluation can be performed against observations, against other models or to compare different versions of the same model.
- Wide scope: includes many diagnostics and performance metrics covering different aspects of the Earth System (dynamics, radiation, clouds, carbon cycle, chemistry, aerosol, sea-ice, etc.) and their interactions.
- Well-established analysis: standard namelists reproduce specific sets of diagnostics or performance metrics that have demonstrated their importance in ESM evaluation in the peer-reviewed literature.
- road documentation: a user guide (Eyring et al., 2015); SPHINX; a log-file is written containing all the information of a specific call of the main script: creation date of running the script, version number, analyzed data (models and observations), applied diagnostics and variables, and corresponding references. This helps to increase the traceability and reproducibility of the results.
- High flexibility: new diagnostics and more observational data can be easily added.
- Multi-language support: Python, NCL, R... other open-source languages are possible.
- CF/CMOR compliant: data from many different projects can be handled (CMIP, obs4mips, ana4mips, CCMI, CCMVal, AEROCOM, etc.). Routines are provided to CMOR-ize non-compliant data.
- Integration in modelling workflows: for EMAC, NOAA-GFDL and NEMO, can be easily extended.

## Quick User Guide on JASMIN

The latest version of ESMValTool is available for users on JASMIN and can be
accessed via a standard module:

{{<command user="user" host="sci1">}}
module load esmvaltool
{{</command>}}

To run a yaml-formatted recipe:

{{<command user="user" host="sci1">}}
esmvaltool run recipe.yml
{{</command>}}

For a complete guide on how to configure the tool, set up and run available
diagnostic recipes please consult the documentation at:
<https://docs.esmvaltool.org/en/latest/>

## Further information

- Documentation: <https://docs.esmvaltool.org/en/latest/>
- Website: <https://www.esmvaltool.org/index.html>
- GitHub: <https://github.com/ESMValGroup/ESMValTool>

[](https://github.com/ESMValGroup/ESMValTool)
