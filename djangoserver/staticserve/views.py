"""
serve static files, but set header so that browser won't save in cache
"""
import os

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.cache import cache_page, never_cache

# Create your views here.
@never_cache
def static_generated_list(request):
    files = os.listdir('static')
    return HttpResponse(
        '<ol><li>'+'</li><li>'.join(files)+'</li></ol>'+
        '<script>document.querySelectorAll("li").forEach(function(el){ '+
            'el.style.cursor = "pointer";'+
            'el.addEventListener("click",function(ev){document.location.pathname="/"+ev.target.innerText}); '+
        '})</script>',
    )

@never_cache
def static_generated(request, filename):
    # try:
    with open(os.path.join('static',filename)) as f:
        isi = f.read()
        tipe = 'application/javascript'
        if (filename.endswith('css')):
            tipe = 'text/css'
        return HttpResponse(isi, content_type=tipe)
    # except:
    #     return static_generated_list(request)
