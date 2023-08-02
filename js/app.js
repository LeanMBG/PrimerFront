const ingresos = [
    new Ingreso('Sueldo', 2100.00),
    new Ingreso('Venta auto', 1500)
];

const egresos = [
    new Egreso('Alquiler departamento', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = ()=>{
    cargarCabecera();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

// actualiza elementos html de la cabecera
let cargarCabecera = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//doy formato a tipo moneda
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}
//doy formato a tipo porcentaje
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

// muestra ingresos en cod html usando JS
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML; //recupero div por id
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}


//busco y elimino ingresos por ID

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecera();
    cargarIngresos();
}

// carga de gastos/egresos

const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}


const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}


//busco y elimino egresos por ID

let eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecera();
    cargarEgresos();
}


//func que agrega a la lista de egreso o ingreso

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    
    //validacion y recupero de dato value en box 
    if(descripcion.value !== '' && valor.value !== ''){
        //si es ingr creo obj ingreso
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecera();
            cargarIngresos();
        }
        //sino creo nvo obj egreso
        else if(tipo.value === 'egreso'){
        egresos.push( new Egreso(descripcion.value, +valor.value));
        cargarCabecera();
        cargarEgresos();
        }
    }
}