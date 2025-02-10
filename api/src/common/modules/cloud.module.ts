import { Module } from '@nestjs/common';
import { CloudStorageService } from 'src/common/services/cloud-storage.service';

@Module({
  providers: [CloudStorageService],
  exports: [CloudStorageService],
})
export class CloudModule {}
