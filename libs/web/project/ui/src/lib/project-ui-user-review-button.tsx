import { Review } from '@deanslist-platform/sdk'
import { CoreUiButton } from '@deanslist-platform/web-core-ui'
import { useNavigate } from 'react-router-dom'

export function ProjectUiUserReviewButton({
  create,
  review,
}: {
  create: () => Promise<Review | null | undefined>
  review?: Review
}) {
  const navigate = useNavigate()

  return review ? (
    <CoreUiButton to={review.viewUrl}>Open your review</CoreUiButton>
  ) : (
    <CoreUiButton
      onClick={() =>
        create().then((res) => {
          if (!res?.viewUrl) return
          navigate(res.viewUrl)
        })
      }
    >
      Start your review
    </CoreUiButton>
  )
}
