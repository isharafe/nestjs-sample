import { InjectRepository } from "@nestjs/typeorm";
import { TestModel } from "../model/test.model";
// import { BaseRepository } from "src/database/repository/base.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(TestModel)
        // private testRepository: BaseRepository<TestModel>,
        private testRepository: Repository<TestModel>,
    ){}

    async add(model: TestModel): Promise<TestModel> {
        return this.testRepository.save(model);
    }

    async update(id: number, model: TestModel): Promise<TestModel> {
        await this.testRepository.update({id: id}, model);
        const updated = await this.testRepository.findOneBy({id: id});
        if (!updated) {
            throw new Error(`TestModel with id ${id} not found`);
        }
        return updated;
    }

    async findAll(): Promise<TestModel[]> {
        return this.testRepository.find();
    }
}