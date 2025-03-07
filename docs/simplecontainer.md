---
slug: /
sidebar_position: 1
---

# Simplecontainer

:::warning
The project is not stable yet.
:::

See the simplecontainer in action.

<iframe src="https://www.youtube.com/embed/RTu4sj-7qeA?si=cHBtiujoQlMttjJO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
The simplecontainer manager is designed to ease life for the developers and DevOps engineers running containers on Docker.

The simplecontainer introduces the following:

- Single docker daemon or cluster of docker daemons
- Overlay networking for containers using flannel (encrypted using wireguard by default)
- Integrated DNS server isolated from Docker daemon
- GitOps: deploy containers on Docker using GitOps pattern
- Replication of containers in cluster of Docker daemons
- Reconciliation and tracking the lifecycle of the Docker containers
- Reliable dependency ordering using readiness probes
- Server side templating of the container objects to leverage secrets, configuration, and resources
- Secrets, Configuration and Resources objects for external configuration
- CLI to interact with the simplecontainer
- Fast learning curve - simplicity and deterministic behavior
- UI dashboard for better overview with real-time updates 

It runs as container on top of container engine. Currently, docker is only supported engine.
Simplecontainer requires privilleges for the `/var/run/docker.sock` to work properly.

Afterward API is exposed to orchestrate containers using mTLS for authentication and security.