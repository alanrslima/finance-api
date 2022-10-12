import { BaseEntity } from "../../entities/BaseEntity";
import { BaseRepository } from "./BaseRepository";

export class InMemoryBaseRepository implements BaseRepository<BaseEntity> {
  private items: BaseEntity[] = [];

  async create(item: BaseEntity) {
    this.items.push(item);
    return item;
  }

  async read(id) {
    const item = this.items.find((item) => item.id === id);
    return item;
  }

  async list() {
    return this.items;
  }

  async listByIds(ids) {
    const items = this.items.filter((user) => ids.find(user.id));
    return items;
  }

  async update(item: BaseEntity) {
    this.items.map((entity) => (entity.id === item.id ? item : entity));
    return item;
  }
  async delete() {}
}
