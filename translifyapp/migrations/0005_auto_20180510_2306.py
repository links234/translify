# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-10 23:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('translifyapp', '0004_remove_publictranslationentry_image'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PublicTranslationEntry',
            new_name='TextTranslation',
        ),
        migrations.AlterModelTable(
            name='texttranslation',
            table='TextTranslation',
        ),
    ]