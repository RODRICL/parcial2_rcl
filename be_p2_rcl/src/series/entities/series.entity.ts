import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Series')
export class Series {
  //poner llave primaria
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 5000, nullable: false })
  sinopsis: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  director: string;

  @Column()
  temporada: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  tipoGenero: string;

  @Column({ type: 'date', nullable: false, name: 'fecha_estreno' })
  fechaEstreno: Date;
}
