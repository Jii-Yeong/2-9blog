# Generated by Django 3.1.3 on 2020-12-20 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_auto_20201221_0026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(related_name='tags', to='post.Tag'),
        ),
    ]