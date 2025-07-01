import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shorten } from "./Shorten";

@Entity()
export class History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Shorten, (shorten) => shorten.id, {
        onDelete: "CASCADE"
    })
    shorten: Shorten;

    @Column()
    clickedAt: Date;

    @Column({ length: 30 })
    ip: string;
}