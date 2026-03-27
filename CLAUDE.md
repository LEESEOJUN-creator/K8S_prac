# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal Node.js HTTP server (`app.js`) used as a practice application for learning Kubernetes. The app listens on port 3000 and responds with a plain text message.

Docker image is published as `seojunny/my-app` on Docker Hub.

## Common Commands

### Docker
```bash
# Build image
docker build -t seojunny/my-app:latest .

# Push to Docker Hub
docker push seojunny/my-app:latest

# Run with docker-compose (dev container on port 8080)
docker-compose up
```

### Kubernetes
```bash
# Apply deployment + service
kubectl apply -f k8s/deployment.yaml

# Apply persistent volume resources
kubectl apply -f volume.yaml

# Check running pods
kubectl get pods

# Check services
kubectl get svc
```

## Architecture

```
app.js          — Node.js HTTP server (port 3000)
dockerfile      — Builds node:18 image, copies app.js, exposes 3000
docker-compose.yml — Dev container mapping host 8080 → container 8080

k8s/
  deployment.yaml — Deployment (2 replicas, image: seojunny/my-app:latest)
                    + ClusterIP Service (port 80 → 3000)

volume.yaml     — PersistentVolume (1Gi, hostPath: /data/my-app)
                  + PersistentVolumeClaim
                  + Deployment mounting the PVC at /app/data
```

The `k8s/deployment.yaml` and `volume.yaml` are independent — `volume.yaml` demonstrates PV/PVC usage with a separate deployment (`my-app-volume`).
