import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Observable, catchError, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class AppComponent {
  title = 'lpa-example';
  env = environment;
  url = "http://localhost:8080/ViewerAngularLPA/EntryServlet";
  getImageUrl = "http://localhost:8081/images/";
  //absolutePath= "C:/Users/nicol/OneDrive/Documents/frontend projects/lpa-example/src/assets/imagenes de muestra";
  //finalPath :string | undefined = 'images/Ave.jpg';
  selectedFile!: File;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  post(url: string, json: string) :Observable<Object> {
    return this.httpClient.post(url, json);
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'reportProgress': 'true',
        'responseType': 'json'
    })
  };

  get(url: string) :Observable<any> {
    //return this.httpClient.get(url);
    const req = new HttpRequest('GET', `${url}`, this.httpOptions)
    return this.httpClient.request(req);
  }
  get2(url: string) :Observable<HttpEvent<String>> {
    //return this.httpClient.get(url);
    const req = new HttpRequest('GET', `${url}`, this.httpOptions)
    return this.httpClient.request(req);
  }

  /*
  update(file: FileDB | undefined): Observable<HttpEvent<FileDB>> {
    const req = new HttpRequest('PUT', `${this.baseUrl}`+this.api+'/update', file)
    return this.http.request(req);
  }
  */

  mkImageUrl(url: string, fileName: string) {
    return url + fileName;
  }

  getBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //resolve(reader.result?.toString() || '')
        let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '')
        if (encoded && (encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4))
        }
        //resolve(encoded!)
        //console.log("Encode: ", encoded)
        resolve(encoded? encoded : '') // pruebo esto
      } 
      reader.onerror = error => reject(error);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    let ext: string = this.selectedFile.type.split('/')[1];
    let name: string = this.selectedFile.name.split('.')[0];
    /*
    console.log("Selected File name: ", this.selectedFile.name)
    let getServiceImageUrl = this.mkImageUrl(this.getImageUrl, this.selectedFile.name)
    console.log("final URL: ", getServiceImageUrl)
    this.get(getServiceImageUrl)
    //.pipe(filter(e => e instanceof HttpResponse))
    .subscribe((event: any) => {
      console.log("Esto es e: ", event);
    }),
    () => {
        console.log("Hubo un error")
    }
    */
    
    this.getBase64(this.selectedFile).then((base64) => {
      let post = {
        image: base64,
        extension: ext,
        name: name 
      };
      this.post(this.url, JSON.stringify(post))
      .subscribe({
        next: _ => {
          window.open(environment.daejaViewer);
        },
        error: error => {
            console.error('There was an error!', error);
        }
      })
    });

  }



  /*
  onClick(item: any) {
    //let reverse = this.reverseString(item);
    //let index = reverse.indexOf("/");
    //let slice = reverse.slice(0, index);
    //let imageName = this.reverseString(slice);
    //let finalPath = `${this.absolutePath}/${imageName}`;
    let tmpPath: string | undefined = this.changePath(); // Pruebo F5 del navegador
    this.finalPath = tmpPath;
    let post = { 
      image: tmpPath 
    };
    this.post(this.url, JSON.stringify(post))
    .subscribe({
      next: _ => {
          window.open(environment.daejaViewer); // Va todo bien, entonces llamo al visor // Hacer que la rta del servicio sea la url del vsor
      },
      error: error => {
          console.error('There was an error!', error);
      }
    })
  }
  
  changePath() :string | undefined {
    let paths = ['images/file_example_TIFF_1MB.tiff', 'images/Ave.jpg', 'images/demo.jpeg', 'images/Flowers.jpg'] // Los distintos paths
    let elements: number = paths.length;
    let random: number = this.getRandomInt(elements);
    let choisePath: string | undefined = paths.at(random); 
    while(choisePath == this.finalPath) {
      random = this.getRandomInt(elements);
      choisePath = paths.at(random);
    }
      return choisePath;
  }
  

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  // Function to reverse string
  reverseString(str: string) {
    return str.split('').reverse().join('')
  }
  */

}
