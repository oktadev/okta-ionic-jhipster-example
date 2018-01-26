import { BaseEntity } from './../../../models';

export class Tag implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public entries?: BaseEntity[],
    ) {
    }
}
