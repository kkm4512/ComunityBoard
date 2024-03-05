import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

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

    @Column()
    @IsNotEmpty()
    selectedOption: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @JoinColumn({name:'email',referencedColumnName:'email'})
    @ManyToOne( ()=>UserEntity, user => user.boards, {eager:true})
    user: UserEntity

}