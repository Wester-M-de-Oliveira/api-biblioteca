import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('despesas')
export class Despesa {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsNotEmpty({
    message: 'A propriedade descricao não pode ser vazia'
  })
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
}