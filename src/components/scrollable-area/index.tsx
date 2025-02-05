import { useRef, useState} from "react";
import {Props} from "./type";


const ScrollableArea = (props:Props) => {
const {onMouseDown,onMouseMove,onMouseUp,onMouseLeave,children,...rest}=props

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement|null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = scrollContainerRef.current;
    if (element) {
      setIsDragging(true);
      setStartX(event.clientX);
      element.style.cursor = "grabbing";
    }
    onMouseDown?.(event)
  };
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = scrollContainerRef.current;
    if (isDragging && element) {
      const diff = event.clientX - startX;
      element.scrollLeft -= diff;
      setStartX(event.clientX);
    }
    onMouseMove?.(event)
  };
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = scrollContainerRef.current;
    if (element) {
      setIsDragging(false);
      element.style.cursor = "grab";
    }
    onMouseUp?.(event)
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = scrollContainerRef.current;
    if (isDragging && element) {
      setIsDragging(false);
      element.style.cursor = "grab";
    }
    onMouseLeave?.(event)
  };


  return(
    <div
      {...rest}
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      >
      {children}
  </div>)
}

export default ScrollableArea
