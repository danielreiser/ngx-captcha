[![npm version](https://badge.fury.io/js/ngx-captcha.svg)](https://badge.fury.io/js/ngx-captcha)
[![Build Status](https://api.travis-ci.org/Enngage/ngx-captcha.svg?branch=master)](https://travis-ci.org/Enngage/ngx-captcha)
[![NPM](https://nodei.co/npm/ngx-captcha.png?mini=true)](https://nodei.co/npm/ngx-captcha/)

## Angular Captcha

Google reCaptcha implementation for Angular 6 and beyond. 

Live example: [https://enngage.github.io/ngx-captcha/](https://enngage.github.io/ngx-captcha/)

## Installation

```javascript
npm install ngx-captcha
```

Import `NgxCaptchaModule ` to your module (i.e. `AppModule`). You can configure global keys with `forRoot` (optionally) or you can use `siteKey` input parameter of captcha components.
Depending on whether you want to use [reactive forms](https://angular.io/guide/reactive-forms) or [template-driven forms](https://angular.io/guide/forms) you need to include the appropriate modules, too.
Add `ReactiveFormsModule` to your imports in case you want to use reactive forms. If you prefer the the template-driven approach simple add the `FormsModule` to your module. 
Both can be imported from `@angular/forms`. In the demo project you can check out the *normal* demo to see how to use reactive forms or
the *invisible* demo to see what the template-driven approach looks like. With the template-driven approach you don't necessarily need to use a from element to wrap the component, you can instead use the `[ngModelOptions]="{ standalone: true }"`.
However, using it with the standalone option is not recommended but can be used if needed. 

```javascript
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: 'xxxx', // optional, can be overridden with 'siteKey' component property
      invisibleCaptchaSiteKey: 'yyy' // optional, can be overridden with 'siteKey' component property
    }),
  })

export class AppModule { }
```

## Usage
The configuration properties are a copy of the official ones that google provides. For explanation of what these properties do and how to use them, please refer to [https://developers.google.com/recaptcha/docs/display](https://developers.google.com/recaptcha/docs/display) and [https://developers.google.com/recaptcha/docs/invisible](https://developers.google.com/recaptcha/docs/invisible).

### reCaptcha2

your.component.ts
```javascript
export class YourComponent implements OnInit {
  protected aFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
}

```

your.template.html
```html
<form [formGroup]="aFormGroup">
  <ngx-recaptcha2
    [size]="size"
    [hl]="lang"
    [theme]="theme"
    [type]="type"
    (expire)="handleExpire()"
    (load)="handleLoad()"
    (success)="handleSuccess($event)"
    formControlName="recaptcha">
  </ngx-recaptcha2>
</form>
```

### Invisible captcha

```html
<form [formGroup]="aFormGroup">
  <ngx-invisible-recaptcha
    [type]="type"
    [badge]="badge"
    (load)="handleLoad()"
    (success)="handleSuccess($event)"
    formControlName="recaptcha">
  </ngx-invisible-recaptcha>
</form>
```
