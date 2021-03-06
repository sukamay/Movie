# Generated by Django 2.2.1 on 2019-05-13 15:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Film',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('genres', models.CharField(max_length=50)),
                ('season_count', models.CharField(max_length=100)),
                ('pubdate', models.CharField(max_length=500)),
                ('countries', models.CharField(max_length=300)),
                ('lens_id', models.IntegerField()),
                ('title_zh', models.CharField(max_length=100)),
                ('title_en', models.CharField(max_length=100)),
                ('site', models.URLField()),
                ('poster', models.URLField()),
                ('summary', models.TextField()),
                ('languages', models.CharField(max_length=200)),
                ('episodes', models.CharField(max_length=50)),
                ('imdb', models.CharField(max_length=100)),
                ('year', models.PositiveIntegerField()),
                ('duration', models.PositiveIntegerField()),
                ('douban_site', models.URLField()),
                ('aka', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Writer',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('film_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FilmModel.Film')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('average', models.DecimalField(decimal_places=1, max_digits=2)),
                ('rating_people', models.PositiveIntegerField()),
                ('stars', models.CharField(max_length=25)),
                ('film_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FilmModel.Film')),
            ],
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('film_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FilmModel.Film')),
            ],
        ),
        migrations.CreateModel(
            name='Cast',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('film_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='FilmModel.Film')),
            ],
        ),
    ]
