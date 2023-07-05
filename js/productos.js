const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        // url:'http://localhost:5000/productos', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://martinmora.pythonanywhere.com/productos',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        imagen:"",
        descripcion:"",
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(producto) {


            Swal.fire({
                title: 'Quieres eliminar realmente este libro?',
            
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Saved!', '', 'success')
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Libro Eliminado.',
                    showConfirmButton: false,
                    timer: 2000
                    })
      
                  const url = this.url+'/' + producto;
                  var options = {
                    method: 'DELETE',
                  }
                  fetch(url, options)
                      .then(res => res.text()) // or res.json()
                      .then(res => {
      
      
                          setTimeout(function(){ 
                            location.reload();
                          }, 2500);
      
                      })
                } 
              })



        },
        grabar(e){
            let producto = {
                nombre:this.nombre,
                descripcion:this.descripcion,
                imagen:this.imagen
            }

            if(!this.nombre || !this.descripcion){
                        
                Swal.fire('Completa datos del libro, por favor.')
                e.preventDefault();
            }
           
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
                
            }
            fetch(this.url, options)
                .then(function () {
                   
    
                        
                        console.log("pasa por aca");
                        
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Libro guardado.',
                            showConfirmButton: false,
                            timer: 2000
                          })

                        setTimeout(function(){
                            
                            window.location.href = "./index.html";
                        }, 2500);
                        
                        
                        
    
                    
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")
                })
               
        }
        
    },
    
    created() {
        this.fetchData(this.url)
        
    },
  }).mount('#app')
