import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/models/user.model';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import {GalleryRepository} from "../../modules/gallery/repositories/gallery.repository";
import {Gallery, GallerySchema} from "../../modules/gallery/models/gallery.model";

@Module({
  imports: [
    NestMongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NestMongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }]),
  ],
  providers: [UserRepository, GalleryRepository],
  exports: [NestMongooseModule, UserRepository, GalleryRepository],
})
export class MongoModule {}
