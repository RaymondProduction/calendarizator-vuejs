    var app = new Vue({
      el: '#app',
      data() {
        return {
          message: 'Hello Vue!!',
          year: 2017,
          items: [{
            value: '1'
          }, {
            value: '5'
          }],
          sesons: [],
          nameMonth: [{
            uk: 'Январь', en : 'January', ua: 'Січень',
          }, {
            uk: 'Февраль', en : 'February', ua: 'Лютий',
          }, {
            uk: 'Март', en : 'March', ua: 'Березень',
          }, {
            uk: 'Апрель', en : 'April', ua: 'Квітень',
          }, {
            uk: 'Май', en : 'May', ua: 'Травень',
          }, {
            uk: 'Июнь', en : 'June', ua: 'Червень',
          }, {
            uk: 'Июль', en : 'July', ua: 'Липень',
          }, {
            uk: 'Август', en : 'August', ua: 'Серпень',
          }, {
            uk: 'Сентябрь', en : 'September', ua: 'Вересень',
          }, {
            uk: 'Октябрь', en : 'October', ua: 'Жовтень',
          }, {
            uk: 'Ноябрь', en : 'November', ua: 'Листопад',
          }, {
            uk: 'Декабрь', en : 'December', ua: 'Грудень',
          }, ]
        }
      },

      methods: {
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
                days[day] = {number: d, name: day};
                if (day === 7 || d >= monthLength) {
                  weeks.push({days : days});
                  days = new Array(7);
                }
              }
              months.push({
                weeks: weeks,
                name: this.nameMonth[m].en
              });
            }
            this.sesons.push(months);
            months = [];
          }
        }
      },
      created() {
        this.weekDay();
        console.log(this.sesons)
      },
    })
