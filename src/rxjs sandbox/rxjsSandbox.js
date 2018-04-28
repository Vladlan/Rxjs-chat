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
let button = document.querySelector('button');

let btn$ = Rx.Observable.fromEvent(button, 'click');

btn$.subscribe(function(e) {
    console.log(e);
    console.log('clicked');
  }
);

Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
  .subscribe((e) => {
      console.log(e);
    }
  );

Rx.Observable.fromEvent(document, 'mousemove')
  .subscribe(e => {
      document.querySelector('h1').innerHTML = ` X: ${e.clientX}, Y: ${e.clientY}`;
    }
  );

