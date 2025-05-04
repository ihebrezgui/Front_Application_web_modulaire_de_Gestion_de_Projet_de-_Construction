import { Component, OnInit } from '@angular/core';
import { PPE } from '../safety-management/PPE';
import { PPEService } from '../PPE.service';

@Component({
  selector: 'app-ppe-frontlist',
  templateUrl: './ppe-frontlist.component.html',
  styleUrls: ['./style2.css']
})
export class PPEFrontlistComponent implements OnInit {
  ppeList: PPE[] = []; // Store PPE data

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.getPPEList();
    this.loadChatbase();
  }

  private loadChatbase(): void {
    const existingScript = document.getElementById('4jQ7rr-L43pZzIuFqUgxi');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = '4jQ7rr-L43pZzIuFqUgxi';
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
  
      // Chatbase initialization
      const initScript = document.createElement('script');
      initScript.innerHTML = `
        (function(){
          if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...arguments) => {
              if (!window.chatbase.q) {
                window.chatbase.q = [];
              }
              window.chatbase.q.push(arguments);
            };
            window.chatbase = new Proxy(window.chatbase, {
              get(target, prop) {
                if (prop === "q") {
                  return target.q;
                }
                return (...args) => target(prop, ...args);
              }
            });
          }
        })();
      `;
      document.body.appendChild(initScript);
    }
  }

  private getPPEList(): void {
    this.ppeService.getPPEList().subscribe(data => {
      this.ppeList = data;
    });
  }


  deletePPE(id: number): void {
    this.ppeService.deletePPE(id).subscribe(() => {
      this.ppeList = this.ppeList.filter(ppe => ppe.ppe_id !== id);
    });
  }
}
