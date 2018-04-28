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

Rx.Observable.of(5, 6, 7, 8, [12,1231,1231])
  .subscribe(
    // (x) => {
    //   console.log('next: ', x);
    // },
    // (err) => console.log('err = ', err),
    // () => console.log('Completed')
    createSubscribe('of')
  );

Rx.Observable.interval(1000)
  .take(4)
  .subscribe(createSubscribe('interval'));

Rx.Observable.timer(3000, 500)
  .take(10)
  .subscribe(createSubscribe('timer'));

Rx.Observable.range(5, 15)
  .subscribe(createSubscribe('range'));