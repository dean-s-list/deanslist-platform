import { Comment, ManagerCreateRatingInput, ManagerUpdateRatingInput, Rating } from '@deanslist-platform/sdk'
import { useAuth } from '@deanslist-platform/web-auth-data-access'
import { UiStack } from '@pubkey-ui/core'
import { ManagerRatingUiForm } from './manager-rating-ui-form'

export function ManagerCommentUiRating({
  comment,
  create,
  delete: deleteRating,
  update,
}: {
  comment: Comment
  create: (res: ManagerCreateRatingInput) => Promise<boolean>
  delete: (ratingId: string) => Promise<boolean>
  update: (ratingId: string, res: ManagerUpdateRatingInput) => Promise<boolean>
}) {
  const { user } = useAuth()
  const ratings: Rating[] = comment.ratings ?? []

  const userRating = ratings.find((rating) => rating.authorId === user?.id)

  return (
    <UiStack>
      {ratings
        .filter((rating) => rating.id !== userRating?.id)
        .map((rating) => (
          <ManagerRatingUiForm
            key={rating.id}
            author={rating.author}
            disabled
            content={rating.content}
            rating={rating}
            submit={(input) => update(rating.id, input)}
          />
        ))}
      {userRating ? (
        <ManagerRatingUiForm
          author={user}
          content={userRating.content}
          rating={userRating}
          submit={(input) => update(userRating.id, input)}
          delete={() => deleteRating(userRating.id)}
        />
      ) : (
        <ManagerRatingUiForm author={user} submit={(input) => create({ ...input, commentId: comment.id })} />
      )}
    </UiStack>
  )
}
