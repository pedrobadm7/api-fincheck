import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';

@Injectable()
export class ValidateTransactionOwnerShipService {
  constructor(
    private readonly transactionsRepositories: TransactionsRepository,
  ) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepositories.findFirst({
      where: { id: transactionId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction not found.');
    }
  }
}
