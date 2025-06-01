import { FindOptionsWhere, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseModel } from "../model/base.model";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class BaseRepository<T extends BaseModel> extends Repository<T> {

    async optimisticUpdate(
        criteria: FindOptionsWhere<T>,
        partialEntity: QueryDeepPartialEntity<T>): Promise<T> {

            const id = partialEntity[BaseModel.ID_FIELD_NAME];
            const version = partialEntity[BaseModel.VERSION_FIELD_NAME];
            if(id==null || version==null) {
                throw new Error("id and version required for optimistic update!");
            }

            const newcriteria = {id: id, version: version, ...criteria};
            const res = await this.update(newcriteria, partialEntity);
            if(res.affected!=null || res.affected==0) {
                 throw new ConflictException(`No rows updated for id: ${id} and version: ${version}`);
            }
            const entity = await this.findOne({where: {id: id}});
            if (!entity) {
                throw new ConflictException(`Entity not found for id: ${id}`);
            }
            return entity;
    }
}