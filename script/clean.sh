if [ "$#" -ne 1]; then 
    echo "Usage: $0 {bdd|all}"
    exit 1
fi 

ARGUMENT=$1

case "$ARGUMENT" in
    bdd)
        echo "stop docker container and cleaning db volumes"
        docker-compose down
        echo "Removing db volumes..."
        docker volume prune -f
        ;;
    all)
        echo "Stopping all Docker containers and removing related volumes, networks, and selected directories..."
        docker-compose down -v --remove-orphans
        echo "Rmoving all docker networks"
        docker network prune -f
        echo "Removing selected directories..."
        docker volume prune -f
        ;;
    *)
        echo "Invalid argument: $ARGUMENT"
    echo "Usage: $0 {bdd|all}"
    exit 1
    ;;
esac

echo "Clean up completed successfully."