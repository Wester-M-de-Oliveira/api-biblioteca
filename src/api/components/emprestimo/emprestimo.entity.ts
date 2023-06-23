import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Emprestimo')
export class Emprestimo{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    data_hora_emprestimo !: Date;

    @Column()
    data_previsao_entrega!: Date;

    @Column()
    data_entregue!: Date;

    @Column()
    data_hora_solicitacao!: Date;

    @Column()
    pessoa_id!: number;

    @Column()
    livro_id!: number;


}