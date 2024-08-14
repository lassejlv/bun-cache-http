# Bun Cache HTTP

This package adds a server layer over http for the [Bun Cache Package](https://github.com/ksamirdev/bun-cache) wich uses bun's sqlite api.

## Docker example

```bash
docker run -e PORT=5001 -e USERNAME=cache -e PASSWORD=cache-password -e PERSISTANCE=false -p 5001:5001 -d ghcr.io/lassejlv/bun-cache-http:latest
```
