---
slug: /
sidebar_position: 1
---

# Simplecontainer

:::warning
The project is in alpha version.
:::

# Simplecontainer

**Simplecontainer** is a lightweight orchestrator for Docker containers, capable of running on a single node or managing multiple nodes in a cluster. 
It sits on top of a container engine and handles related resources such as containers and networks. 
Using a declarative model, you define container configurations in YAML, and Simplecontainer continuously reconciles the actual state with the desired state.

In summary:

- Docker orchestrator
- Enables distributed Docker daemon orchestration
- GitOps workflow for Docker containers

# See the simplecontainer in action.

<iframe src="https://www.youtube.com/embed/RTu4sj-7qeA?si=cHBtiujoQlMttjJO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## Features

- Single-node or clustered orchestration – works with a single Docker daemon or scales across multiple daemons.
- Secure overlay networking – built on Flannel with WireGuard encryption enabled by default.
- Integrated DNS service – container-aware DNS, fully isolated from the Docker daemon.
- GitOps-driven deployments – manage and deploy containers using the GitOps workflow.
- Container replication – seamless replication across a cluster of Docker daemons.
- State reconciliation & lifecycle management – continuously ensures containers match the declared configuration.
- Reliable deployment sequencing – readiness probes guarantee containers wait for dependencies before starting.
- SSR (Secrets, Settings, Resources) objects – structured management of secrets, configuration, and resource definitions.
- Templating: Server side rendering of secrets and local rendering for usage of variables in pack definitions.
- First-class support for Secrets, Configurations, and Resources – externalize and manage application settings cleanly.
- Command-line interface (CLI) – direct interaction and management with SimpleContainer.
- Fast learning curve – simple, deterministic behavior designed for quick adoption.
- UI Dashboard – real-time visibility and control of containers and gitops objects

## Requirements

Simplecontainer requires privileges to access `/var/run/docker.sock` in order to function properly.  
Simplecontainers API is exposed using mTLS for maximum security and is forwarded to the UNIX socket to orchestrate containers 
on the specific node.

## Contexts
A context defines the connection and authentication parameters required to interact with a SimpleContainer node or cluster. 
Contexts make it easy to manage and switch between multiple environments.

Key capabilities:

- Context switching – seamlessly switch between different contexts by selecting the active context.
- Secure sharing – export a context in encrypted form for safe distribution.
- Encrypted imports – import encrypted contexts to quickly connect to new clusters.

## Resources
Checkout examples of containers definition on [https://github.com/simplecontainer/examples](https://github.com/simplecontainer/examples).

Resources are applied to the specific context using smrctl:
- Pack (Bundle of related resources - something like helm chart)
- definition.yaml (Plain YAML file definition describing any resource)
- https://domain.tld/definition.yaml (URL to the YAML file definition)


