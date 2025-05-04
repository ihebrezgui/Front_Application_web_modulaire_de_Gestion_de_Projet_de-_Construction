import { Component, OnInit } from '@angular/core';
import { PPEService } from '../PPE.service';

@Component({
  selector: 'app-safety-alerts',
  templateUrl: './safety-alerts.component.html',
  styleUrls: ['./safety-alerts.component.css', './style2.css']
})
export class SafetyAlertsComponent implements OnInit {
  alerts: string[] = [];

  constructor(private ppeService: PPEService) {}

  ngOnInit(): void {
    this.ppeService.getSafetyAlerts().subscribe((data) => {
      this.alerts = data;
    });
    this.ensureChatbotVisible();
  }
  
  ensureChatbotVisible(): void {
    const existingIframe = document.querySelector('iframe[src*="chatbase.co"]') as HTMLIFrameElement;
  
    if (existingIframe) {
      existingIframe.style.display = 'block'; // Re-show it if hidden
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = '4jQ7rr-L43pZzIuFqUgxi';
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);
    }
  }

  dismissAlert(index: number): void {
    this.alerts.splice(index, 1);
  }

  getAlertClass(alert: string): string {
    if (alert.toLowerCase().includes('out of service')) {
      return 'red-alert';
    } else {
      return 'yellow-alert';
    }
  }
}
