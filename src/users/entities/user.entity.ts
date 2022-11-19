import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    contact:string;

    @Column()
    fileName: string;

    @Column({ enum: UserRole, default: UserRole.REGULAR })
    role: UserRole;

    @Column({ default: false })
    isActive: boolean;
}
