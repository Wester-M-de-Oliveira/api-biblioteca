import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('autor')
export class Autor{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    nacionalidade!: string;

    @Column()
    data_nascimento!: Date;

    @Column()
    perfil!: string;

}