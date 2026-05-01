export interface Pedido {
  FECHA: string
  PEDIDO_ID: string
  TELEFONO: string
  DIRECCION: string
  METODO_PAGO: string
  PRODUCTO: string
  CANTIDAD: number
  PRECIO_UNITARIO: number
  SUBTOTAL: number
  TOTAL_PEDIDO: number
}

const productos = [
  { nombre: "Arroz La Garza", precio: 85 },
  { nombre: "Habichuelas Rojas", precio: 65 },
  { nombre: "Pollo Fresco", precio: 145 },
  { nombre: "Plátanos Verdes", precio: 35 },
  { nombre: "Aceite de Maíz", precio: 195 },
  { nombre: "Salchichón", precio: 75 },
  { nombre: "Queso de Freír", precio: 120 },
  { nombre: "Leche Evaporada", precio: 55 },
  { nombre: "Café Santo Domingo", precio: 180 },
  { nombre: "Azúcar Refinada", precio: 45 },
  { nombre: "Pasta de Tomate", precio: 35 },
  { nombre: "Sazón Completo", precio: 25 },
  { nombre: "Salsa de Soya", precio: 85 },
  { nombre: "Huevos (Docena)", precio: 110 },
  { nombre: "Pan Sobao", precio: 50 }
]

const metodosPago = ["Efectivo", "Tarjeta", "Transferencia", "PayPal"]
const direcciones = [
  "Calle Principal #45, Santo Domingo",
  "Av. Lincoln 234, Piantini",
  "Calle El Conde #78, Zona Colonial",
  "Av. 27 de Febrero #156, Naco",
  "Calle Duarte #89, Villa Mella",
  "Av. Independencia #321, Gazcue",
  "Calle Hostos #12, Ciudad Nueva",
  "Av. Máximo Gómez #445, Herrera",
  "Calle Arzobispo Meriño #67, Zona Colonial",
  "Av. Winston Churchill #234, Piantini"
]

function generarTelefono(): string {
  const prefijos = ["809", "829", "849"]
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)]
  const numero = Math.floor(Math.random() * 9000000) + 1000000
  return `${prefijo}-${numero.toString().slice(0, 3)}-${numero.toString().slice(3)}`
}

function generarFecha(diasAtras: number): string {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() - diasAtras)
  return fecha.toISOString().split("T")[0]
}

function generarPedidoId(): string {
  return `PED-${Math.floor(Math.random() * 90000) + 10000}`
}

export function generarPedidos(): Pedido[] {
  const pedidos: Pedido[] = []
  const numPedidos = 150

  for (let i = 0; i < numPedidos; i++) {
    const pedidoId = generarPedidoId()
    const fecha = generarFecha(Math.floor(Math.random() * 30))
    const telefono = generarTelefono()
    const direccion = direcciones[Math.floor(Math.random() * direcciones.length)]
    const metodoPago = metodosPago[Math.floor(Math.random() * metodosPago.length)]
    
    // Cada pedido tiene entre 1 y 5 productos
    const numProductos = Math.floor(Math.random() * 5) + 1
    let totalPedido = 0
    const productosUsados: Set<number> = new Set()

    for (let j = 0; j < numProductos; j++) {
      let productoIndex: number
      do {
        productoIndex = Math.floor(Math.random() * productos.length)
      } while (productosUsados.has(productoIndex))
      productosUsados.add(productoIndex)

      const producto = productos[productoIndex]
      const cantidad = Math.floor(Math.random() * 5) + 1
      const subtotal = producto.precio * cantidad
      totalPedido += subtotal

      pedidos.push({
        FECHA: fecha,
        PEDIDO_ID: pedidoId,
        TELEFONO: telefono,
        DIRECCION: direccion,
        METODO_PAGO: metodoPago,
        PRODUCTO: producto.nombre,
        CANTIDAD: cantidad,
        PRECIO_UNITARIO: producto.precio,
        SUBTOTAL: subtotal,
        TOTAL_PEDIDO: totalPedido
      })
    }

    // Actualizar TOTAL_PEDIDO en todos los items del pedido
    for (let k = pedidos.length - numProductos; k < pedidos.length; k++) {
      pedidos[k].TOTAL_PEDIDO = totalPedido
    }
  }

  return pedidos.sort((a, b) => new Date(b.FECHA).getTime() - new Date(a.FECHA).getTime())
}

export const mockPedidos = generarPedidos()
