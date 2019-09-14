from rest_framework import serializers
from .models import Film, Rating, Director, Writer, Cast


class FilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ('id', 'genres', 'pubdate', 'countries', 'title_zh', 'title_en', 'poster', 'average', 'casts')


class RankItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ('id', 'title_zh')


class FilmDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ('id', 'genres', 'pubdate', 'countries', 'title_zh', 'title_en', 'poster', 'summary',
                  'average', 'languages', 'imdb', 'year', 'duration', 'casts', 'average',
                  'rating_people', 'stars', 'directors', 'writers')


class FilmPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ('id', 'poster', 'average', 'title_zh')
