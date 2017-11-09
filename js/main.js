    var app = new Vue({
      el: '#app',
      data() {
        return {
          lang: 'ru',
          years: [],
          year: new Date().getFullYear(),
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
          captions: {
            year: {
              ru: 'Учебный год',
              ua: 'Навчальний рік',
              en: 'Year of a school'
            },
            lang: {
              ru: 'Язык',
              ua: 'Мова',
              en: 'Language'
            },
            table: {
              ru: 'Таблица дат',
              ua: 'Таблиця дат',
              en: 'Table of dates'
            },
            numerator: {
              ru: 'Числитель',
              ua: 'Чисельник',
              en: 'Numerator'
            },
            denominator: {
              ru: 'Знаменатель',
              ua: 'Знаменник',
              en: 'Denominator'
            },
            saturdayIsDayOff: {
              ru: 'Суббота выходной',
              ua: 'Субота вихідний',
              en: 'Saturday is the day of'
            },
            shift: {
              ru: 'Сдвинуть числитель на неделю',
              ua: 'Зсунути чиельни на тиждень',
              en: 'Shift numerator for a week'
            }
          },
          dayNames: [{
            ru: 'Пн',
            en: 'Mon',
            ua: 'Пн'
          }, {
            ru: 'Вт',
            en: 'Tue',
            ua: 'Вт',
          }, {
            ru: 'Ср',
            en: 'Wed',
            ua: 'Ср',
          }, {
            ru: 'Чт',
            en: 'Thu',
            ua: 'Чт'
          }, {
            ru: 'Пт',
            en: 'Fri',
            ua: 'Пт'
          }, {
            ru: 'Сб',
            en: 'Sat',
            ua: 'Сб'
          }, {
            ru: 'Вс',
            en: 'Sun',
            ua: 'Нд',
          }, ],
          nameMonth: [{
            ru: 'Январь',
            en: 'January',
            ua: 'Січень',
          }, {
            ru: 'Февраль',
            en: 'February',
            ua: 'Лютий',
          }, {
            ru: 'Март',
            en: 'March',
            ua: 'Березень',
          }, {
            ru: 'Апрель',
            en: 'April',
            ua: 'Квітень',
          }, {
            ru: 'Май',
            en: 'May',
            ua: 'Травень',
          }, {
            ru: 'Июнь',
            en: 'June',
            ua: 'Червень',
          }, {
            ru: 'Июль',
            en: 'July',
            ua: 'Липень',
          }, {
            ru: 'Август',
            en: 'August',
            ua: 'Серпень',
          }, {
            ru: 'Сентябрь',
            en: 'September',
            ua: 'Вересень',
          }, {
            ru: 'Октябрь',
            en: 'October',
            ua: 'Жовтень',
          }, {
            ru: 'Ноябрь',
            en: 'November',
            ua: 'Листопад',
          }, {
            ru: 'Декабрь',
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
          let thidsOfYear = [
            [8, 9, 10],
            [11, 0, 1],
            [2, 3, 4]
          ];
          let months = [];
          let status = 0;
          for (let i = 0; i < 3; i++) {
            let weeks;
            thidsOfYear[i].forEach((m) => {
              weeks = [];
              days = new Array(7);
              let monthLength = this.daysInMonth(m);
              for (let d = 1; d < monthLength + 1; d++) {
                let day = new Date(m < 8 ? this.year + 1 : this.year, m, d).getDay();
                if (day == 0) {
                  day = 7
                }
                if (day == 7 || (day == 6 && this.saturdayIsDayOff) || this.holiday['d' + d + 'm' + m]) status = 1
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
                name: this.nameMonth[m][this.lang],
                number: m + 1,
              });
            });
            this.thids.push(months);
            months = [];
          }
        },
        schedule() {
          // Schedule, prepare array for table of schedule
          this.table = [];
          let dataForTable = [];
          let number = 1;
          let numerator = this.shift ? false : true;
          let holiday = false;
          this.thids.forEach((thid) => {
              thid.forEach((month) => {
                month.weeks.forEach((week) => {
                  week.days.forEach((day) => {
                    if (
                      (this.dayNames[day.name - 1].numerator && numerator ||
                        this.dayNames[day.name - 1].denominator && !numerator) &&
                      day.status == 0
                    ) dataForTable.push({
                      day: day.number,
                      month: month.number,
                      number: number++,
                    });
                    if (day.status == 2) holiday = true;
                    if (day.name == 1 && day.status != 2) holiday = false;
                    if (day.name == 7 && !holiday) numerator = !numerator;
                  })
                })
              })
            })
            // Cut rows
          let col = 4;
          let maxRow = 20;
          let row = dataForTable.length < col * maxRow ? maxRow : parseInt((dataForTable.length - 1) / col) + 1;
          for (let currentRow = 0; currentRow < row; currentRow++) {
            let cols = new Array(col);
            for (let currentCol = 0; currentCol < col; currentCol++) {
              if (dataForTable[currentCol * row + currentRow]) {
                cols[currentCol] = dataForTable[currentCol * row + currentRow];
              }
            }
            this.table.push(cols)
          }
        }
      },
      created() {
        for (let year = this.year - 5; year < this.year + 5; year++)
          this.years.push(year);

        this.generatorOfCalendar();
        this.schedule();
        //console.log(this.thids)
      },
    })
