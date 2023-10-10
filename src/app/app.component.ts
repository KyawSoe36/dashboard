import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ThemeService } from './service/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  isChecked = false;
  isSidenavOpen = false;
  isSmallScreen = false;

  

  getCurrentTheme(): string {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme():void{
     this.themeService.toggleTheme();
  }

  constructor(private observer: BreakpointObserver, private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private themeService: ThemeService
  ) {
    

    this.matIconRegistry.addSvgIcon(
      "arrow-down-right",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/arrow-down-right.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "squares-2x2",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/squares-2x2.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "wallet",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/wallet.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "arrows-right-left",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/arrows-right-left.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "circle-stack",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/circle-stack.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "currency-dollar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/currency-dollar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "arrow-trending-up",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/arrow-trending-up.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "user",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/user.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "chat-bubble-oval-left",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/chat-bubble-oval-left.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "cog",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/cog.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "arrow-right-on-rectangle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/arrow-right-on-rectangle.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "magnifying-glass",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/magnifying-glass.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "magnifying-glass",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/magnifying-glass.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "business-woman",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/business-woman.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "envelope",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/envelope.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "bars-3",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/bars-3.svg")
    );
    
    
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.isSmallScreen = res.matches;
          this.isSidenavOpen = !res.matches;

        } else {
          this.isSmallScreen = false;
          this.isSidenavOpen = true;
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  toggleSidenav(sidenav: MatSidenav): void {
    if (this.isSmallScreen) {
      sidenav.toggle();
    } else {
      this.isSidenavOpen = !this.isSidenavOpen;
    }
  }
}