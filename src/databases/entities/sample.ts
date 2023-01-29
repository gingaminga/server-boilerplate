import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export default class Sample {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
    type: "varchar",
  })
  value: string | null = null;

  @Column({
    nullable: true,
    type: "varchar",
  })
  value2: number | null = null;

  @CreateDateColumn()
  created_at!: Date;
}
