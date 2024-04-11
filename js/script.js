document
  .getElementById("icono-carrito")
  .addEventListener("click", toggleCarrito);
document
  .getElementById("cerrar-carrito")
  .addEventListener("click", toggleCarrito);

function toggleCarrito() {
  const carrito = document.getElementById("carrito");
  carrito.classList.toggle("oculto");
  if (!carrito.classList.contains("oculto")) {
    mostrarArticulosCarrito();
  }
}

function mostrarArticulosCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  const itemsCarrito = listaCarrito.querySelectorAll("li");
  const listaTemporal = {};

  // Recorre los elementos en el carrito y agrégalos a la lista temporal sumando cantidades
  itemsCarrito.forEach((item) => {
    const titulo = item
      .querySelector("span.titulo")
      .previousSibling.textContent.trim();
    const precio = item.querySelector(".precio").textContent;
    const cantidad = parseInt(item.querySelector(".cantidad").textContent);
    if (titulo in listaTemporal) {
      listaTemporal[titulo].cantidad += cantidad;
    } else {
      listaTemporal[titulo] = { titulo, precio, cantidad };
    }
  });

  // Elimina todos los elementos del carrito
  listaCarrito.innerHTML = "";
  for (const titulo in listaTemporal) {
    const { titulo: tituloArticulo, precio, cantidad } = listaTemporal[titulo];
    agregarProductoAlCarrito(tituloArticulo, precio, cantidad);
  }
  calcularTotal();
  actualizarContadorCarrito();
}

document.querySelectorAll(".item button").forEach((button) => {
  button.addEventListener("click", agregarAlCarrito);
});

function agregarAlCarrito(event) {
  const button = event.target;
  const item = button.closest(".item");

  const titulo = item.querySelector("h3").textContent;
  const precio = item.querySelector(".precio").textContent;

  agregarProductoAlCarrito(titulo, precio);
}

function agregarProductoAlCarrito(titulo, precio, cantidad = 1) {
  const listaCarrito = document.getElementById("lista-carrito");
  const itemsCarrito = listaCarrito.querySelectorAll("li");

  for (const item of itemsCarrito) {
    if (item.textContent.includes(titulo)) {
      const cantidadElemento = item.querySelector(".cantidad");
      cantidadElemento.textContent =
        parseInt(cantidadElemento.textContent) + cantidad;
      calcularTotal();
      actualizarContadorCarrito();
      return;
    }
  }

  // Si el producto no está en el carrito, agregar uno nuevo
  const fila = document.createElement("li");
  fila.innerHTML = `
  <span class="titulo">${titulo} - <button class="disminuir">-</button><span class="cantidad">  ${cantidad} </span><button class="aumentar">+</button> <span class="precio">${precio}</span></span>
  <button class="borrar-producto">x</button>
`.trim();

  listaCarrito.appendChild(fila);

  calcularTotal();
  actualizarContadorCarrito();
}

function calcularTotal() {
  let total = 0;
  const itemsCarrito = document.querySelectorAll("#lista-carrito li");
  itemsCarrito.forEach((item) => {
    const precio = parseFloat(
      item.querySelector(".precio").textContent.replace("$", "")
    );
    const cantidad = parseInt(item.querySelector(".cantidad").textContent);
    total += precio * cantidad;
  });

  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  contador.textContent = document.querySelectorAll("#lista-carrito li").length;
}

document
  .getElementById("lista-carrito")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("borrar-producto")) {
      const listItem = event.target.closest("li");
      listItem.remove();
      calcularTotal();
      actualizarContadorCarrito();
    }
  });
document
  .getElementById("lista-carrito")
  .addEventListener("click", function (event) {
    const listItem = event.target.closest("li");
    if (!listItem) return;

    const cantidadElemento = listItem.querySelector(".cantidad");
    if (event.target.classList.contains("aumentar")) {
      cantidadElemento.textContent = parseInt(cantidadElemento.textContent) + 1;
    } else if (event.target.classList.contains("disminuir")) {
      const cantidadActual = parseInt(cantidadElemento.textContent);
      if (cantidadActual > 1) {
        cantidadElemento.textContent = cantidadActual - 1;
      }
    }

    calcularTotal();
    actualizarContadorCarrito();
  });

function limpiarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";
  calcularTotal();
  actualizarContadorCarrito();
}
/* ********************************** */
/* *************  MODAL ************* */
/* ********************************** */
document
  .getElementById("lista-carrito")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("borrar-producto")) {
      const botonEliminar = event.target;
      botonEliminar.parentElement.remove();
      calcularTotal();
      actualizarContadorCarrito();
    }
  });

document
  .getElementById("finalizar-compra")
  .addEventListener("click", verificarCompra);

function verificarCompra() {
  const listaCarrito = document.getElementById("lista-carrito");
  if (listaCarrito.children.length === 0) {
    alert(
      "No hay productos en el carrito. Agrega algunos antes de finalizar la compra."
    );
  } else {
    mostrarModal();
  }
}

function mostrarModal() {
  const modal = document.getElementById("confirmar-modal");
  modal.classList.remove("oculto");
}

document.getElementById("cancelar").addEventListener("click", ocultarModal);

document.getElementById("confirmar").addEventListener("click", finalizarCompra);

function finalizarCompra() {
  alert("¡Compra finalizada! \n!Gracias por su compra!");
  ocultarModal();
  limpiarCarrito();
}

function ocultarModal() {
  const modal = document.getElementById("confirmar-modal");
  modal.classList.add("oculto");
}
/* ********************************** */
/* ************* SLIDER ************* */
/* ********************************** */

let swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
