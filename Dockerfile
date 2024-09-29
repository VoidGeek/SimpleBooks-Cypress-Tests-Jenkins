FROM jenkins/jenkins:lts

# Set user to root to install necessary packages
USER root

# Install any required dependencies
RUN apt-get update && apt-get install -y \
    openjdk-11-jdk \
    && rm -rf /var/lib/apt/lists/*

# Expose the required port
EXPOSE 8080

# Start Jenkins
CMD ["jenkins"]
