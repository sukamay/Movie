from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from django.views.static import serve
from django.conf import settings
from . import views
from django.conf.urls.static import static
# import haystack


urlpatterns = format_suffix_patterns([
    path('', views.FilmList.as_view(), name='index'),
    path('detail/<int:pk>', views.FilmDetail.as_view()),
    # path('search/', include('haystack.urls')),
    path('search/', views.Search.as_view(), name='search'),
    path('classify/', views.ClassifyList.as_view()),
    path('classify/content/', views.MorePoster.as_view()),
    path('classify/search/', views.ClassifySearchList.as_view()),
    # path('load/', views.load_jsons),
    path('hello/', views.FilmList.as_view(), name='hello'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
