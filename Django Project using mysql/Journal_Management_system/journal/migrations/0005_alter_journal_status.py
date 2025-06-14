# Generated by Django 5.2 on 2025-05-17 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0004_journal_author_name_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journal',
            name='status',
            field=models.CharField(choices=[('submitted', 'Submitted'), ('under_review', 'Under Review'), ('revisions_required', 'Revisions Required'), ('accepted', 'Accepted'), ('rejected', 'Rejected'), ('review_done', 'Review Done')], default='submitted', max_length=50),
        ),
    ]
