import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateIncomeDto, UpdateIncomeDto } from './income.dto';
import { IncomeService } from './income.service';

@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomesService: IncomeService) {}

  @Get()
  getAll() {
    return this.incomesService.getAll();
  }

  @Post()
  async create(@Body() incomeDto: CreateIncomeDto) {
    return this.incomesService.create(incomeDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    try {
      const income = await this.incomesService.update(id, updateIncomeDto);
      return { status: 'success', income };
    } catch {
      return `Income with id #${id} not found`;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const income = await this.incomesService.delete(id);
      return { status: 'success', deletedIncome: income };
    } catch {
      return `Income with id #${id} does not exist.`;
    }
  }
}
