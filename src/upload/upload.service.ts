import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UploadService {
  processFile(file: Express.Multer.File) {
    // Implementa lógica adicional si es necesario
    // Por ejemplo, guardar información en una base de datos
    if(!file){
      throw new Error("Debe elegir un archivo");
    }
    
    return {
      filename: file.originalname,
      storedFilename: file.filename,
      path: file.path,
      size: file.size,
    };
  }

  deleteFile(filePath: string) {
    // Lógica para eliminar un archivo si es necesario
  }
}
