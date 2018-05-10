from django.shortcuts import render
from establishment.webapp.state import State
from establishment.webapp.base_views import single_page_app, global_renderer
from establishment.funnel.redis_stream import RedisStreamPublisher
from establishment.webapp.base_views import login_required_ajax
from .errors import StorageError
from django.http import HttpResponse
from .models import TextTranslation
import os
import subprocess
import mimetypes
from .translate import getTranslatedLines


def render_single_page_app(request):
    return render(request, "translifyapp/app.html", {})


global_renderer.render_single_page_app = render_single_page_app


@single_page_app
def index(request):
    state = State()
    state.add_all(TextTranslation.objects.all())
    return State()


def publish(event):
    stream_name = "global-events"
    RedisStreamPublisher.publish_to_stream(stream_name, event, persistence=True)


def create_translation(image):
    noext, ext = os.path.splitext(image.name)

    translation = TextTranslation()
    translation.ext = ext
    translation.save()

    subprocess.call("mkdir -p uploads", shell=True)

    filename = os.path.join("uploads/", str(translation.id) + translation.ext)
    image_file = open(filename, "wb")

    for chunk in image.chunks():
        image_file.write(chunk)

    translation.translation = getTranslatedLines(filename)

    translation.save()

    publish(translation.make_create_event())

    return translation


@login_required_ajax
def translate(request):
    if not request.FILES or len(request.FILES) == 0:
        return StorageError.NO_FILES

    files = list(request.FILES.items())

    state = State()
    for name, image in files:
        public_storage_file = create_translation(image)
        public_storage_file.add_to_state(state)
    return state.to_response(extra={"success": True})


def translation_image(request, translation_id):
    translation = TextTranslation.objects.get(id=translation_id)
    filename = str(translation.id) + translation.ext
    file_full_path = "uploads/" + filename

    with open(file_full_path, 'rb') as f:
        data = f.read()

    response = HttpResponse(data, content_type=mimetypes.guess_type(file_full_path)[0])
    response['Content-Disposition'] = "attachment; filename={0}".format(filename)
    response['Content-Length'] = os.path.getsize(file_full_path)
    return response
