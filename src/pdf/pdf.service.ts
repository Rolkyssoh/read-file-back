import { Injectable } from '@nestjs/common';
const { PDFParser } = require('pdf2json');


@Injectable()
export class PdfService {

    async extractTextFromPdf(fileBuffer: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
            const pdfParser = new PDFParser();

            pdfParser.on('pdfParser_dataError', errData => reject(errData.parserError));
            pdfParser.on('pdfParser_dataReady', pdfData => {
                // Convert parsed data to text and table format
                const extractedText = this.parsePdfData(pdfData);
                resolve(extractedText);
            });

            pdfParser.parseBuffer(fileBuffer);
        });
    }

    private parsePdfData(pdfData: any): { pages: any[] } {
        // Parse data and format it as structured JSON
        const pages = pdfData.formImage.Pages.map(page => {
            return {
                texts: page.Texts.map(text => decodeURIComponent(text.R[0].T)),  // Decode and extract text
                // You can add further parsing here to group table data by positions
            };
        });

        return { pages };
    }
}
