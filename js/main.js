    var app = new Vue({
      el: '#app',
      data() {
        return {
          year: 2017,
          items: [{
            value: '1'
          }, {
            value: '5'
          }],
          table: [],
          sesons: [],
          dayNames: [{
            ru: 'Пн',
            en: 'Mo',
          }, {
            ru: 'Вт',
            en: 'Tu',
          }, {
            ru: 'Ср',
            en: 'We',
          }, {
            ru: 'Чт',
            en: 'Th',
          }, {
            ru: 'Пт',
            en: 'Fr',
          }, {
            ru: 'Сб',
            en: 'Th',
          }, {
            ru: 'Вс',
            en: 'Su'
          }, ],
          nameMonth: [{
            uk: 'Январь',
            en: 'January',
            ua: 'Січень',
          }, {
            uk: 'Февраль',
            en: 'February',
            ua: 'Лютий',
          }, {
            uk: 'Март',
            en: 'March',
            ua: 'Березень',
          }, {
            uk: 'Апрель',
            en: 'April',
            ua: 'Квітень',
          }, {
            uk: 'Май',
            en: 'May',
            ua: 'Травень',
          }, {
            uk: 'Июнь',
            en: 'June',
            ua: 'Червень',
          }, {
            uk: 'Июль',
            en: 'July',
            ua: 'Липень',
          }, {
            uk: 'Август',
            en: 'August',
            ua: 'Серпень',
          }, {
            uk: 'Сентябрь',
            en: 'September',
            ua: 'Вересень',
          }, {
            uk: 'Октябрь',
            en: 'October',
            ua: 'Жовтень',
          }, {
            uk: 'Ноябрь',
            en: 'November',
            ua: 'Листопад',
          }, {
            uk: 'Декабрь',
            en: 'December',
            ua: 'Грудень',
          }, ]
        }
      },

      methods: {
        reaction(day) {
          day.status++;
          if (day.status > 3) day.status = 1;
          console.log(day.status);
          this.schedule();
        },
        classObject(day) {
          //if (!day.name) return;
          return {
            'weekdays': day.name < 6,
            'saturday': day.name == 6,
            'sunday': day.name == 7,
            'status2 weight': day.status == 2,
            'status3 weight': day.status == 3,
          }
        },
        daysInMonth(month) {
          // let monthStart = new Date(this.year, m, 1);
          // let monthEnd = new Date(this.year, m + 1, 1);
          //var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
          return 33 - new Date(this.year, month, 33).getDate();
        },
        weekDay() {
          let months = [];
          for (let s = 0; s < 4; s++) {
            let weeks;
            for (let m = s * 3; m < (s + 1) * 3; m++) {
              weeks = [];
              days = new Array(7);
              let monthLength = this.daysInMonth(m);
              for (let d = 1; d < monthLength + 1; d++) {
                let day = new Date(this.year, m, d).getDay();
                if (day == 0) {
                  day = 7
                }
                days[day - 1] = {
                  number: d,
                  name: day,
                  month: m,
                  status: 1
                };
                if (day === 7 || d >= monthLength) {
                  weeks.push({
                    days: days
                  });
                  days = new Array(7);
                }
              }
              months.push({
                weeks: weeks,
                name: this.nameMonth[m].en,
                number: m+1,
              });
            }
            this.sesons.push(months);
            months = [];
          }
        },
        schedule(){
          // Schedule, prepare array for table of schedule
          this.table = [];
          let dataForTable =[];
          this.sesons.forEach((seson) => {
            seson.forEach((month) => {
              month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                  let cols = [];
                  cols.push({
                    day: day.number,
                    month: month.number,
                  });
                  if (day.status>1) dataForTable.push(cols)
                })
              })
            })
          })
          // Cut rows
          let row = dataForTable.length<12 ? 4 : parseInt((dataForTable.length-1)/3)+1;
          let col = 3;
          for (let currentRow = 0;currentRow< row;currentRow++){
             let cols = new Array(col);
            for (let currentCol = 0; currentCol<col;currentCol++) {
              if (dataForTable[currentCol*row+currentRow]){
                cols[currentCol] = dataForTable[currentCol*row+currentRow][0];
              }
            }
            this.table.push(cols)
          }
        }
      },
      created() {
        this.weekDay();
        this.schedule();
        console.log(this.sesons)
      },
    })
