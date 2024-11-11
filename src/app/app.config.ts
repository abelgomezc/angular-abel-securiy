import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage'; 

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideFirebaseApp(() => initializeApp({
    "projectId":"subirimagenfirebase-f18c5",
    "appId":"1:1020443969060:web:5440e05b7cbe4b6bbd3ab1",
    "databaseURL":"https://subirimagenfirebase-f18c5-default-rtdb.firebaseio.com",
    "storageBucket":"subirimagenfirebase-f18c5.appspot.com",
 
    "apiKey":"AIzaSyD37tUDu-va9ycVeNK50KW81BA4lW69nDQ",
    "authDomain":"subirimagenfirebase-f18c5.firebaseapp.com",
    "messagingSenderId":"1020443969060"})),
     provideFirestore(() => getFirestore()),
     provideStorage(() => getStorage())
    
    ] // Agrega Firebase Storage aquí]
};
