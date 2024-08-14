FROM oven/bun:latest

WORKDIR /app

# Install Git
RUN apt-get update && apt-get install -y git

# Clone the repository
RUN git clone https://github.com/lassejlv/bun-cache-http /app

# Install dependencies
RUN bun install --no-save

# Build the project
RUN bun build --compile --minify src/index.ts --outfile ./server

# Run the server
CMD ["./server"]