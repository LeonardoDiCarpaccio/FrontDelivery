import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html",
    styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
    isSidebarOpen = true;
    constructor(private auth: AuthService) {}
    role: any;
    async ngOnInit() {
        this.role = await this.auth.getRole();
        console.log(this.role, "this.role");
    }
    Show: boolean = false;

    hideSidebar() {
        this.isSidebarOpen = false;
    }
    toggle() {
        this.Show = !this.Show;
    }
}
