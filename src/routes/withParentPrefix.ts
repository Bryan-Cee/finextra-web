function isObject(value: unknown): boolean {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

interface InitialRoute {
  ROOT: string;
}

export default function addPrefix<R extends Record<string, unknown>>(
  prefix: string,
  routes: R
): R & InitialRoute {
  const initial: R & InitialRoute = Object.assign({ ROOT: prefix }, routes);

  return Object.keys(routes).reduce(
    (accumulator: R & InitialRoute, key: string) =>
      Object.assign(accumulator, {
        [key]: isObject(routes[key])
          ? addPrefix(prefix, routes[key] as Record<string, object>)
          : `${prefix}${routes[key] as string}`,
      }),
    initial
  );
}
