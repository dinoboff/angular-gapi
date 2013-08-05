PYTHON=/opt/local/bin/python2.7
APPSERVER=/usr/local/google_appengine/dev_appserver.py
APPCFG=/usr/local/google_appengine/appcfg.py
PORT=8080

.PHONY: serve upload

serve:
	${PYTHON} ${APPSERVER} --port=${PORT} ./

upload: build
	${PYTHON} ${APPCFG} --oauth2 update ./
	${PYTHON} ${APPCFG} --oauth2 update_indexes ./
	${PYTHON} ${APPCFG} --oauth2 update_queues ./
	${PYTHON} ${APPCFG} --oauth2 update_cron ./
