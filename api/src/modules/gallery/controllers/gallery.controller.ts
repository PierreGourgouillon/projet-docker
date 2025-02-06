import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, Req,
  Res,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GalleryService} from "../services/gallery.service";
import {JwtAuthGuard} from "src/common/guards/jwt.auth.guard";
import {LoginDto} from "../../auth/dto/auth.dto";
import {Response} from "express";
import {User} from "../../user/models/user.model";
import {GalleryDTO} from "../dto/gallery.dto";
import {Gallery} from "../models/gallery.model";

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
      @Req() request: Request
  ) {
    const userId = request['userId'];

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
      @Req() request: Request
  ) {
    const userId = request['userId'];

    const isUnlike = await this.galleryService.unlikeGallery(galleryId, userId);

    return { error: null, isUnlike: isUnlike }
  }
}
