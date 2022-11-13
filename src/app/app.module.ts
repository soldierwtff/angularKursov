import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { CourseItemCardComponent } from './course-item-card/course-item-card.component';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserFormComponent } from './user-form/user-form.component';
import { UserItemComponent } from './user-item/user-item.component';

const routes:Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'list',
    component:MainComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'create',
    component:CourseFormComponent,
    canActivate:[AuthGuard,AdminGuard]
    
  },
  {
    path:'editCourse/:id',
    component:CourseFormComponent,
    canActivate:[AuthGuard,AdminGuard]
  },
  {
    path:'editUser/:userID',
    component:UserFormComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CourseItemCardComponent,
    CourseFormComponent,
    LoginComponent,
    UserFormComponent,
    UserItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
