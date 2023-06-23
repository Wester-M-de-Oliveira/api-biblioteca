import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsInt, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Autor } from '../autor/autor.entity';
import { Editora } from '../editora/editora.entity';


@Entity('livro')
export class Livro{

    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty()
    @Column()
    sinopse!: string;

    @IsNotEmpty()
    @IsNumber()
    @Column()
    isbn!: number;

    @Column()
    @IsNotEmpty()
    titulo!: string;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    quantidade_exemplares!: number;

    @Column()
    @IsNotEmpty()
    @IsDateString()
    ano_publicacao!: Date;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    exemplares_disponivel!: number

    @ManyToOne(()=> Autor, { eager: true})
    @JoinColumn({
        name: 'autor_id',
        referencedColumnName: 'id'
    })
    autor_id!: number;

    @ManyToOne(()=> Editora, { eager: true})
    @JoinColumn({
        name: 'editora_id',
        referencedColumnName: 'id'
    })
    editora_id!: number;
}