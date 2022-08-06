import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Sidebar(props) {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Makanan();
  }, []);

  function Makanan(props) {
    axios
      .get(`http://localhost:3005/categories`)
      .then((response) => {
        // handle success
        const results = response.data;
        setCategories(results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <div className="flex bg-white w-full h-screen">
        <h1 className="text-3xl m-auto text-black font-bold ">LOADING...</h1>
      </div>
    );
  } else {
    return (
      <div className="sm:w-60 " changeCategory={props.changeCategory}>
        <div className="text-center m-2 font-semibold text-xl">List Kategori</div>
        <div class="flex justify-center">
          <ul class="bg-white rounded-lg border-3 border-bg-[#399ac1]  w-96 text-gray-900">
            {categories.map((item) => (
              <li
                key={item.id}
                className=" font-semibold text-center px-6 py-2 mt-1 border-b border-[#1cac85] hover:bg-[#1cac85] hover:text-white w-full bg-white-600  text-black cursor-pointer"
                onClick={() => props.changeCategory(item.nama)}
              >
                {item.nama}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
