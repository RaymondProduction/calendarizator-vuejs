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
          saturdayIsDayOff: true,
          table: [],
          thids: [],
          shift: false,
          holiday: {
            d1m0: true,
            d2m0: true,
            d7m0: true,
            d8m2: true,
            d1m4: true,
            d2m4: true
          },
          dayNames: [{
            ru: 'Пн',
            en: 'Mon',
          }, {
            ru: 'Вт',
            en: 'Tue',
          }, {
            ru: 'Ср',
            en: 'Wed',
          }, {
            ru: 'Чт',
            en: 'Thu',
          }, {
            ru: 'Пт',
            en: 'Fri',
          }, {
            ru: 'Сб',
            en: 'Sat',
          }, {
            ru: 'Вс',
            en: 'Sun'
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
          if (!day) return;
          day.status++;
          if (day.status > 2) day.status = 0;
          console.log(day.status);
          this.schedule();
        },
        classObject(day) {
          //if (!day.name) return;
          return {
            'weekdays': day.status == 0,
            'dayoff': day.status == 1,
            'holiday': day.status == 2,
          }
        },
        daysInMonth(month) {
          // let monthStart = new Date(this.year, m, 1);
          // let monthEnd = new Date(this.year, m + 1, 1);
          //var monthLength = (monthEnd - monthStart) / (1000 * 60 * 60 * 24)
          return 33 - new Date(this.year, month, 33).getDate();
        },
        generatorOfCalendar() {
          this.thids = [];
          let thidsOfYear =[[8,9,10],[11,0,1],[2,3,4]];
          let months = [];
          let status =0;
          for (let i = 0; i < 3; i++) {
            let weeks;
            thidsOfYear[i].forEach((m)=>{
              console.log(m);
              weeks = [];
              days = new Array(7);
              let monthLength = this.daysInMonth(m);
              for (let d = 1; d < monthLength + 1; d++) {
                let day = new Date(this.year, m, d).getDay();
                if (day == 0) {
                  day = 7
                }
                if (day ==7 || (day == 6 && this.saturdayIsDayOff)
                  || this.holiday['d'+d+'m'+m]) status = 1
                else status = 0;
                days[day - 1] = {
                  number: d,
                  name: day,
                  month: m,
                  status: status
                };
                if (day === 7 || d >= monthLength) {
                  weeks.push({
                    days: days,
                  });
                  days = new Array(7);
                }
              }
              months.push({
                weeks: weeks,
                name: this.nameMonth[m].en,
                number: m+1,
              });
            });
            this.thids.push(months);
            months = [];
          }
        },
        schedule(){
          console.log('ok');
          // Schedule, prepare array for table of schedule
          this.table = [];
          let dataForTable =[];
          let number = 1;
          let numerator = this.shift ? false : true;
          this.thids.forEach((thid) => {
            thid.forEach((month) => {
              month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                  if (
                    (this.dayNames[day.name-1].numerator && numerator
                    ||
                    this.dayNames[day.name-1].denominator && !numerator)
                    &&
                    day.status == 0
                    ) dataForTable.push({
                    day: day.number,
                    month: month.number,
                    number: number++,
                  });
                  if (day.name == 7) numerator = !numerator;
                })
              })
            })
          })
          // Cut rows
          let col = 4;
          let maxRow=20;
          let row = dataForTable.length<col*maxRow ? maxRow : parseInt((dataForTable.length-1)/col)+1;
          for (let currentRow = 0;currentRow< row;currentRow++){
             let cols = new Array(col);
            for (let currentCol = 0; currentCol<col;currentCol++) {
              if (dataForTable[currentCol*row+currentRow]){
                cols[currentCol] = dataForTable[currentCol*row+currentRow];
              }
            }
            this.table.push(cols)
          }
        }
      },
      created() {
        this.generatorOfCalendar();
        this.schedule();
        console.log(this.thids)
      },
    })
