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
// function delay(ms = 1000) {
//   return new Promise( (resolve, reject) => {
//       setTimeout(() => {
//         resolve(msgit);
//       }, ms)
//     }
//   );
// }
//
// delay(3000).then(() => {
//     console.log('Promise was resolved');
//   }
// );
//
// const p$ = Rx.Observable.fromPromise(delay(2000));
//
// p$.subscribe(createSubscribe('fromPromise'));


//#6
// Rx.Observable.interval(1000)
//   .map(x => x * 2)
//   .take(10)
//   .subscribe(createSubscribe('map'));
//
// Rx.Observable.of('hello', 'world', 'wfm')
//   .map(x => x.toUpperCase())
//   .subscribe(createSubscribe('of'));
//
// Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//   .pluck('target', 'value')
//   // .map( x => x.target.value)
//   // .map( x => x.toUpperCase() )
//   // .map( x => {
//   //   return {
//   //     value: x,
//   //     length: x.length
//   //   }
//   // })
//   .subscribe(createSubscribe('keyUp'));


//#7
Rx.Observable.of(1, 5, 'str')
  .first()
  .subscribe(createSubscribe('first'));

Rx.Observable.of(1, 5, 'str')
  .last()
  .subscribe(createSubscribe('last'));

Rx.Observable.of(1, 5, 'str')
  .find(x => x === 5)
  .subscribe(createSubscribe('find'));

Rx.Observable.of(1, 5, 'STR')
  .find(x => {
      if (typeof x === 'string')
        return x.toLowerCase() === 'str'
    }
  )
  .subscribe(createSubscribe('find 2'));

Rx.Observable.of(1, 5, 'STR')
  .findIndex(x => x === 'STR')
  .subscribe(createSubscribe('findIndex'));


Rx.Observable.of(1, 5, 'STR')
  .take(2)
  .subscribe(createSubscribe('take'));

Rx.Observable.of(1, 5, 'STR')
  .skip(2)
  .subscribe(createSubscribe('skip'));


Rx.Observable.of(1, 5, 2, 5, 6 , 'STR', 'STR2')
  .skipWhile( x => {
    return typeof x === 'number';
  })
  .subscribe(createSubscribe('skipWhile'));


Rx.Observable.interval(500)
  .skipWhile( x => x < 4)
  .takeWhile( x => x < 10)
  .subscribe(createSubscribe('skipWhile-Interval-TakeWhile'));

Rx.Observable.interval( 400 )
.skipUntil(Rx.Observable.timer(8000))
  .takeUntil(Rx.Observable.timer(11000))
.subscribe(createSubscribe('skipUntil_takeUntil'));
