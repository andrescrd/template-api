import { DeepPartial, Repository } from 'typeorm';


export interface IDataService<T> {
    readonly repository: Repository<T>;

    getAll: (withDeleted: boolean) => Promise<T[]>;
    getOne: (id: string) => Promise<T>;
    create: (data: DeepPartial<T>) => Promise<T>;
    update: (id: string, data: DeepPartial<T>) => Promise<T>;
    delete: (id: string, isSoftDelete: boolean) => Promise<boolean>;
}
