console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        imagen:"",
        descripcion:"",
        url:'http://martinmora.pythonanywhere.com/productos/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre=data.nombre
                    this.imagen=data.imagen 
                    this.descripcion=data.descripcion                  
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar(e) {
            console.log("funciona")
            let producto = {
                nombre:this.nombre,
                descripcion:this.descripcion,
                imagen:this.imagen
            }

            if(!this.nombre || !this.descripcion){
                        
                Swal.fire('Completa datos para actualizar, por favor.')
                e.preventDefault();
            };
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Libro modificado correctamente.',
                        showConfirmButton: false,
                        timer: 2000
                      })

                    setTimeout(function(){
                            
                        window.location.href = "./index.html";             
                        
                    }, 2500);

                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
