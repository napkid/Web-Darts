// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useRef, useState, useEffect, useCallback } from 'preact/hooks'

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
    onDrop = (() => {})
}) => {
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
  // useEffect(() => {
  //   return () => {
  //     // this shouldn't really happen if React properly calls
  //     // function-refs, but I'm not proficient enough to know
  //     // for sure, and you might get a memory leak out of it
  //     if (unsubscribe.current) {
  //       unsubscribe.current()
  //     }
  //   }
  // }, [])

  useEffect(() => {
      // why subscribe in a `useEffect`? because we want to subscribe
      // to mousemove only when pressed, otherwise it will lag even
      // when you're not dragging
      const elem = ref.current
      if (!pressed) {
        elem.style.transform = null
        position.current = {
            x: 0,
            y: 0
        }
        return
    }
    
    const handleMouseMove = throttle((event) => {
            // needed for TypeScript anyway
            if (!ref.current || !position.current) {
                return
            }
      const pos = position.current
      const newPos = {
        // x: pos.x + event.movementX,
        y: pos.y + event.movementY
      }
      position.current = newPos
      onDrag(newPos)
      elem.style.transform = `translateY(${pos.y}px)`
    })
    const handleMouseUp = (e) => {
        onDrop()
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

