# Use an official ubuntu image
FROM ubuntu:18.04

# Use an official node image
FROM node:12.16.2-stretch

ARG DEBIAN_FRONTEND=noninteractive

# Install the required packages
RUN apt-get update -o Acquire::CompressionTypes::Order::=gz
RUN apt-get upgrade -y

RUN echo "deb http://ftp.de.debian.org/debian sid main" > /etc/apt/sources.list

RUN apt-get update

RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y chromium
RUN apt-get install -y libcups2-dev 
RUN apt-get install -y libavahi-compat-libdnssd-dev 
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

RUN apt update
RUN apt-get install -y ghostscript
RUN apt-get install -y curl

# install chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
RUN rm google-chrome-stable_current_amd64.deb

# Set the working directory to /app
WORKDIR /app

# copy application & configuration files
COPY . .

# run node install command
RUN yarn install

# Make port 3000 available to the world outside this container
EXPOSE 3000

CMD [ "yarn", "run", "serve" ]