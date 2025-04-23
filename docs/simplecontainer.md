---
slug: /
sidebar_position: 1
---

# Simplecontainer

:::warning
The project is in alpha version.
:::

See the simplecontainer in action.

<iframe src="https://www.youtube.com/embed/RTu4sj-7qeA?si=cHBtiujoQlMttjJO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# SimpleContainer

**SimpleContainer** is a tool for orchestrating Docker (currently) containers on a single node or across multiple nodes in a cluster.It runs on top of a container engine and manages all associated resources such as containers and networks. SimpleContainer uses a declarative approach—define containers using YAML files, and it will reconcile the actual state to match the defined state.

## Features

- Support for a single Docker daemon or a cluster of Docker daemons
- Overlay networking for containers using Flannel (encrypted with WireGuard by default)
- An integrated DNS server, isolated from the Docker daemon
- GitOps: deploy containers using the GitOps pattern
- Container replication across a cluster of Docker daemons
- Reconciliation and lifecycle tracking of Docker containers
- Reliable deployment ordering using readiness probes (containers can truly wait for others to become ready)
- SSR of container objects to manage secrets, configuration, and resources
- Support for Secrets, Configuration, and Resource objects for external configuration
- A CLI for interacting with SimpleContainer
- A fast learning curve with simplicity and deterministic behavior
- A UI dashboard providing a near real-time overview and control ([app.simplecontianer.io](https://app.simplecontainer.io)
  )

## Requirements

SimpleContainer requires privileges to access `/var/run/docker.sock` in order to function properly.  
Its API is exposed using mTLS for maximum security and is forwarded to the UNIX socket.


## Resources
Checkout examples on [https://github.com/simplecontainer/examples](https://github.com/simplecontainer/examples).

You can deploy resources using smr CLI:
- Pack (Something like helm chart - bundle of related resources only thing is that they are SSR)
- definition.yaml
- https://path_to_your_file.tld


