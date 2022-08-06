import React from 'react';
import numberWithCommas from '../utils/utils';

function Card(props) {
  return (
    <>
      <div className=" rounded overflow-hidden shadow-lg cursor-pointer" onClick={() => props.masukKeranjang(props.item)}>
        <img class="w-full" src={`assets/images/${props.menu.toLowerCase()}/${props.gambar}`} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.nama}</div>
          <p class="text-gray-700 text-base">Rp.{numberWithCommas(props.harga)}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
