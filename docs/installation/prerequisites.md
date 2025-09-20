---
sidebar_position: 1
---

# Prerequisites

## Architecture

Simplecontainer follows a server–client architecture.

The CLI communicates with the node control plane using mutual TLS (mTLS) to ensure secure and authenticated interactions.

## System Requirements

To run Simplecontainer node, the following tools and dependencies must be installed on the system:

- Docker – Install Docker Engine (https://docs.docker.com/engine/install/)
- WireGuard – Install WireGuard (https://www.wireguard.com/install/)
- jq and curl – utilities for JSON parsing and HTTP requests (apt install jq curl or equivalent)
- smrmgr – Install smrmgr (https://smrmgr.simplecontainer.io/)

:::warning
To use flannel wireguard network encryption wireguard package needs to be installed on the machine running simplecontainer.
See more at: https://www.wireguard.com/install/
:::

## Download smrmgr
The smrmgr is bash script used for simplified usage and easier management of the nodes. 

In the background it relies on the `smrctl` and `smr` CLI and exposes to the user simple functions for:

- Downloading and installing client
- Starting the node in single or cluster mode
- Starting the node and joining to the existing cluster
- Various node configurations, debugging and maintenance

To install smrmgr run the snippet below (it will install, under /usr/local/bin, both smr and smrctl).

:::warning
These commands must be run as non-root user otherwise the deployment will fail.
:::

```bash
curl -sL https://smrmgr.simplecontainer.io -o smrmgr
chmod +x smrmgr
sudo mv smrmgr /usr/local/bin
sudo smrmgr install

smr version
v0.1.96

smrctl version
v0.0.126
```