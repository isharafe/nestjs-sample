import { IsNotEmpty, IsNumber } from "class-validator";
import { TestModel } from "src/test/model/test.model";

export class TestDto {

    @IsNumber()
    id: number;

    @IsNumber()
    version: number;

    @IsNotEmpty()
    name: string;

    description: string;

    constructor(obj?: any) {
        this.id = obj?.id;
        this.version = obj?.version;
        this.name = obj?.name;
        this.description = obj?.description;
    }

    toModel(): TestModel {
        return {
            id: this.id,
            version: this.version,
            name: this.name,
            description: this.description,
        };
    }

    static toDto(model: TestModel): TestDto {
        return new TestDto(model);
    }
}
