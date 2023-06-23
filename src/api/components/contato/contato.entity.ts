import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('contato')
export class Contato{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    rede_social!: string;

    @Column()
    email!: string;

    @Column()
    celular!: String;

    @Column()
    telefone!: string;

}