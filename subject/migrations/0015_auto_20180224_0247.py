# Generated by Django 2.0.1 on 2018-02-24 02:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('subject', '0014_auto_20180207_2100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subjectscore',
            name='score_by_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='cri_scores', to='subject.SubjectScoreByCategory'),
        ),
    ]