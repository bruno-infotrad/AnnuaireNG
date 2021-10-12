import { ActivatedRoute, Router } from '@angular/router';
import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.css"],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: FileUploadComponent
      },
      {
          provide: NG_VALIDATORS,
          multi: true,
          useExisting: FileUploadComponent
      }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, Validator {

    @Input()
    requiredFileType:string = 'jpg';

    fileName = '';

    fileUploadError = false;

    fileUploadSuccess = false;

    id = this.route.snapshot.params.id;


    uploadProgress:number = 0;

    onChange = (fileName:string) => {};

    onTouched = () => {};

    onValidatorChange = () => {};

    disabled : boolean = false;

    constructor( private route: ActivatedRoute, private router: Router, private http: HttpClient) {


    }

    onClick(fileUpload: HTMLInputElement) {
        this.onTouched();
        fileUpload.click();
    }

    onFileSelected(event:any) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("id", this.id);
            formData.append("thumbnail", file);

            this.fileUploadError = false;

            this.http.post("http://localhost:8080/api/users/thumbnail-upload/"+this.id, formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                catchError(error => {
                    this.fileUploadError = true;
                    return of(error);
                }),
                finalize(() => {
                    this.uploadProgress = 0;
                })
            )
            .subscribe(event => {
                if (event.type == HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                }
                else if (event.type == HttpEventType.Response) {
                    this.fileUploadSuccess = true;
                    this.onChange(this.fileName);
                    this.onValidatorChange();
                }
            });



        }

    }

    writeValue(value: any) {
        this.fileName = value;
    }

    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    registerOnValidatorChange(onValidatorChange: () => void) {
        this.onValidatorChange = onValidatorChange;
    }

    validate(control: AbstractControl): ValidationErrors | null {

        if (this.fileUploadSuccess) {
            return null;
        }

        let errors: any = {
            requiredFileType: this.requiredFileType
        };

        if (this.fileUploadError) {
            errors.uploadFailed = true;
        }

        return errors;
    }




}
