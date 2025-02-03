import { useRef, useState} from "react";


// I also can do it in ts (you are didn't mention it)
const ScrollableArea = () => {

  const [boxCount, setBoxCount] = useState(10);

  const [isDragging, setIsDragging] = useState(false);

  const [startX, setStartX] = useState(0);
  const scrollContainerRef = useRef(null);


  const onChangeInput=(value)=>{
    if (value<300){
      setBoxCount(value)
    }

  }

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const diff = event.clientX - startX;
    scrollContainerRef.current.scrollLeft -= diff;
    setStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };


  return(
    <div className={'flex items-center flex-col h-screen justify-center space-y-7'}>
    <div className={'flex items-center gap-x-4'}>
      <p>number of boxes:</p>
      <input value={boxCount} className={'bg-black text-white'} type={'number'} onChange={(event)=>onChangeInput(+event?.target?.value)}/>
    </div>

    <div
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}

      className={'bg-white h-42 w-[60%] p-4 rounded-md flex items-center gap-x-3 overflow-auto soft-scrollbar flex-nowrap'}>
      {new Array(boxCount).fill(undefined).map((node,index)=>(
        <div
          className={'transition transition-all w-20 h-20 border !rounded-lg flex items-center justify-center shrink-0 hover:bg-green-400 hover:-translate-y-3 hover:text-white hover:shadow-md'}>{index}</div>
      ))}
    </div>
  </div>)
}

export default ScrollableArea
