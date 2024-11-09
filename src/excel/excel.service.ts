import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ExcelService {
    constructor(private prisma: PrismaService) { }

    // Mapping of old keys to new keys
    private keyMapping = {
        "COMPTES ACTES EXPERTS_Répertoire clients": "company",
        "__EMPTY": "siren",
        "__EMPTY_1": "lastName",
        "__EMPTY_2": "firstName",
        "__EMPTY_3": "email",
        "__EMPTY_4": "rib"
    };

    // Function to rename the keys
    private renameKeys(data: any[]): any[] {
        return data.map((item) => {
            const renamedItem: any = {};
            for (const [oldKey, newKey] of Object.entries(this.keyMapping)) {
                if (item[oldKey] !== undefined) {
                    renamedItem[newKey] = item[oldKey];
                }
            }
            return renamedItem;
        });
    }

    async readExcelFile(filePath: string): Promise<any> {
        try {
            // Read the file
            const fileBuffer = await fs.readFile(filePath);

            // Parse the Excel file
            const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

            // Get the first sheet (you can change this to select another sheet)
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            const renamedData = this.renameKeys(jsonData);
            return renamedData;
        } catch (error) {
            throw new Error(`Error reading the Excel file: ${error.message}`);
        }
    }

    // Method to save client data to the database
    async saveExcelData(data: Client[]) {
        const result = await this.prisma.client.createMany({
            data,
        });
        return result;
    }

    async getAllCustomer(): Promise<any> {
        const count_ = await this.prisma.client.count();
        return {
            count_,
            customer: await this.prisma.client.findMany()
        }
    }


}
