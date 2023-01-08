"use strict"

//DOM para los filtros y muestra de los productos
const contenedor_productos = document.querySelector(".container-productos");
const contenedor_filtros = document.querySelector(".filtros")
const input_busqueda = document.getElementById("busqueda-nombre")
const input_precio = document.getElementById("precio")
const fecha_inicio = document.getElementById("fecha-inicio")
const fecha_tope = document.getElementById("fecha-tope")
const actualizar_fecha = document.getElementById("actualizar-fecha")

//DOM relacionado con el carrito
const mostrar_carrito = document.getElementById("abrir-carrito")
const cerrar_carrito = document.getElementById("cerrar-carrito")
const contenedor_carrito = document.querySelector(".contenedor-carrito")
const carrito = document.querySelector(".carrito")

//DOM para el modal de los productos
const modal_productos = document.querySelector(".modal-productos")
const contenido_modal = document.querySelector(".contenido-modal")
const cerrar_modal = document.getElementById("cerrar-modal")


//Configuración inicial de la interfaz

mostrar_carrito.addEventListener("click", ()=>{
    contenedor_carrito.classList.add("mostrar")
})
cerrar_carrito.addEventListener("click", ()=>{
    contenedor_carrito.classList.remove("mostrar")
})
cerrar_modal.addEventListener("click", ()=>{
    modal_productos.classList.remove("mostrar")
})

//Determinar el precio más alto para ajustar el rango del input
const precio_mayor = productos.map(item => item.price).sort((a,b)=>b-a)[0]
input_precio.setAttribute("max", precio_mayor)

//Sacar fecha actual para el filtro de fechas
const momento_actual = new Date()
console.log(momento_actual)
const fecha_actual = `${momento_actual.getFullYear()}-${cerosFecha(momento_actual.getMonth()+1)}-${cerosFecha(momento_actual.getDate())}`
fecha_inicio.setAttribute("value", fecha_actual)
fecha_tope.setAttribute("value", fecha_actual) 



//Filtrar productos por nombre
input_busqueda.addEventListener("keyup", ()=>{
    let buscar = input_busqueda.value.trim().toLowerCase()
    let filtro;

    if(buscar===""){
        filtro = [...productos]
    }else{
        filtro = productos.filter(item => item.name.toLowerCase().includes(buscar))
    }

    if(filtro.length===0){
        contenedor_productos.classList.add("no-resultados")
        contenedor_productos.innerHTML="<h2>No hay productos que coincidan con la búsqueda</h2>"
    }else{
        contenedor_productos.classList.remove("no-resultados")
        renderizar(filtro, contenedor_productos, crearProducto)
    }
})
//Filtrar productos por precio
input_precio.addEventListener("change", ()=>{
    let valor = input_precio.value
    let filtro;

    input_precio.nextElementSibling.innerText=`Filtro máximo de ${valor} €`
    filtro = productos.filter(item => item.price <= valor)

    if(filtro.length===0){
        contenedor_productos.classList.add("no-resultados")
        contenedor_productos.innerHTML="<h2>No hay productos que coincidan con la búsqueda</h2>"
    }else{
        contenedor_productos.classList.remove("no-resultados")
        renderizar(filtro, contenedor_productos, crearProducto)
    }

})

//Filtrar por fecha
actualizar_fecha.addEventListener("click", ()=>{
    const fecha_inicial = fecha_inicio.value
    const fecha_final = fecha_tope.value

})

// renderizar(productos, contenedor_productos, crearProducto)
InicializarTienda()

function InicializarTienda(){
    renderizar(productos, contenedor_productos, crearProducto)

    //Array con categorías sin repetir
    const categorias_no_rep = productos.map(item => item.category).filter((c,i,array)=>array.indexOf(c)===i)
    const lista_categorias = document.createElement("ul");

    contenedor_filtros.appendChild(lista_categorias);
    lista_categorias.innerHTML=`<li class="categoria">Todos</li>`
    categorias_no_rep.forEach(cate => {
        lista_categorias.innerHTML+=`<li class="categoria">${cate}</li>`
    })

    lista_categorias.addEventListener("click", (evento)=>{
        const pulsado = evento.target

        if(pulsado.matches(".categoria")){
            let filtro;

            if(pulsado.innerText==="Todos"){
                filtro = [...productos]
            }else{
                filtro = productos.filter(item => item.category===pulsado.innerText)
            }
            renderizar(filtro, contenedor_productos, crearProducto)
        }
    })
}

function crearProducto(p){
    const producto = document.createElement("article");
    producto.className="producto"
    producto.setAttribute("data-id", p.id)
    producto.innerHTML = `  <div class="foto-producto">
                                <img src="${p.image}" alt="">
                                <i id="ampliar" class="fa-solid fa-eye"></i>
                            </div>
                            <div class="datos-producto">
                                <p>${p.name}</p>
                                <h3>${p.price}</h3>
                                <h3>${p.category}</h3>
                            </div>`;

    const imagen = producto.querySelector(".foto-producto");
    const ampliar = producto.querySelector("i");
    imagen.addEventListener("mouseenter", ()=>{
        ampliar.classList.add("mostrar")
    })
    imagen.addEventListener("mouseleave", ()=>{
        ampliar.classList.remove("mostrar")
    })
    ampliar.addEventListener("click", (evento)=>{
        const padre = evento.currentTarget.parentElement.parentElement;
        const id = padre.getAttribute("data-id");
        console.log(padre)

        const producto_buscado = productos.find(item => item.id === id);
        contenido_modal.children[0].src=producto_buscado.image;
        contenido_modal.children[1].innerText=producto_buscado.name
        contenido_modal.children[2].innerText=producto_buscado.price
        modal_productos.classList.add("mostrar")

    })
    return producto
}

function renderizar(lista_productos, contenedor_dom, crear_dom){
    contenedor_dom.innerHTML="";
    lista_productos.forEach((item)=>{
        const dom_prod = crear_dom(item)
        contenedor_dom.appendChild(dom_prod)
    })
}

function crearProductoCarrito(p){

}

function cerosFecha(fecha){
    if(fecha < 10){
        return `0${fecha}`
    }
}

// function formatoFecha(fecha){
//     let timestamp = new Date(fecha).getTime()
//     return `${cerosFecha(timestamp.)}`
// }