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

// Rx.Observable.of(1, 5, 'str')
//   .first()
//   .subscribe(createSubscribe('first'));
//
// Rx.Observable.of(1, 5, 'str')
//   .last()
//   .subscribe(createSubscribe('last'));
//
// Rx.Observable.of(1, 5, 'str')
//   .find(x => x === 5)
//   .subscribe(createSubscribe('find'));
//
// Rx.Observable.of(1, 5, 'STR')
//   .find(x => {
//       if (typeof x === 'string')
//         return x.toLowerCase() === 'str'
//     }
//   )
//   .subscribe(createSubscribe('find 2'));
//
// Rx.Observable.of(1, 5, 'STR')
//   .findIndex(x => x === 'STR')
//   .subscribe(createSubscribe('findIndex'));
//
//
// Rx.Observable.of(1, 5, 'STR')
//   .take(2)
//   .subscribe(createSubscribe('take'));
//
// Rx.Observable.of(1, 5, 'STR')
//   .skip(2)
//   .subscribe(createSubscribe('skip'));
//
//
// Rx.Observable.of(1, 5, 2, 5, 6 , 'STR', 'STR2')
//   .skipWhile( x => {
//     return typeof x === 'number';
//   })
//   .subscribe(createSubscribe('skipWhile'));
//
//
// Rx.Observable.interval(500)
//   .skipWhile( x => x < 4)
//   .takeWhile( x => x < 10)
//   .subscribe(createSubscribe('skipWhile-Interval-TakeWhile'));
//
// Rx.Observable.interval( 400 )
// .skipUntil(Rx.Observable.timer(8000))
//   .takeUntil(Rx.Observable.timer(11000))
// .subscribe(createSubscribe('skipUntil_takeUntil'));

// #8

// const items = [
//   {
//     id: '1',
//     item: 'some1'
//   },
//   {
//     id: '2',
//     item: 'some2'
//   },
//   {
//     id: '3',
//     item: 'some3'
//   },
// ];
//
// Rx.Observable.range(0, 11)
//   .filter( x => x > 3)
//   .subscribe(createSubscribe('range'));
//
// Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
// .map( e => e.target.value)
// .subscribe(x => {
//   Rx.Observable.from(items)
//     .filter( s => s.item === x)
//     .subscribe(out => {
//       document.querySelector('div').innerHTML = `
// <h2>${out.item}</h2>
// <h4>${out.id}</h4>
// `
//     })
// });
//
// Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//   .map(e => e.target.value)
//   .debounceTime(1500)
//   .subscribe(createSubscribe('debounceTime'));
//
// Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//   .map(e => e.target.value)
//   .distinct()
//   .subscribe(createSubscribe('distinct'));
//
// Rx.Observable.from([1, 2, 3, 3, 3, 3, 5,6 ,124, 125125, 1241255, 1 ,2 ,3 ,1 ,2, 3])
//   .distinctUntilChanged()
//   .subscribe(createSubscribe('distinctUntilChange'));


// #9

// Rx.Observable.interval(500)
// .buffer(Rx.Observable.interval(3000))
//   .take(5 )
// .subscribe(createSubscribe('buffer'));
//
// Rx.Observable.interval(500)
//   .bufferTime(3000)
//   .take(2 )
//   .subscribe(createSubscribe('bufferTime(x) === buffer(Rx.Observable.interval(x)'));
//
// Rx.Observable.range(0, 40)
//   .bufferCount(4)
//   .subscribe(createSubscribe('bufferCount'));
//
// Rx.Observable.interval(1000)
// .buffer(Rx.Observable.fromEvent(document, 'click'))
//   .map( x => x.length )
// .subscribe(createSubscribe('buffer'));


// #10

// Rx.Observable.of(2)
//   .defaultIfEmpty('I am empty stream')
//   .subscribe(createSubscribe('of'));
//
// Rx.Observable.from([1, 2, 3, 4, 5, 6])
// // .map(x => x * 2)
//   .every(x => x % 2 === 0)
//   .subscribe(createSubscribe('every'));
//
// Rx.Observable.from([101, 102, 103, 104])
//   .do(x => console.log('x: ', x))
//   .map(x => x * x)
//   .subscribe(createSubscribe('do'));
//
//
// Rx.Observable.range(39, 43)
//   .map(x => x * x)
//   .delay(4000)
//   .subscribe(createSubscribe('delay'));
//
// Rx.Observable.range(1,3)
//   .map(x => x+1)
//   .let( observer => observer.map(x => x * x))
//   .subscribe(createSubscribe('let'));

// #11

// const s1$ = Rx.Observable.of('Hello');
// const s2$ = Rx.Observable.of('World');
//
// s1$.merge(s2$).subscribe(createSubscribe('merge'));
// Rx.Observable.merge(s1$, s2$).subscribe(createSubscribe('merge2'));
//
// const s3$ = Rx.Observable.interval(1000).map(x => 'Stream 3: ' + x);
// const s4$ = Rx.Observable.interval(2000).map(x => 'Stream 4: ' + x);
//
// Rx.Observable.merge(s3$, s4$).take(6).subscribe(createSubscribe('merge3'));
//
// Rx.Observable.range(1, 3)
//   .map(x => Rx.Observable.range(1, 4))
//   .mergeAll()
//   .subscribe(createSubscribe('mergeAll'));
//
// const s1$ = Rx.Observable.from([1,2,3]);
// const s2$ = Rx.Observable.from([4,5,6]);
//
// Rx.Observable.concat(s1$, s2$).subscribe(createSubscribe('concat'));
//
// Rx.Observable.range(1, 3)
//   .map(x => Rx.Observable.range(x, 3))
//   .concatAll()
//   .subscribe(createSubscribe('concatAll'));

// #12

// Rx.Observable.of('Hello')
//   .subscribe(x => {
//     Rx.Observable.of(x + ' World')
//       .subscribe(createSubscribe('mergeMap'))
//   });
//
// Rx.Observable.of('Hello')
//   .mergeMap(x => {return Rx.Observable.of(x + ' World')})
//   .subscribe(createSubscribe('mergeMap'));
//
//
// const promise = (data) => {
//   return new Promise((resolve, reject) => {
//     setTimeout( () => {
//       resolve(data + ' World');
//     }, 2000);
//   });
// };
//
// Rx.Observable.of('Hello')
//   .mergeMap((x) => {
//   return promise(x);
//   })
//   .subscribe(createSubscribe('promise'));
//
// Rx.Observable.range(1, 4)
//   .concatMap( (x, i) => Rx.Observable.interval(200)
//     .take(x)
//     .map(i => i)
//   )
//   .subscribe(createSubscribe('concatMap'));
//
// Rx.Observable.range(1, 10)
//   .concatMap( (x, i) => Rx.Observable.interval(100)
//     .take(x)
//     .map(q => i)
//   )
//   .subscribe(createSubscribe('concatMap'));

// #13

// const s1$ = Rx.Observable.of('Hello');
// const s2$ = Rx.Observable.of('World');
//
// Rx.Observable
//   .zip(s1$.delay(3000), s2$)
//   .subscribe(createSubscribe('zip'));
//
// const interval$ = Rx.Observable.interval(1000);
// Rx.Observable
//   .zip(interval$, interval$.take(3), Rx.Observable.of('str'))
//   .subscribe(createSubscribe('zip'));
//
// const int1$ = Rx.Observable.interval(1000);
// const int2$ = Rx.Observable.interval(500);
//
// int1$.withLatestFrom(int2$).take(3)
// .subscribe(createSubscribe('withLatestFrom'));
//
// const t1$ = Rx.Observable.timer(1000, 2000);
// const t2$ = Rx.Observable.timer(2000, 2000);
// const t3$ = Rx.Observable.timer(3000, 2000);
//
// Rx.Observable
// .combineLatest(t1$, t2$, t3$)
//   .take(5)
// .subscribe(createSubscribe('combineLatest'));
