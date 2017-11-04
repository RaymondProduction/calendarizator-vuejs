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
            uk: 'Январь', en : 'January',
          }, {
            uk: 'Февраль', en : 'February',
          }, {
            uk: 'Март', en : 'March',
          }, {
            uk: 'Апрель', en : 'April',
          }, {
            uk: 'Май', en : 'May',
          }, {
            uk: 'Июнь', en : 'June',
          }, {
            uk: 'Июль', en : 'July',
          }, {
            uk: 'Август', en : 'August',
          }, {
            uk: 'Сентябрь', en : 'September',
          }, {
            uk: 'Октябрь', en : 'October',
          }, {
            uk: 'Ноябрь', en : 'November',
          }, {
            uk: 'Декабрь', en : 'December',
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
          let d;
          let months = [];
          for (let s = 0; s < 4; s++) {
            let weeks;
            for (let m = s * 3; m < (s + 1) * 3; m++) {
              weeks = [];
              days = [];
              let monthLength = this.daysInMonth(m);
              for (d = 1; d < monthLength + 1; d++) {
                let day = new Date(this.year, m, d).getDay();
                if (day === 0) {
                  day = 7
                } else {
                  day = day - 1
                };
                days[day] = d;
                if (day === 7 || d >= monthLength) {
                  weeks.push(days);
                  days = [];
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
      },
    })
