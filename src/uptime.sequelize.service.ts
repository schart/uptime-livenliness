import {
  Logger,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SiteModel } from './uptime.entity';

@Injectable()
export class sequelizeService {
  private readonly logger = new Logger(sequelizeService.name);
  constructor(
    @InjectModel(SiteModel) private readonly model: typeof SiteModel,
  ) {}

  async findAllService(): Promise<SiteModel[]> {
    try {
      const sites = await this.model.findAll();
      this.logger.debug(`Found ${sites.length} sites`);

      return sites;
    } catch (error) {
      this.logger.error('Failed to fetch sites', error);
      throw new InternalServerErrorException('Could not retrieve sites');
    }
  }

  async addSiteService(host: string): Promise<SiteModel> {
    try {
      const site = await this.model.create({
        host: `https://${host}`,
      } as any);

      this.logger.log(`Added new site: ${host}`);
      return site;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('This site already exists!');
      }

      this.logger.error(`Failed to add site: ${host}`, error);
      throw new InternalServerErrorException('Could not add site');
    }
  }

  // async findAllService(pagination: { page: number; limit: number }) {
  //   const { page, limit } = pagination;
  //   const offset = (page - 1) * limit;

  //   const { rows: data, count: total } = await this.model.findAndCountAll({
  //     offset,
  //     limit,
  //     order: [['id', 'ASC']],
  //   });

  //   return {
  //     data,
  //     total,
  //     page,
  //     lastPage: Math.ceil(total / limit),
  //   };
  // }
}
