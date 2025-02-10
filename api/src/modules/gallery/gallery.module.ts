import { Module } from '@nestjs/common';
import { MongoModule } from 'src/common/modules/mongo.module';
import { GalleryController } from './controllers/gallery.controller';
import { GalleryService } from './services/gallery.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongoModule, AuthModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
