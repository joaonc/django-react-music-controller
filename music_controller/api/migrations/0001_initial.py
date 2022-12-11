# Generated by Django 4.1.4 on 2022-12-11 19:45

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                (
                    'id',
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name='ID'
                    ),
                ),
                ('code', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('host', models.CharField(max_length=50, unique=True)),
                ('guest_can_pause', models.BooleanField(default=False)),
                ('votes_to_skip', models.IntegerField(default=1)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
