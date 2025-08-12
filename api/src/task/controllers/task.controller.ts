import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateTaskDto } from '../dto/update_task.dto';
import { CreateTaskDto } from '../dto/create_task.dto';
import { TaskStatusEnum } from '../utils/enums/task_status.enum';

@ApiTags('task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async findAll(@Query('status') status?: TaskStatusEnum) {
    return this.taskService.findAll(status as any);
  }

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.taskService.remove(id);
    return { ok: true };
  }
}
