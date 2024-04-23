import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Manager CN';

  subMenusOpen: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuName: string): void {
    this.subMenusOpen[subMenuName] = !this.subMenusOpen[subMenuName];
  }

  isSubMenuOpen(subMenuName: string): boolean {
    return this.subMenusOpen[subMenuName];
  }
}
