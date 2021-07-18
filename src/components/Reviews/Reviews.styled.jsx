import styled from '@emotion/styled/macro'

export const ReviewList = styled.ul`
  height: 100vh;
`

export const ReviewItem = styled.li`
  border-bottom: 2px solid dimgrey;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const ReviewAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ReviewAuthorAvatar = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 10px;
  object-fit: cover;
  border-radius: 50%;
`

export const ReviewAuthorName = styled.b`
  text-transform: uppercase;
`

export const ReviewContent = styled.p`
  padding: 20px 0;
`

export const NotFoundMessage = styled.p`
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
  font-size: 30px;
  color: red;
`
