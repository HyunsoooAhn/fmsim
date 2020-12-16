import { buildQuery, ListParam } from '@things-factory/shell'
import { getRepository } from 'typeorm'
import { Board } from '@things-factory/board-service'
import { Favorite } from '@things-factory/fav-base'
import { config } from '@things-factory/env'

const ORMCONFIG = config.get('ormconfig', {})
const DATABASE_TYPE = ORMCONFIG.type

export const favoritesBoardsResolver = {
  async favoriteBoards(_: any, params: ListParam, context: any) {
    const { user } = context.state

    const queryBuilder = getRepository(Board).createQueryBuilder()
    buildQuery(queryBuilder, params, context)

    var joinStatement = ''
    switch (DATABASE_TYPE) {
      case 'postgres':
        joinStatement = 'CAST(Board.id as VARCHAR) = Favorite.routing'
        break
      case 'sqlite':
      default:
        joinStatement = 'Board.id = Favorite.routing'
    }

    var qb = queryBuilder
      .innerJoin(Favorite, 'Favorite', joinStatement)
      .select([
        'Board.id as id',
        'Board.name as name',
        'Board.description as description',
        'Board.thumbnail as thumbnail',
        'Favorite.id as favoriteId'
      ])
      .andWhere('Favorite.user_id = :userId', {
        userId: user.id
      })

    const items = await qb.getRawMany()
    const total = await qb.getCount()

    return { items, total }
  }
}
