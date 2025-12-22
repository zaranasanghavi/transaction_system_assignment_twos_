from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    sender = models.ForeignKey(User, related_name="sent", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="received", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    success = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
