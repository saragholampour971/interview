import React, {useState} from 'react';
import ScrollableArea from "../scrollable-area";
import {parseAmount} from "../../common/ParseAmount";


const NumbersSlider = () => {

  const [boxCount, setBoxCount] = useState<number>(10);

  const onChangeInput = (value?: number) => {
    if (value && value <= 300) {
      setBoxCount(value || 0)
    }

  }

  return (
    <div className={'flex items-center flex-col h-screen justify-center space-y-7'}>

      <div className={'flex items-center justify-center gap-x-4'}>
        <p>number of boxes:</p>
        <input value={boxCount} className={'bg-black text-white'} type={'number'}
               onChange={(event) => onChangeInput(+event?.target?.value)}/>
      </div>
      <ScrollableArea
        className={'bg-white h-42 w-[60%] p-4 rounded-md flex items-center gap-x-3 overflow-auto soft-scrollbar flex-nowrap'}
      >
        {new Array(boxCount).fill(undefined).map((node, index) => (
          <div
            className={'transition transition-all w-20 h-20 border !rounded-lg flex items-center justify-center shrink-0 hover:bg-green-400 hover:-translate-y-3 hover:text-white hover:shadow-md'}>{parseAmount(index)}</div>
        ))}

      </ScrollableArea>
    </div>
  );
};

export default NumbersSlider;
