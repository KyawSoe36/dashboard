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

  // ::TODO finance value for the bugetGraph data

  constructor(private dataService: DataService) {
    this.employees = [];
    this.mockApiData = [];
    this.analyticsData = Analytics;
    this.finance = finance;
    this.data = Analytics;
    this.investment = investmentConst;
    this.transaction = transaction;
    this.quickTransfers = quickTransfers;

    console.log("Investment value", this.investment);




    this.lineChartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        },
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
        width: 400,
        type: "donut"
      },
      plotOptions: {
        pie: {
          innerRadius: 500
        }
      },
      legend: {
        formatter: function (val: any, opts: any) {
          const customLabels = ["Label1", "Label2", "Label3", "Label4", "Label5"];
          console.log("DAta loggging for the legend formatter", customLabels);
          return '';
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opts: any) {
          console.log("DAta label of the formatter of console");
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
              width: 200
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
        type: "area",
        toolbar: {
          show: false, // Hide the entire toolbar
          autoSelected: 'zoom' // Optional: Set the initial selected tool (e.g., 'zoom', 'pan', 'selection')
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


    console.log("Get call from the service", this.analyticsData);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  
  getAvatarText(user :any) {
    if(!user) return '?';
    console.log("Get avalater tesst",user.charAt(0));
    return user.charAt(0) ;
  }

  ngOnInit() {

    this.dataService.getSampleApiCall().subscribe((resp) => {
      this.employees = resp;
      console.log("Data from the employeeds", this.employees);
    });

    this.dataService.getMockApiCallJsonFile().subscribe((data) => {
      this.mockApiData = data;
      console.log("Data from the employeeds", this.mockApiData);
    });


  }






}
