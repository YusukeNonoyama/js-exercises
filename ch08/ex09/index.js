export function withResource(resource, f) {
  try{
    f(resource);
  } finally{
    resource.close();
  }
  return;
}