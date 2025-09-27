---
sidebar_position: 2
---

# Running single node

The simplecontainer can run as a single node or in cluster mode.

If it is not mandatory to have multiple nodes, high availability, and disaster recovery in place for the application,
single node also can be configured to handle container orchestration.

:::warning
First check prerequisites!
:::

## How to run single node?

To run single node of simplecontainer on the machine run the snippet below.

:::warning
The command smrmgr start must be run as non-root user otherwise the deployment will fail.
:::

```bash text title="Starting simplecontainer node with control plane exposed on the smr.example.com"
smrmgr start -d node.simplecontainer.io
```

This starts the simplecontainer node and control plane listens on the `0.0.0.0:1443` which means all interfaces,
and is accessible over the internet if machine has the public IP. Control plane uses mTLS which implies that all
control plane is encrypted and secured.

Ports exposed when started using command above:

- `0.0.0.0:1443->1443/tcp` (Simplecontainer control plane)
- `0.0.0.0:9212->9212/tcp` (RAFT protocol control plane sharing state)
- `:::1443->1443/tcp` (Simplecontainer control plane ipv6)
- `127.0.0.1:2379->2379/tcp` (Etcd exposed only on the localhost)

Option `-n` is not mandatory but is used for specifying name of the node.

Options `-d` specifies that node generates certificates for mTLS which are only valid for the `smr.example.com`.

To connect to the nodes, simplecontainer relies on the contexts - which are exportable in secure manner using encryption.

### Contexts
A context defines the connection and authentication parameters required to interact with a Simplecontainer node or cluster.
Contexts make it easy to manage and switch between multiple environments.

Key capabilities:

- Context switching – seamlessly switch between different contexts by selecting the active context.
- Secure sharing – export a context in encrypted form for safe distribution.
- Encrypted imports – import encrypted contexts to quickly connect to new clusters.

```cgo title="Context needs to be imported from smr agent first (on the same machine), then can be exported to other machines"
smrctl context export --api node-1.simplecontainer.io:1443
```

This will export context. Both encrypted context and key will be printed on the stdout.

:::warning
Specify correct hostname/IP/domain and port.
:::

On the another machine, context can be imported easily using `smrctl`.

```cgo title="Copy paste smrmgr export output and $HOME/smr/smr/contexts/$(smr context).key as key for decryption"
smrctl context import PASTE_OUTPUT PASTE_KEY
```

If the key is not specified it will listen on `stdin` for decryption key.

Now control plane should be accessible.

```cgo title="The smrctl ps command is used to list all containers in the cluster"
smrctl ps
NODE         RESOURCE                             PORTS IMAGE STATE ENGINE STATE     SMR STATE       
─────────────────────────────────────────────────────────────────────────────────────────────────────
```