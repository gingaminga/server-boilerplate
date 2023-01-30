import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export default class Sample {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
    type: "int",
  })
  num: number | null = null;

  @CreateDateColumn()
  created_at!: Date;
}
