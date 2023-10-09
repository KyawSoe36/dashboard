// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = 'light';

  toggleTheme() {
      console.log("Service method before from call",this.currentTheme);
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      console.log("Service method after from call",this.currentTheme);
        return this.currentTheme;
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
}
