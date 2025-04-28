---
sidebar_position: 1
---

# Prerequisites

Simplecontainer is based on the server-client architecture. CLI interact with the node via mTLS.

Requirements on the machine:
- docker (https://docs.docker.com/engine/install/)
- wireguard (https://www.wireguard.com/install/)
- jq and curl (install jq and curl)

:::warning
To use flannel wireguard network encryption wireguard package needs to be installed on the machine running simplecontainer.
See more at: https://www.wireguard.com/install/
:::

There are two options to start and configure simplecontainer node:
- smrmgr
- smr

## Installing smrmgr
The smrmgr is bash script created for simplified usage and easier management of the nodes. 

In the background it uses `smr` CLI and exposes to the user simple functions for:

- Downloading and installing client
- Starting the node in single or cluster mode
- Starting the node and joining to the existing cluster
- Various options and configuration simplified

To install smrmgr run the snippet below.

```bash
curl -sL https://raw.githubusercontent.com/simplecontainer/smr/refs/heads/main/scripts/production/smrmgr.sh -o smrmgr
chmod +x smrmgr
sudo mv smrmgr /usr/local/bin
sudo smrmgr install

smr version
Client version: v0.0.72
```