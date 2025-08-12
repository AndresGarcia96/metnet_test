import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create_task.dto';
import { UpdateTaskDto } from '../dto/update_task.dto';
import { TaskStatusEnum } from '../utils/enums/task_status.enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async findAll(status?: TaskStatusEnum): Promise<Task[]> {
    const where = status ? { status } : {};
    return this.taskRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async create(createDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createDto);
    return this.taskRepository.save(task);
  }

  async update(id: string, updateDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateDto);
    return this.taskRepository.save(task);
  }

  // soft delete usando DeleteDateColumn
  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.softDelete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} not found`);
  }
}
