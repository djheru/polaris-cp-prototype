import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { databases } from '../../common/config/database.config';

@Entity({
  database: databases.POLARIS_CP,
  schema: databases.POLARIS_CP,
})
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
