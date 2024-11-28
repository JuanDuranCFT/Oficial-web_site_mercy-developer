import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudesContactosService } from '../../servicios/solicitudes-contactos/solicitudes-contactos.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
  formularioForm: FormGroup;
  datos_formulario: any;
  solicitudes_recibidas: any;

  constructor(
    private formBuild: FormBuilder,
    private solicitudesContactosSrv: SolicitudesContactosService
  ) {
    this.formularioForm = this.formBuild.group({
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      mensaje: ''
    });
  }

  enviarDatos() {
    this.datos_formulario = this.formularioForm.value;

    console.log('Datos enviados:', this.datos_formulario); // Verificar datos
    this.solicitudesContactosSrv.registrarFormulario(this.datos_formulario).subscribe(
      (response: any) => {
        if (response.solicitud_formulario) {
          alert('Datos guardados correctamente');
          console.log('Respuesta del servidor:', response.solicitud_formulario);
          this.formularioForm.reset();
        }
      },
      (error) => {
        console.error('Error al guardar los datos:', error);
      }
    );
  }

  obtenerTodasSolicitudes() {
    this.solicitudesContactosSrv.obtenerTodasSolicitudes().subscribe(
      (response: any) => {
        this.solicitudes_recibidas = response.solicitud_formulario;
        console.log('Solicitudes recibidas:', this.solicitudes_recibidas);
      },
      (error) => {
        console.error('Error al obtener las solicitudes:', error);
      }
    );
  }
}
