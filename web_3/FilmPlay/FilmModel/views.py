# -*- coding: utf-8 -*-
from django.shortcuts import render
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import genre_list, type_list, area_list, time_list
from .models import Film, Cast, Director, Writer, Rating
import json
import math
import os
from rest_framework import serializers
from rest_framework.parsers import JSONParser
from FilmModel.serializers import FilmSerializer, RankItemSerializer, FilmDetailSerializer, FilmPosterSerializer
from django.http import HttpResponse
from django.db.models import Q


# Create your views here.
class FilmList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'index.html'

    def get(self, request):
        rank = request.GET.get('rank', None)
        offset = request.GET.get('offset', 0)
        limit = request.GET.get('limit', 10)
        reverse = request.GET.get('reverse', False)
        try:
            if not isinstance(offset, int):
                offset = int(offset)
        except ValueError:
            offset = 0
        try:
            if not isinstance(limit, int):
                limit = int(limit)
        except ValueError:
            limit = 10
        if rank:
            rank = True
            if reverse:
                films_set = Film.objects.all().order_by("average")[offset: limit + offset]
            else:
                films_set = Film.objects.all().order_by("-average")[offset: limit + offset]
        else:
            rank = False
            if reverse:
                films_set = Film.objects.all().order_by("id")[offset: limit + offset]
            else:
                films_set = Film.objects.all().order_by("-id")[offset: limit + offset]
        rank_set = Film.objects.all().order_by("-average").values('id', 'title_zh')[0:10]
        films = FilmSerializer(films_set, many=True)
        rank_list = RankItemSerializer(rank_set, many=True)
        page_list = []
        page_start = int(offset / (limit * 4)) * 4 + 1
        for i in range(0, 5):
            page_list.append(page_start + i)
        for film in films.data:
            film['genres'] = film['genres'].split('/')
            film['casts'] = film['casts'].split('/')
        return Response({'films': films.data, 'rank': rank, 'genre_list': genre_list, 'rank_list': rank_list.data,
                         'page_list': page_list, 'page_num': math.ceil(Film.objects.all().count() - limit)})


class FilmDetail(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'detail.html'

    def get(self, request, pk):
        try:
            film_set = Film.objects.get(id=pk)
            films = FilmDetailSerializer(film_set)
            film = films.data
            film['genres'] = film['genres'].split('/')
            film['stars'] = film['stars'].split('/')
            film['imdb'] = ''.join(film['imdb'].split('/'))
            film['casts'] = ' / '.join(film['casts'].split('/'))
            film['directors'] = ' / '.join(film['directors'].split('/'))
            film['writers'] = ' / '.join(film['writers'].split('/'))
            film['countries'] = ' / '.join(film['countries'].split('/'))
            film['languages'] = ' / '.join(film['languages'].split('/'))
        except Film.DoesNotExist:
            return HttpResponse(status=404)
        return Response(film)


class Search(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = './search/search.html'

    def get(self, request):
        keyword = request.GET.get('search_text', None)
        error_msg = ''
        if not keyword:
            error_msg = '请输入关键词'
            return Response({'error_msg': error_msg})
        offset = request.GET.get('offset', 0)
        limit = request.GET.get('limit', 10)
        try:
            if not isinstance(offset, int):
                offset = int(offset)
        except ValueError:
            offset = 0
        try:
            if not isinstance(limit, int):
                limit = int(limit)
        except ValueError:
            limit = 10
        films_set = Film.objects.filter(Q(title_zh__icontains=keyword) | Q(genres__icontains=keyword)
                                        | Q(pubdate__icontains=keyword) | Q(casts__icontains=keyword))
        page_num = films_set.count() - limit
        films_set = films_set[offset: limit + offset]
        films = FilmSerializer(films_set, many=True)
        rank_set = Film.objects.all().order_by("-average").values('id', 'title_zh')[0:10]
        films = FilmSerializer(films_set, many=True)
        rank_list = RankItemSerializer(rank_set, many=True)
        page_list = []
        page_start = int(offset / (limit * 4)) * 4 + 1
        for i in range(0, 5):
            page_list.append(page_start + i)
        for film in films.data:
            film['genres'] = film['genres'].split('/')
            film['casts'] = film['casts'].split('/')
        return Response({'films': films.data, 'rank': False, 'genre_list': genre_list, 'rank_list': rank_list.data,
                         'page_list': page_list, 'error_msg': error_msg,
                         'page_num': page_num})


class ClassifySearchList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'classify.html'

    def get(self, request):
        keyword = request.GET.get('search_text', None)
        error_msg = ''
        if not keyword:
            error_msg = '请输入关键词'
            return Response({'error_msg': error_msg})
        films_set = Film.objects.all()
        genre = request.GET.get('genre', None)
        type = request.GET.get('type', None)
        country = request.GET.get('country', None)
        date = request.GET.get('date', None)
        if genre:
            films_set = films_set.filter(genres__icontains=genre)
        if type:
            films_set = films_set.filter(genres__icontains=type)
        if country:
            films_set = films_set.filter(countries__icontains=country)
        if not date:
            pass
        elif date == '2019' or date == '2018':
            films_set = films_set.filter(year=date)
        elif date.startswith('2010'):
            films_set = films_set.filter(year__regex="^201[0-9]")
        elif date.startswith('2000'):
            films_set = films_set.filter(year__regex="^200[0-9]")
        else:
            date = date.rstrip('年代')
            films_set = films_set.filter(year__regex="^19" + date[0] + "[0-9]")
        films_set = films_set.filter(title_zh__icontains=keyword)
        page_num = films_set.count()
        films_set = films_set[0: 20]
        films = FilmPosterSerializer(films_set, many=True)
        for index in range(len(films.data)):
            if index % 5 == 0:
                films.data[index]['row_flag'] = 'start'
            elif index % 5 == 4:
                films.data[index]['row_flag'] = 'end'
            else:
                films.data[index]['row_flag'] = 'none'
        return Response({'posters': films.data, 'genre_list': genre_list, 'area_list': area_list,
                         'time_list': time_list, 'type_list': type_list, 'error_msg': error_msg,
                         'page_num': page_num})


class ClassifyList(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'classify.html'

    def get(self, request):
        films_set = Film.objects.all()
        genre = request.GET.get('genre', None)
        type = request.GET.get('type', None)
        country = request.GET.get('country', None)
        date = request.GET.get('date', None)
        if genre:
            films_set = films_set.filter(genres__icontains=genre)
        if type:
            films_set = films_set.filter(genres__icontains=type)
        if country:
            films_set = films_set.filter(countries__icontains=country)
        if not date:
            pass
        elif date == '2019' or date == '2018':
            films_set = films_set.filter(year=date)
        elif date.startswith('2010'):
            films_set = films_set.filter(year__regex="^201[0-9]")
        elif date.startswith('2000'):
            films_set = films_set.filter(year__regex="^200[0-9]")
        else:
            date = date.rstrip('年代')
            films_set = films_set.filter(year__regex="^19" + date[0] + "[0-9]")
        page_num = films_set.count()
        films_set = films_set[0: 20]
        films = FilmPosterSerializer(films_set, many=True)
        for index in range(len(films.data)):
            if index % 5 == 0:
                films.data[index]['row_flag'] = 'start'
            elif index % 5 == 4:
                films.data[index]['row_flag'] = 'end'
            else:
                films.data[index]['row_flag'] = 'none'
        return Response({'posters': films.data, 'genre_list': genre_list, 'area_list': area_list,
                         'time_list': time_list, 'type_list': type_list, 'page_num': page_num})


class MorePoster(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'poster.html'

    def get(self, request):
        offset = request.GET.get('offset', 0)
        try:
            if not isinstance(offset, int):
                offset = int(offset)
        except ValueError:
            offset = 0
        limit = request.GET.get('limit', 15)
        try:
            if not isinstance(limit, int):
                offset = int(limit)
        except ValueError:
            limit = 15
        films_set = Film.objects.all()
        genre = request.GET.get('genre', None)
        type = request.GET.get('type', None)
        country = request.GET.get('country', None)
        date = request.GET.get('date', None)
        if genre:
            films_set = films_set.filter(genres__icontains=genre)
        if type:
            films_set = films_set.filter(genres__icontains=type)
        if country:
            films_set = films_set.filter(countries__icontains=country)
        if not date:
            pass
        elif date == '2019' or date == '2018':
            films_set = films_set.filter(year=date)
        elif date.startswith('2010'):
            films_set = films_set.filter(year__regex="^201[0-9]")
        elif date.startswith('2000'):
            films_set = films_set.filter(year__regex="^200[0-9]")
        else:
            date = date.rstrip('年代')
            films_set = films_set.filter(year__regex="^19" + date[0] + "[0-9]")
        page_num = films_set.count()
        films_set = films_set[offset: limit + offset]
        films = FilmPosterSerializer(films_set, many=True)
        for index in range(len(films.data)):
            if index % 5 == 0:
                films.data[index]['row_flag'] = 'start'
            elif index % 5 == 4:
                films.data[index]['row_flag'] = 'end'
            else:
                films.data[index]['row_flag'] = 'none'
        return Response({'posters': films.data, 'page_num': page_num})
