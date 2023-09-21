import { Injectable } from '@nestjs/common';
import { ValidateBankaccountOwnerShipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnerShipService } from 'src/modules/categories/services/validate-category-ownership.service';

import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { ValidateTransactionOwnerShipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankaccountOwnerShipService,
    private readonly validateCategoryOwnerShipService: ValidateCategoryOwnerShipService,
    private readonly validateTransactionOwnerShipService: ValidateTransactionOwnerShipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionsRepository.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
      data: { bankAccountId, categoryId, date, name, type, value },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId: string;
    categoryId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnerShipService.validate(userId, categoryId),
      this.validateTransactionOwnerShipService.validate(userId, transactionId),
    ]);
  }
}
