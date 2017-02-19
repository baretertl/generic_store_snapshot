FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /app_code
WORKDIR /app_code

ADD ./requirements.txt /app_code/
RUN pip install -r requirements.txt

ADD ./app_code /app_code/
WORKDIR /app_code/generic_store

RUN useradd -ms /bin/bash web_user
USER web_user