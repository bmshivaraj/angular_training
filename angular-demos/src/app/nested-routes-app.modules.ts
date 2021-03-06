import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/nested-routes-demo/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { JavaComponent } from './components/nested-routes-demo/java/java.component';
import { AngularComponent } from './components/nested-routes-demo/angular/angular.component';
import { NodeComponent } from './components/nested-routes-demo/node/node.component';

import { AngularjsComponent } from './components/nested-routes-demo/angular/angularjs/angularjs.component';
import { Angular7Component } from './components/nested-routes-demo/angular/angular7/angular7.component';
import { BoxDirective } from '@directives/box.directive';
import { DirectiveDemoComponent } from '@components/nested-routes-demo/directive-demo/directive-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '@components/nested-routes-demo/employee-form/employee-form.component';
import { Ng1AppComponent } from '@components/nested-routes-demo/ng1-app/ng1-app.component';

// import { BoxDirective } from './directives/box.directive';


const routesConfig: Routes = [
    
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'java'
    },
    {
        path: 'java',
        component: JavaComponent
    },
    {
        path: 'angular',
        component: AngularComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'angular7'
            },
            {
                path: 'angular7',
                component: Angular7Component
            },
            {
                path: 'angularjs',
                component: AngularjsComponent
            }
        ]
        
    },
    {
        path: 'nodejs',
        component: NodeComponent
    },
    {
        path: 'directives-demo',
        component: DirectiveDemoComponent
    },
    {
        path: 'employee-form',
        component: EmployeeFormComponent
    }
];
@NgModule(
    {
        declarations: [
            HomeComponent,
            JavaComponent,
            NodeComponent,
            AngularComponent,
            Angular7Component,
            AngularjsComponent,
            BoxDirective,
            DirectiveDemoComponent,
            EmployeeFormComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forRoot(routesConfig, {useHash: true})
        ],
        bootstrap:[
            HomeComponent
        ]

    }
)
export class NestedRoutesAppModule {}
