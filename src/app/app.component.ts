import { Component } from '@angular/core';
// import { JsonService } from './json.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Souldle';
  // title = 'FCT_retos';
  // jsonData: any[] = [];

  // // Formulario Reactivo
  // form = new FormGroup({
  //   prueba: new FormControl('', [Validators.required, Validators.minLength(1)])
  // });

  // constructor(private jsonService: JsonService) {}

  // ngOnInit(): void {
  //   this.cargarDatos();
  // }

  // cargarDatos(): void {
  //   this.jsonService.obtenerJson().subscribe(data => {
  //     this.jsonData = data;
  //     console.log(this.jsonData);
  //   });
  // }

  // crearDatos(): void {
  //   if (this.form.invalid) {
  //     alert('El campo no puede estar vacío');
  //     return;
  //   }

  //   const nuevoDato = { prueba: this.form.value.prueba };

  //   this.jsonService.crearJson(nuevoDato).subscribe(response => {
  //     console.log('Dato creado:', response);
  //     this.form.reset(); // Limpiar el formulario
  //     this.cargarDatos(); // Recargar los datos
  //   });
  // }
}
