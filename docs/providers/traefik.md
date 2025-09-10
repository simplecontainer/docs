---
sidebar_position: 6
---

# Traefik Provider

The Traefik provider integration allows you to expose Docker containers via ingress seamlessly, whether running on a single node or in a distributed cluster.

## Overview

Traefik is designed to be flexible and can retrieve service discovery and routing configurations from multiple providers. A provider serves as a source of truth, which Traefik continuously monitors to build and update its dynamic configuration.

### Available Providers

* **Kubernetes** – Fetch services, ingresses, and CRDs from a Kubernetes cluster.
* **Docker** – Automatically discovers containers, labels, and networking information from a Docker engine or Swarm.
* **HTTP** – Fetch configuration from any HTTP endpoint in real-time.
* **etcd** – Use a distributed key-value store to maintain highly available and consistent configuration.

## HTTP Provider

The HTTP provider allows Traefik to receive dynamic configuration in JSON or YAML format. Changes can be pushed without restarting Traefik.

Through the HTTP provider, you can define:

* **Routers** – Rules to match and direct incoming requests.
* **Services** – Backend services (containers, pods, or external endpoints) that handle traffic.
* **TLS** – Certificates and options for secure HTTPS communication.

This approach is useful for advanced routing scenarios or when integrating Traefik with an external system that generates dynamic configuration.

## Simplecontainer HTTP Provider

Simplecontainer provides an HTTP Traefik provider running as a standalone container. This provider communicates with the local Simplecontainer node and generates configuration compatible with Traefik.

Example Simplecontainer provider deployment:

```yaml
prefix: simplecontainer.io/v1
kind: containers
meta:
  name: traefik-provider
  group: traefik
  labels:
    test: "testing"
spec:
  image: "quay.io/simplecontainer/traefik-provider"
  tag: "latest"
  replicas: 1
  ports:
    - container: "80"
```

### Configuring Traefik to Use the HTTP Provider

Static configuration example:

```yaml
providers:
  http:
    endpoint: "http://bridge.traefik.traefik-provider.private"
    pollInterval: "1s"

entryPoints:
  web:
    address: ":80"
```

### Dynamic Configuration Example

To deploy a dynamic configuration using a custom resource:

```yaml
prefix: traefik.io/v1
kind: custom
meta:
  name: dynamic
  group: traefik
spec:
  traefik:
    enable: "true"
    http:
      routers:
        my-router:
          rule: "Host(`example.local`)"
          entrypoints:
            - "web"
          service: "my-service"
      services:
        my-service:
          loadBalancer:
            servers:
              - url: http://bridge.nginx.nginx.private
```

With this setup, you can easily attach a Traefik router to any Docker container and expose it through a fully qualified domain name (FQDN), such as `example.local`.

## Best Practices

* Separate configuration files for readability; the Traefik provider will merge them automatically.
* Supports both single-node deployments and multi-node distributed environments.
* Enables scaling of Traefik instances for high availability and seamless traffic routing across nodes.

Full examples are available in the [Simplecontainer examples repository](https://github.com/simplecontainer/examples).
