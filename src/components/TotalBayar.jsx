import React from 'react';
import numberWithCommas from '../utils/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TotalBayar({ keranjangs }) {
  const navigate = useNavigate();

  const submitTotalBayar = (TotalBayar) => {
    const pesanan = {
      total_bayar: TotalBayar,
      menus: keranjangs,
    };

    axios
      .post(`http://localhost:3005/pesanans`, pesanan)
      .then((response) => {
        // handle success
        console.log(response);
        navigate('/sukses', { replace: true });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  console.log(keranjangs);
  const TotalBayar = keranjangs.reduce((result, item) => {
    return result + item.total_harga;
  }, 0);

  return (
    <>
      <div className="flex flex-col mt-3">
        <div className="text-center font-bold">Total Harga : Rp.{numberWithCommas(TotalBayar)}</div>
        <button
          className="rounded-md bg-[#1cac85] hover:text-white font-bold  text-lg text-bold p-2 mt-3"
          onClick={() => {
            submitTotalBayar(TotalBayar);
          }}
        >
          Bayar
        </button>
      </div>
    </>
  );
}

export default TotalBayar;
