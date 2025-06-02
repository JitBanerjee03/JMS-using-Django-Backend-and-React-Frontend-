from django.contrib import admin
from .models import EditorInChief

@admin.register(EditorInChief)
class EditorInChiefAdmin(admin.ModelAdmin):
    list_display = ('user_full_name', 'institution', 'position_title', 'country', 'is_active', 'date_joined')
    search_fields = ('user__first_name', 'user__last_name', 'user__email', 'institution', 'country')
    list_filter = ('is_active', 'country')
    readonly_fields = ('date_joined',)

    def user_full_name(self, obj):
        return obj.user.get_full_name()
    user_full_name.short_description = 'Name'
