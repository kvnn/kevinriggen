---
layout: post
title: Django, Nginx and Gunicorn on AWS
---
Sorry for the brevity, this is mostly for myself.

### Example project
- Name: Partake
- Type: Django 1.8 project
- Url: partake.clamor.la
- Root directory: /home/ubuntu/partake_web
- Virtualenv name: partake_web
- Django project name: partake_web

### /home/ubuntu/.bashrc
    # From http://agiliq.com/blog/2014/08/deploying-a-django-app-on-amazon-ec2-instance/
    export WORKON_HOME=/home/ubuntu/.virtualenvs
    . /usr/local/bin/virtualenvwrapper.sh

- this is included at the end of the .bashrc file

### /home/ubuntu/partake_web/start_gunicorn.sh
    #!/bin/bash
    APPNAME=partake_web
    APPDIR=/home/ubuntu/$APPNAME/

    LOGFILE=$APPDIR'gunicorn.log'
    ERRORFILE=$APPFIR'gunicorn-error.log'

    NUM_WORKERS=3
    USER=ubuntu
    GROUP=ubuntu
    ADDRESS=127.0.0.1:8000

    cd $APPDIR

    . /home/ubuntu/.bashrc
    . /usr/local/bin/virtualenvwrapper.sh
    . /home/ubuntu/.virtualenvs/partake_web/bin/activate
    #workon $APPNAME
    . .env

    exec gunicorn $APPNAME.wsgi:application \
    -w $NUM_WORKERS --bind=$ADDRESS \
    --user=$USER --group=$GROUP \
    --log-level=debug \
    --log-file=$LOGFILE 2>>$LOGFILE  1>>$ERRORFILE &

### /etc/init/partake_web_start.conf
    description "Start partake_web"
    start on runlevel [2345]
    stop on runlevel [06]
    respawn
    respawn limit 10 5
    exec /home/ubuntu/partake_web/start_gunicorn.sh


### /etc/nginx/sites-available/partake_web 
    server {
            listen 80;
        server_name partake.clamor.la;

            access_log off;

            location /static/ {
                alias /home/ubuntu/partake_web/partake_web/_static/;
            }

            location / {
                    proxy_pass http://127.0.0.1:8000;
                    proxy_set_header HOST $server_name;
                    proxy_set_header X-Forwarded-Host $server_name;
                    proxy_set_header X-Real-IP $remote_addr;
                    add_header P3P 'CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"';
            }
        }
- symlinked to /etc/nginx/sites-enabled/partake_web

### /home/ubuntu/partake_web/partake_web/settings/prod.py
    from .base import *

    DEBUG = False

    ALLOWED_HOSTS = ['partake.clamor.la']

    TEMPLATE_DEBUG = DEBUG

    LOGGING['loggers']['partake_web']['level'] = 'INFO'
    LOGGING['loggers']['syslog'] = {
        'level': 'INFO',
        'class': 'logging.handlers.SysLogHandler',
        'formatter': 'normal',
    }

### Other requirements
- running ` sudo ln -s /lib/init/upstart-job /etc/init.d/partake_web` ?