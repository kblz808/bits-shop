FROM bun:latest

# Set the working directory to /app
WORKDIR /app

COPY package.json .

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev"]
