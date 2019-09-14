from django.db import models


# Create your models here.
class Film(models.Model):
    id = models.IntegerField(primary_key=True, db_index=True)
    genres = models.CharField(max_length=50, default='')
    season_count = models.CharField(max_length=100, default='')
    pubdate = models.CharField(max_length=500, default='')
    countries = models.CharField(max_length=300, default='')
    lens_id = models.IntegerField(default=0)
    title_zh = models.CharField(max_length=100, default='title')
    title_en = models.CharField(max_length=150, default='title')
    site = models.URLField(default='')
    poster = models.URLField(default='')
    summary = models.TextField(default='')
    average = models.DecimalField(max_digits=2, decimal_places=1, default=6.0)
    rating_people = models.CharField(max_length=50, default='0')
    stars = models.CharField(max_length=50, default='')
    languages = models.CharField(max_length=200, default='')
    episodes = models.CharField(max_length=50, default='')
    imdb = models.CharField(max_length=100, default='')
    year = models.CharField(max_length=20, default='1998')
    duration = models.CharField(max_length=100, default='119')
    douban_site = models.URLField(default='')
    aka = models.CharField(max_length=200, default='')
    directors = models.CharField(max_length=500, default='')
    casts = models.CharField(max_length=500, default='')
    writers = models.CharField(max_length=500, default='')


class Cast(models.Model):
    id = models.IntegerField(primary_key=True)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


class Director(models.Model):
    id = models.IntegerField(primary_key=True)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


class Writer(models.Model):
    id = models.IntegerField(primary_key=True)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


class Rating(models.Model):
    id = models.IntegerField(primary_key=True)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    # average = models.DecimalField(max_digits=2, decimal_places=1)
    rating_people = models.PositiveIntegerField()
    stars = models.CharField(max_length=25)
