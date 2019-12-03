import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: SHARED_MODULES,
  exports: [
    ...SHARED_MODULES
  ],
  declarations: []
})
export class CmSharedModule { }
