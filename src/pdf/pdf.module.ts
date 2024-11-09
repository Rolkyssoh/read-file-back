// import { Module } from '@nestjs/common';
// import { PdfController } from './pdf.controller';
// import { MulterModule } from '@nestjs/platform-express';

// @Module({
//     imports: [
//         MulterModule.register({
//             dest: './uploads',  // Optional: if you want to save the uploaded file
//         }),
//     ],
//     controllers: [PdfController],
// })
// export class PdfModule { }


import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [PdfController],
    providers: [PdfService],
})
export class PdfModule { }
