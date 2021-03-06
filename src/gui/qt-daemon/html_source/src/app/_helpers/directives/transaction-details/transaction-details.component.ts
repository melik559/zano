import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Transaction} from '../../models/transaction.model';
import {VariablesService} from '../../services/variables.service';
import {BackendService} from '../../services/backend.service';
import {IntToMoneyPipe} from '../../pipes/int-to-money.pipe';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {

  @Input() transaction: Transaction;
  @Input() sizes: Array<number>;
  inputs: Array<string> = [];
  outputs: Array<string> = [];

  constructor(private variablesService: VariablesService, private backendService: BackendService, private intToMoneyPipe: IntToMoneyPipe) {}

  ngOnInit() {
    for (const input in this.transaction.td['rcv']) {
      if (this.transaction.td['rcv'].hasOwnProperty(input)) {
        this.inputs.push(this.intToMoneyPipe.transform(this.transaction.td['rcv'][input]));
      }
    }
    for (const output in this.transaction.td['spn']) {
      if (this.transaction.td['spn'].hasOwnProperty(output)) {
        this.outputs.push(this.intToMoneyPipe.transform(this.transaction.td['spn'][output]));
      }
    }
  }

  openInBrowser(tr) {
    this.backendService.openUrlInBrowser('explorer.zano.org/transaction/' + tr);
  }

  ngOnDestroy() {}
}
