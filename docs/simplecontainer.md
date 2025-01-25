---
slug: /
sidebar_position: 1
---

# Simplecontainer

:::warning
The project is not stable yet.
:::

See the simplecontainer in action.

<iframe src="https://www.youtube.com/embed/U9OJyiP2nII?si=xz_Ny6YSbzKvqiPP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The simplecontainer manager is designed to ease life for the developers and DevOps engineers running containers on Docker.

The simplecontainer introduces the following:

- Cluster of Docker daemons or single Docker daemon
- Overlay networking for containers using flannel (encrypted using wireguard by default)
- Integrated DNS server isolated from Docker daemon
- GitOps: deploy objects from the Git repositories using GitOps approach
- Replication of containers in cluster of Docker daemons
- Reconciliation and tracking the lifecycle of the Docker containers
- Reliable dependency ordering using readiness probes
- Recreate containers from the KV store in case of failure
- Templating of the container objects to leverage secrets and configuration
- Secrets, Configuration and Resources objects for external configuration
- CLI to interact with the simplecontainer
- Fast learning curve - simplicity and deterministic behavior

It runs as container on top of container engine. Currently, docker is only supported engine.
Simplecontainer requires privilleges for the `/var/run/docker.sock` to work properly.

Afterward API is exposed to orchestrate containers using mTLS for authentication and security.