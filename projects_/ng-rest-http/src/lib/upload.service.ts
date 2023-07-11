import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) { }

    // file from event.target.files[0]
    uploadFile(url: string, file: File): Observable<HttpEvent<any>> {

        const formData = new FormData();
        formData.append('upload', file);

        const params = new HttpParams();

        const options = {
            params: params,
            reportProgress: true,
        };

        /*
        const options = {
            headers: new HttpHeaders().set('Authorization', this.loopBackAuth.accessTokenId),
            params: params,
            reportProgress: true,
            withCredentials: true,
        }
        */

        const req = new HttpRequest('POST', url, formData, options);
        return this.http.request(req); // return event
    }
}

/* in your component
// At the drag drop area
  // (drop)="onDropFile($event)"
onDropFile(event: DragEvent) {
    event.preventDefault();
    this.uploadFile(event.dataTransfer.files);
}

// At the drag drop area
// (dragover)="onDragOverFile($event)"
onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
}

// At the file input element
// <input type="file" (change)="selectFile($event)" name="file" />
selectFile(event) {
    this.uploadFile(event.target.files);
}

uploadFile(files: FileList) {
    if (files.length == 0) {
        console.log("No file selected!");
        return
    }
    let file: File = files[0];

    this.upload.uploadFile(this.appCfg.baseUrl + "/api/flash/upload", file)
    .subscribe(
        event => {
            if (event.type == HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% loaded.`);
            } else if (event instanceof HttpResponse) {
                console.log('File is completely loaded!');
            }
        },
        (err) => {
            console.log("Upload Error:", err);
        }, () => {
            console.log("Upload done");
        }
    )
}
  */
