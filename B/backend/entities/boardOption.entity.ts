import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board.entity";

@Entity()
export class BoardOptionEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like: number;

  @ManyToOne( () => BoardEntity, board => board.boardOptions )
  board: BoardEntity
}