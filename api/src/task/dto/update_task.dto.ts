import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../utils/enums/task_status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
