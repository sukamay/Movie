# Generated by Django 2.2.1 on 2019-05-15 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FilmModel', '0004_auto_20190515_1139'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='rating_people',
            field=models.CharField(default='0', max_length=50),
        ),
    ]
