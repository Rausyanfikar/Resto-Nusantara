import React from 'react';
import numberWithCommas from '../utils/utils';

function Hasil(props) {
  console.log(props.item);
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center m-3">
          <div className="inline-flex items-center justify-center  px-2 py-1  mr-2 text-xs font-bold leading-none text-red-100 bg-[#1cac85] rounded-full ">{props.item.jumlah}</div>
          <ul className="bg-white rounded-lg w-96 text-gray-900 text-center">
            <li className="  border-gray-200 w-full rounded-t-lg">{props.item.nama}</li>
            <li className="px-6 py-2 border-b border-gray-200 w-full">Rp.{numberWithCommas(props.item.total_harga)}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Hasil;
