import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shorten extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32 })
    originalUrl: string;

    @Column({ length: 8 })
    shortUrl: string;

    @Column({ nullable: true, length: 20 })
    alias?: string;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    expiresAt?: Date;
}