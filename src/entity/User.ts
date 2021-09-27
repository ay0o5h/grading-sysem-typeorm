import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    phone: string;
    @Column()
    password: string;
    @Column({ nullable: true })
    otp: number;
    @Column({ nullable: true })
    otpNewPassword: number;
    @Column({default:false})
    isVerfied:boolean
    @Column({default:false})
    isActive:boolean
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}
