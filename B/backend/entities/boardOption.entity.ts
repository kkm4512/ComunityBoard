import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board.entity";

@Entity()
export class BoardOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  like: Boolean;

  @Column()
  commnet: Boolean;

  @Column()
  share: Boolean;

  @Column()
  bookmark: Boolean

  @OneToOne(()=> BoardEntity, board => board.option)
  board: BoardEntity;
}