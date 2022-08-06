import React from 'react';
import Hasil from '../components/Hasil';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import swal from 'sweetalert';
import TotalBayar from '../components/TotalBayar';

function HomePage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriespilih, setCategoriesPilih] = useState('Makanan');
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    Makanan();
    panggilKeranjang();
  }, []);

  function Makanan() {
    axios
      .get(`http://localhost:3005/products?category.nama=${categoriespilih}`)
      .then((response) => {
        // handle success
        const results = response.data;
        setMenus(results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  function panggilKeranjang() {
    axios
      .get(`http://localhost:3005/keranjangs`)
      .then((res) => {
        const results = res.data;
        setKeranjangs(results);
        console.log('hasil', results);
      })
      .catch((error) => {
        console.log('Error yaa ', error);
      });
  }

  const changeCategory = (value) => {
    axios
      .get(`http://localhost:3005/products?category.nama=${value}`)
      .then((response) => {
        // handle success
        console.log(response);
        const results = response.data;
        setMenus(results);
        console.log(value);
        setCategoriesPilih(value);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const masukKeranjang = (value) => {
    console.log(value);

    axios
      .get(`http://localhost:3005/keranjangs?product.id=${value.id}`)
      .then((response) => {
        // handle success
        if (response.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(`http://localhost:3005/keranjangs`, keranjang)
            .then((response) => {
              // handle success
              console.log(response);
              swal({
                title: 'Good job!',
                text: `Sukses Masuk Ke keranjang!${keranjang.product.nama}`,
                icon: 'success',
                button: 'false',
              });
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(() => panggilKeranjang());
        } else {
          const keranjang = {
            jumlah: response.data[0].jumlah + 1,
            total_harga: response.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(`http://localhost:3005/keranjangs/${response.data[0].id}`, keranjang)
            .then((response) => {
              // handle success
              console.log(response);
              swal({
                title: 'Good job!',
                text: `Sukses Masuk Ke keranjang!${keranjang.product.nama}`,
                icon: 'success',
                button: 'false',
              });
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(() => panggilKeranjang());
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="flex bg-white w-full h-screen">
        <h1 className="text-3xl m-auto text-black font-bold ">LOADING...</h1>
      </div>
    );
  } else {
    return (
      <Layout>
        <div className="flex w-full flex-col sm:flex-row">
          <Sidebar changeCategory={changeCategory} categoriespilih={categoriespilih} />

          <div className="w-full text-center m-2 font-semibold text-xl flex flex-col sm-flex-row">
            MENU
            <div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-4 lg:grid-cols-2 m-2 gap-1 text-center ">
              {menus.map((item) => (
                <Card key={item.id} nama={item.nama} harga={item.harga} menu={item.category.nama} gambar={item.gambar} item={item} masukKeranjang={masukKeranjang} />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-center m-2 font-semibold text-xl">Hasil</div>
            {keranjangs.map((item) => (
              <Hasil key={item.id} item={item} keranjangs={keranjangs} />
            ))}
            <div>
              <TotalBayar keranjangs={keranjangs} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default HomePage;
