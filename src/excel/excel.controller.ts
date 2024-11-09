import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import * as path from 'path';
import { Response } from 'express';
import { Client } from '@prisma/client';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService) { }

    @Get('customers')
    async getAllCar(): Promise<Client> {
        const result = await this.excelService.getAllCustomer()
        return result;
    }

    @Get()
    async getExcelData(): Promise<Client> {
        const filePath = path.resolve(__dirname, '../../uploads/liste_clients.xlsx'); // Adjust the file path as needed
        const data = await this.excelService.readExcelFile(filePath);
        return data;
    }

    @Post('save')
    async saveExcelData(@Body() data: Client[]) {
        // Call the service to save the data
        const result = await this.excelService.saveExcelData(data);
        return result; // Return the saved data or a success message
    }
}
