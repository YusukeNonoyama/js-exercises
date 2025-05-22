export function withResource(resource: { close: Function }, f: Function) {
  try {
    f(resource);
  } finally {
    resource.close();
  }
  return;
}