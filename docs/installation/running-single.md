---
sidebar_position: 2
---

# Running single node

The simplecontainer can as a single node or in cluster mode.

If it is not mandatory to have multiple nodes, high availability, and disaster recovery in place for the application,
single node can be configured to handle container orchestration.

## How to run single node?

To run single node of simplecontainer on the machine run the snippet below.

```bash
smrmgr start -a smr-node-1 -d smr.example.com
```

This starts the simplecontainer node on the 0.0.0.0:1443 which means that the control plane is listening on all interfaces,
and is accessible from the internet if machine has the public IP.


