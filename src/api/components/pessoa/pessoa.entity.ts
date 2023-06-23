import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pessoa')
export class Pessoa{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    cpf!: string;

    @Column()
    rg!: string;

    @Column()
    data_nascimento!: Date;

    @Column()
    sexo!: string;

    @Column()
    contato_id!: number;

    @Column()
    endereco_id!: number;

}
