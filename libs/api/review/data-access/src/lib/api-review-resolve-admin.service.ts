import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { AdminFindManyReviewInput } from './dto/admin-find-many-review.input'
import { ReviewPaging } from './entity/review-paging.entity'
import { getAdminReviewWhereInput } from './helpers/get-admin-review-where.input'

@Injectable()
export class ApiReviewResolveAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async deleteReview(reviewId: string) {
    const deleted = await this.core.data.review.delete({ where: { id: reviewId } })
    return !!deleted
  }

  async findManyReview(input: AdminFindManyReviewInput): Promise<ReviewPaging> {
    return this.core.data.review
      .paginate({
        orderBy: { createdAt: 'desc' },
        where: getAdminReviewWhereInput(input),
        include: { projectMember: { include: { project: true, user: true } } },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneReview(reviewId: string) {
    return this.core.data.review.findUnique({
      where: { id: reviewId },
      include: { projectMember: { include: { project: true, user: true } } },
    })
  }
}
