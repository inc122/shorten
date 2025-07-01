import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ShortenDto } from './dtos/Shorten.dto';
import { History, Shorten } from './entities';
import ShortUniqueId from 'short-unique-id';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';


@Injectable()
export class AppService {

  constructor(@InjectDataSource() private dataSource: DataSource,) {}

  fixUrl(url: string): string {
    if (!url.startsWith('https://')) return `https://${url}`
    return url
  }

  async getShorten(url: string): Promise<Shorten> {
    const link = await Shorten.find({
      where: {
        shortUrl: url
      }
    })

    if (link.length == 0) {
      return null
    }

    return link[0]
  }

  async getShortenStats(url: string): Promise<any> {
    const data = await this.dataSource.query(
      `SELECT 
        sh.originalUrl as 'originalUrl',
        sh.createdAt as 'createdAt', 
        (SELECT COUNT(*) FROM history as h WHERE h.shortenId = sh.id) as 'count'
      FROM shorten as sh
      WHERE sh.shortUrl = '${url}'`
    )
    if (data.length == 0) throw new NotFoundException()

    return data[0]
  }

  async getShortenAnalytics(url: string): Promise<any> {

    const shorten = await this.getShorten(url)
    if (!shorten) {
      throw new NotFoundException()
    }

    const lastOnes = await History.find({
      relations: {
        shorten: true,
      },
      where: {
        shorten: {
          shortUrl: url
        }
      },
      order: {
        clickedAt: 'DESC'
      },
      take: 5,
    })

    const count = await History.count({
      relations: {
        shorten: true,
      },
      where: {
        shorten: {
          shortUrl: url
        }
      }
    })

    return {
      count,
      lastVisitedBy: lastOnes.map(v => v.ip)
    }
  }

  async saveShortenHistory(shorten: Shorten, ip: string) {
    const history = new History()
    history.clickedAt = new Date()
    history.shorten = shorten
    history.ip = ip
    await history.save()
  }

  async postShorten(body: ShortenDto) {
    if (body.alias) {
      const aliasShorten = await Shorten.findOneBy({
        alias: body.alias
      })
      if (aliasShorten) {
        throw new HttpException("Provided alias is already in use", 400)
      }
    }
    const uid = new ShortUniqueId({ length: 8 });

    const newShorten = new Shorten()
    newShorten.originalUrl = this.fixUrl(body.originalUrl)
    newShorten.alias = body.alias
    newShorten.expiresAt = body.expiresAt
    newShorten.shortUrl = uid.rnd()
    newShorten.createdAt = new Date()

    const shorten = await newShorten.save()

    return shorten
  }

  async deleteShorten(url: string) {
    const link = await Shorten.findBy({
      shortUrl: url
    })

    if (link.length === 0) 
      throw new NotFoundException()

    await link[0].remove()
    return {
      status: "OK"
    }
  }
}
