import { Component, OnInit } from '@angular/core';
import { SolicitudesContactosService } from '../../servicios/solicitudes-contactos/solicitudes-contactos.service';

@Component({
  selector: 'app-solicitudes-contactos',
  templateUrl: './solicitudes-contactos.component.html',
  styleUrls: ['./solicitudes-contactos.component.css']
})
export class SolicitudesContactosComponent implements OnInit {
  solicitudes: any[] = [];

  constructor(private solicitudesService: SolicitudesContactosService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudesService.obtenerTodasSolicitudes().subscribe(
      (response: any) => {
        this.solicitudes = response.solicitud_formulario || [];
      },
      (error) => {
        console.error('Error al cargar solicitudes:', error);
      }
    );
  }
}
