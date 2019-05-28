const formu = document.getElementById("formu")
const listaHTML = document.getElementById("listaProd")

let arreglo = []
let id = 0
let elementoGlobal
class Producto {
    constructor(name,price,year,id){
        this.name = name
        this.price = price
        this.year = year
        this.id = id
    }
}

class UI{
    addProduct(producto){
        arreglo.push(producto)/*nuevalinea */
        const lista = document.getElementById("listaProd")
        const element = document.createElement("div")
        element.innerHTML = ` 
        <div class="card mb-2">
            <div class="card-body">
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">NOMBRE DEL PRODUCTO</label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control-plaintext" value="${producto.name}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">PRECIO DEL PRODUCTO</label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control-plaintext" value="${producto.price}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">AÑO DEL PRODUCTO</label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control-plaintext" value="${producto.year}">
                    </div>
                    <input type="text" class="form-control" hidden value="${producto.id}">
                </div>
                <a href="#" class="btn btn-danger" name="delete">Eliminar</a> <a href="#" class="btn btn-success" name="update">Actualizar</a>
            </div>
        </div>
            `
        lista.appendChild(element)
    }
    deleteProduct(element){
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage("elemento borrado satisfactoriamente",'danger')
        }
    }
    showMessage(mensage,color){
        const div  = document.createElement("div")
        div.className  = `alert alert-${color} mt-2`
        div.appendChild(document.createTextNode(mensage) )
        const container = document.getElementsByClassName("container")[0]
        const app = document.getElementById("app")
        container.insertBefore(div,app)
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 1000);
    }
    
    updateProductForm(element){
        if(element.name === "update"){
            let nombre = document.getElementById("nombre")
            let precio = document.getElementById("precio")
            let año  = document.getElementById("año")
            let identificador = document.getElementById("identificador")
            identificador.hidden = false
            nombre.value = element.parentElement.childNodes[1].childNodes[3].childNodes[1].value
            precio.value = element.parentElement.childNodes[3].childNodes[3].childNodes[1].value
            año.value = element.parentElement.childNodes[5].childNodes[3].childNodes[1].value
            identificador.value = element.parentElement.childNodes[5].childNodes[5].value
        }
    }
    updateProductCard(element){
        let nombre = document.getElementById("nombre").value
        let precio = document.getElementById("precio").value
        let año  = document.getElementById("año").value
        let tempNombre = element.parentElement.childNodes[1].childNodes[3].childNodes[1].value = nombre
        let tempPrecio = element.parentElement.childNodes[3].childNodes[3].childNodes[1].value = precio
        let tempAño = element.parentElement.childNodes[5].childNodes[3].childNodes[1].value = año
        let identificador = element.parentElement.childNodes[5].childNodes[5].value
        for (let i = 0;i<arreglo.length;i++){
            if(identificador == arreglo[i].id){
                arreglo[i].name = tempNombre
                arreglo[i].price = tempPrecio
                arreglo[i].year = tempAño
            }
        }
        document.getElementById("identificador").hidden = true
        this.showMessage("elemento actualizado satisfactoriamente",'success')
    }
}

formu.addEventListener("submit",(e)=>{    
    let identificador = document.getElementById("identificador").value
    if(!identificador){
        const nombre = document.getElementById("nombre").value
        const precio = document.getElementById("precio").value
        const año  = document.getElementById("año").value
        const producto = new Producto(nombre,precio,año,id)
        const ui = new UI()
        ui.addProduct(producto)
        ui.showMessage("Producto agregado satisfactoriamente","primary")
        id++
    }else{
        const ui = new UI()
        ui.updateProductCard(elementoGlobal)
    }   
    
    e.preventDefault()
    formu.reset()
})

listaHTML.addEventListener("click",(e)=>{
    const ui = new UI()
    ui.deleteProduct(e.target)
})

listaHTML.addEventListener("click",(e)=>{
    const ui = new UI()
    ui.updateProductForm(e.target)
    elementoGlobal= e.target
})