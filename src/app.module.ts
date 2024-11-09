import { Module } from '@nestjs/common';
import { PdfModule } from './pdf/pdf.module';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [PdfModule, ExcelModule],
})
export class AppModule { }
