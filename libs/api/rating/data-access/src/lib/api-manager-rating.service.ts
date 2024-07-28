import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { ProjectStatus } from '@deanslist-platform/sdk'
import { Injectable } from '@nestjs/common'
import { ManagerCreateRatingInput } from './dto/manager-create-rating.input'
import { ManagerUpdateRatingInput } from './dto/manager-update-rating.input'

@Injectable()
export class ApiManagerRatingService {
  constructor(private readonly core: ApiCoreService) {}

  async createRating(userId: string, input: ManagerCreateRatingInput) {
    const comment = await this.ensureCommentProjectManager(userId, input.commentId)

    if (!comment) {
      throw new Error(`Comment not found`)
    }

    if (comment.review.project.status !== ProjectStatus.Closed) {
      throw new Error('You can only rate closed projects')
    }

    return this.core.data.rating.create({ data: { ...input, authorId: userId } })
  }

  async deleteRating(userId: string, ratingId: string) {
    await this.ensureRatingAuthor(userId, ratingId)
    const deleted = await this.core.data.rating.delete({ where: { id: ratingId } })
    return !!deleted
  }

  async updateRating(userId: string, ratingId: string, input: ManagerUpdateRatingInput) {
    await this.ensureRatingAuthor(userId, ratingId)
    return this.core.data.rating.update({ where: { id: ratingId }, data: input })
  }

  private async ensureRating(ratingId: string) {
    const found = await this.core.data.rating.findUnique({ where: { id: ratingId } })
    if (!found) {
      throw new Error('Review Comment Rating not found')
    }
    return found
  }

  private async ensureRatingAuthor(userId: string, ratingId: string) {
    const found = await this.ensureRating(ratingId)
    if (found.authorId !== userId) {
      throw new Error('Unauthorized')
    }
    return found
  }

  private async ensureCommentProjectManager(userId: string, commentId: string) {
    const comment = await this.core.data.comment.findUnique({
      where: { id: commentId },
      include: { review: { include: { project: { include: { managers: true } } } } },
    })
    if (!comment) {
      throw new Error(`Comment not found`)
    }
    const manager = comment.review.project.managers.find((m) => m.id === userId)
    if (!manager) {
      throw new Error(`You are not a manager of this project`)
    }
    return comment
  }
}
