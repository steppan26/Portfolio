import styled from 'styled-components'
import { Avatar, Button } from '../../Components'
import { useSpring, animated, useChain, useSpringRef } from 'react-spring'
import React, { useEffect, useRef, useState } from 'react'

interface Coordinates {
  pos1: any
  pos2: any
  pos3: any
  pos4: any
};

const Navbar: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({pos1: 0, pos2: 0, pos3: 0, pos4: 0})
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLElement>(null)
  const avatarRef = useRef<HTMLElement>(null)

  const navHeightRef = useSpringRef()
  const navWidthRef = useSpringRef()

  useChain([navHeightRef, navWidthRef])

  useEffect(() => {
    //@ts-ignore
    avatarRef.current.addEventListener('mousedown', (e) => {
      dragMouseDown(e)
      //@ts-ignore
      avatarRef.current.addEventListener('mousemove', elementDrag)

      //@ts-ignore
      avatarRef.current.addEventListener('mouseup', () => avatarRef.current.removeEventListener('mousemove', elementDrag))
    })
  }, [])

  const propsHeight = useSpring({
    to: {
      maxHeight: !menuIsOpen ? '200px' : '0px',
      maxWidth: !menuIsOpen ? '600px' : '0px',
      borderWidth: !menuIsOpen ? '4px' : '2px',
      },
    from: {
      maxHeight: '200px',
      maxWidth: '200px',
    },
    config: {
      mass: 1,
      tension: 120,
      friction: 14
    },
    ref: navHeightRef
  })

  const closeDragElement = () => {
    document.removeEventListener('mouseup', closeDragElement)
    document.removeEventListener('mousemove', elementDrag)
  }

  const elementDrag = (event: any) => {
    event = event || window.event;
    event.preventDefault();

    const newState = {
      pos1: (coordinates.pos3 - event.clientX),
      pos2: (coordinates.pos4 - event.clientX),
      pos3: event.clientX,
      pos4: event.clientY
    }

    console.log(newState)

    setCoordinates(newState)

    //@ts-ignore
    menuRef.current.style.top = (menuRef.current.offsetTop - newState.pos2) + 'px';
    //@ts-ignore
    menuRef.current.style.left = (menuRef.current.offsetLeft - newState.pos1) + 'px';

  }

  const dragMouseDown = (event: any) => {
    event = event || window.event
    event.preventDefault()

    const newState = {
      pos1: coordinates.pos1,
      pos2: coordinates.pos2,
      pos3: event.clientX,
      pos4: event.clientY
    }

    setCoordinates(newState)

    document.addEventListener('mouseup', closeDragElement)
  }


  return(
    <Wrapper
      ref={menuRef}
      width={250}
      coordinates={coordinates}
    >
      <Main onClick={() => setMenuIsOpen(x => !x)}>
        <AvatarWrapper
          ref={avatarRef}
        >
          <Avatar />
        </AvatarWrapper>
        <UserMenu style={propsHeight} >
          <ul>
            <li>My projects</li>
            <li>My competences</li>
            <li>About me</li>
            <li>Contact me</li>
          </ul>
        </UserMenu>
        <CustomButton>
          +
        </CustomButton>
      </Main>
      <div></div>
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.div<any>`
  position: absolute;
  top: ${props => props.coordinates.top}px;
  left: ${props => props.left}px;
  min-width: ${props => props.width ? props.width + 'px' : 'unset' };
`


const CustomButton = styled(Button)`
  font-weight: 900;
  font-size: 1.2rem;
  padding: 0.75rem 0.5rem 0.25rem;
  margin-top: -1rem;
  z-index: -1;
`


const Main = styled.nav`
  z-index: 999;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  max-width: max-content;
  justify-content: space-between;
  align-items: center;
  color: hsla(25, 70%, 90%, 0.4);

  &:hover ${CustomButton} {
    color: hsla(25, 70%, 90%, 0.8);
  }
`

const AvatarWrapper = styled.div<any>`
  cursor: grab;
  z-index: 2;
  border-radius: 50% 50% 4px 4px;
  border: 4px solid;
  background-color: hsl(210, 25%, 80%);
  width: calc(50px + 8px);
  height: calc(50px + 8px);
  text-align: center;
`

const UserMenu = styled(animated.div)`
  margin-top: -0.25rem;
  margin-inline: auto;
  border: 1px solid black;
  padding-inline: 0.5rem;
  border-radius: 4px;
  border: 4px solid hsla(25, 70%, 90%, 0.4);
  background-color: hsl(210, 25%, 80%);
  overflow: hidden;
  color: #160d24;

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
    padding-block: 0.35rem;
  }

  li {
    cursor: pointer;
    margin-block: 0.35rem;
    background-color: ${ props => props.theme.clr_bg_secondary };
    box-shadow: 0 0 4px 0px rgba(30, 30, 30, 0.3) inset;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-align: center;
    opacity: 0.65;
    font-weight: 600;
    letter-spacing: 1px;

    transition: all 350ms ease;

    &:hover {
      box-shadow: 0 0 6px 2px rgba(30, 30, 30, 0.3) inset;
      opacity: 1;
    }
  }
`
