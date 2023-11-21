import { Injectable } from '@nestjs/common';

import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankaccountOwnerShipService } from './validate-bank-account-ownership.service';
import { TransactionType } from 'src/modules/transactions/entities/Transaction';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepositories: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankaccountOwnerShipService,
  ) { }

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, color, initialBalance, type } = createBankAccountDto;

    return this.bankAccountsRepositories.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepositories.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === TransactionType.INCOME
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { name, color, initialBalance, type } = updateBankAccountDto;

    this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this.bankAccountsRepositories.update({
      where: {
        id: bankAccountId,
      },
      data: { name, color, initialBalance, type },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.bankAccountsRepositories.delete({
      where: {
        id: bankAccountId,
      },
    });

    return null;
  }
}
