import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import { InvisibleReCaptchaComponent } from '../../projects/ngx-captcha-lib/src/public_api';

declare var hljs: any;

@Component({
  selector: 'ngx-invisible-recaptcha-demo',
  templateUrl: './invisible-recaptcha-demo.component.html',
})
export class InvisibleReCaptchaDemoComponent implements AfterViewInit {

  public readonly exampleCode = `<ngx-invisible-recaptcha #captchaElem
  [type]="type"
  [badge]="badge"
  (load)="handleLoad()"
  (success)="handleSuccess($event)"
  [ngModelOptions]="{ standalone: true }">
</ngx-invisible-recaptcha>
`;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaResponse?: string;
  public captchaIsReady = false;

  public badge: 'bottomright' | 'bottomleft' | 'inline' = 'inline';
  public type: 'image' | 'audio';

  protected recaptcha: any = null;

  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;
  @ViewChild('langInput') langInput: ElementRef;


  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
      this.captchaIsLoaded = true;
      this.cdr.detectChanges();
      this.highlight();
  }

  execute(): void {
    this.captchaElem.execute();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.cdr.detectChanges();
  }

  handleReady(): void {
    this.captchaIsReady = true;
    this.cdr.detectChanges();
  }

  changeBadge(badge: 'bottomright' | 'bottomleft' | 'inline' = 'bottomright'): void {
    this.badge = badge;
  }

  changeType(type: 'image' | 'audio'): void {
    this.type = type;
  }

  getResponse(): void {
    const response = this.captchaElem.getResponse();
    if (!response) {
      alert(`There is no response from grecaptcha script - try using 'getCurrentResponse' method or subscribe to 'success' event`);
    } else {
      alert(response);
    }
  }

  reload(): void {
    this.captchaElem.reloadCaptcha();
  }

  getCaptchaId(): void {
    alert(this.captchaElem.getCaptchaId());
  }

  reset(): void {
    this.captchaElem.resetCaptcha();
  }

  getCurrentResponse(): void {
    const currentResponse = this.captchaElem.getCurrentResponse();
    if (!currentResponse) {
      alert('There is no current response - have you submitted captcha?');
    } else {
      alert(currentResponse);
    }
  }

  private highlight(): void {
    const highlightBlocks = document.getElementsByTagName('code');
    for (let i = 0; i < highlightBlocks.length; i++) {
      const block = highlightBlocks[i];
      hljs.highlightBlock(block);
    }
  }
}
