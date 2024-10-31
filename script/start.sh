# verif si mon docker-compose est installer 
if ! [ -x "$(command -v docker-compose)" ]; then
    echo "Error: docker-compose is not installed." >&2
    exit 1
fi

# Start the docker stack 
COMPOSE_FILE=docker-compose.yml

if [ -f "${COMPOSE_FILE}" ]; then
    echo "Starting docker stack used docker-compose..."
    docker-compose up -d
    echo "Docker stack started successfully!"
else
    echo "Error: $COMPOSE_FILE not found." >&2
    exit 1
fi

