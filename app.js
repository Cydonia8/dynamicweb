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
const carrito = document.querySelector(".contenedor-productos-carrito")

//DOM para el modal de los productos
const modal_productos = document.querySelector(".modal-productos")
const contenido_modal = document.querySelector(".contenido-modal")
const cerrar_modal = document.getElementById("cerrar-modal")

//DOM para mostrar mensajes
const contenedor_mensajes = document.querySelector(".contenedor-mensajes")

//DOM para estilo vertical
const modo_vertical = document.getElementById("vertical")
const seccion_productos_filtros = document.querySelector(".seccion-productos-filtros")
const container_filtros = document.querySelector(".container-filtros")
const filtros_sticky = document.querySelector(".filtros-sticky")


//Comprobación inicial con localStorage por si el carrito tiene elementos
let recuento_carrito = JSON.parse(localStorage.getItem("carrito") ?? "[]")
//Si los tiene, los imprimimos por pantalla
renderizar(recuento_carrito, carrito, crearProductoCarrito)

//Eventos para el carrito y modal
mostrar_carrito.addEventListener("click", ()=>{
    contenedor_carrito.classList.add("mostrar")
    container_filtros.classList.add("indexcero")
    
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
        contenedor_productos.innerHTML=`<h2>No hay productos con estas condiciones</h2>
                                        <img id="noprod-foto" src="noprod.jpg">`
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
        contenedor_productos.innerHTML=`<h2>No hay productos con estas condiciones</h2>
        <img id="noprod-foto" src="noprod.jpg">`
    }else{
        contenedor_productos.classList.remove("no-resultados")
        renderizar(filtro, contenedor_productos, crearProducto)
    }

})

//Filtrar por fecha
actualizar_fecha.addEventListener("click", ()=>{
    const fecha_inicial = formatoFecha(fecha_inicio.value)
    const fecha_final = formatoFecha(fecha_tope.value)

    let filtro = productos.filter(item => formatoFechaObjeto(item.date) >= fecha_inicial && formatoFechaObjeto(item.date) <= fecha_final )

    if(filtro.length === 0){
        contenedor_productos.classList.add("no-resultados")
        contenedor_productos.innerHTML=`<h2>No hay productos con estas condiciones</h2>
        <img id="noprod-foto" src="noprod.jpg">`
    }else{
        contenedor_productos.classList.remove("no-resultados")
        renderizar(filtro, contenedor_productos, crearProducto)
    }

})


InicializarTienda()

const filtros_sticky_ul = document.querySelector(".filtros > ul")

//Evento para colocar el menú de filtros en posición horizontal
modo_vertical.addEventListener("click", ()=>{
    if(!seccion_productos_filtros.classList.contains("vertical")){
        seccion_productos_filtros.classList.add("vertical")
        container_filtros.classList.add("vertical")
        filtros_sticky.classList.add("vertical")
        filtros_sticky_ul.classList.add("vertical")
    }else{
        seccion_productos_filtros.classList.remove("vertical")
        container_filtros.classList.remove("vertical")
        filtros_sticky.classList.remove("vertical")
        filtros_sticky_ul.classList.remove("vertical")
    }
    
})

//Colocamos los elementos básicos de la tienda, productos y categorias para filtrar
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
            contenedor_productos.classList.remove("no-resultados")
            
            if(pulsado.innerText==="Todos"){
                filtro = [...productos]
            }else{
                filtro = productos.filter(item => item.category===pulsado.innerText)
            }
            renderizar(filtro, contenedor_productos, crearProducto)
        }
    })
}

//Funcion para crear el producto en el contenedor principal
function crearProducto(p){
    const producto = document.createElement("article");
    producto.className="producto"
    producto.setAttribute("data-id", p.id)
    producto.innerHTML = `  <div class="foto-producto">
                                <img src="${p.image}" alt="">
                                <i id="ampliar" class="fa-solid fa-eye"></i>
                            </div>
                            <div class="datos-producto">
                                <h2>${p.name}</h2>
                                <h3>A la venta por ${p.price} €</h3>
                                <h3>Producto de la categoría ${p.category}</h3>
                                <h4>Disponible desde el ${p.date}</h4>
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
        contenido_modal.setAttribute("data-product", id)

        const producto_buscado = productos.find(item => item.id === id);
        contenido_modal.innerHTML=`<img src="${producto_buscado.image}" alt="">
                                    <h3>${producto_buscado.name}</h3>
                                    <h3>${producto_buscado.price} €</h3>
                                    <h4>ID del producto: ${producto_buscado.id}</h4>
                                    <button class="añadir-producto">Añadir al carrito</button>`;

        modal_productos.classList.add("mostrar")
        const añadir_carrito = contenido_modal.querySelector(".añadir-producto")

        añadir_carrito.addEventListener("click", (evento)=>{
            const product_id = evento.target.parentElement.getAttribute("data-product")
            const producto_buscar = productos.find(item => item.id===product_id)

            const producto_creado = crearProductoCarrito(producto_buscar)
            carrito.appendChild(producto_creado)
            recuento_carrito.push(producto_buscar)
            localStorage.setItem("carrito", JSON.stringify(recuento_carrito))

            muestraMensaje("Producto añadido correctamente")
        })
    }) 
    return producto
}


//Funcion que crea los productos en el carrito
function crearProductoCarrito(producto){
    const prod_carrito = document.createElement("div")
    prod_carrito.classList.add("producto-carrito")
    prod_carrito.setAttribute("data-product", producto.id)
    prod_carrito.innerHTML = `<img src="${producto.image}" alt="">
                        <div class="contenido">
                            <span class="nombre-producto">${producto.name}</span>
                            <span class="precio-producto">${producto.price} €</span>
                            <div class="botones-carrito">
                                <button>
                                    Cantidad <i class="fa-solid fa-plus"></i>
                                </button>
                                <button>
                                    Eliminar <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>`
    return prod_carrito;    
}

//Funcion que imprime los productos en un contenedor con una estructura determinada
function renderizar(lista_productos, contenedor_dom, crear_dom){
    contenedor_dom.innerHTML="";
    lista_productos.forEach((item)=>{
        const dom_prod = crear_dom(item)
        contenedor_dom.appendChild(dom_prod)
    })
}

//Funcion para agregar ceros al mes o dia si hace falta
function cerosFecha(fecha){
    if(fecha < 10){
        return `0${fecha}`
    }else{
        return fecha
    }
}

//Funcion que transforma la fecha de los inputs a una marca de tiempo para poder compararse
function formatoFecha(fecha){
    let array_fecha = fecha.split("-")
    let fecha_nueva = new Date(array_fecha[0], array_fecha[1]-1, array_fecha[2])
    fecha_nueva.setHours(0,0,0,0)
    
    return fecha_nueva.getTime()
}

//Funcion que transforma la fecha de los objetos a una marca de tiempo para poder compararse
function formatoFechaObjeto(fecha){
    let array_fecha = fecha.split("/")
    let fecha_nueva = new Date(array_fecha[0], array_fecha[1]-1, array_fecha[2])
    fecha_nueva.setHours(0,0,0,0)
    
    return fecha_nueva.getTime()
}

//Funcion que muestra un mensaje por pantalla cada vez que se añade un producto al carrito
function muestraMensaje(mensaje){
    contenedor_mensajes.innerHTML=`<span>${mensaje}</span>`;
    contenedor_mensajes.classList.add("mostrar-mensaje")
    setTimeout(()=>{
        contenedor_mensajes.innerHTML=""
        contenedor_mensajes.classList.remove("mostrar-mensaje")
    },2500)
}