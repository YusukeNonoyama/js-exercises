export function withResource(resource: { close: () => void }, f: Function) {
  try {
    f(resource);
  } finally {
    resource.close();
  }
}