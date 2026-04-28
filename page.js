"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/ventas")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const totalVentas = data.reduce(
    (acc, item) => acc + Number(item.TOTAL_PEDIDO || 0),
    0
  );

  const ventasHoy = data.filter((item) => {
    const hoy = new Date().toISOString().split("T")[0];
    return item.FECHA?.includes(hoy);
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Colmado</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-500 text-white p-4 rounded">
          Total Ventas
          <br />
          RD${totalVentas.toFixed(2)}
        </div>

        <div className="bg-blue-500 text-white p-4 rounded">
          Ventas Hoy
          <br />
          {ventasHoy.length}
        </div>

        <div className="bg-purple-500 text-white p-4 rounded">
          Pedidos Totales
          <br />
          {data.length}
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b">
              <td>{item.PRODUCTO}</td>
              <td>{item.CANTIDAD}</td>
              <td>RD${item.TOTAL_PEDIDO}</td>
              <td>{item.DIRECCION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}