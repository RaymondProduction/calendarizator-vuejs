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
          fontSize: 3,
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
                name: this.nameMonth[m].en
              });
            }
            this.sesons.push(months);
            months = [];
          }
        },
      },
      created() {
        this.weekDay();
        console.log(this.sesons)
      },
    })
