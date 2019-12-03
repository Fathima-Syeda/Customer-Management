import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class CmCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CmCoreModule) {
    if (parentModule) {
      throw new Error('CmCoreModule can only be loaded in root module!');
    }
  }
}
