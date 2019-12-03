import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable, MatSnackBar } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { CmContactService } from '../../mock';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: []
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() displayedColumns;
  @Input() totalRecords;
  @Input() tableData;

  @Output() pageEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  colNames: any;
  dataCols: any;
  dataSource = new MatTableDataSource();
  rowData: any;
  message: string;
  contactsSubscription: Subscription;

  constructor(private cmContactService: CmContactService) { }

  /**
   * Component to make reusable table
   */

  ngOnInit() {
    this.dataCols = this.displayedColumns ? this.displayedColumns.map((col) => col.columnDef) : '';
  }

  ngOnChanges() {
    this.getDataSource();
    this.updateData();
  }

  /**
   * Method to fetch all the data to make the DataSource
   */
  getDataSource() {
    this.contactsSubscription = this.cmContactService.allContacts().subscribe((obj) => {
      this.tableData = obj;
    });
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Method to update the DataSource after Add and Edit operations
   */
  updateData() {
    let that = this;
    this.cmContactService.contactAdded.subscribe(response => {
      if (typeof (response) === 'object') {

        if (this.tableData  && this.tableData[response['id']]) {
          this.tableData[response['id']] = response;
        } else {
          that.tableData.push(response);
        }
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  /**
   * Method to filter the data
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Method to select row data on click
   */
  rowSelection(event) {
    console.log('Row Click', event);
    this.cmContactService.rowSelection(event);
  }

  ngOnDestroy() {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }

}
