from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^$", views.index, name="index"),
    url(r"^translate/", views.translate, name="translate"),
    url(r"^translation_image/(?P<translation_id>[0-9]+)", views.translation_image),
]