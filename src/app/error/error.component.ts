import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
import { ErrorService } from '../error.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  hostViewContainerRef: ViewContainerRef;
  private closeSub: Subscription;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.showErrorAlert(this.errorService.lastError);
  }
  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    this.hostViewContainerRef = this.alertHost.viewContainerRef;
    this.hostViewContainerRef.clear();

    const componentRef = this.hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.hostViewContainerRef.clear();
    });
  }
}
