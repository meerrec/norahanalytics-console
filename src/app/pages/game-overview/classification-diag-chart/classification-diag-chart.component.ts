import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

declare var d3;
declare var venn;

@Component({
  selector: 'ngx-classification-diag-chart',
  styleUrls: ['./classification-diag-chart.component.scss'],
  template: `
    <nb-card>
      <div class="col-sm-12">
        <div class="row p-3 bb-1">
          <div class="title">classification diag chart</div>
        </div>
        <div class="row">
        <div id="venn"></div>
            <!--<ngx-charts-line-chart-->
      <!--[scheme]="colorScheme"-->
      <!--[results]="multi"-->
      <!--[xAxis]="showXAxis"-->
      <!--[yAxis]="showYAxis"-->
      <!--[legend]="showLegend"-->
      <!--[showXAxisLabel]="showXAxisLabel"-->
      <!--[showYAxisLabel]="showYAxisLabel"-->
      <!--[xAxisLabel]="xAxisLabel"-->
      <!--[yAxisLabel]="yAxisLabel">-->
    <!--</ngx-charts-line-chart>-->
          <!--<chart type="pie" [data]="data" [options]="options"></chart>-->
        </div>
      </div>
    </nb-card>
  `,
})
export class ClassificationDiagChartComponent implements OnDestroy, AfterViewInit {
  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300,
        },
        {
          name: '2011',
          value: 8940,
        },
      ],
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870,
        },
        {
          name: '2011',
          value: 8270,
        },
      ],
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5002,
        },
        {
          name: '2011',
          value: 5800,
        },
      ],
    },
  ];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngAfterViewInit(){
    // setTimeout(() => {
    console.log(2)
// define sets and set set intersections
      var sets = [ {sets: ['Predicted Churn'], size: 20854},
        {sets: ['Observed Churn'], size: 15046},
        {sets: ['Predicted Churn','Observed Churn'], size: 13712}];

      var chart = venn.VennDiagram().width(500).height(300);;
      d3.select("#venn").datum(sets).call(chart);


    // }, 5000);
  }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
