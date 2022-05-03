from django.contrib import admin
from django.conf import settings
from django.urls import include, path, re_path
from django.shortcuts import render
from django.views.generic.base import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("rest_framework.urls")),
    path("api/v1.0/", include("api.urls")),
]

if settings.PYTHON_ENV == "production":
    urlpatterns.append(
        path(
            "robots.txt",
            TemplateView.as_view(template_name="robots.txt", content_type="text/plain"),
        )
    )
    urlpatterns.append(re_path(r"^.*/?$", lambda req: render(req, "index.html")))
