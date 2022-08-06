import React from 'react';
import img from '../assets/images/ciamik.png';
import Layout from '../components/Layout';
import axios from 'axios';

function Sukses() {
  axios
    .get(`http://localhost:3005/keranjangs`)
    .then((res) => {
      const keranjangs = res.data;
      keranjangs.map(function (item) {
        return axios
          .delete(`http://localhost:3005/keranjangs/${item.id}`)
          .then((res) => console.log(res))
          .catch((eror) => console.log(eror));
      });
    })
    .catch((error) => {
      console.log('Error yaa ', error);
    });

  return (
    <Layout>
      <div className="text-center mt-4 flex justify-center">
        <img className="text-center" src={img} width="400" height="500" alt="mantul" />
      </div>
      <div className="text-center text-xl font-semibold">SUKSES</div>
    </Layout>
  );
}

export default Sukses;
