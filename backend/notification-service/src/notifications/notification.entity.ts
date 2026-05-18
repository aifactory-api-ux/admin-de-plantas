import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: string;
}