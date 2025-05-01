export function throttle(func: (any) => any, wait: number): () => void {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common boolean.
  let blocked: boolean = false;
  let timeout = null;

  // Calling throttle returns a new anonymous function
  return function () {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    if (!blocked) {
      blocked = true;
      func.apply(context, args);
    }

    if (timeout) return;

    timeout = setTimeout(function () {
      timeout = null;
      blocked = false;
    }, wait);
  };
}
