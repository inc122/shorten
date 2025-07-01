import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ShortenDto } from './dtos/Shorten.dto';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:shortUrl')
  @Redirect('', 302)
  async getShorten(@Req() request: Request, @Param('shortUrl') shortUrl: string) {
    const shorten = await this.appService.getShorten(shortUrl);
    if (shorten) {
      await this.appService.saveShortenHistory(shorten, request.ip)
      return { url: shorten.originalUrl }
    } else {
      throw new NotFoundException()
    }
  }

  @Post('/shorten')
  async postShorten(@Body() body: ShortenDto) {
    return this.appService.postShorten(body);
  }

  @Get('/info/:shortUrl')
  async getShortenInfo(@Param('shortUrl') shortUrl: string) {
    return this.appService.getShortenStats(shortUrl)
  }

  @Get('/analytics/:shortUrl')
  async getShortenAnalytics(@Param('shortUrl') shortUrl: string) {
    return this.appService.getShortenAnalytics(shortUrl)
  }

  @Delete('/:shortUrl')
  async deleteShortert(@Param('shortUrl') shortUrl: string) {
    return this.appService.deleteShorten(shortUrl)
  }
}
