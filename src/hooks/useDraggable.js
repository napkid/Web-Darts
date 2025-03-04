// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { createContext } from 'preact'
import { useRef, useState, useEffect, useCallback, useContext } from 'preact/hooks'


const transformPrefixes = [
  "transform",
  "msTransform",
  "MozTransform",
  "WebkitTransform",
  "OTransform"
]
const findTransformVendorPrefix = () => {
  const tmp = document.createElement('div')
  return transformPrefixes.find(p => typeof tmp.style[p] !== 'undefined')
}

export const ScrollContext = createContext()

const transformPrefix = findTransformVendorPrefix()

export const throttle = (f) => {
  let token = null,
    lastArgs = null
  const invoke = () => {
    f(...lastArgs)
    token = null
  }
  const result = (...args) => {
    lastArgs = args
    if (!token) {
      token = requestAnimationFrame(invoke)
    }
  }
  result.cancel = () => token && cancelAnimationFrame(token)
  return result
}

const useDraggable = ({
    onDrag = ((i) => i),
    onDragStart = (() => {}),
    onDrop = (() => {}),
}) => {

  const contextScrollRef = useContext(ScrollContext) 
  const scrollElement = contextScrollRef.current || window
  
  // this state doesn't change often, so it's fine
  const [pressed, setPressed] = useState(false)

  const position = useRef({ x: 0, y: 0 })
  const ref = useRef()

  const unsubscribe = useRef()
  const legacyRef = useCallback((elem) => {
    ref.current = elem
    if (unsubscribe.current) {
      unsubscribe.current()
    }
    if (!elem) {
      return
    }
    const handleMouseDown = (e) => {
    e.target.releasePointerCapture(e.pointerId)
      setPressed(true)
      onDragStart()
    }
    elem.addEventListener("pointerdown", handleMouseDown)
    unsubscribe.current = () => {
      elem.removeEventListener("pointerdown", handleMouseDown)
    }
  }, [])

  useEffect(() => {
      const elem = ref.current
      if (!pressed) {
        elem.style.transform = null
        position.current = {
            x: 0,
            y: 0
        }
        return
    }

    let scrolliter = null
    const startScroll = (y, cb) => {
      if(scrolliter){
        return
      }
      scrolliter = setInterval(() => {
          if((y < 0 && scrollElement.scrollTop > 0) || (y > 0 && scrollElement.scrollHeight - scrollElement.clientHeight - scrollElement.scrollTop > 1)){
            cb()
            scrollElement.scrollBy(0, y)
          }
        }, 2)
    }
    const stopScroll = () => {
      if(!scrolliter){
        return
      }
      clearInterval(scrolliter)
      scrolliter = null
    }
    
    const handleMouseMove = throttle((event) => {
      if (!ref.current || !position.current) {
          return
      }

      const pos = position.current
      const newY = pos.y + event.movementY
      if(newY ){

        const newPos = {
          // x: pos.x + event.movementX,
          y: newY
        }
        if(event.clientY < 150 && event.movementY < 0){
          startScroll(event.movementY, () => {
            position.current.y+=event.movementY
            elem.style[transformPrefix] = `translateY(${position.current.y}px)`
          })
        } else if(event.clientY > (scrollElement.clientHeight-150) && event.movementY > 0){
          startScroll(event.movementY, () => {
            position.current.y+=event.movementY
            elem.style[transformPrefix] = `translateY(${position.current.y}px)`
          })
        } else {
          stopScroll()
        }
        elem.style[transformPrefix] = `translateY(${pos.y}px)`
        position.current = newPos
        onDrag(newPos)
      }

    })
    const handleMouseUp = (e) => {
        onDrop()
        stopScroll()
      setPressed(false)
    }
    // subscribe to mousemove and mouseup on document, otherwise you
    // can escape bounds of element while dragging and get stuck
    // dragging it forever
    document.addEventListener("pointermove", handleMouseMove)
    document.addEventListener("pointercancel", handleMouseUp)
    document.addEventListener("pointerup", handleMouseUp)
    return () => {
      handleMouseMove.cancel()
      stopScroll()
      document.removeEventListener("pointermove", handleMouseMove)
      document.removeEventListener("pointercancel", handleMouseUp)
      document.removeEventListener("pointerup", handleMouseUp)
    }
    // if `onDrag` wasn't defined with `useCallback`, we'd have to
    // resubscribe to 2 DOM events here, not to say it would mess
    // with `throttle` and reset its internal timer
  }, [pressed, onDrag])

  // actually it makes sense to return an array only when
  // you expect that on the caller side all of the fields
  // will be usually renamed
  return [legacyRef, pressed]

}

// /// example.ts
// const quickAndDirtyStyle = {
//   width: "200px",
//   height: "200px",
//   background: "#FF9900",
//   color: "#FFFFFF",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center"
// }

// const DraggableComponent = () => {
//   // handlers must be wrapped into `useCallback`. even though
//   // resubscribing to `mousedown` on every tick is quite cheap
//   // due to React's event system, `handleMouseDown` might be used
//   // in `deps` argument of another hook, where it would really matter.
//   // as you never know where return values of your hook might end up,
//   // it's just generally a good idea to ALWAYS use `useCallback`

//   // it's nice to have a way to at least prevent element from
//   // getting dragged out of the page
//   const handleDrag = useCallback(
//     ({ x, y }) => ({
//       x: Math.max(0, x),
//       y: Math.max(0, y)
//     }),
//     []
//   )

//   const [ref, pressed] = useDraggable({
//     onDrag: handleDrag
//   })

//   return (
//     <div ref={ref} style={quickAndDirtyStyle}>
//       <p>{pressed ? "Dragging..." : "Press to drag"}</p>
//     </div>
//   )
// }

export default useDraggable

