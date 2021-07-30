import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { BaseModelEntity } from '../models/base-model-entity';

export interface IDataService<T> {
    readonly repository: Repository<T>

    getAll: () => Promise<T[]>
    getOne: (id: string) => Promise<T>
    create: (data: DeepPartial<T>) => Promise<T>
    update: (id: string, data: DeepPartial<T>) => Promise<T>
    delete: (id: string, isSoftDelete: boolean) => Promise<boolean>
}

type Constructor<I> = new (...args: any[]) => I

export function BaseService<T extends BaseModelEntity>(entity: Constructor<T>) {

    abstract class DataService implements IDataService<T> {
        @InjectRepository(entity) public readonly repository: Repository<T>

        private get primaryColumnName(): string {
            return this.repository.metadata.primaryColumns[0]?.propertyName
        }

        public async getAll() {
            return await this.repository.find();
        }

        public async getOne(id: string) {
            const entity = await this.repository.findOne(id);

            if (!entity) {
                throw new NotFoundException();
            }

            return entity;
        }

        public async create(data: DeepPartial<T>) {
            const result = await this.repository.save(data);
            return await this.repository.findOne(result[this.primaryColumnName]);
        }

        public async update(id: string, data: DeepPartial<T>) {
            const currentEntity = await this.repository.findOne(id);

            if (!currentEntity) {
                throw new NotFoundException();                
            }
            
            const updated = Object.assign(currentEntity, data);
            await this.repository.update(id, updated);
            return await this.repository.findOne(id);

        }

        public async delete(id: string, isSoftDelete = true) {
            const currentEntity = await this.repository.findOne(id);

            if (!currentEntity) {
                throw new NotFoundException();                
            }
            
            isSoftDelete ? await this.repository.softDelete(id) : await this.repository.delete(id);
            return true;
        }
    }

    return DataService;
}
