import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'site', updatedAt: true })
export class SiteModel extends Model<SiteModel> {
  @Column({ allowNull: false, unique: true })
  host: string;
}
