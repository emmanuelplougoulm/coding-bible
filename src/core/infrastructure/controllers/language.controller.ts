import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateLanguageUseCase } from '@core/application/use-cases/language/create-language.use-case';
import { FindLanguageUseCase } from '@core/application/use-cases/language/find-language.use-case';
import { FindAllLanguagesUseCase } from '@core/application/use-cases/language/find-all-languages.use-case';
import { UpdateLanguageUseCase } from '@core/application/use-cases/language/update-language.use-case';
import { DeleteLanguageUseCase } from '@core/application/use-cases/language/delete-language.use-case';
import type { CreateLanguageDto } from '@core/application/dtos/language.dto';
import type { UpdateLanguageDto } from '@core/application/dtos/language.dto';

@Controller('languages')
export class LanguageController {
  constructor(
    private readonly createLanguageUseCase: CreateLanguageUseCase,
    private readonly findLanguageUseCase: FindLanguageUseCase,
    private readonly findAllLanguagesUseCase: FindAllLanguagesUseCase,
    private readonly updateLanguageUseCase: UpdateLanguageUseCase,
    private readonly deleteLanguageUseCase: DeleteLanguageUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateLanguageDto) {
    return this.createLanguageUseCase.execute(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findLanguageUseCase.execute(id);
  }

  @Get()
  async findAll() {
    return this.findAllLanguagesUseCase.execute();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateLanguageDto) {
    return this.updateLanguageUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteLanguageUseCase.execute(id);
    return { message: 'Language deleted successfully' };
  }
}
