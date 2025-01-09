import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  notifyAllUsers() {
    console.log('Enviando notificaciones a todos los usuarios...');
    // Lógica para enviar notificaciones
    
  }
}
