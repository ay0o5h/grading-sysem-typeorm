import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Lectures {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    link: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}
