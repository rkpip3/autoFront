import {
  OnInit,
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserService } from "../../shared/user.service";
import { Router, NavigationStart } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { add_New_User } from "../../models/add_New_User.model";
import { NgxSpinnerService } from "ngx-spinner";

import * as BpmnJS from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { importDiagram } from "./rx";
import { throwError,Observable } from "rxjs";


import Modeler from 'bpmn-js/lib/Modeler.js';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
// import * as camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';
// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';


@Component({
  selector: "app-business-process",
  templateUrl: "./business-process.component.html",
  styleUrls: ["./business-process.component.css"],
})
// export class  implements ngAfterContentInit, AfterContentInit, OnChanges, OnDestroy
export class BusinessProcessComponent implements OnInit {
  diagramUrl ="https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn";
  importError?: Error;
  modeler: Modeler;

  constructor() {}

  handleImported(event) {
    console.log("evnt 1 ");
    const { type, error, warnings } = event;

    if (type === "success") {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === "error") {
      console.error("Failed to render diagram", error);
    }

    this.importError = error;
  }

  ngOnInit() {}
}
