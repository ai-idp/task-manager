import { Request, Response } from 'express';
import { TaskController } from '../src/controllers/task-controller.js';
import { taskRepository } from '../src/repositories/task-repository.js';
import { Task, TaskStatus } from '../src/models/task.js';

describe('TaskController - Query Operations', () => {
  let controller: TaskController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseData: any;
  let statusCode: number;

  beforeEach(() => {
    controller = new TaskController();
    taskRepository.clear();
    
    responseData = null;
    statusCode = 0;
    
    mockRequest = {};
    mockResponse = {
      status: (code: number) => {
        statusCode = code;
        return mockResponse as Response;
      },
      json: (data: any) => {
        responseData = data;
        return mockResponse as Response;
      }
    };
  });

  afterEach(() => {
    taskRepository.clear();
  });

  describe('GET /tasks/{id} - getTaskById', () => {
    it('should return 200 with complete task data when task exists', () => {
      const task: Task = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.PENDING,
        created_at: new Date('2024-01-15T10:30:00.000Z'),
        updated_at: new Date('2024-01-15T10:30:00.000Z')
      };
      
      taskRepository.save(task);
      mockRequest.params = { id: task.id };
      
      controller.getTaskById(mockRequest as Request, mockResponse as Response);
      
      expect(statusCode).toBe(200);
      expect(responseData).toEqual(task);
      expect(responseData.id).toBe(task.id);
      expect(responseData.title).toBe(task.title);
      expect(responseData.description).toBe(task.description);
      expect(responseData.status).toBe(task.status);
    });

    it('should return 404 when task does not exist', () => {
      const nonExistentId = '550e8400-e29b-41d4-a716-446655440099';
      mockRequest.params = { id: nonExistentId };
      
      controller.getTaskById(mockRequest as Request, mockResponse as Response);
      
      expect(statusCode).toBe(404);
      expect(responseData).toEqual({
        message: `Tarefa com ID ${nonExistentId} não encontrada`,
        error: 'Not Found'
      });
    });

    it('should be idempotent - multiple calls return same data', () => {
      const task: Task = {
        id: 'test-id-123',
        title: 'Idempotent Test',
        description: null,
        status: TaskStatus.DONE,
        created_at: new Date('2024-01-15T12:00:00.000Z'),
        updated_at: new Date('2024-01-15T12:00:00.000Z')
      };
      
      taskRepository.save(task);
      mockRequest.params = { id: task.id };
      
      controller.getTaskById(mockRequest as Request, mockResponse as Response);
      const firstCall = { ...responseData };
      const firstStatus = statusCode;
      
      controller.getTaskById(mockRequest as Request, mockResponse as Response);
      const secondCall = { ...responseData };
      const secondStatus = statusCode;
      
      expect(firstCall).toEqual(secondCall);
      expect(firstStatus).toBe(secondStatus);
      expect(firstStatus).toBe(200);
    });
  });

  describe('GET /tasks - getAllTasks', () => {
    it('should return 200 with empty array when no tasks exist', () => {
      controller.getAllTasks(mockRequest as Request, mockResponse as Response);
      
      expect(statusCode).toBe(200);
      expect(responseData).toEqual([]);
    });

    it('should return 200 with tasks ordered by created_at desc', () => {
      const task1: Task = {
        id: 'id-1',
        title: 'First Task',
        description: null,
        status: TaskStatus.PENDING,
        created_at: new Date('2024-01-15T10:00:00.000Z'),
        updated_at: new Date('2024-01-15T10:00:00.000Z')
      };
      
      const task2: Task = {
        id: 'id-2',
        title: 'Second Task',
        description: null,
        status: TaskStatus.DONE,
        created_at: new Date('2024-01-15T11:00:00.000Z'),
        updated_at: new Date('2024-01-15T11:00:00.000Z')
      };
      
      taskRepository.save(task1);
      taskRepository.save(task2);
      
      controller.getAllTasks(mockRequest as Request, mockResponse as Response);
      
      expect(statusCode).toBe(200);
      expect(responseData).toHaveLength(2);
      expect(responseData[0]).toEqual({ 
        id: 'id-2', 
        title: 'Second Task', 
        status: TaskStatus.DONE 
      });
      expect(responseData[1]).toEqual({ 
        id: 'id-1', 
        title: 'First Task', 
        status: TaskStatus.PENDING 
      });
    });

    it('should be idempotent - multiple calls return same data', () => {
      const task: Task = {
        id: 'test-id',
        title: 'Test',
        description: null,
        status: TaskStatus.PENDING,
        created_at: new Date('2024-01-15T12:00:00.000Z'),
        updated_at: new Date('2024-01-15T12:00:00.000Z')
      };
      
      taskRepository.save(task);
      
      controller.getAllTasks(mockRequest as Request, mockResponse as Response);
      const firstCall = JSON.stringify(responseData);
      
      controller.getAllTasks(mockRequest as Request, mockResponse as Response);
      const secondCall = JSON.stringify(responseData);
      
      expect(firstCall).toEqual(secondCall);
      expect(statusCode).toBe(200);
    });
  });
});
