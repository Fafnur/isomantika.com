import { addTrailingSlash, TrailingSlashUrlSerializer } from './trailing-slash.serializer';

describe('addTrailingSlash', () => {
  it('adds the slash before the query and the fragment', () => {
    expect(addTrailingSlash('/privacy')).toBe('/privacy/');
    expect(addTrailingSlash('/privacy?a=1#b')).toBe('/privacy/?a=1#b');
    expect(addTrailingSlash('/#features')).toBe('/#features');
    expect(addTrailingSlash('/')).toBe('/');
  });
});

describe('TrailingSlashUrlSerializer', () => {
  const serializer = new TrailingSlashUrlSerializer();

  it('parses URLs with and without the slash to the same tree', () => {
    expect(serializer.serialize(serializer.parse('/support/'))).toBe('/support/');
    expect(serializer.serialize(serializer.parse('/support'))).toBe('/support/');
  });
});
