import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BoardOptionEntity } from "./boardOption.entity";

@Entity('board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmail()
    @Column()
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column({
        nullable:true,
        default:'null'
    })
    selectedOption: string | null

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @JoinColumn({name:'email',referencedColumnName:'email'})
    @ManyToOne( ()=>UserEntity, user => user.boards, {eager:true})
    user: UserEntity


    @OneToMany( () => BoardOptionEntity, boardOption => boardOption.board )
    boardOptions: BoardOptionEntity[]


}