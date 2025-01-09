import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService],
  exports: [NotificationService], // Exporta para usarlo en otros módulos
})
export class NotificationModule {}
