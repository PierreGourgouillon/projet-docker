import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, Req,
  UseGuards
} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GalleryService} from "../services/gallery.service";
import {JwtAuthGuard} from "src/common/guards/jwt.auth.guard";
import {GalleryDTO} from "../dto/gallery.dto";
import {Gallery} from "../models/gallery.model";
import { Request } from "express"

@ApiTags('Gallery')
@UseGuards(JwtAuthGuard)
@Controller({
  path: 'galleries',
  version: '1',
})
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @ApiOperation({ summary: 'Gallery creation' })
  @ApiBody({ type: GalleryDTO })
  @ApiResponse({ status: HttpStatus.OK, description: 'Created gallery successful' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async create(
      @Body() galleryDto: GalleryDTO,
  ) {
    const newGallery = await this.galleryService.createGallery(galleryDto)

    return { error: null, data: newGallery };
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Galleries' })
  @Get("/")
  async getAll() {
    const galleries = await this.galleryService.getAllGalleries() as Gallery[]

    return { error: null, data: galleries };
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Like gallery' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @Post(':id/like')
  async likeGallery(
      @Param('id') galleryId: string,
      @Req() request: RequestWithUser
  ) {
    const user = request.user as any; // Typage correct pour éviter les erreurs
    const userId = user.userId;

    const isLike = await this.galleryService.likeGallery(galleryId, userId);

    return { error: null, isLike: isLike }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unlike gallery' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @Post(':id/unlike')
  async unlikeGallery(
      @Param('id') galleryId: string,
      @Req() request: RequestWithUser
  ) {
    const user = request.user as any; // Typage correct pour éviter les erreurs
    const userId = user.userId;

    const isUnlike = await this.galleryService.unlikeGallery(galleryId, userId);

    return { error: null, isUnlike: isUnlike }
  }
}

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    [key: string]: any; // Permet d'ajouter d'autres champs du JWT si nécessaire
  };
}
