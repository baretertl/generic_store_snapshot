FROM redis:latest

RUN mkdir /etc/redis
ADD ./redis.conf /etc/redis/

WORKDIR /data

RUN useradd -ms /bin/bash redis_user
USER redis_user