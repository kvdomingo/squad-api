wsgi_app = "squad_api.wsgi"

worker_class = "gthread"
workers = 1
threads = 2

errorlog = "-"
accesslog = "-"
access_log_format = "%(t)s %(r)s %(s)s %(M)sms"
capture_output = True
loglevel = "debug"
