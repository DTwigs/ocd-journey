export function throttle(func: (any) => void, wait: number): (any) => void {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common boolean.
  let blocked: boolean = false;
  let timeout = null;

  // Calling throttle returns a new anonymous function
  return function (...args) {
    // reference the context and args for the setTimeout function

    if (!blocked) {
      blocked = true;
      func.apply(this, args);
    }

    if (timeout) {
      return;
    }

    timeout = setTimeout(function () {
      timeout = null;
      blocked = false;
    }, wait);
  };
}
