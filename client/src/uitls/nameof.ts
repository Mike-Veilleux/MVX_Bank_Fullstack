//-----------------------------------------------------------
//     Takes an object that push to a function to access
//     the members and return that member key as string
//
//     *** Use this instead of magic string on object key
//     => object["key"] => won't pickup on key name refactoring
//
//     EXAMPLE:
//     object:{vendor?:string}
//
//     nameof(object, (x) => x.vendor!)
//
//     returns => "vendor"
//-----------------------------------------------------------

export function nameof<T>(
  obj: T,
  expression: (x: { [Property in keyof T]: () => string }) => () => string
): string {
  const res: { [Property in keyof T]: () => string } = {} as {
    [Property in keyof T]: () => string;
  };
  //@ts-ignore
  Object.keys(obj).map((k) => (res[k as keyof T] = () => k));

  return expression(res)();
}
