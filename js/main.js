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
          thids: [],
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
          if (!day) return;
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
          let thidsOfYear =[[8,9,10],[11,0,1],[2,3,4]];
          let months = [];
          let numerator = true;
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
                days[day - 1] = {
                  number: d,
                  name: day,
                  month: m,
                  status: 1
                };
                if (day === 7 || d >= monthLength) {
                  weeks.push({
                    days: days,
                    numerator : numerator,
                  });
                  days = new Array(7);
                }
                if (day ===7) numerator = !numerator;
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
          this.thids.forEach((thid) => {
            thid.forEach((month) => {
              month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                  if (
                    this.dayNames[day.name-1].numerator && week.numerator
                    ||
                    this.dayNames[day.name-1].denominator && !week.numerator
                    ) dataForTable.push({
                    day: day.number,
                    month: month.number,
                    number: number++,
                  });
                })
              })
            })
          })
          // Cut rows
          let col = 4;
          let maxRow=4;
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
        this.weekDay();
        this.schedule();
        console.log(this.thids)
      },
    })
