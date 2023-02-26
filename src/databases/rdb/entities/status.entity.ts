import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Status {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "tinyint",
  })
  status!: number;

  @CreateDateColumn()
  created_at!: Date;
}
