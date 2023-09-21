import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankaccountOwnerShipService {
  constructor(
    private readonly bankAccountsRepositories: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepositories.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank Account not found.');
    }
  }
}
