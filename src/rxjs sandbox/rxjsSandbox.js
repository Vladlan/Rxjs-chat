//#1
// console.log(Rx);
//
// let stream$ = Rx.Observable.create(function(observer) {
//   console.log('stream$ was created');
//   observer.next('One');
//
//   setTimeout(function() {
//     observer.next('3 sec');
//   }, 3000);
//   setTimeout(function() {
//     observer.next('2 sec');
//   }, 2000);
//   setTimeout(function() {
//     observer.next('4 sec');
//   }, 4000);
//   setTimeout(function() {
//     observer.error('error 5 sec');
//   }, 5000);
//   setTimeout(function() {
//     observer.complete();
//   }, 4500);
//
//
//
//   observer.next('Two');
// });
//
// stream$.subscribe(
//   function(data) {
//     console.log(data);
//   },
//   function(error) {
//     console.log('Error', error);
//   },
//   function() {
//     console.log('Completed');
//   }
// );

//#2
// let button = document.querySelector('button');
//
// let btn$ = Rx.Observable.fromEvent(button, 'click');
//
// btn$.subscribe(function(e) {
//     console.log(e);
//     console.log('clicked');
//   }
// );
//
// Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//   .subscribe((e) => {
//       console.log(e);
//     }
//   );
//
// Rx.Observable.fromEvent(document, 'mousemove')
//   .subscribe(e => {
//       document.querySelector('h1').innerHTML = ` X: ${e.clientX}, Y: ${e.clientY}`;
//     }
//   );

//#3
function createSubscribe(name) {
  return {
    next(x) {
      console.log(name, ': ', x);
    },
    error(err) {
      console.log('Error: ', err);
    },
    complete() {
      console.log(name, ' completed.');
    }
  }
}

//
// Rx.Observable.of(5, 6, 7, 8, [12,1231,1231])
//   .subscribe(
//     // (x) => {
//     //   console.log('next: ', x);
//     // },
//     // (err) => console.log('err = ', err),
//     // () => console.log('Completed')
//     createSubscribe('of')
//   );
//
// Rx.Observable.interval(1000)
//   .take(4)
//   .subscribe(createSubscribe('interval'));
//
// Rx.Observable.timer(3000, 500)
//   .take(10)
//   .subscribe(createSubscribe('timer'));
//
// Rx.Observable.range(5, 15)
//   .subscribe(createSubscribe('range'));

//#4
// Rx.Observable.from([1, 2, 3, 4]).
//   subscribe(createSubscribe('from'));
//
// let someSet = new Set([1, 2, 3, 4 , {id: '31223'}, {id: 11412} ]);
// Rx.Observable.from(someSet).
//   subscribe(createSubscribe('from_set'));
//
// let map = new Map([[1,2], [3,4], [5,6]]);
// Rx.Observable.from(map)
// .subscribe(createSubscribe('from_map'));

//#5
function delay(ms = 1000) {
  return new Promise( (resolve, reject) => {
      setTimeout(() => {
        resolve(msgit);
      }, ms)
    }
  );
}

delay(3000).then(() => {
    console.log('Promise was resolved');
  }
);

const p$ = Rx.Observable.fromPromise(delay(2000));

p$.subscribe(createSubscribe('fromPromise'));
