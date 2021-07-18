import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TmdbAPI } from '../../services/apiService'
import { API } from '../../constants/API'
import defaultImage from '../../images/defaultImage.png'
import {
  ReviewList,
  ReviewItem,
  ReviewAuthorWrapper,
  ReviewAuthorAvatar,
  ReviewAuthorName,
  ReviewContent,
  NotFoundMessage,
} from './Reviews.styled'
import { ReviewsLoader } from './ReviewsLoader'
import { Notify } from '../../services/notifications'

export const Reviews = () => {
  const [movieReviews, setMovieReviews] = useState([])
  const [status, setStatus] = useState('idle')

  const { movieId } = useParams()

  useEffect(() => {
    setStatus('pending')

    const getMovieReviews = async () => {
      const reviews = await TmdbAPI.getMovieReviews(movieId)
      console.log('~ reviews', reviews)

      if (!reviews.length) {
        Promise.reject('No reviews found')
        setStatus('rejected')
        return Notify.error('No reviews found')
      }

      setMovieReviews(reviews)
      setStatus('resolved')
      window.scrollTo({ top: 600, behavior: 'smooth' })
    }

    try {
      getMovieReviews()
    } catch (error) {
      console.log(error)
    }
  }, [movieId])

  return (
    <>
      {status === 'pending' && <ReviewsLoader />}

      {status === 'resolved' && (
        <ReviewList>
          {movieReviews.map(({ id, author, author_details, content }) => {
            const avatarPath = author_details.avatar_path
            let avatar = null

            if (author_details.avatar_path) {
              avatar = avatarPath.startsWith('/http')
                ? avatarPath.slice(1)
                : `${API.IMAGE_URL}/w200/${avatarPath}`
            } else {
              avatar = defaultImage
            }

            return (
              <ReviewItem key={id}>
                <ReviewAuthorWrapper>
                  <ReviewAuthorAvatar src={avatar} width="50" height="50" />
                  <ReviewAuthorName>{author}</ReviewAuthorName>
                </ReviewAuthorWrapper>
                <ReviewContent>{content}</ReviewContent>
              </ReviewItem>
            )
          })}
        </ReviewList>
      )}

      {status === 'rejected' && (
        <NotFoundMessage>
          We don't have any reviews for this movie.
        </NotFoundMessage>
      )}
    </>
  )
}