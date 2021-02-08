import { Component, Input } from '@angular/core';
import { Employee } from './models/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employeeArray: Employee[] = [
    {id: 1, name: "Alex", correo: "medranomendezalex@gmail.com", country: "Republica Dominicana"},
    {id: 2, name: "Rosa", correo: "rosamaria@gmail.com", country: "Mexico"},
    {id: 3, name: "Robert", correo: "robertico_07@hotmail.com", country: "Estados Unidos"}
  ];

  selectedEmployee: Employee = new Employee();
  btnCheck: boolean = false;

  Drop(employee: Employee){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.employeeArray.forEach( (item, index) => {
          if(item === employee) this.employeeArray.splice(index,1);
        });

        Swal.fire(
          'Borrado!',
          'El contacto ha sido borrado con exito.',
          'success'
        )
      }
    })
  }

  DropAll(){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se eliminaran todos los contactos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.employeeArray.forEach(element => {
          this.employeeArray.pop();
        });
        this.employeeArray.pop();

        Swal.fire(
          'Contactos eliminados!',
          'Los contactos han sido borrados con exito.',
          'success'
        )
      }
    })
  }

  OpenEdit(employee: Employee){
    this.selectedEmployee = employee;
  }

  AddOrEdit(){
    var input:any = document.getElementsByClassName('form-control');
  
    var nombre = input[0].value;
    var correo = input[1].value;
    var pais = input[2].value;  

    if(nombre === ""){
      input[0].style.boxShadow = "0 0 0 1px rgba(255, 0, 0, 0.61)";
    } else{
      input[0].style.boxShadow = "0 0 0";
    }
    if(correo === ""){
      input[1].style.boxShadow = "0 0 0 1px rgba(255, 0, 0, 0.61)";
    } else{
      input[1].style.boxShadow = "0 0 0";
    }
    if(pais === ""){
      input[2].style.boxShadow = "0 0 0 1px rgba(255, 0, 0, 0.61)";
    } else{
      input[2].style.boxShadow = "0 0 0";
    }

    if(nombre !== "" && correo !== "" && pais !== ""){
      if(this.selectedEmployee.id === 0){
        this.selectedEmployee.id = this.employeeArray.length + 1;
        this.employeeArray.push(this.selectedEmployee);   
      }

      this.selectedEmployee = new Employee();
    } else{
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No deje campos vacios!',
      })
    }
  }
}
