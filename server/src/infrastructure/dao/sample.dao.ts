import { CreateSampleInput, Sample } from 'src/api/schemas/sample.schema';
import { ISampleRepository } from 'src/domain/repository/sample.repository';
import { DB } from '../db';
import { samples } from '../db/schemas';

export class SampleDAO implements ISampleRepository {

  constructor(private readonly db: DB) {}

  async create(input: CreateSampleInput): Promise<Sample | undefined> {
    const x = await this.db.insert(samples)
      .values(input)
      .returning();

    // console.log(x);
    return x[0]
  }

  async findAll(): Promise<Sample[]> {
    return await this.db.query.samples.findMany();
  }

  async findById(id: Sample['id']): Promise<Sample | undefined> {
    return await this.db.query.samples.findFirst({ where: { id } });
  }


  // async findAll(): Promise<Sample[]> {
  //   const countQuery = this
  //     .db
  //     .selectFrom('posts')
  //     .select(({ fn }) =>
  //       [fn.count<number>('id').as('count')])
  //     .executeTakeFirst();

  //   const postsQuery = this
  //     .db
  //     .selectFrom('posts')
  //     .orderBy(buildSortBy<'posts', Post>(sortBy))
  //     .limit(pagination.limit)
  //     .offset(pagination.offset)
  //     .select(this.DEFAULT_SELECT_FIELDS)
  //     .execute()

  //   const [countResult, postsResult] = await Promise.all([countQuery, postsQuery]);
  //   return {
  //     count: countResult?.count ?? 0,
  //     data: postsResult
  //   };
  // }

  // findById(id: Post['id']): Promise<Post | undefined> {
  //   return this.db
  //     .selectFrom('posts')
  //     .where('id', '=', id)
  //     .select(this.DEFAULT_SELECT_FIELDS)
  //     .executeTakeFirst();
  // }
  // update(id: Post['id'], post: UpdatePost): Promise<Post | undefined> {
  //   return this.db
  //     .updateTable('posts')
  //     .set(post)
  //     .where('id', '=', id)
  //     .returning(this.DEFAULT_SELECT_FIELDS)
  //     .executeTakeFirst();
  // }
  // delete(id: Post['id']): Promise<Post | undefined> {
  //   return this.db
  //     .deleteFrom('posts')
  //     .where('id', '=', id)
  //     .returning(this.DEFAULT_SELECT_FIELDS)
  //     .executeTakeFirst();
  // }

}