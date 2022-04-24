import styled from 'styled-components'
import logo from '../../Assets/Images/profile.jpg'

export const Avatar = () => {
  return(
    <Image src={logo} />
  )
}

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`
