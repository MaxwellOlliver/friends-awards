export const tryCatch = async <T, Err extends new (...args: any[]) => Error>(
  promise: Promise<T>,
  exceptions?: Err[]
): Promise<[InstanceType<Err>] | [undefined, T]> => {
  try {
    const data = await promise;

    return [undefined, data] as [undefined, T];
  } catch (error) {
    if (exceptions && exceptions.some((e) => error instanceof e)) {
      return [error] as [InstanceType<Err>];
    }

    return [error as InstanceType<Err>];
  }
};
