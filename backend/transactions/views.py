from django.db import transaction
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Wallet
from .models import Transaction
from .serializers import TransferSerializer, TransactionSerializer


class TransferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransferSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sender = request.user
        receiver_id = serializer.validated_data['receiver_id']
        amount = serializer.validated_data['amount']

        # ❗ Validate amount
        if amount <= 0:
            return Response(
                {"error": "Amount must be greater than zero"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ❗ Validate receiver
        try:
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Receiver not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # ❗ Prevent self-transfer
        if sender == receiver:
            return Response(
                {"error": "You cannot transfer money to yourself"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔒 Atomic DB transaction
        with transaction.atomic():
            sender_wallet = Wallet.objects.select_for_update().get(user=sender)
            receiver_wallet = Wallet.objects.select_for_update().get(user=receiver)

            if sender_wallet.balance < amount:
                return Response(
                    {"error": "Insufficient balance"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            sender_wallet.balance -= amount
            receiver_wallet.balance += amount

            sender_wallet.save()
            receiver_wallet.save()

            txn = Transaction.objects.create(
                sender=sender,
                receiver=receiver,
                amount=amount,
                success=True
            )

        return Response({
    "transaction": TransactionSerializer(txn).data,
    "balance": sender_wallet.balance }, status=status.HTTP_201_CREATED
        )


class HistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        txns = Transaction.objects.filter(
            Q(sender=request.user) | Q(receiver=request.user)
        ).order_by('-created_at')
        return Response(
            TransactionSerializer(txns, many=True).data,
            status=status.HTTP_200_OK
        )
