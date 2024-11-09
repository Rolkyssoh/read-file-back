import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as pdfParse from 'pdf-parse';
import { memoryStorage } from 'multer';

@Controller('pdf')
export class PdfController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadPdf(@UploadedFile() file: Express.Multer.File) {
        console.log("the provided file::::", file);
        if (!file) {
            return { message: 'No file uploaded' };
        }

        console.log('File buffer:', file.buffer);  // Add this line to debug

        try {
            const data = await pdfParse(file.buffer);

            // Format the response as JSON
            return {
                text: data.text,
                metadata: data.metadata,
                numpages: data.numpages,
                numrender: data.numrender,
                info: data.info,
            };
        } catch (error) {
            return { message: 'Error processing PDF', error: error.message };
        }
    }
}
