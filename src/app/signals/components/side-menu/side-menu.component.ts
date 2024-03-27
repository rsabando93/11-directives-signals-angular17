import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string,
  route: string,
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  // Uso de Signals
  public menuItems = signal<MenuItem[]>([
    { title: 'Contador', route: 'counter' },
    { title: 'Usuarios', route: 'user-info' },
    { title: 'Mutaciones', route: 'properties' },
  ]);

  // Forma Tradicional
  // public menuItems: MenuItem[] = [
  //   { title: 'Contador', route: 'counter' },
  //   { title: 'Usuarios', route: 'user-info' },
  //   { title: 'Mutaciones', route: 'properties' },
  // ];

}
