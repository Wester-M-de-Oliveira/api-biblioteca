import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';

@Entity('despesas')
export class Despesa {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty()
  @Column()
  descricao!: string;

  @IsNotEmpty()
  @IsDateString({ strict: true })
  @Column()
  data!: Date;

  @IsOptional()
  @IsDateString({ strict: true })
  @Column()
  data_efetivacao!: Date;

  @IsNotEmpty()
  @IsNumber()
  @Column({
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
  })
  valor!: number;

  @IsOptional()
  @IsNumber()
  @Column({
    type: 'decimal',
    transformer: {
      to(value: any) { return value },
      from(value: any) { return parseFloat(value) }
    }
  })
  valor_pago!: number;

  @IsOptional()
  @IsBoolean()
  @Column()
  pago!: boolean;

  @ManyToOne(() => Categoria, { eager: true })
  @JoinColumn({
    name: 'categoria_id',
    referencedColumnName: 'id'
  })
  categoria!: Categoria;
}