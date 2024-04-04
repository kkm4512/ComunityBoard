import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board.entity";

@Entity()
export class BoardOptionEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userBoardId: number;

  @Column()
  like: number;

  @ManyToOne( () => BoardEntity, board => board.boardOptions, {eager:true} )
  board: BoardEntity
}