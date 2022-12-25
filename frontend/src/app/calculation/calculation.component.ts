import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalculationService } from './calculation.service';
import {Chart, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit, AfterViewInit {

  parentChartLabel = [];
  parentChartData = [];
  parentBgColor = [];

  childrenChartLabel = [];
  childrenChartData = [];
  childrenBgColor = [];

  displayedColumns = ['position', 'assetName', 'assetTotal'];
  dataSource = [];

  constructor(private service: CalculationService) { }

  ngOnInit(): void {
    this.service.getAsset('parent').subscribe((datas) => {
      const modifiedData = (datas as any[]).map((val) => {
        return {
          ...val,
          totalAsset: val.product.price,
          backgroundColor: this.randomRgba(),
        }
      })
      const result = [];
      for (const data of modifiedData) {
        const findIndexData = result.findIndex((val) => val.parents_parent_id === data.parents_parent_id);
        if (findIndexData > -1) {
          result[findIndexData].totalAsset += data.product.price;
        } else {
          result.push(data);
        }
      }
      this.parentChartLabel = result.map((val) => val.parent.name);
      this.parentChartData = result.map((val) => val.totalAsset);
      this.parentBgColor = result.map((val) => val.backgroundColor);
      this.renderBarChart();
    });
    this.service.getAsset('children').subscribe((datas) => {
      const modifiedData = (datas as any[]).map((val) => {
        return {
          ...val,
          totalAsset: val.product.price,
          backgroundColor: this.randomRgba(),
        }
      })
      const result = [];
      for (const data of modifiedData) {
        const findIndexData = result.findIndex((val) => val.childrens_children_id === data.childrens_children_id);
        if (findIndexData > -1) {
          result[findIndexData].totalAsset += data.product.price;
        } else {
          result.push(data);
        }
      }
      this.childrenChartLabel = result.map((val) => val.children.name);
      this.childrenChartData = result.map((val) => val.totalAsset);
      this.childrenBgColor = result.map((val) => val.backgroundColor);
      this.renderPieChart();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(`parent chart data`, this.parentChartData);
      this.dataSource = [
        {position: 1, name: 'Total asset orang tua', total: this.parentChartData.reduce((partial, a) => partial + a, 0)},
        {position: 2, name: 'Total asset orang tua', total: this.childrenChartData.reduce((partial, a) => partial + a, 0)},
        {position: 3, name: 'Total asset keluarga', total: this.childrenChartData.reduce((partial, a) => partial + a, 0) + this.parentChartData.reduce((partial, a) => partial + a, 0)}
      ];
    }, 2000);
  }

  renderBarChart() {
    const barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.parentChartLabel,
        datasets: [{
          label: '$ of assets',
          data: this.parentChartData,
          backgroundColor: this.parentBgColor,
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderPieChart() {
    const pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: this.childrenChartLabel,
        datasets: [{
          label: '$ of assets',
          data: this.childrenChartData,
          backgroundColor: this.childrenBgColor,
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })    
  }

  randomRgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';    
  }
  

}
