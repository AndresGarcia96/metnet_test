import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../utils/enums/task_status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
