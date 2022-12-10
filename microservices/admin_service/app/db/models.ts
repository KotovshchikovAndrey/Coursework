import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Donut, Ingredient } from './interfaces'


@Entity()
export class DonutModel implements Donut {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 70, nullable: false })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'integer', nullable: false })
    price: number

    @ManyToMany(() => IngredientModel, {
        cascade: false,
    })
    @JoinTable()
    ingredients: IngredientModel[]
}


@Entity()
export class IngredientModel implements Ingredient {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    image: string

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string
}