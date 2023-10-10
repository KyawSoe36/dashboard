import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../data.service';
import { Analytics } from '../shared/dashboard';
import { finance } from '../shared/finance';
import { investmentConst } from '../shared/investment';
import { transaction } from '../shared/transactions';
import { quickTransfers } from '../shared/quick_transfers';
import { ApexOptions } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { ThemeService } from '../service/theme.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: any[];
  message: string;
  mockApiData: any[];
  analyticsData: any;
  data: any;
  chartOptions: any;
  chartConversions: any;
  finance: any;
  investment: any;
  donutChartOptions: any;
  lineChartOptions: any;
  transaction: any;
  quickTransfers: any;

  constructor(private dataService: DataService, private themeService: ThemeService) {
    this.employees = [];
    this.mockApiData = [];
    this.analyticsData = Analytics;
    this.finance = finance;
    this.data = Analytics;
    this.investment = investmentConst;
    this.transaction = transaction;
    this.quickTransfers = quickTransfers;

    this.lineChartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [4, 5, 8, 4, 8, 2]
        },
        {
          name: "Revenue",
          data: [6, 2, 2, 5, 6, 2]
        },
      ],
      chart: {
        type: "bar",
      },
      toolbar: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul"
        ]
      },
      yaxis: {
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " thousands";
          }
        }
      }
    };


    this.message = this.dataService.getMessage();

    const originalLabels = ['Supermarkets', 'Transfers', 'Restaurants', 'Cash', 'study', 'other']
    const originalData = [44, 55, 41, 17, 15];
    const combinedLabels = originalLabels.map((label, index) => `${label} - ${originalData[index]}`);

    this.donutChartOptions = {
      series: originalData,
      labels: combinedLabels,

      chart: {
        type: "donut"
      },

      legend: {
        formatter: function (val: any, opts: any) {
          const customLabels = ["Label1", "Label2", "Label3", "Label4", "Label5"];
          return '';
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opts: any) {
          return '';
        }
      },

      fill: {
        type: "gradient"
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%"
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };


    this.chartConversions = {
      chart: {
        animations: {
          enabled: false
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'area',
        sparkline: {
          enabled: true
        }
      },
      colors: ['#38BDF8'],
      fill: {
        colors: ['#38BDF8'],
        opacity: 0.5
      },
      series: this.data.conversions.series,
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        followCursor: true,
        theme: 'dark'
      },
      xaxis: {
        type: 'category',
        categories: this.data.conversions.labels
      },
      yaxis: {
        labels: {
          formatter: (val: number): string => `${val}`
        }
      }
    };

    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100, 29, 30, 120, 56, 78]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41, 20, 30, 32, 20, 39]
        }
      ],
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },

        height: '100%',
        width: '100%',
        type: "area",
        toolbar: {
          show: false, 
          autoSelected: 'zoom'
        },

      },
      colors: ['#3182CE', '#63B3ED'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yaxis: {
        type: "category",
        categories: [`$0k`, `$5k`, `$10k`, `$15k`, `$20k`]
      },
      legend: {
        show: false,
      },
    };
  }

  getCurrentTheme(): string {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getAvatarText(user: any) {
    if (!user) return '?';
    return user.charAt(0);
  }

  ngOnInit() {

    this.dataService.getSampleApiCall().subscribe((resp) => {
      this.employees = resp;
      console.log("Data from the employeeds", this.employees);
    });

  }

}
